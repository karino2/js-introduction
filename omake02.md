---
title: "おまけ第二回: クリティカルエフェクトのコードを読んでみよう（元コードコピペ型）"
layout: page
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.35.0/codemirror.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.35.0/codemirror.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.35.0/mode/javascript/javascript.js"></script>
<style>
    .CodeMirror { height: auto; border: 1px solid #ddd; }
    .console { border: 1px solid #333; color: rgb(48, 68, 216); padding: 0px 5px 0px 5px; }

    .answer {color: red;  }
    .hideanswer { display: none; }
    .result {font-size: large;}
    .wrong {color: red;  }
    .correct {color: rgb(0, 89, 255);  }



    .column{
        padding: 0.5em 1em;
        margin: 2em 0;
        color: #5d627b;
        background: white;
        border-top: solid 5px #5d627b;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
    }    
</style>
<link rel="stylesheet" href="https://rawgit.com/karino2/js-introduction/master/scripts/smoke.css" />
<script src="https://rawgit.com/karino2/js-introduction/master/scripts/smoke.min.js"></script>                    
<script src="https://neil.fraser.name/software/JS-Interpreter/acorn_interpreter.js"></script>

<script type="text/javascript" src="https://rawgit.com/karino2/js-introduction/master/scripts/env.js"></script>



<script>
var questions = [];


document.body.onload = function() {
  initInterpreter();


  setupAllREPL2(5);
  setupAllQuestionsWithScnario(questions);
}
</script>


# クリティカルのアニメーション追加プラグイン

前回に引き続き、もう一つ、簡単なプラグインを見てみましょう。
今回は[Javascriptが苦手な私によるプラグイン作成講座](http://ktnhmv.jugem.jp/?eid=12)にあるプラグインを見ていきます。

このサイトのプラグインは、プラグインのもう一つの流儀である、「元のコードコピペ型」プラグインとなっています。


## 元のコードコピペ型の仕組み

プラグインでは、元となる処理があって、それにちょっと自分のコードを追加したい、というのがほとんどのケースになります。
この場合は、元のコードは何かしらの方法で残しておいて実行したい。

前のプラグインでは、元の関数を変数にとっておいてcallを呼ぶ、という方法で元のコードを使いました。

今度の例では、ツクールMVのソースの中からいじろうとしている関数の元となるコードを検索してコピペする、という手段を取っています。

### 元のコードコピペ型の利点


1. コードをコピペしていじるので、callとか変な仕組みを使わなくて良いから分かりやすい
2. 元のコード自体を改変出来るので、よりなんでも出来る

こちらの方が万能な方法と言えるでしょう。ただし欠点もあります。

### 元のコードコピペ型の欠点

1. 元のコードを理解しなくてはいけないのですが、これは複雑な事が多い
2. 同じ関数をいじる複数のプラグインを混ぜて使えない

プラグインを混ぜて使えないのは、自分がゲームを作る時にはそんなに問題にならない事も多いと思います。他人にプラグインを配る場合くらいですね。
ただ最初のうちはそんなの気にしても仕方ないでしょう。

問題はむしろ1です。ツクールMVのコードは本格的なゲームのコードなので、関数によっては本格的なゲームの複雑さを持っています。
だからcallとコピペの両方のやり方を知っておいて、楽な方を使うのが良いと思います。どっちでやろうが動けばいいんです。


### 元のコードコピペ型のプラグインを読むコツ

完成のプラグインを見る時には、もともとのコードと変更したコードを区別して、変更した方に集中して見るのがコツです。
もともとのコードは全部理解してなくても、変更した部分だけ理解していればプラグインを理解した事にはなります。

「あー、ここはもともとのコードだな」という事を意識しながら読むのがこの手のプラグインのコードを読むコツです。

## プラグインのコードを見ていく

では実際に上記サイトのプラグインのコードを見ていきましょう。

### まずは元のコードを見てみる

さて、上記サイトではSpriteDamage.prototypeという辞書のsetupというキーの関数を差し替えるようです。
そこでまずツクールMVからコピペしたコードを見てみましょう。

なお、今回も先頭と最後の「関数を作ってすぐ実行」の部分は除いてあります。
（なおこの例では変数を外に作ってないので、実は「関数を作ってすぐ実行」はやる必要がありません。
後でパラメータを使う時に必要になりますが。そういう事は気にせず、最初にプラグインを作る時はこうやるもの、って感じでとりあえず書くみたいですね）

```
Sprite_Damage.prototype.setup = function(target) { 
    var result = target.result(); 
    if (result.missed || result.evaded) { 
        this.createMiss(); 
    } else if (result.hpAffected) { 
        this.createDigits(0, result.hpDamage); 
    } else if (target.isAlive() && result.mpDamage !== 0) { 
        this.createDigits(2, result.mpDamage); 
    } 
    if (result.critical) { 
        this.setupCriticalEffect(); 
    } 
};
```

このコードを理解しなくても、プラグイン自体は理解出来ます。基本的にはこのコードの最後のifの所で、以下のようになっているのを、

```
    if (result.critical) { 
        this.setupCriticalEffect(); 
    } 
```

`target.startAnimation(37, false, 0);`という行を追加するようです。

```
    if (result.critical) { 
        target.startAnimation(37, false, 0); 
        this.setupCriticalEffect(); 
    }
```


falseと0が何かはこのコードからは分かりませんが、37はエフェクトに使われるアニメーションのIDだそうです。
基本的にはこのtarget.startAnimatikonというのが何なのかさえわかれば、このプラグインを理解する事は出来ます。

ただ、今回はお勉強目的なのでコピペしたコードを少し真面目に読んでみましょう。

### コードの概要

このコードが何をやっているか、という事を理解するのは、解読的なスキルが必要で最初はちょっと難しい。
そこで自分がうーん、と眺めて推測した事を最初に伝えておきます。

まず登場する変数たちの役割。

| 変数名など | 役割（予想） |
| --------  | ------------|
| Sprite_Damage.prototype（およびthis） | Sprite_Damageは、攻撃が当たった時とかに少しの間出るダメージの数字（ミスの場合はミス、と出たり、回復だったら緑色の数字だったりするでしょう） |
| target | この数字が出る対象となるモンスター（プレーヤーも来るかも。このコードからは分からない）|
| result | resultは今回の攻撃なりなんなりの、この数字を出すきっかけとなった事 |

で、このコードは何をやっているか、というのを、なんとなく日本語とプログラムを混ぜた感じで書くと以下みたいになっていると思う。

```
if(「ミス」か「避けられて」いたら) {
   ミスって出す
} else if(HPに影響がある事されてたら) {
    result.hpDamageという数字をHPのダメージっぽい色で出す
} else if(「モンスターがまだ生きてて」しかも「MPダメージがあったら」) {
    result.mpDamageという数字をMPダメージっぽい色で出す
}
```

という感じです。result.hpDamageという所に今回の攻撃によるダメージの数字が、result.mpDamageという所に今回の攻撃によるMPダメージの数字が入っているっぽいですね。

なんかこれはツクールの条件分岐とかっぽく無いですか？（良く知らないけど）


これらの事を踏まえて、実際のコードを読んでみましょう。


### 実際のコードを読んで行く

全体としては以下のコードを読んで行きます。

```
Sprite_Damage.prototype.setup = function(target) { 
    var result = target.result(); 
    if (result.missed || result.evaded) { 
        this.createMiss(); 
    } else if (result.hpAffected) { 
        this.createDigits(0, result.hpDamage); 
    } else if (target.isAlive() && result.mpDamage !== 0) { 
        this.createDigits(2, result.mpDamage); 
    } 
```

まず一行目

```
Sprite_Damage.prototype.setup = function(target) { 
```

これはsetupという名前なので、たぶんダメージとかの数字を画面に出す、という事を担当する関数のようです。

次の行は気にしない。

```
    var result = target.result(); 
```

これはこういう物だ、と思っておいていいと思う。

次に最初のif文を見ると、以下のようになっています。

```
    if (result.missed || result.evaded) { 
```

resultは結果、evadedは避けられた、みたいな意味でしょうか。

さて、これまで説明してなかった、`||`というのが出ていますね。
これは「または」って意味になります。
この`||`の左と右にある条件のどちらかが成り立っていればOK、という意味です。

つまり、「ミスか、または避けられていたら」という意味になる。
「ミスか、または避けられていたら」何をするかというと、その次の行。

```
    if (result.missed || result.evaded) { 
        this.createMiss(); 
    }...
```

`this.createMiss()`を呼ぶらしいです。どうもこの`this.createXXX`というのを呼ぶと、画面に少しの間ダメージを表す数字とかが出るっぽいですね。
下のelseとかも眺めると、たぶん以下みたいになってるんじゃないでしょうか。

| 関数名 | 役割 |
| ---- | ---- |
| this.createMiss() | 「ミス」って表示する |
| this.createDigits(0, 「何かの数字」) | HPダメージを表す数字を出す |
| this.createDigits(2, 「何かの数字」) | MPダメージを表す数字を出す |

Digitsというのは「数字」って意味です。だから12とか8とかとにかく数字が出るのでしょう。
0でHPダメージ、2でMPダメージらしいので、じゃあ1はなんだろう？とか思ってしまう。回復？分からん。まぁどうでもいい。

さて、それを踏まえてelse ifを見てみる。


```
    if (result.missed || result.evaded) { 
        this.createMiss(); 
    } else if (result.hpAffected) { 
        this.createDigits(0, result.hpDamage); 
    }
```

result.hpAffectedというので、affectedという単語が出てきますね。これは「影響がある」みたいな意味で、ようするにHPが減ったりするような出来事だったのか？という事だと思います。
たぶん回復の時にも成立しちゃいそうだけど。

このシリーズの読者は算数で挫折したのは知ってるのだけど、英語はどの位分かるのだろう？
affectedくらい余裕？

まあよいとして、HPに影響がある事だったら、このresult.hpDamageに入っている数字を表示するっぽいですね。ここに今回の攻撃でのダメージが入っているのでしょう。

次のelse ifを見るとこうなっています。

```
    } else if (result.hpAffected) { 
        this.createDigits(0, result.hpDamage); 
    } else if (target.isAlive() && result.mpDamage !== 0) { 
        this.createDigits(2, result.mpDamage); 
    } 
```

else ifの所だけ抜き出すと、`else if (target.isAlive() && result.mpDamage !== 0) { ` ですね。

ここで`&&`というのが出てきます。これはその左と右の「どちらもOKなら」という意味になります。
片方だけではダメで両方必要です。

で、aliveというのは生きている、という意味ですね。isAliveで生きている。

これで、「モンスターがまだ生きている」というのと、「result.mpDamageがゼロ以外の値」という意味になります。

そういえば`!==`もやってなかったか。`!==`は`!=`と同じような意味なので、`!=`だけ解説します（使う時もこちらでOK）。
`!=`は左と右が「等しく無い」という意味です。
この場合は

- result.mpDamage 
- 0

が等しく無い、という意味ですね。この辺はたぶんツクールの条件分岐にもあると思うので、`!=`という記号だけ覚えれば難しくは無いんじゃないでしょうか。

さて、以上を合わせると、

`「モンスターがまだ生きている」というのと、「result.mpDamageがゼロ以外の値」の両方が成り立っていたら`という意味になります。

死んだ状態でmpDamageってどういう状況なんでしょうね。たぶん何かあるんだと思いますがツクールMV素人の自分にはさっぱりです。

以上を全部合わせると、以下のコードは

```
    if (result.missed || result.evaded) { 
        this.createMiss(); 
    } else if (result.hpAffected) { 
        this.createDigits(0, result.hpDamage); 
    } else if (target.isAlive() && result.mpDamage !== 0) { 
        this.createDigits(2, result.mpDamage); 
    } 
```

以下みたいな意味になります。

```
    if (ミスか避けてたら) { 
        ミスって出す; 
    } else if (HPが今回の攻撃で変化してたら) { 
        result.hpDamageの数字を効果0で表示（たぶん赤で） 
    } else if (モンスターが生きてて、MPダメージがあれば) { 
        result.mpDamageの数字を効果2で表示
    } 
```

効果0とか効果2がどういう表示かは自分は知らないですが、読者のみなさんは知ってるでしょう。


### 本題の所も一応読む

ここまで分かると肝心のプラグインのコードはむしろ説明は要らないのでは？一応見ておきます。
以下の最後のif文ですね。

```
Sprite_Damage.prototype.setup = function(target) { 
    var result = target.result(); 
    if (result.missed || result.evaded) { 
        this.createMiss(); 
    } else if (result.hpAffected) { 
        this.createDigits(0, result.hpDamage); 
    } else if (target.isAlive() && result.mpDamage !== 0) { 
        this.createDigits(2, result.mpDamage); 
    } 
    if (result.critical) { 
        this.setupCriticalEffect(); 
    } 
};
```

抜き出すと

```
    if (result.critical) { 
        this.setupCriticalEffect(); 
    } 
```

クリティカルだったら、クリティカルエフェクトを作るって意味のようです。
クリティカルエフェクトはthis、つまりふわっと出る数字の方に用意されているみたいですね。

一方でモンスター側をいじる事も出来るでしょう。それがこのプラグインで行う変更、つまり、

`target.startAnimation(37, false, 0);`という行を追加する、という奴ですね。

```
    if (result.critical) { 
        target.startAnimation(37, false, 0); 
        this.setupCriticalEffect(); 
    }
```

targetというのはモンスターを表していたので、このモンスターに37番のアニメーションを開始するみたいです。falseと0の意味は知りません。
こういう時は真似しときましょう。

最後に全体のコードを再掲しておきます。


```
Sprite_Damage.prototype.setup = function(target) { 
    var result = target.result(); 
    if (result.missed || result.evaded) { 
        this.createMiss(); 
    } else if (result.hpAffected) { 
        this.createDigits(0, result.hpDamage); 
    } else if (target.isAlive() && result.mpDamage !== 0) { 
        this.createDigits(2, result.mpDamage); 
    } 
    if (result.critical) { 
        target.startAnimation(37, false, 0); 
        this.setupCriticalEffect(); 
    } 
};
```

どうですか？この位なら大した事無く無いですか？


# もっとif文を本格的に

今回`||`と`&&`が出てきたので、良い機会なのでif文のこの辺の話をしておきます。
[第四回](ch04.md)でif文についてやりましたが、必要最小限な事しかやっていませんでした。
基本さえ分かれば普段ツクール使ってれば、必要になった時に調べればだいたい分かるだろう、という事で。

でもそろそろ経験を積んだので、この辺をまとめてしっかりやっておいてもいい頃かもしれないので一通り解説しておきます。


## trueとfalse

さて、以下のようなif文があったとします。

<div id="ex1">
<input type="button" value="実行" />
<textarea>
var niwatori = 1;

if(niwatori == 1) {
    MessageBox.show("コケー");
}</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
今となってはゾーマ倒したパーティでラーミアで移動してたら偶然スライムつむりにあった程度の難易度ですね（分かりにくい比喩）。

さて、このifの所のかっこ、上のコードだと`if(niwatori == 1) {`のうちの`(niwatori == 1)`の部分ですが、
実はここだけを実行する事が出来ます。

そしてこのifの所のかっこの所を実行すると、trueかfalseのどちらかの値になります。
というより、trueかfalseのどちらかになる物しかif文には書けない決まりになっているのです。

言葉にすると分かりにくいので実際に動かしてみましょう。例えば以下みたいなコードです。

<div id="ex2">
<input type="button" value="実行" />
<textarea>
var niwatori = 1;

MessageBox.show(niwatori==1);</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
これを実行すると`true`と表示されたと思います。
結果を一旦変数に入れる事も出来ます。

<div id="ex3">
<input type="button" value="実行" />
<textarea>
var niwatori = 1;

var kekka = (niwatori==1);
MessageBox.show(kekka);</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
上のコードで`var kekka = (niwatori==1);`とかっこに入れてますが、これは必須ではありません。
ただイコールがいっぱい入って来ると、どのイコールが何なのか良く分からなkなって来るので、ここにかっこをつけるのは良い書き方です。

さて、とにかく、`==`の左と右に何か数字とか文字を置いておくと、trueかfalseのどちらかになるのです。

そしてifは、実はtrueだったらそのすぐ下を、falseだったらelse側を実行する、という機能しか持ってないのです。
`niwatori == 1`とか、`name=="あじゃ"`とか、`saikoro > 5`とかは全部trueかfalseのどちらかの値になり、
if文はかっこの中がどういう風に書かれているかは一切気にしません。実行してtrueかfalseの値にして、その結果だけを気にします。

難しいですか？でもこの辺の説明はそんな重要じゃないのでおまけでやってるんで、分からなくても気にしなくてOKです。
だいたいここは言語による所で、JavaScriptがたまたまそういう言語だ、というだけなので。

### ==以外の良く使う

これまで`==`と`<`くらいしか出てきませんでしたが、だいたいツクールの条件分岐とかにありそうなのは全部あります。

| 記号 | 意味 |
| ---- | ---- |
| `==` | 左と右が同じだとtrue |
| `!=` | 左と右が別だとtrue |
| `<` | 左の方が右より小さいとtrue |
| `<=` | 左の方が右より小さいとtrue、でも同じでもtrue |
| `>` | 左の方が大きいとtrue |
| `>=` | だいたい分かるでしょう |

あと、trueだったらfalseに、falseだったらtrueにする、`!`というのもあります。

例えば `!(niwatori == 1)`とか書けます。この辺はJavaScript関連のサイトに普通に細かい解説があるので、ちゃんと知りたければ[MDN：比較演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)などを読めば良いでしょう（ただしこれはもう上級者向けです）。

簡単に例だけ示しておきましょう。

<div id="ex4">
<input type="button" value="実行" />
<textarea>
var saikoro = 3;

MessageBox.show(saikoro == 3);
MessageBox.show(saikoro == 4);
MessageBox.show(saikoro != 3);
MessageBox.show(saikoro != 4);
MessageBox.show("区切り！");

MessageBox.show(saikoro < 4);
MessageBox.show(saikoro < 2);
MessageBox.show(saikoro < 3);
MessageBox.show("区切り！");

MessageBox.show(saikoro <= 3);
MessageBox.show(saikoro <= 2);
MessageBox.show(!(saikoro != 3));</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
この辺はだいたいツクールと一緒でしょ？知らないけど。

### ===と!==というのもある（けどあんま重要じゃない）

JavaSCriptでは、`==`と`!=`と似たような物として、`===`と`!==`というものがあります。
ほとんど`===`と`==`は同じ物で、`!=`と`!==`は同じ物なのですが、文字と数字を比べる時などに違いがでます。

一応違いが出るケースを簡単に作っておきます。

<div id="ex5">
<input type="button" value="実行" />
<textarea>

// 同じ
MessageBox.show(3== 3);
MessageBox.show(3=== 3);

// 違う
MessageBox.show(3== "3");
MessageBox.show(3=== "3");</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
違うのはこういう数字と文字で偶然同じ奴を比べる場合だけで、こんなことは滅多にないのでどっちでもいいのです。
特に、ツクールで自分でゲーム作っててこの違いが出るケースは無いはずです。

だいたいは`===`の方が望ましい動作をするのでこっちの方が良い、という人も居ますが、どうせ起こらないケースなのでどっちでも良い。
CW警察みたいなもんです。警察はほっとくに尽きる。

そしてJavaScriptと類似の言語では普通`===`は無いので、このシリーズの趣旨からすると、自分は`==`の方だけを使う方が良いと思っています。
（例えばSecond LifeのLSLには`==`しかありません）。
という事でこのシリーズでは`===`は説明してきませんでした。

でも他人のコードを読む時は使っている場合もあるので簡単にここで説明しておきます。


### 「どちらか（||）」または「どちらも（&&）」

JavaScriptでは




## 難しすぎてボツにした解読手順

ここまでの解説をどうやって自分が考えたのかの仕組みを最初書いていたのだけれど、さすがに上級者向けの内容だろう、という事でボツにしました。
でもせっかくなので途中までですが残しておきます。興味があったら読んでみてください（読まなくてもいいです）。

### 名前からいろいろ推測する

まず最初にこのコードから以下の三つが何かを推測する必要があります。

1. Sprite_Damage.prototype（およびthis）とは何か
2. targetとは何か
3. resultとは何か

これは本当に野生の勘で「たぶんこうだ！」ってひらめくしかありません。

で、私が先程のコードをうーん、と眺めて思った予想は、

1. Sprite_Damageは、攻撃が当たった時とかに少しの間出るダメージの数字（ミスの場合はミス、と出たり、回復だったら緑色の数字だったりするでしょう）
2. targetはこの数字が出る対象となるモンスター（プレーヤーも来るかも。このコードからは分からない）
3. resultは今回の攻撃なりなんなりの、この数字を出すきっかけとなった事

というあたりです。

この辺の予想する力は経験がものを言う所で、最初からコード眺めるだけでここまで分かるほど世の中は甘く無いと思います。
その辺は解説記事などを参考にしたり実際に動かしたりいろいろやって頑張りましょう。

で、コナン並みの推理力を誇る私の推測が正しいとして先に進みます。

### コードを順番に読んで行く

まずはこの関数が何をする所なのかを名前から予想する。

```
Sprite_Damage.prototype.setup = function(target) { 
```

攻撃とかが当たった時とかにすーっとちょっと出る数字をsetup、つまり準備する関数なんでしょうね。
これから数字がふわっと出るのだと思います。

次に行きましょう。

```
    var result = target.result(); 
    if (result.missed || result.evaded) { 
        this.createMiss(); 
    } else if (result.hpAffected) { 
        this.createDigits(0, result.hpDamage); 
    } else if (target.isAlive() && result.mpDamage !== 0) { 
        this.createDigits(2, result.mpDamage); 
    } 
```

まずは一行目に注目します。

targetというのはこの数字を出す対象となるモンスターを表す辞書ですかね。（ここは少し違うかも、自信は無しだがたぶん大きくは違わない）。

で、この`target.result()`というので、今回のアクションの結果が取り出せるっぽい？

この結果を見て、ifが三つ並んでいて、それぞれ、以下の三つの場合の処理をやってそう？

1. ミスの場合（画面に「Miss」とか出すのでしょう）
2. HPが減るダメージの場合（赤い文字で4とか出すのでしょう）
3. MPが減る場合の処理（きっと違う色、緑とかで出すんですかね）

この辺の実際に何色で何が出るか、とかはむしろ普段ツクールMV触ってる人の方が良く推測できると思います。

さて、これらの推測がどこから出てるかを考えるべく、上のif文の中身だけをまず並べてみましょう。

1. `this.createMiss(); `
2. `this.createDigits(0, result.hpDamage);`
3. `this.createDigits(2, result.mpDamage);`

thisはそもそも、`Sprite_Damage.prototyp`的な何かが入っているはずで、これは攻撃が当たった時とかにふわっと一瞬出る数字でした。

ふわっと出る数字を表す辞書の、`createMiss()`というのを呼ぶと、たぶんミスって感じの数字が出そうな気がします。
二番目はカッコの二番目にhpDamageと書いてあるので、HPのダメージっぽい。
三番目はmpDamageと書いてあるのでMPが減る攻撃っぽい。不思議な踊りとか？

さて、すると、、、難しすぎるのでボツ


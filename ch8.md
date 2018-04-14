---
title: "第八回: 関数その2 関数からもらうもの"
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


  setupAllREPL2(9);
  setupAllQuestionsWithScnario(questions);
}
</script>


前回は、関数という物を`作って`そして`使う`方法を見てきました。

第八回では、この関数から結果を`もらう`事について説明していきます。
JavaScriptの用語では`return`の説明となります。


# これまで（実は）出てきていた関数たち

突然ですが、実はこれまで、既に幾つかの関数が出てきていました。具体的には、

1. MessageBox.show()
2. MessageBox.yesNo()
3. Math.randomInt()

の3つは関数です。
なんと、既に関数は使っていたのですね。

そしてこれらは実は、文字や数字を`渡したり`、結果を`もらったり`してました。
第八回や第九回のテーマは、実は既にやっていた事なのです。

これまでぼやかして使っていたこれらの事のうち、第八回に関わる事を真面目に解説しなおしてみます。


## MessageBoxやMathは、実は辞書だった！

さらに突然ですが、`MessageBox`と`Math`は、実は`辞書`です。`MessageBox`という辞書に、showとかyesNoをキーとして関数が入っています。

百本ノックでやったテーブルで書くとこんな感じです。


**MessageBox**

|キー    | 要素       |
|-----  | ---------- |
| show  | 何かの関数1 |
| yesNo | 何かの関数2 |

なんとなく[第六回](ch6.md)でやった辞書に見えてきませんか？見えてきません？そうですか(´・ω・｀)

とにかく、`MessageBox`は辞書なのです。
で、`show`とか`yesNo`はキーなのです。

辞書なので、`MessageBox["show"]`とやると中身が取り出せるのですが、
キーがローマ字の時は`MessageBox.show`と取り出す事も出来る、
なんていうヘンテコな機能がある事をこそっと[第6回](ch6.md)でやっています。

当時はなんだか分からなかったと思いますが、実はこのための布石だったのです（という事で6章の時点では意味が分からなかったかも。暇なら読み直してみてね！）。

つまり、以下の2つは同じものです。

- `MessageBox.show`
- `MessageBox["show"]`

だから、以下のコード

```
MessageBox.show("むぇーー");
```

は、実はこうも書けます。

```
MessageBox["show"]("むぇーー");
```

一応やってみましょう。

<div id="ex1">
<input type="button" value="実行" />
<textarea>
MessageBox["show"]("むぇーー");</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
実行すると、`MessageBox.show("むぇーー");`と書くのと同じ結果になったと思います。

最近のJavaScriptでは特に、`環境`は関連する関数をグループに分けて、それぞれ辞書に入れて提供してくるのが一般的です。
例えば`MessageBox`にはユーザーに何かを見せたり質問したりする関数が入っている、とか、
`Math`には乱数とか計算にまつわる関数が入っている、とかそういう事ですね。

このシリーズでもその傾向に合わせて、関数は辞書に入れて提供しています。

**なんで`.`でも要素が取り出せるのか？の勝手な予想**  
JavaScriptの辞書は、キーがローマ字っぽい時だけは`.`でも取り出せる、という機能があります。
これは無くても同じ事が`["show"]`とかで出来るので、不要な感じがしますよね。  
なんでこんな中途半端な機能があるのか？  
　  
これは私の勝手な予想ですが、たぶん見た目を`Java`というプログラミング言語に似せる為だと思います。
Javaは辞書とは全く別の仕組みで、`MessageBox.show("むぇーー");`というような書き方でメッセージを表示する言語です。  
これと見た目の上では似た感じにする為、辞書から要素を取り出すのに、ローマ字っぽいキーの時は`.`でも取り出せるようにしよう、というヘンテコな機能がついたのだと思います。  
　  
勉強する側としてはあまり深く考えず、なんか大人の事情で変な機能になってしまったんだな、くらいに思っておけばいいと思います。  
私も「当時のNetscape社の頭の硬い上司を説得する為に、
見た目はJava言語っぽいですよ〜と嘘をつかなきゃいけなかったので、この`.`でも取り出せる、とか良く分からない事があるんだなぁ」くらいに思ってますので。  
実際の所は本当かどうかは知りませんけどね。
{: .column}



## 結果を`もらう`

`Math.randomInt(5)`や、`MessageBox.yesNo`などは、結果を変数に受け取る事が出来ました。
例えば以下みたいなコードが[第五回](ch5.md)ではありました。

<div id="ex2">
<input type="button" value="実行" />
<textarea>
var doreka = Math.randomInt(5);
MessageBox.show(doreka);</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
このコードで、0から4までのどれかの数字が`doreka`に入ります。

そのうち、乱数を作って変数に入れる所、つまり以下のコード

```
var doreka = Math.randomInt(5);
```

は、実は関数から結果を`もらう`コードとなっています。
`Math.randomInt`の結果は、こうやって`=`の右に書く事で`もらう`事が出来るのです。

これが第八回のテーマ、`結果をもらう`です。

`MessageBox.yesNo`も同様です。

<div id="ex3">
<input type="button" value="実行" />
<textarea>

// 結果をtumetaiにもらってる
var tumetai = MessageBox.yesNo("こちんこちん？", "はい", "いいえ");

if(tumetai == 1) {
    MessageBox.show("麦茶！");
} else {
    MessageBox.show("こーしー");
}</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
この例では、`tumetai`という変数に結果を入れています。
`MessageBox.yesNo`から`もらった`結果です。

```
var tumetai = MessageBox.yesNo("こちんこちん？", "はい", "いいえ");
```

このように、関数を`使う`コードを`=`の右側に書く事で、結果を`もらう`事が出来ます。


### 関数を使う側と作る側の対応関係


これまでやってきたコードを元に、今回扱う内容である、結果を`もらう`方法を見てきました。  
これらは関数を`使う`側の話です。

一方で、何かを`もらう`為には、くれる人が必要です。
Amazonで欲しい物リストを晒しても、くれる人が居ないと`もらえ`ないですよね？

関数でも同様に、使う側が`もらう`為には、作る側が`返す`必要があります。
表にすると以下のようになります。


| 使う側              | 作る側                 |
| -----------------  | ------------------    |
| 結果をもらう        |  結果を返す  |


つまり関数を`作る`側では、結果を`返す`必要があります。

この`結果をもらう` - `結果を返す`という組みについて以下では解説していきますが、いつもそれが「使う側」の話か「作る側」の話か、注意して読んでいってください。

以下では改めて、最初から`結果をもらう`という事はどういう事かという話と、
それに対応する`結果を返す`方法を見ていきます。

# 結果を返し、返ってきた結果をもらう

関数は`中身`を実行したあと、`結果を返す`事が出来ます。
使う側は、返ってきた結果を`もらって`、その結果に応じて処理が行なえます。言葉にするとややこしいですが、コードはそんな難しくも無い。

もらう側はこれまで見てきた所ですが、ここで改めてちゃんと説明します。

結果を返すのは今回新しい所ですね。
関数から結果を返す方法もここで見ていきます。

### TODO: 図

## 結果をもらう

関数は、`lucy();`とか、`naku();`などという風にすると`使う`事が出来る、
という話を前回しました。

結果を受け取るには、この

```
lucy();
```

というコードを、以下のように変更します。

```
var kekka = lucy();
```

このように、関数を`使う`これまでのコードの左に、`var kekka = `という風に書くと、
`lucy()`の結果を`もらう`事が出来ます。（なお、プログラム用語では`受け取る`といいます。ただ今回はちょっとした事情により`もらう`で統一します）

このように関数を`使う`時に、必要ならその結果を`もらう`事が出来るのです。



### 課題：6が多めに出るイカサマサイコロを振って、結果をもらえ

こちらが、6の目が多めに出るikasama_saikoroという関数を用意しました。
この関数を`使って`、結果を`もらって`ください。

ヒント: 関数を`使う`のは、`ikasama_saikoro();`という風にするのでした。


<script>
var qobj = {
    id: "q1",
    scenarios: [],
    sampleNum: 200
}




qobj.scenarios.push({
    setup: ()=> {},
    verify: (intp) => {
        if(scenarioLogs.length == 0 || scenarioLogs[0].name != 'alert') {
            return "結果が表示されていません。MessageBox.show使ってね。";
        }

        var counts = countElem(scenarioLogs.map((res)=> res.val));
        var resKeys = Object.keys(counts);
        if(resKeys.length != 6) {
            return "結果が6通りじゃありません。";
        }
        return true;  
    }
});
  questions.push(qobj);
 </script>


<div id="q1">
    <input type="button" value="実行" />
    <textarea>
// この関数はこのままで
var ikasama_saikoro = function() {
    var num = Math.randomInt(12);
    if(num < 5) {
        return num+1;
    }
    return 6;
};

// TODO: 以下の行を書き換えて、ikasama_saikoro関数の結果を受け取れ
var kekka = 0;

// 以下はいじらないでください。
MessageBox.show(kekka);</textarea>
    <b>結果:</b> <span class="console"></span><br>
    <span class="result"></span><br>
    <input type="button" value="答えを見る" />
    <div class="answer hideanswer">
答え:<br>
var kekka = ikasama_saikoro();<br>
    </div>        
</div>
  
　  
結果を受け取るコード自体はそれほど難しい事も無いんじゃないでしょうか。

なお、ikasama_saikoroのコードが何をやっているか、想像つきますか？
`return`はあとでやりますが、結果を`返す`という命令です。そして`if(num < 5)`は「numが5より小さかったら」という意味になります。

さて、全部合わせるとどういう意味になると思いますか？（あとで簡単に解説してます）


## 関数から結果を返す

さて、関数から結果を`もらう`為には、関数を作る時に結果を`返す`必要があります。

結果を`返す`には、`return`という物を使います。

関数の中で、例えば以下のように、

```
return 3;
```

とすると3を`返し`、また、以下のようにすると、

```
return "むぇーー";
```

`"むぇーー"`という文字を`返します`。

つまり、awaという関数の中でreturnするとすると、以下のようなコードになります。

```
var awa = function() {
   return "むぇーー";
};
```

実際に実行してみましょう。

<div id="ex4">
<input type="button" value="実行" />
<textarea>

var awa = function() {
   // "むぇーー"という文字を返す。
   return "むぇーー";
};

// 関数を使って、結果を受け取る。
var kekka = awa();

MessageBox.show(kekka);</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
こうして、結果を`返す`関数を、`return`を使って作る事が出来ます。


### 課題："蕎麦充した"と返せ

ただ決まった文字を返すだけの関数を作ってみましょう。
返す文字は`"蕎麦充した"`にします。

`"蕎麦充した"`と`返す`だけの関数を作って下さい。

<script>
var qobj = {
    id: "q2",
    scenarios: []
}


qobj.scenarios.push({
    setup: ()=> {},
    verify: (intp) => {
        if(scenarioLogs.length == 0 || scenarioLogs[0].name != 'alert') {
          return "結果が表示されていません。MessageBox.show使ってね。";
        }
        var actual = scenarioLogs[0].val;
        if(actual != "蕎麦充した") {
          return "表示されたメッセージが違います。";
        }
        return true;
    }
});
  questions.push(qobj);
 </script>


<div id="q2">
    <input type="button" value="実行" />
    <textarea>
// TODO: 以下で"蕎麦充した"と返せ
var lucy = function() {
};


var kekka = lucy();
MessageBox.show(kekka);
</textarea>
    <b>結果:</b> <span class="console"></span><br>
    <span class="result"></span><br>
    <input type="button" value="答えを見る" />
    <div class="answer hideanswer">
答え:<br>
var lucy = function() { <br>
&nbsp;&nbsp;&nbsp;&nbsp;return "蕎麦充した";<br>
}<br>
    </div>        
</div>
  
　  
もう一つ同じような問題をやってみましょう。

### 課題：いつも6を返すサイコロを作れ

前問で、ただ決まった文字を`返す`関数を作りました。
ただ数字を`返す`関数も似たような物です。

いつも6を`返す`、イカサマサイコロを作ってみましょう。

<script>
var qobj = {
    id: "q3",
    scenarios: []
}


qobj.scenarios.push({
    setup: ()=> {},
    verify: (intp) => {
        if(scenarioLogs.length == 0 || scenarioLogs[0].name != 'alert') {
          return "結果が表示されていません。MessageBox.show使ってね。";
        }
        var actual = scenarioLogs[0].val;
        if(actual != 6) {
          return "6以外が返ってきました。いつも6を返してね。";
        }
        return true;
    }
});
  questions.push(qobj);
 </script>


<div id="q3">
    <input type="button" value="実行" />
    <textarea>
// TODO: 以下を、いつも6を返す関数に変更せよ
var ikasama_saikoro = 0;


// 以下はいじらないでください。
var kekka = ikasama_saikoro();
MessageBox.show(kekka);</textarea>
    <b>結果:</b> <span class="console"></span><br>
    <span class="result"></span><br>
    <input type="button" value="答えを見る" />
    <div class="answer hideanswer">
答え:<br>
var ikasama_saikoro = function() { <br>
&nbsp;&nbsp;&nbsp;&nbsp;return 6;<br>
}<br>
    </div>        
</div>
  
　  
これでは決まった値を返すだけなのでありがたみが無いですね。
ですがもう少し複雑な例に進む前に、何故こんな物があるのか？という理由を考えてみたいと思います。

# 何故returnなんて物があるのか？

ここまで`返す`というのは`return`で出来る、という事を見てきました。
第八回の内容は実質これだけなのですが、これが何を意味しているのか、
というのがいまいちここまでの説明では分かりにくいと思います。

という事で、ここでは「なんで」returnなんて物を作ったのか、というその必要性について考えてみたいと思います。


## 何故関数なんて物があるのか？

そもそもに`return`の必要性は、関数で何をやりたいのか？という話になります。
何のために関数なんて物があるの？別にそんなの無しで普通にこれまで通りコード書いていけばいいじゃない！？と思っている事でしょう。

`return`まで説明したので、この疑問について、それなりに考える事が出来るようになりました。


### プログラムは、すぐ理解出来ないくらい複雑になる

人間の理解力には個人差があります。
結構複雑な物を考えられる人も居れば、ちょっと複雑になっちゃうだけでわからなくなっちゃう人も居ます。

ですが、どんなに理解力が凄い人でも分からないくらい、
プログラムはすぐに複雑になってしまいます。
なので個人差は大した事無いのです。
結局ちょっとコードが複雑になっていくと、人類には理解出来ないくらい複雑になってしまうのです。

そこでこの複雑になっていくプログラムを、なんとか理解出来るように出来ないか？という事で考えられたのが関数という物です。


### プログラムを分割して理解する

プログラムはすぐ複雑になってやべーよ、と人々が悩んでいた時に、ダイクストラさんという人が幾つかの作戦を考えつきました。
そのうちの一つが、大きなプログラムを分割して、幾つかのより小さな問題に分け、
さらにそれらの問題の一つひとつをより小さな問題に分け、、、という事を繰り返して、
一個一個の問題が凄く簡単な位小さくなるまで分割して解けばいいんじゃないか、といいました。

このプログラムを分割する為の仕組みが関数です。


### TODO: 図

これは実例で説明したいのですが、実例で説明すると例を凄く複雑にしないと良く分からない、という問題があります。
複雑だから分割したくなるので、複雑じゃないとありがたみが分かりにくいのです。

でも複雑な例を作るのは私も大変だし理解するのも大変なので、ここはちょっと読んでいる人の想像力に期待して進めます。


### 関数はコードを忘れる為にある

関数というのは、「関数の中身を実行出来るようにする物」という話を第七回でしました。

これはその通りなのですが、実は関数は、この「関数の中身」を、一度作ったら「忘れる」事が大切なのです。
「考えない」と言ってもいいです。
ちょっと例を考えましょう。

もう見慣れた、こちんこちんって聞いて麦茶かこーしーか表示する、というコードです。

<div id="ex5">
<input type="button" value="実行" />
<textarea>
var tumetai = MessageBox.yesNo("こちんこちん？", "はい", "いいえ");
if(tumetai == 1) {
   MessageBox.show("麦茶！");
} else {
   MessageBox.show("こーしー");
}</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
さて、これを関数にしたとします。

<div id="ex6">
<input type="button" value="実行" />
<textarea>
var lucy = function() {
    var tumetai = MessageBox.yesNo("こちんこちん？", "はい", "いいえ");
    if(tumetai == 1) {
       MessageBox.show("麦茶！");
    } else {
       MessageBox.show("こーしー");
    }
}

lucy();</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
同じやん、というと同じなんですが、このコードを心の中で2つに分けるのです。
関数を`作る`側と`使う`側です。

まず作る側は以下。

```
var lucy = function() {
    var tumetai = MessageBox.yesNo("こちんこちん？", "はい", "いいえ");
    if(tumetai == 1) {
       MessageBox.show("麦茶！");
    } else {
       MessageBox.show("こーしー");
    }
}
```

で、使う側が以下。

```
lucy();
```

で、この2つで、心を切り替える、というのが関数の奥義です。
これが第10回くらいまでやっていく事になる関数の、難しさのほぼ全てです。

どう切り替えるか？というと、まず作る側のコードを見て、何をやってるのか理解します。


***作る時視点***

```
var lucy = function() {
    var tumetai = MessageBox.yesNo("こちんこちん？", "はい", "いいえ");
    if(tumetai == 1) {
       MessageBox.show("麦茶！");
    } else {
       MessageBox.show("こーしー");
    }
}
```

ふんふん、「こちんこちん？」って聞いて、「はい」だったら`麦茶！`って出して、「いいえ」だったら`こーしー`って出すんだな、と理解します。

ここまでは関数じゃない時とそんなに変わりません。

関数が違うのは、「これを一言でまとめるとなんて言えるか？」と考える事です。
例えば「lucyっぽいやりとりをする物」とまとめたとしましょう。

関数を使う時には、このまとめた物だけで考えて、そこより先のことは「考えない」というのが大切です。

やってみましょう。


***使う側の視点***

使う側のコードは以下です。

```
lucy();
```

ふむふむ、これは`lucy`という関数を`使う`んだな、という事までは分かります。
ですが、使う側のコードだけでは`lucy()`が何をするのかはわかりません。

本当は自分で書いたから知っているんですが、知らないフリをするのです。
我々は使う時には、関数が実際中で何をやっているのかは「あまり知らない」。

ただ、全然知らない訳でも無く、「lucyっぽいやりとりをする」って事だけは知っている、という事にするのです。
そこで使う側のコード、つまりこのコードは、

```
lucy();
```

「lucyっぽいやりとりをする関数を使っている」となり、つまり「lucyっぽいやりとりをやっている」ということになります。
lucyっぽいやりとりというのが何かは、`使う側の視点`では分からない、という事にしておくのです。

この、関数を`使う`時に中身を忘れる事で頭から追い出して、`使う`側のコードに集中する事で一度に考えないといけない量を減らす、というのが、関数にプログラムを分割する奥義となります。


### セーラームーンとプリキュア

これは例えるならセーラームーンやプリキュアの変身前と変身後に似ています。
視聴者にとっては変身する前もした後もほとんど変わらんやん、
と思うのですが、作中のストーリーでは正体が分からない、という前提で進みますよね。
で、見ている側が、このお約束をちゃんと理解して、
正体が分かっていない、という事を意識して見ていかないと、たまにストーリーが分からなくなる事があります。

この、「見るからに丸わかりで、むしろほとんど変わって無くない？」という時でも、
作中では分かっていないという前提で見るには、意識的にそういう注意が必要と思います。
「あれ？こいつは正体知っているって設定なんだっけ？」とか考える必要ありますよね。

本当は知っているはずの事を、意識的に知らないという前提で考えないとストーリーが良くわからなくなる。

関数もそれに似ています。本当は中身知っているんだけど、知らないフリをして、これはXXXをしてくれる関数だ、と概要だけ知っているフリをして、`使う`側のコードの方に集中して考えるのです。


### 中身を忘れやすい関数は良い関数

プログラムは、同じ事をするのに複数の書き方があります。
関数を作る時には、このいろいろな書き方のうち、「ここは忘れて概要だけにしても大丈夫だな」という度合いが高い切り口になるのが良い関数となり、
そういう風に考えて書いたコードが良いコードになります。

あとで具体例とともにもう一度この話はします。


## returnはやりとりをする為にある

ここまで、関数は何のためにあるのか、という話をしてきました。
それを踏まえて、じゃあ`return`はなんの為にあるんだ？という話をします。

これは次の第九回の`arguments`も同じ話になります。

関数を使う時は、中身は考えない、という話をしてきました。
考えないけど「だいたいこんな感じのことをやってくれる」と考える。

この時に、「結論だけは教えて欲しい」ということが良くあります。

例えばイカサマサイコロの例を考えましょう。

こんなコードがあったといます。


<div id="ex7">
<input type="button" value="実行" />
<textarea>
var ikasama_saikoro = function() {
    var num = Math.randomInt(12);
    if(num < 5) {
        return num+1;
    }
    return 6;
};

var kekka = ikasama_saikoro();
MessageBox.show("結果は" + kekka + "です");</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
ぎゃー分からん！と思う前に、まずは関数を`使う`側だけを見ます。
難しいコードは「分割」して考えるのです。
コツは全部を一気に考えずに、まず`使う`側だけで予想するのです。

関数`ikasama_saikoro()`を使っているのは以下の部分になります。

```
var kekka = ikasama_saikoro();
MessageBox.show("結果は" + kekka + "です");
```

ここで、｀ikasama_saikoro`の中身は考えません。
ただ、ぼんやりと、「6の目が出やすいサイコロの目を返す」とだけ思っておくのです。

そうすればここの部分は、ikasama_saikoroの中がどうなっているか分からなくても理解出来るはずです。
（なんか文字の連結がありますが、それは[第二回](ch2.md)を復習してください…）

この、関数の中身を考えない、というのが関数の奥義になります。


### 中で何やってるかはどうでもいいが、結果だけ欲しい

さて、この場合。
`使う`側として中を考えないのはいいのだけど、サイコロの目は欲しいのです。

このように「中で何をやっているかは知らんけど、結果だけ欲しい」ということは関数には良くあります。
これを実現する仕組みが`return`なのです。

`return`はいつも関数を`作る側`でしか使えないのですが、`使う`側のためにやる物です。

たとえばイカサマサイコロは以下のコードでした。

```
var ikasama_saikoro = function() {
    var num = Math.randomInt(12);
    if(num < 5) {
        return num+1;
    }
    return 6;
};
```

この時、`return 6`とか`return num+1`とかは、使う側の為に用意してやる物な訳です。
使う側の視点だと、「なんだか知らないけど結果だけちょうだい！」と思っていて、
関数を作る側は、そのお望みに合せる。

そこでここではサイコロの目を返している訳ですね。
というのは、`使う`側はそれを欲しがっているから。

このように`return`は、使っている側が欲しがっている物をあげる、という風に使う物です。

### タカビーなお嬢様とセバスチャン

もうひとつ関数の例を考えると、アニメとかでたまに出てくる金持ちでタカビーな感じのお嬢様キャラが似ています。
横にいつも執事のお爺さんがついていて、何か言いつけると「ははっ」とか言っていろいろ用意してくれる奴。
何故か名前はだいたいセバスチャンですよね。
お願いマイメロディでもセバスチャンでした。きんぎょ注意報では田中山でしょうか（あれは執事じゃないか）。

さて、ああいうお嬢様と執事のパターンでは、お嬢様は何か一言喋ります。
例えば

「サンドイッチ」

と言って手を出すと

「ははっ」

と言って持たせてくれる。
ある程度食べて喉が乾いたら、

「お茶」

と言って手を出すと

「ははっ」

と言って持たせてくれる。

これは非常に関数的です。

お嬢様はタカビーなので、セバスチャンがそのサンドイッチをどこから持ってきたのか、とかはどうでもいいのです。
購買で並んで買ったりしているとかは気にしないのです。

ただ、サンドイッチは欲しい。

セバスチャンとしては、お嬢様が欲しがっている物を手に向かって渡す訳です。
これは非常に`return`的です。

相手が欲しがっている物を予想して、相手がここに頂戴ね、と言っている場所に渡す。これが`return`です。
その為に財布の中に小銭は入っていたのか？とか、近くのコンビニはどこか？
とかいろいろ考えて買いに行ったりしている訳ですが、
そこらへんのことは別にお嬢様に伝える必要は無い。

お嬢様に渡す必要があるのは何か？というと`サンドイッチ`です。
ということで買ってくる為に必要な物は全部セバスチャンが使えば良いのですが、
サンドイッチだけは自分で食べてはいけません。
あくまで使ってる人に渡す必要があります。

これが`return`です。

この時に、お嬢様とセバスチャンを区別しないと、なんだか良くわからなくなる。
結局購買に行ってパンを食べてる隣のクラスメートと何が違うんだ？という話になる。

だからいつもお嬢様とセバスチャンは分けて考えないといけない。
で、お嬢様の気持ちで考える時は、セバスチャンはどうにかして必ずのぞみを叶えてくれる、
という前提で、自分のやりたいことを考える。

上のikasama_saikoroの話も一緒です。
お嬢様視点でいえば、

「イカサマサイコロ」

と言ったら、セバスチャンがどう実現するかはおいといて、サイコロの目で6が多いものが返ってくるのです。

で、セバスチャン側としては、財布の中に小銭は入ってたのか、ここから一番近いコンビニはどこか、
という風に乱数で0から11まで作ってみて、0から4までならこれに1を渡した物を返し、
それ以外なら全部6を買えそう、とかをいろいろ考える訳ですが、お嬢様にそれらを教える必要は無い。

ただ結果の6とか3とかの数字だけを`return`してやれば良い。

これが`return`です。


### イカサマサイコロを真面目に考える

本題とは関係無いのですが、読んでる人が気になってそうなので、これも真面目に説明しておきましょう。
第八回の内容とはあまり関係無いのですが。

例えば、1から6までのサイコロで、6がちょっと多めに出る物を作るとします。
何も考えずに作ると、以下のようになります。


<div id="ex8">
<input type="button" value="実行" />
<textarea>

var ransuu = Math.randomInt(12);

if(ransuu == 0) {
   MessageBox.show("1");
} else if (ransuu == 1) {
   MessageBox.show("2");
} else if (ransuu == 2 ) {
   MessageBox.show("3");
} else if (ransuu == 3) {
   MessageBox.show("4");
} else if (ransuu == 4) {
   MessageBox.show("5");
}  else if (ransuu == 5) {
   //  ここから下は全部同じ
   MessageBox.show("6");   
}  else if (ransuu == 6) {
   MessageBox.show("6");   
}  else if (ransuu == 7) {
   MessageBox.show("6");   
}  else if (ransuu == 8) {
   MessageBox.show("6");   
}  else if (ransuu == 9) {
   MessageBox.show("6");   
}  else if (ransuu == 10) {
   MessageBox.show("6");   
}  else if (ransuu == 11) {
   MessageBox.show("6");   
} </textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
なんかおんなじようなのがたくさん並ぶと、目がチカチカして良くわからなくなりますね。（なりません？）

これはransuuが0から11のうちどれかに応じて、4までならそれぞれの目を表示し、5より上は全部6と表示します。
なんで一つずれているかというと乱数は0から始まりますが、サイコロは普通0の目は無くて1の目からだからです。

ちょっと頭を使うと以下のようにも書けます。

<div id="ex9">
<input type="button" value="実行" />
<textarea>

var ransuu = Math.randomInt(12);

if(ransuu == 0) {
   MessageBox.show("1");
} else if (ransuu == 1) {
   MessageBox.show("2");
} else if (ransuu == 2 ) {
   MessageBox.show("3");
} else if (ransuu == 3) {
   MessageBox.show("4");
} else if (ransuu == 4) {
   MessageBox.show("5");
}  else { // ここがelse ifじゃないのに注意！
   MessageBox.show("6");   
}</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
こうすると、0からaaa







### 課題：1から6までの数字をランダムに返すサイコロを作れ

今度はちゃんと乱数を使って、1から6までランダムに`結果を返す`関数を作りましょう。
ヒントとしては、[第五回](ch5.md)の「課題: 6面サイコロを作れ」のあたりを参考にすると良いでしょう。

あと、第五回では変数名でsaikoroとしてましたが、今回は既に関数の名前がsaikoroなので違う名前の方が無難です（`rannsuu`とかにしましょうか）。

<script>
var qobj = {
    id: "q4",
    scenarios: [],
    sampleNum: 200
}


function verifyDice(intp, expects) {
  if(scenarioLogs.length == 0 || scenarioLogs[0].name != 'alert') {
    return "結果が表示されていません。MessageBox.show使ってね。";
  }

  var counts = countElem(scenarioLogs.map((res)=> res.val));
  var resKeys = Object.keys(counts);
  if(resKeys.length != expects.length) {
    if(resKeys.length < expects.length) {
      return "サイコロの目が" + resKeys.length +"個しかありません。足りない！";
    }else {
        return "サイコロの目が" + resKeys.length +"個もあります。多すぎ！";
    }
  }
  var checkKey = _verifyArrayEqualInternal(expects, resKeys);
  if(checkKey != true) {
    return checkKey + "の目がずっと出ません";
  }
  var enough = true;
  for(var i = 0; i < resKeys.length; i++) {
    if(counts[resKeys[i]] < 5) {
      return resKeys[i] + "の目が十分出てないです。";
    }
  }
  return true;  
}


qobj.scenarios.push({
    setup: ()=> {},
    verify: (intp) => verifyDice(intp, [1, 2, 3, 4, 5, 6])
});
  questions.push(qobj);
 </script>


<div id="q4">
    <input type="button" value="実行" />
    <textarea>
// TODO:以下を書き換えて、1から6の数字をランダムに返すようにせよ
var saikoro = function() {
};

// 以下はいじらないでください。
var kekka = saikoro();
MessageBox.show(kekka);</textarea>
    <b>結果:</b> <span class="console"></span><br>
    <span class="result"></span><br>
    <input type="button" value="答えを見る" />
    <div class="answer hideanswer">
答え:<br>
var saikoro = function() { <br>
&nbsp;&nbsp;&nbsp;&nbsp;var ransuu = Math.randomInt(6);<br>
&nbsp;&nbsp;&nbsp;&nbsp;return ransuu+1;<br>
&nbsp;&nbsp;&nbsp;&nbsp;// 分かるなら return Math.randomInt(6)+1;でもいいです。<br>
}<br>
    </div>        
</div>
  
　  
ちょっとこの問題は難しいかもしれませんね。
この辺まで来ると普通のプログラマという感じ。

### returnすると、そこから先は実行されない

さて、ここまで`return`の説明をしてきましたが、もう一つ説明してない事があります。
それは、`return`は結果を`返す`だけじゃなくて、そこで関数の実行が終わる、という事です。

例えば、以下のコードを実行しても、`"むぇーー"`とは表示されません。


<div id="ex5">
<input type="button" value="実行" />
<textarea>

var awa = function() {
   return 3;
   // ここは実行されない
   MessageBox.show("むぇー");
};


awa();
// ここは実行される
MessageBox.show("コケー");</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
関数awaの中で、`MessageBox.show()`の前に`return`してしまっているので、関数`awa`のそこから先は実行されないのです。
ただ関数の実行が終わるだけで、`"コケー"`の部分は実行されます。

先程の課題で、6が多めに出るサイコロ、というのを私が作ってきました。こんなコードになっていました。

```
var ikasama_saikoro = function() {
    var num = Math.randomInt(12);
    if(num < 5) {
        return num+1;
    }
    return 6;
};
```

この時、`num`が0から4までだとifの中の`return num+1;`が実行されて、そこでこの関数が終わります。
`num`が5より大きい（5から11までのどれか）だと、このif文には入らずその下の`return 6;`が実行されます。

この手の話は、言葉にするとごちゃごちゃしますね。でもプログラムを理解するのはそんな難しくないと思います。
「こいつの日本語わけ分かんねーなぁ」と思っても、プログラムが分かれば先に進んでOKです。  
日本語が不自由な可哀想な奴…とでも思っておいてください。ってほっといてください。私プログラマなんで別にいいんです。

このように、if文の途中で実行を打ち切りたい時なども`return`を使う事が出来ます。


### 課題： こちんこちん？って聞いて、麦茶かこーしーを返す関数を作れ

関数の中で`if`を使う課題をやってみましょう。

関数`lucy`の中で`MessageBox.yesNo`を使ってプレーヤーに「こちんこちん？」と質問し、
結果に応じて`返す`文字を`"麦茶！"`か`"こーしー"`か変えてください。

yesとnoのラベルは「はい」と「いいえ」にしておきますか。

ヒント： [第四回](ch4.md)の、「課題: こちんこちんと言えば？」が参考になるかも。


<script>
var qobj = {
    id: "q5",
    scenarios: []
}
qobj.scenarios.push({
    setup: ()=> returnValues.push(1),
    verify: () => {
        if(scenarioLogs.length == 0) {
          return "質問されませんでした。";
        }
        if(scenarioLogs[0].name != "yesNo") {
          return "最初が質問じゃありませんでした。";
        }
        if(scenarioLogs.length == 1) {
          return "「はい」を選んだ時に、結果が表示されていません。MessageBox.showを使って表示してください。";
        }
        if(scenarioLogs.length >= 3) {
          return "「はい」を選んだ時、たぶん二回表示されています。";
        }
        if(scenarioLogs[1].name == "yesNo") {
          return "「はい」を選んだ時、二回質問されました。なんで？";
        }

        
        // {name:"yesNo", val:{msg, yeslabel, nolabel}}
        var res = scenarioLogs[0].val;
        /*
        if(res.msg != "こちんこちん？") {
          return "メッセージが違いそうです。";
        }
        if(res.yeslabel != "はい") {
          return "最初のボタンが「はい」じゃありません。";
        }
        if(res.nolabel != "いいえ") {
          return "二番目のボタンが「いいえ」じゃありません。";
        }
        */

        if(scenarioLogs[1].val != "麦茶！") {
          return "こちんこちんなのに麦茶！になってない！";
        }
        return true;

    }
});
qobj.scenarios.push({
    setup: ()=> returnValues.push(0),
    verify: () => {
        if(scenarioLogs.length == 1) {
          return "「いいえ」を選んだ時に、結果が表示されていません。MessageBox.showを使って表示してください。";
        }
        if(scenarioLogs.length >= 3) {
          return "「いいえ」を選んだ時、たぶん二回表示されています。";
        }
        if(scenarioLogs[1].name == "yesNo") {
          return "「いいえ」を選んだ時、二回質問されました。なんで？";
        }

        
        if(scenarioLogs[1].val != "こーしー") {
          return "こちんこちんじゃないのにこーしーになってない！";
        }
        return true;

    }
});
  questions.push(qobj);
 </script>


<div id="q5">
    <input type="button" value="実行" />
    <textarea>
// TODO: 以下を書き直せ
var lucy = function() {
};


// 以下はいじらないでね。
var kekka = lucy();
MessageBox.show(kekka);</textarea>
    <b>結果:</b> <span class="console"></span><br>
    <span class="result"></span><br>
    <input type="button" value="答えを見る" />
    <div class="answer hideanswer">
答え:<br>
var lucy = function() {<br>
&nbsp;&nbsp;&nbsp;&nbsp;var tumetai = MessageBox.yesNo("こちんこちん？", "はい", "いいえ");<br>
&nbsp;&nbsp;&nbsp;&nbsp;if(tumetai == 1) {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return "麦茶！";<br>
&nbsp;&nbsp;&nbsp;&nbsp;} else {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return "こーしー";<br>
&nbsp;&nbsp;&nbsp;&nbsp;}<br>
}<br>
    </div>        
</div>
  
　  
これもなかなか手強い。  
この課題などは、関数どうこう、というより、これまでやった事が多いので思い出すのが大変、って感じだと思いますが。

ラストダンジョンっぽさがありますね。

### 結果を返す、もらう、まとめ

第八回では、結果を`もらう`という方法と、
その結果を`返す`という事について扱いました。

1. 関数を`使う`時に結果が`もらえます`。
2. `結果をもらう`には、`var kekka = lucy();`などのように、イコールで変数にもらいます。
3. 関数を`作る`時に`結果を返す`事が出来ます。
4. 結果は`return`で返します。`return`は関数を作る時だけ出来る事です。
5. `return`すると関数はそこまでで実行を終えます

言葉にすると消えちゃう関係なら…じゃなくて、言葉にすると少しややこしいですね。
重要なのは、`もらう`方と、`返す`方を区別して、それぞれちゃんと書ける、という事です。

基本的には課題の答えが分かればOKです。


**コラムの例**  
最初のブロック  
　  
二つ目のブロック
{: .column}



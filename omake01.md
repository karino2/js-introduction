---
title: "おまけ第一回: 簡単なプラグインのコードを読んでみよう（元の関数をcallで呼ぶ型）"
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


  setupAllREPL2(8);
  setupAllQuestionsWithScnario(questions);
}
</script>

もともと第十二回にしようと思ったのですが、何回かに分けた方が読みやすい気がしたので、おまけ01, おまけ02、と呼んで行く事にします。
たぶんおまけ03で終わりです。まぁドラゴンボールもちょっとだけ続くと言った後に結構長かったし、そういうもんです。どうでもいい。

おまけのシリーズは、実際のツクールMVのプラグインのうち簡単そうな奴を読んで行こう、という物になります。
第十一回まではツクールMVと関係無い一般的なJavaScriptの話でしたが、このおまけシリーズはツクールMV特有の話です。
自分はツクールMVは素人なのでツクールMV自体の話はあんま信用せずに読んで下さい。プログラム側の解説は正しいはずなので、
おそらくツクール分かってる人なら私の勘違いを脳内補正して読んで行けるでしょう。

実際のコードには、説明して無い事や良く分からない複雑な部分などが出てくるものです。
JavaScriptの入門書などでプログラム言語を勉強して、「よし、実際のコードを読んでみるぞ！」と思っても、
実際のコードは本とは結構いろいろギャップがあって、初めて見る時には苦戦する事になると思います。
このおまけシリーズは、そんなギャップを多少は埋められないかな、という趣旨でやっていきます。

このおまけでは、プラグインのコードを読んで行きつつ、これまで説明が漏れていた事について補足していったり、
読まなくて良い部分はどの辺か、みたいな事を語っていきたいと思います。

なお、このシリーズはあまり実行してみるコードは用意出来ないので、自分で該当するプラグインを実際に動かしてみながら説明を読んでくれると理解が増すと思います。

# 一番簡単なプラグイン

自分はツクールMVは素人なので、「ツクールMV プラグイン 入門」とかで適当にググって当たったサイトから簡単そうなのを選んでみます。

自分がちらっと見た範囲だと一番簡単なのはこちらのサイトでした。[プラグイン開発Wiki - RPGツクールMV](https://www65.atwiki.jp/rpgmvpl/pages/12.html)


最初はこちらのサイトのプラグインから読んで行きましょう。

## まずはコードから

今回はプラグインの仕組みとかそういう話はあまりせずに、コードの方だけ見ていきます。
パラメータとかその辺の事は入門サイトで勉強してください。

さて、コードを転載すると以下のようでした。

```
(function(){
	var _Game_Interpreter_pluginCommand =
		Game_Interpreter.prototype.pluginCommand;

	Game_Interpreter.prototype.pluginCommand = function(command, args)
	{
		_Game_Interpreter_pluginCommand.call(this, command, args);

		if( command === 'test_pl' )
			$gameMessage.add( "プラグインが呼び出されたよ☆" );
	};
})();
```

この一行目と最後の行は、[前回](ch11.md)やった、関数を作ってすぐ実行する、という奴でした。
この中の変数が他とぶつからない為のトリックなのですが、動作を知りたいだけならあまり気にしなくて良い。

取り除くとこうなります。(行のはじめの空白はうっとうしいのでついでに削ります)

```
var _Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args)
{
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if( command === 'test_pl' )
        $gameMessage.add( "プラグインが呼び出されたよ☆" );
};
```

ちょっとvarで用意している変数の名前が長いので、少し短くしましょう。
これはもともとの関数なのでmotomotoという名前にします（後で何がもともとなのかは説明します）。


```
var motomoto =
    Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args)
{
    motomoto.call(this, command, args);

    if( command === 'test_pl' )
        $gameMessage.add( "プラグインが呼び出されたよ☆" );
};
```

これでコードを解説してこうと思った所、「英語なんて分かるか！頭くさってんのかー！」と言われて、
言われてみると確かに英語が多い。
無意識に英単語からヒントをもらっている事も多いので、それが出来ないと結構読みづらいだろうなぁ、と気づかされました。

一方で、プログラム的に意味があるものもあります。functionとかcallとかprototypeとかです。

という事で、あまり重要じゃないが難しい部分を幾つか厳選して、それだけ日本語に置き換えてみようと思います。
そのように置き換えたコードでまず説明し、あとから元のコードに戻して読んでみる、という手順を取ってみましょう。

以下のように置き換えます。

| 元の単語 | 置き換える単語 | 解説 |
| ------- | ---------- | ------- |
| Game_Interpreter | ゲーム主 | インタープリタという単語をどういう意味で使っているのか分からないですが、ルールとかスクリプトを解釈して実行する物、という意味だと思います。 |
| args | その他 | argumentsを省略した物だと思いますが、その他、と呼んでおきます。|
| add | 追加 | addは追加という意味です。とりあえず和訳しておきます |

するとこうなります。

```
var motomoto =
    ゲーム主.prototype.pluginCommand;

ゲーム主.prototype.pluginCommand = function(command, その他)
{
    motomoto.call(this, command, その他);

    if( command === 'test_pl' )
        $gameMessage.追加( "プラグインが呼び出されたよ☆" );
};
```

また、英語だけどカタカナは分かると思うのでそのままで理解して欲しい物について、対応を書いておきます。

| 単語 | 意味 |
| ---- | ---- |
| command | コマンド |
| gamgeMessage | ゲームメッセージ |
| pluginCommand | プラグインコマンド |

これで以下の解説を読んでみてください。

さて、このコードを順番に見ていきましょう。

## まず元の関数を変数に入れる

最初の二行をまず見てみます。

```
var motomoto =
    ゲーム主.prototype.pluginCommand;
```

ゲーム主(本来の名前は`Game_Interpreter`)は、ツクールMVが用意してくれている辞書です。
この`ゲーム主`という辞書の中の`prototype`というキーの中身がまた辞書になっていて、その中のさらに`pluginCommand`というキーの値を取り出しています。

辞書の中に辞書が入っている、という事で一見なかなか複雑です。100本ノックでこの位ならやりましたが、まぁまぁ忘れてもいる事でしょう。
ですが、prototypeはちょっと特殊な奴で決まった使い方しかしないので、実はそんな大変じゃない。

prototypeの詳細は最後にちょろっと解説しますが、現時点では「その前の辞書名とprototypeを合わせて全体で一つの辞書の名前」だと思っておいてOKな物です。

つまりこの場合、`ゲーム主.prototype`全体で一つの辞書の名前だと思う。
この`ゲーム主.prototype`という名前の辞書をツクールMVが提供している、と思っておきましょう。

「ゲーム主.prototype」というちょっと変わった名前の辞書だと考えると、`変わった名前の辞書.pluginCommand`という感じになるので、
いつもの、辞書から何かを取り出すコードになります。`awa.nakigoe`と一緒ですね。

「ゲーム主.prototype」全体で辞書の名前に見えるように、頑張って自分を慣らしてください（すぐ慣れます）。

さて、JavaScriptでは、この`なんちゃら.prototype`という辞書には、関数をいろいろ入れる決まりになっています。
という事でこの辞書に入っているのは全て関数のはずです。
なので今回取り出した`pluginCommand`も関数です。

つまり以下のコード

```
var motomoto =
    ゲーム主.prototype.pluginCommand;
```

で、`ゲーム主.prototype`という辞書から`pluginCommand`というキーで中身を取り出しています。
（辞書のキーは[第六回](ch06.md)を参考にしてください）

後の説明の為に、現時点での「ゲーム主.ptotoype」の中身をテーブルで書いておきましょう。

**ゲーム主.prototype辞書**

| キー | 中身 |
|----- | ---- |
| pluginCommand | 元から入っている何かの関数 |

上のコードでは、このテーブルの、「元から入っている何かの関数」というのを取り出して、`motomoto`に入れている訳です。

## 関数を差し替えている所のコードを見る

続きのコードを見てみましょう。以下のようになっています。

```
ゲーム主.prototype.pluginCommand = function(command, その他)
{
    motomoto.call(this, command, その他);

    if( command === 'test_pl' )
        $gameMessage.追加( "プラグインが呼び出されたよ☆" );
};
```

ちょっと構造に注目する為、functionの中を...で置き換えてしまいましょう。

```
ゲーム主.prototype.pluginCommand = function(command, その他)
{
    ...
};
```

こうすると、先ほどの`ゲーム主.prototype`という辞書に、pluginCommandというキーで新しい関数を入れている事が分かります。
これは先ほど取り出した辞書の同じ場所ですね。

つまりこのコードで、さっきの辞書を以下のような辞書に変更している訳です。

**ゲーム主.prototype辞書**

| キー | 中身 |
|----- | ---- |
| pluginCommand | 今作ってる関数 |


JavaScriptの大規模なプログラムでは、関数を辞書に入れた物をいろいろ集めて最終的なゲームなどを作ります。ツクールMVもそのように作られています。

そしてプラグインというのは、この特定の部分の辞書を上書きして自分の関数に差し替えて、自分の望む処理を挟み込む、というのが基本となります。

どういう辞書があって何を差し替えると何が出来るのか、というのはツクールMVの環境の知識となるので私も知りません。
正しくは公式のドキュメントを読む事になるのでしょうが、英語っぽいですね。
最初のうちはプラグインの入門サイトを見たり他人のプラグインを調べたりして覚えていくのが良さそうです。

さて、今回は`ゲーム主.prototype`という所の関数を差し替えるみたいです。
このpluginCommandというのは、上記のサイトから推測するとゲーム中に「プラグインコマンド」というのを実行する事が出来るみたいですね。
私は良く知りませんが、読者の方がむしろ知っている所かもしれません。

この「プラグインコマンド」というのを実行すると、この`ゲーム主.prototype`という辞書のpluginComamndというキーに入っている関数が実行されるみたいです。

だからこの関数を自分の関数にしてしまえば、この「プラグインコマンド」というのが実行された時に自分の書いたコードが実行されるように出来ます。（たぶん）

## 差し替えた関数の中身を見る

では入れている関数の中身を見てみましょう。以下のようになっていました。

```
ゲーム主.prototype.pluginCommand = function(command, その他)
{
    motomoto.call(this, command, その他);

    if( command === 'test_pl' )
        $gameMessage.追加( "プラグインが呼び出されたよ☆" );
};
```

最初の行はもう見たので、イコールより左側は見やすくする為に削っておきます。
すると辞書に入れる関数は以下のようになっています。

```
function(command, その他)
{
    motomoto.call(this, command, その他);

    if( command === 'test_pl' )
        $gameMessage.追加( "プラグインが呼び出されたよ☆" );
};
```

`function(command, その他)`というのは[前回](ch11.html)やった **関数の文字や数字の受け取り方** というあたりの話で、
以下と同じ意味になるのでした。

```
function() {
    var command = arguments[0];
    var その他 = arguments[1];
```

その次の行はちょっと新しい。

```
    motomoto.call(this, command, その他);
```

ここで`call`という物が出てきます。これは関数を、「thisを偽造して実行する」という特別な命令です。
あとで細かく説明しますが、現時点では通常の関数を使う以下のようなコードと、

```
motomoto(command, その他);
```

それを以下のようにしたコードは

```
motomoto.call(偽造したい辞書, command, その他);
```

ほとんど同じ内容と思ってください。

さて、このmotomotoというのは何かといえば、最初に`ゲーム主.prototype`辞書に入っていた関数を取り出して入れておいた変数でした。
以下みたいなコードでしたね。

```
var motomoto =
    ゲーム主.prototype.pluginCommand;
```

つまり、もともとからあった関数をこのmotomotoに退避しておいて、自分の関数を新しくこの`ゲーム主.prototype.pluginCommand`に差し替えているのです。

そして、この差し替えた関数の中でもともとの関数を呼んでいる。例えるなら、もともとの執事セバスチャンとは別に、その兄弟のパトリックという執事が居て、
パトリックに頼むとセバスチャンにただ用事を言いつける、みたいな状態になる訳です。
motomotoにはセバスチャンが入っている訳ですね。

さて、また関数の中身に戻ります。

```
function(command, その他)
{
    motomoto.call(this, command, その他);

    if( command === 'test_pl' )
        $gameMessage.追加( "プラグインが呼び出されたよ☆" );
};
```

`motomoto.call`は今説明した通り前から居た執事に同じ用事を言いつける、という事になるのですが、
そのあとが新しくパトリックがやる事になります。

```
    if( command === 'test_pl' )
        $gameMessage.追加( "プラグインが呼び出されたよ☆" );
```

最初のif文ではイコールが三つありますが`===`、これはかっこつけた書き方で、`==`と同じと思ってください。
commandというのが何かはツクールMV側の資料を調べないと分かりませんが、たぶんプラグインの名前が入っているっぽい？
この辺は私はプラグインコマンドというのが何なのか良く分かってないので推測です。

推測していじってみて動かし、結果を見てあってたかどうかを確認しながら理解を深めていくのが初期のやり方なので、こんな感じで分からない事は適当に推測して進めます。

プラグインコマンドの`command`が`"test_pl"`という文字だったら、このifの次の行を実行する、という意味になっています。

で、そのifの実行される文。
`$gameMessage.追加()`というのはゲームのメッセージウィンドウにメッセージを出すっぽいですね。
この講座でやっていた`MessageBox.show()`と似た物と言えそうです。

英語から考えると、「ゲームメッセージという物に文字を追加する」という関数っぽい。

以上をまとめると、この新しく差し替える関数は、

1. もともとの関数を呼び出す（前の執事に用事を言いつける）
2. `command`が`"test_pl"`だったら、メッセージを表示する

という事をやるようです。
これがこのプラグインを組み込んだ時に起こる事のようです。

以上でこのプラグインの基本は理解出来た事になります。どうでしょう？簡単？難しい？結局の所`function`の中以外はお約束みたいな物なので、
本当に重要なのはif文の所だけだったりします。これならこのシリーズをここまでやった人にとってはどうって事無いんじゃないでしょうか。

### 余談：ifの後のにょろカッコ

余談ですが、上のコードではifの後に`{}`がついていません。
このシリーズではifの後には`{}`を付けてましたが、JavaScriptには、ifの後が一行だけならにょろカッコをつけなくても良い、という特別ルールがあります。

つまり、

```
    if( command === 'test_pl' )
        $gameMessage.追加( "プラグインが呼び出されたよ☆" );
```

と

```
    if( command === 'test_pl' ){
        $gameMessage.追加( "プラグインが呼び出されたよ☆" );
    }
```

は全く同じ意味です。違いが気にならないなら気にしなくてもOK。気になる人向けに説明してみました。
なお、自分で書く時はこれまでやった通り、いつも下のように書きましょう。（理由は秘密、私を信じて！）


### 英語に戻そう

プログラムとしては別に難しい英単語を使ってもカタカナでも動作は変わらないのですが、
プラグインのコードを読む練習として、元の英語に戻したコードも見てみましょう。

まず戻す前のコードをもう一度読みます。

```
var motomoto =
    ゲーム主.prototype.pluginCommand;

ゲーム主.prototype.pluginCommand = function(command, その他)
{
    motomoto.call(this, command, その他);

    if( command === 'test_pl' )
        $gameMessage.追加( "プラグインが呼び出されたよ☆" );
};
```

ふんふん、なるほど、と分かったとします。

そうしたら、次にこのコードを、以下の変換表に従い元に戻します。


| 元の単語 | 置き換える単語 | 解説 |
| ------- | ---------- | ------- |
| Game_Interpreter | ゲーム主 | インタープリタという単語をどういう意味で使っているのか分からないですが、ルールとかスクリプトを解釈して実行する物、という意味だと思います。 |
| args | その他 | argumentsを省略した物だと思いますが、その他、と呼んでおきます。|
| add | 追加 | addは追加という意味です。とりあえず和訳しておきます |

するとこうなります。

```
var motomoto =
    Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args)
{
    motomoto.call(this, command, args);

    if( command === 'test_pl' )
        $gameMessage.add( "プラグインが呼び出されたよ☆" );
};
```

上の置き換えた版と何度も見比べてみて下さい。分かりそうですか？単純に置き換えただけなのでプログラムとしては全く同じ動作です。

以上でプラグインの解説は終わりです。

さて、次に少し、callについて説明をしておきましょう。


## callを使った関数の差し替え

プラグインでは、セバスチャンを用済みにしてパトリックに差し替えて我々のやりたい事をやらせて、
これまでの仕事はパトリックがセバスチャンに頼む、というパターンが多く出現します。

お嬢様はパトリックに頼むだけなのでやる事は変わってないのですが、パトリック側が前の執事をこっそり使っている、という訳です。

これは何度も出てくるので、パターンとして覚えてしまう方が読むのがぐっと楽になります。

### thisの復習から

thisは、関数が今入っている辞書を意味します。
例えば以下のようなコードです。

<div id="ex1">
<input type="button" value="実行" />
<textarea>
var kumosaba = {name: "雲鯖", users:["るーしー", "あじゃ"]};
var mosssaba = {name: "モス鯖", users:["じゃがしー", "ダニキ"]};

function tansu() {
    MessageBox.show(this.name + arguments[0]);
}

// kumosabaに入れて呼ぶ
kumosaba.nakigoe = tansu;
kumosaba.nakigoe("です！");

// mosssabaに入れて呼ぶ
mosssaba.nakigoe = tansu;
mosssaba.nakigoe("だにゃ！");</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
このように関数自体は同じtansuでも、kumosabaに入っているかmosssabaに入っているかで、thisの値が変わります。

### callでthisを偽造する

上のコードを、callを使う事で、実際には辞書に入れずに、辞書に入っているフリをさせる事が出来ます。

<div id="ex2">
<input type="button" value="実行" />
<textarea>
var kumosaba = {name: "雲鯖", users:["るーしー", "あじゃ"]};
var mosssaba = {name: "モス鯖", users:["じゃがしー", "ダニキ"]};

function tansu() {
    MessageBox.show(this.name + arguments[0]);
}


// thisをkumosabaだと偽って呼ぶ
tansu.call(kumosaba, "です！");

// thisをmosssabaだと偽って呼ぶ
tansu.call(mosssaba, "だにゃ！");</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
このように、関数の中のcallというのを使うと、`thisを偽りつつ関数を実行する`という事が出来ます。
なお、callに渡す一つ目は辞書となり、二つ目からが関数に実際に渡す物になります。

つまり`arguments[0]`は、下のコードの例だと

```
tansu.call(kumosaba, "です！");
```

`"です！"`になります。`kumosaba`では無い事に注意です（これが偽造されるthisに使われるから）。

### callを使って辞書の関数を辞書の外で呼ぶ

さて、このcallを使って、自分の処理をはさみこむ、というのがプラグインでは良くあります。

例えば以下のようなコードがあったとします。

<div id="ex3">
<input type="button" value="実行" />
<textarea>
var awa = {nakigoe: "むぇー",
    naku: function(){
        MessageBox.show(this.nakigoe);
    }
};

awa.naku();</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
この時に、nakuを別の関数に差し替えたいとする。
で、元の関数を変数にとっておいて呼ぶと、thisの値が変わるので、エラーになります。やってみましょう。

<div id="ex4">
<input type="button" value="実行" />
<textarea>
var awa = {
    nakigoe: "むぇー",
    naku: function(){
        MessageBox.show(this.nakigoe);
    }
};

var motomoto = awa.naku;
motomoto();</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
`motomoto()`を実行する時には、これはどこの辞書にも入ってない状態で直接実行しているので、thisは何もさしてない、という特殊な状態になります（ここは込み入った事情があるので細かい解説はしません）。

だから、`awa.naku`に入ってた関数が`this.nakigoe`を使おうとすると、thisは空なのでnakigoeなんて無い！と怒られる訳です。
エラーメッセージは何か意味の分からないのが出てますが、これはこの課題システムの都合なので気にしないでください。

さて、先ほどのthisを偽造するテクニックを使う事で、このmotomotoを呼ぶ事が出来ます。

<div id="ex5">
<input type="button" value="実行" />
<textarea>
var awa = {
    nakigoe: "むぇー",
    naku: function(){
        MessageBox.show(this.nakigoe);
    }
};

var motomoto = awa.naku;
motomoto.call(awa);</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
こんな感じ。上のテキストエリアに適当に辞書とか作って変えたりしてみてください（気が向いたら課題化するかも）。


### callをつかって辞書の関数を差し替える、理屈編

以下みたいなコードがあったとります。まずは実行してみてくださ。

<div id="ex6">
<input type="button" value="実行" />
<textarea>
var awa = {
    nakigoe: "むぇー",
    naku: function(){
        MessageBox.show(this.nakigoe);
    }
};

// ここに何かを挟み込んで、awa.nakuの内容を変えたい。プラグインのコード相当


// 以下を実際のゲーム本体のコードだと思って下さい。下はいじれない。
awa.naku();</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
むぇーって鳴きましたね。

このコードの間の所にプラグインに相当するコードを書く、という事を考えてみます。
具体的には以下みたいなコードを考えます。間の所しか変更してません。

<div id="ex7">
<input type="button" value="実行" />
<textarea>
var awa = {
    nakigoe: "むぇー",
    naku: function(){
        MessageBox.show(this.nakigoe);
    }
};

// ここに何かを挟み込んで、awa.nakuの内容を変えたい。プラグインのコード相当
var motomoto = awa.naku;
awa.naku = function() {
    MessageBox.show("雲鯖から！");
    motomoto.call(awa);
};

// 以下を実際のゲーム本体のコードだと思って下さい。下はいじれない。
awa.naku();</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
こうすると、元のコードを実行しつつ、その手前で「雲鯖から！」と表示されます。
これがほぼプラグインの原理なのですが、実際のプラグインではprototypeというちょっと特殊な物が使われているので、
その場合はawaという変数は関数の中では使えません（そのうち簡単に理屈は説明します）。

実際のプラグインを作る時は、このawaと同じ物をさしているthisを代わりに使います。

つまり、`motomoto.call(awa);`を`motomoto.call(this);`と直す必要がある。
（今回の例のようにprototypeを使ってない場合は、thisとawaは完全に同じ物なのでどちらでも良い）。

<div id="ex8">
<input type="button" value="実行" />
<textarea>
var awa = {
    nakigoe: "むぇー",
    naku: function(){
        MessageBox.show(this.nakigoe);
    }
};

// ここに何かを挟み込んで、awa.nakuの内容を変えたい。プラグインのコード相当
var motomoto = awa.naku;
awa.naku = function() {
    MessageBox.show("雲鯖から！");
    motomoto.call(this);
};

// 以下を実際のゲーム本体のコードだと思って下さい。下はいじれない。
awa.naku();</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
このように、callを使ってthisを偽造すれば、元の辞書に入っていた関数を取り出して別の場所で使えます。

この理屈を使って、元の関数を変数に退避しておいて、自分の差し替えた関数の中から使う訳です。

### callをつかって辞書の関数を差し替える、暗記編

理屈をひとたび理解したら、あとはパターンを暗記します。
実は理屈を理解しなくてもパターンを暗記してしまえば別にいいんですが。

パターンとしては以下の形になります。

1. 何かの変数にもともとの関数を取り出す
2. 自分の関数で差し替える
3. 自分の関数の中で、もともとの関数を`motomoto.call(this, なんちゃら～);`と呼ぶ


上記の例のコードだと、以下のように対応します。

```
// 1. motomoto変数にもともとの関数を取り出す
var motomoto = awa.naku;

// 2. 自分の関数で差し替える
awa.naku = function() {
    MessageBox.show("雲鯖から！");

    // 3. もともの関数をcallとthisを使って呼ぶ
    motomoto.call(this);
};
```

普通プラグインはいろいろな関数を差し替えるので、このmotomotoをもっと長い名前にしておく事が多いと思います。
別にmotomoto1, motomoto2, motomoto3とかでもいいのですが、かっこつけてアンダーバーで始めて元の辞書とキーをつなげた名前にしているのが多いですね。
この場合なら、`_awa_naku`とかでしょうか。

でもこれはかっこつけてるだけで大した意味はありません。特にぶつからないトリックを既にやっていながらここの名前までぶつからないように気を付けるのは、
むしろやり過ぎで読みにくいだけと個人的には思います。

### 暗記した内容を元に元のコードを見直す

さて、先ほどのプラグインのコードに戻って、もう一度見てみましょう。

```
var motomoto =
    Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args)
{
    motomoto.call(this, command, args);

    if( command === 'test_pl' )
        $gameMessage.add( "プラグインが呼び出されたよ☆" );
};
```

辞書の名前が長いけれど、そんなに違いは無いのです。
sコメントをつけてみましょう。


```
// 1. motomoto変数にもともとの関数を取り出す
var motomoto =
    Game_Interpreter.prototype.pluginCommand;

// 2. 自分の関数で差し替える
Game_Interpreter.prototype.pluginCommand = function(command, args)
{
    // 3. もともの関数をcallとthisを使って呼ぶ
    motomoto.call(this, command, args);

    if( command === 'test_pl' )
        $gameMessage.add( "プラグインが呼び出されたよ☆" );
};
```

一つ一つの意味をJavaScript的に考えるのも勉強の時には良いですが、
実際にプラグインをいじる時は上記三つの三点セットで関数を差し替える、と覚えてしまう方が簡単で良いでしょう。

パターンを覚えていく事で脳から不要な事を追い出していくのは、複雑なコードを読めるようになるコツです。

この三つをパターンとして覚えると、実は上のプラグインで残るのは、

```
    if( command === 'test_pl' )
        $gameMessage.add( "プラグインが呼び出されたよ☆" );
```

だけだったりします。この位は見れば意味も分かるでしょ？

### prototypeを理解せずに乗り切る為に必要な事（理解出来なかったら飛ばしてもOK）

prototypeは理屈はそんな難しい訳でも無いのですが、ありがたみを説明するにはある程度の経験が必要なので、このシリーズのレベルでは解説しない事にしています。
ですが、出てくる事は出てくるので、乗り切るのに必要な事だけ書いておきます。

1. prototypeは関数が持つもので、辞書を入れる物
2. prototypeに入れる辞書の中には、関数を入れておく
3. ptototypeに入っている関数は、どこかのタイミングで別の辞書にまとめて入れられて使われる

3はちょっとだけ厳密では無いですが、このシリーズのレベルではこの三つの理解で十分で、
特に3が重要です。

prototypeに関数の入った辞書を入れておくと、これはどこかで別の辞書にまとめてコピーされて使われる決まりになっています。
だから、thisに相当する物は、使われる時はこのprototypeとは別の辞書になるのです。

例えば以下みたいなコードがあった時に、

```
Game_Interpreter.prototype.pluginCommand = function(command, args)
{
    ...
}
```

この関数の中のthisは、この時点ではGame_Interpreter.prototypeを指しているのですが、
どこかにあるお嬢様側のコードではこれを別の辞書にコピーして使います。
その時の辞書はなんて名前の変数に入っているかは分からないので、この関数の中では`this`として触るしか触る方法がありません。

逆にこの、目的の辞書を`this`で触る、という事にだけ気を付ければ、あとは`Game_Interpreter.prototype`をただの辞書と思っておいて全く問題はありません。
なのでこのシリーズでは、prototypeの理屈はおいといて、`Game_Interpreter.prototype`全体で一つの辞書を表しているかのように話を進めます。
ただこの辞書をセバスチャン側で触る時にはthisを使わないといけない事だけが違いです。



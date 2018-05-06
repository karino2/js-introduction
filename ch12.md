---
title: "第十二回: 簡単なプラグインのコードを読んでみよう"
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

（たぶん）最終回です。

第十二回は、おまけとして、実際のツクールMVのプラグインのうち簡単そうな奴を読んで行こう、という回になります。
前回まではツクールMVと関係無い一般的なJavaScriptの話でしたが、今回だけはツクールMV特有の話です。
自分はツクールMVは素人なのでツクールMV自体の話はあんま信用せずに読んで下さい。あくまでプログラムの解説の方がメインという事で。

実際のコードには、説明して無い事や良く分からない複雑な部分などが出てくるものです。
JavaScriptの本と実際のコードには結構いろいろギャップがあって、初めて見る時には苦戦する事になると思います。

今回はプラグインのコードを読んで行きつつ、これまで説明が漏れていた事について補足していったり、読まなくて良い部分はどの辺か、
みたいな事を語っていきたいと思います。

なお、あまり今回は実行してみるコードは用意出来ないので、自分で街頭するプラグインを実際に動かしてみながら説明を読んでくれると理解が増すと思います。

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

さて、このコードを順番に見ていきましょう。

## まず元の関数を変数に入れる

最初の二行をまず見てみます。

```
var motomoto =
    Game_Interpreter.prototype.pluginCommand;
```

`Game_Inpterpreter`というのはツクールMVが用意してくれている辞書で、
その中のprototypeも辞書です。
prototypeは少し特殊で詳細は解説しませんが、その前の辞書名と合わせて全体で辞書の名前だと思っておくと9割はOK。

つまりこの場合、`Game_Interpreter.prototype`全部でツクールMVが提供している辞書だと思っておきましょう。

この`なんちゃら.prototype`という辞書には、関数をいろいろ入れる決まりになっています。
という事で入っているのはだいたい関数です。

ここでは、この`なんちゃら.prototype`という辞書の中の`pluginCommand`というのを取り出しています。
これが辞書のキーな訳ですね。辞書のキーは[第六回](ch06.md)を参考にしてください。


**Game_Interpreter.prototype辞書**

| キー | 中身 |
|----- | ---- |
| pluginCommand | 元から入っている何かの関数 |

このテーブルの、「元から入っている何かの関数」というのを取り出して、`motomoto`に入れている訳です。

## 関数を差し替えている所のコードを見る

続きのコードを見てみましょう。以下のようになっています。

```
Game_Interpreter.prototype.pluginCommand = function(command, args)
{
    motomoto.call(this, command, args);

    if( command === 'test_pl' )
        $gameMessage.add( "プラグインが呼び出されたよ☆" );
};
```

ちょっと構造に注目する為、functionの中を...で置き換えてしまいましょう。

```
Game_Interpreter.prototype.pluginCommand = function(command, args)
{
    ...
};
```

こうすると、先ほどの`なんちゃら.prototype`という辞書に、pluginCommandというキーで新しい関数を入れている事が分かります。
これは先ほど取り出した辞書と同じ辞書ですね。

つまり以下のような辞書にしている訳です。

**Game_Interpreter.prototype辞書**

| キー | 中身 |
|----- | ---- |
| pluginCommand | 今作ってる関数 |


JavaScriptの大規模なプログラムでは、関数を辞書に入れた物をいろいろ集めて最終的なゲームなどを作ります。ツクールMVもそのように作られています。

そしてプラグインというのは、この特定の部分の辞書を上書きして自分の関数に差し替えて、自分の望む処理を挟み込む、というのが基本となります。

どういう辞書があって何を差し替えると何が出来るのか、というのはツクールMVの環境の知識となるので私も知りません。
正しくは公式のドキュメントを読む事になるのでしょうが、英語っぽいですね。
最初のうちはプラグインの入門サイトを見たり他人のプラグインを調べたりして覚えていくのが良さそうです。

さて、今回は`Game_Intepreter.prototype`という所の関数を差し替えるみたいです。
このpluginCommandというのは、上記のサイトから推測するとゲーム中に「プラグインコマンド」というのを実行する事が出来るみたいですね。
私は良く知りませんが、読者の方がむしろ知っている所かもしれません。

この「プラグインコマンド」というのを実行すると、この`Game_Intepreter.prototype`という辞書のpluginComamndというキーの物が実行されるみたいです。

だからこの関数を自分の関数にしてしまえば、この「プラグインコマンド」というのが実行された時に自分の書いたコードが実行されるように出来ます。（たぶん）

## 差し替えた関数の中身を見る

では入れている関数の中身を見てみましょう。以下のようになっていました。

```
Game_Interpreter.prototype.pluginCommand = function(command, args)
{
    motomoto.call(this, command, args);

    if( command === 'test_pl' )
        $gameMessage.add( "プラグインが呼び出されたよ☆" );
};
```

最初の行はもう見たので、イコールより左側は見やすくする為に削っておきます。
すると辞書に入れる関数は以下のようになっています。

```
function(command, args)
{
    motomoto.call(this, command, args);

    if( command === 'test_pl' )
        $gameMessage.add( "プラグインが呼び出されたよ☆" );
};
```

`function(command, args)`というのは[前回](ch11.html)やった **関数の文字や数字の受け取り方** というあたりの話で、
以下と同じ意味になるのでした。

```
function() {
    var command = arguments[0];
    var args = arguments[1];
```

その次の行はちょっと新しい。

```
    motomoto.call(this, command, args);
```

ここで`call`という物が出てきます。これは関数を、「thisを偽造して実行する」という特別な命令です。
あとで細かく説明しますが、現時点では通常の関数を使う以下のようなコードと、

```
motomoto(command, args);
```

それを以下のようにしたコードは

```
motomoto.call(偽造したい辞書, command, args);
```

ほとんど同じ内容と思ってください。

さて、このmotomotoというのは何かといえば、最初に`Game_Interpreter.prototype`辞書に入っていた関数を取り出して入れておいた変数でした。
以下みたいなコードでしたね。

```
var motomoto =
    Game_Interpreter.prototype.pluginCommand;
```

つまり、もともとからあった関数をこのmotomotoに退避しておいて、自分の関数を新しくこの`Game_Interpreter.prototype.pluginCommand`に差し替えているのです。

そして、この差し替えた関数の中でもともとの関数を呼んでいる。例えるなら、もともとの執事セバスチャンとは別に、その兄弟のパトリックという執事が居て、
パトリックに頼むとセバスチャンにただ用事を言いつける、みたいな状態になる訳です。
motomotoにはセバスチャンが入っている訳ですね。

さて、また関数の中身に戻ります。

```
function(command, args)
{
    motomoto.call(this, command, args);

    if( command === 'test_pl' )
        $gameMessage.add( "プラグインが呼び出されたよ☆" );
};
```

`motomoto.call`は今説明した通り前から居た執事に同じ用事を言いつける、という事になるのですが、
そのあとが新しくパトリックがやる事になります。

```
    if( command === 'test_pl' )
        $gameMessage.add( "プラグインが呼び出されたよ☆" );
```

最初のif文ではイコールが三つありますが`===`、これはかっこつけた書き方で、`==`と同じと思ってください。
commandというのが何かはツクールMV側の資料を調べないと分かりませんが、たぶんプラグインの名前が入っているっぽい？
この辺は私はプラグインコマンドというのが何なのか良く分かってないので推測です。

推測していじってみて動かし、結果を見てあってたかどうかを確認しながら理解を深めていくのが初期のやり方なので、こんな感じで分からない事は適当に推測して進めます。

プラグインコマンドの`command`が`"test_pl"`という文字だったら、このifの次の行を実行する、という意味になっています。
このシリーズではifの後には`{}`を付けてましたが、一行だけならつけなくても良い、という特別ルールがあります。

つまり、

```
    if( command === 'test_pl' )
        $gameMessage.add( "プラグインが呼び出されたよ☆" );
```

と

```
    if( command === 'test_pl' ){
        $gameMessage.add( "プラグインが呼び出されたよ☆" );
    }
```

は全く同じ意味です。違いが気にならないなら気にしなくてもOK。気になる人向けに説明してみました。
なお、自分で書く時はこれまでやった通り、いつも下のように書きましょう。（理由は秘密、私を信じて！）

で、そのifの実行される文。
`$gameMessage.add()`というのはゲームのメッセージウィンドウにメッセージを出すっぽいですね。
この講座でやっていた`MessageBox.show()`と似た物と言えそうです。

つまり全体としては、

1. もともとの関数を呼び出す（前の執事に用事を言いつける）
2. `command`が`"test_pl"`だったら、メッセージを表示する

という事をやるプラグインのようです。

以上でこのプラグインの基本は理解出来た事になります。どうでしょう？簡単？難しい？結局の所`function`の中以外はお約束みたいな物なので、
本当に重要なのはif文の所だけだったりします。これならこのシリーズをここまでやった人にとってはどうって事無いんじゃないでしょうか。

さて、ここで少し、callについて説明をしておきましょう。


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

`arguments[0]`は、下のコードの例だと

```
tansu.call(kumosaba, "です！");
```

一つ目では無く、二つ目の`"です！"`になります。

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

以下みたいな問題設定で、

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
  
　  
こ


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
  
　  
prototypeはちょっと特殊なので、実際のプラグインを使う時はthisを使わないといけない。
つまり、`motomoto.call(awa);`を`motomoto.call(this);`と直す必要がある。
（このprototypeを使ってない場合はthisとawaは完全に同じ物なのでどちらでも良い）。

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
  
　  
このように、p


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
コメントをつけてみましょう。


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
実際にプラグインをいじる時は上記三つの三点セットで関数を差し替える、と覚えてしまう方が簡単で良い気はします。

この三つをパターンとして覚えると、実は上のプラグインで残るのは、

```
    if( command === 'test_pl' )
        $gameMessage.add( "プラグインが呼び出されたよ☆" );
```

だけだったりします。この位は見れば意味も分かるでしょ？

# クリティカルのアニメーション追加プラグイン

もう一つ位、簡単なプラグインを見てみましょう。
[Javascriptが苦手な私によるプラグイン作成講座](http://ktnhmv.jugem.jp/?eid=12)にあるプラグインです。

このサイトのプラグインはもう一つの流儀である、「元のコードコピペ型」プラグインとなっています。


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


## trueとfalseと「どちらか（||）」または「どちらも（&&）」

今回`||`と`&&`が出てきたので、良い機会なのでif文のこの辺の話をしておきます。
[第四回](ch04.md)でif文についてやりましたが、必要最小限な事しかやっていませんでした。
基本さえ分かれば普段ツクール使ってれば、必要になった時に調べればだいたい分かるだろう、という事で。

でも最終回なのでその辺の事もまとめておきます。





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


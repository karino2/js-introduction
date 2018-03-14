---
title: "第五回: 配列"
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
    myInterpreter = new Interpreter('MessageBox = {show: SmokeAlert, yesNo: SmokeYesNo};', initFunc);
    scenarioPlayer = new Interpreter('MessageBox = {show: SmokeAlert, yesNo: SmokeYesNo};', initScnearioPlayerFunc);


    setupAllREPL2(6);
    setupAllQuestionsWithScnario(questions);
  }
</script>


第五回は配列です。

配列は、文字なんかを複数並べた物です。  
どうという事は無いのですが、RPGやアドベンチャーなどを作る時には良く使う事になるので、使いみちは多いものです。

また、この辺でプログラムに慣れていく事で、プログラマレベルを上げておきましょう。
という事で、ついでに乱数などもやりたいと思います。

という事でまずは配列とはなんぞや？という所からやっていきましょう。

# 配列って何よ？

配列は文字とか数字を並べた物です。

それってなんだよ、というのをちゃんと説明していくのはちょっと難しいので、まずは例をいろいろ見ていってなんとなく分かっていく所から始めましょう。

まずはるーしーな配列を作ってみましょう。

<div id="ex1">
<input type="button" value="実行" />
<textarea>
// 配列を作る
var lucy = ["こちんこちん", "しゅるしゅる", "麦茶", "こーしー", "ネクター", "蕎麦充", "ぬっくぬく"];

// 配列の三番目を表示する。何故か結果は「こーしー」
MessageBox.show(lucy[3]);</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
上のコードが配列の例です。`lucy`という変数に配列を入れて、その3番目の要素を取り出して表示しています。  
突然いろんな言葉が出てきましたね。順番に見ていきましょう。

なお、最初のうちは「なんでそんな事するの？」という気持ちでいっぱいだと思いますが、
そこは後から分かってくるので気にしないで進んでください。


## 配列の作り方

配列は、`[`と`]`でかこって、間を`,`で区切って作ります。
例を幾つか見てみましょう。

```
["文字", "の", "配列", "です"];
```

これで、配列という物が作れます。
文字が4つ並んでいる物です。

これで、以下の図みたいになります。

**TODO: 図**

なお、この配列の中身一つひとつを`要素`といいます。

**`要素`ということば**  
`要素`、なんか難しい言葉ですねぇ。`要素`。なんか「（キリッ」とか後ろにつけたくなる感じです。  
このシリーズでは、なるべく難しい言葉は使わないようにと考えているので、
最初この第五回は`要素`という言葉を使わずに書く気でした。  
　  
ただ、この`要素`という言葉、どうしても私が無意識に使ってしまうみたいで、使わないようにと思いながら書いていって、ふと文章を見直すと至る所で使っている…  
そういう訳で、諦めて今回でも`要素`という言葉を使っていく事にしました。すみません…
{: .column}


さて、配列は、数字でも作れます。例えば以下みたいな感じ。


```
[10, 11, 12, 13];
```

これで数字4つが入った配列が作れます。

また、要素の途中で改行を挟む事も出来ます。配列の場合も`,`の直後に入れてください。

```
["文字", "の",
 "配列",
 "です"];
```


### 配列を変数に入れる

作った配列は、いつもと同じ感じで変数に入れる事が出来ます。

```
var hairetu = ["文字", "の", "配列", "です"];
```

こうすると、`hairetu`という変数に、4つの文字が入った配列が入ります。


## 配列の要素を取り出す

配列の要素は変数の名前の後に`[`と`]`をつけて、間に数字を指定すると取り出せます。

例えば以下のように配列を作って

```
var hairetu = ["文字", "の", "配列", "です"];
```

そして「の」を取り出すとすると、こうなります。

```
hairetu[1];
```

やってみましょう。

<div id="ex2">
<input type="button" value="実行" />
<textarea>
var hairetu = ["文字", "の", "配列", "です"];
hairetu[1];</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
注意して欲しいのは、1と指定しているのに二番目が取り出されている事です。
2と指定すると3番目が取り出されます。

<div id="ex3">
<input type="button" value="実行" />
<textarea>
var hairetu = ["文字", "の", "配列", "です"];
hairetu[2];</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
これは配列が0から始まるからです。

### 配列の始まりは0番目から

JavaScriptにおいては、配列の一番最初の要素は「0番目」と呼びます。

だから、先程の配列は、

```
var hairetu = ["文字", "の", "配列", "です"];
```

以下の図のように並びます。

**TODO: 図**

だから`[0]`だと「文字」が、`[1]`だと「の」が、`[2]`だと「配列」が取り出されます。

さて、以後このシリーズでも、配列の要素は0番目から数える事にします。
つまり、最初が0番目、二番目が1番目となります。ややこしいですね。

ですがこの2つが混在すると先に進んだ時に凄く混乱するので、
ここでJavaScriptに我々の方を合わせてしまう事にします。

やってみましょう。ここでは、第一回でやった「文字の連結」も使って、
0番目と2番目を一気に表示してみます。

<div id="ex4">
<input type="button" value="実行" />
<textarea>
var hairetu = ["文字", "の", "配列", "です"];
MessageBox.show("0番目は" + hairetsu[0] + "、2番目は" + hairetu[2]);</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
実行すると「0番目は文字、2番目は配列」と表示されたと思います。
区切りが無いといまいち分かりにくいですね。

さて、新しいわけでは無いですが、以下の所はちょっと難しいですね。

```
"0番目は" + hairetsu[0] + "、2番目は" + hairetu[2]
```

これは`+`で文字を連結する、という奴ですね。一気に見るとなんか大変なので、最初2つだけ見てみましょう。


```
"0番目は" + hairetsu[0]
```

この`+`というので、文字と文字を連結するのでした。  
第一回では以下みたいな例をやりました。覚えてますか？

```
"ぬっくぬくなこーしーを" + "しゅるしゅるする"
```

これの二番目が配列になっている訳ですね。
以下のコードで、

```
"0番目は" + hairetsu[0]
```

`hairetu[0]`というのは、配列の0番目の要素を取り出す、という意味でした。
0番目の要素はこの場合`"文字"`となります。だから、以下のコードは

```
"0番目は" + "文字"
```

と書いてあるのと同じ結果になりますね。
では以下のコードは

```
"0番目は" + hairetsu[0] + "、2番目は" + hairetu[2]
```

同じように`hairetu[2]`の中身も入れてしまうと、

```
"0番目は" + "文字" + "、2番目は" + "配列"
```

となります。ちょっと実際にやってみましょう。


### 課題: 「やれbot」の配列を作れ

とりあえず三つくらいにしておきますか。
以下の三つの文字を持つ配列を作ってください。

- 筋トレしろ
- 自意識チェックをしろ
- 聴け！


<script>
var qobj = {
    id: "q1",
    scenarios: []
}


qobj.scenarios.push({
    setup: ()=> {},
    verify: (intp) => {
        var actual = intp.pseudoToNative(intp.getProperty(intp.global, "yare"));
        if(actual == undefined) {
          return "変数 yareがどっかいっちゃった？";
        }
        var expect = ["筋トレしろ", "自意識チェックをしろ", "聴け！"];
        return verifyArrayEqual(expect, actual);
    }
});
  questions.push(qobj);
 </script>


<div id="q1">
    <input type="button" value="実行" />
    <textarea>
// この行を書き換えて、指定された配列を作れ。
var yare = [];

MessageBox.show(yare);</textarea>
    <b>結果:</b> <span class="console"></span><br>
    <span class="result"></span><br>
    <input type="button" value="答えを見る" />
    <div class="answer hideanswer">
答え:<br>
var yare = ["筋トレしろ", "自意識チェックをしろ", "聴け！"];
    </div>        
</div>
  
　  
もう一つ作ってみましょうか。

### 課題: lucyの配列を作れ

せっかくなのでlucyも作ってみましょう。
とりあえず以下くらいにしましょうか。

- こちんこちん
- ぬっくぬく
- 麦茶
- こーしー
- しゅるしゅるする

<script>
var qobj = {
    id: "q2",
    scenarios: []
}


qobj.scenarios.push({
    setup: ()=> {},
    verify: (intp) => {
        var actual = intp.pseudoToNative(intp.getProperty(intp.global, "lucy"));
        if(actual == undefined) {
          return "変数 lucyがどっかいっちゃった？";
        }
        var expect = ["こちんこちん", "ぬっくぬく", "麦茶", "こーしー", "しゅるしゅるする"];
        return verifyArrayEqual(expect, actual);
    }
});
  questions.push(qobj);
 </script>


<div id="q2">
    <input type="button" value="実行" />
    <textarea>
// この行を書き換えて、指定された配列を作れ。
var lucy = 0;

MessageBox.show(lucy);</textarea>
    <b>結果:</b> <span class="console"></span><br>
    <span class="result"></span><br>
    <input type="button" value="答えを見る" />
    <div class="answer hideanswer">
答え:<br>
var lucy = ["こちんこちん", "ぬっくぬく", "麦茶", "こーしー", "しゅるしゅるする"];
    </div>        
</div>
  
　  
配列の作り方はこんな感じです。
次は取り出し方をやってみましょう。

### 課題: 配列の要素を取り出して文を作れ

以下の配列、lucyから要素を取り出して、それと残った文を組み合わせて

「さて、お濁り様の小宴は開くとしようかね。」

という文を表示せよ。  
ちょっとパズルっぽいです。二行目には`,`が複数あるのに注意。「ぜろ、いち、にー、さん、よん…」と何度も数える事になるでしょう。

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
        if(actual != "さて、お濁り様の小宴は開くとしようかね。") {
          return "表示されたメッセージが違います。";
        }
        return true;
    }
});
  questions.push(qobj);
 </script>


<div id="q3">
    <input type="button" value="実行" />
    <textarea>
var lucy = ["開くとしようかね",
            "こーしー", "お濁り様の", "もぅ、しみっしみ、もぅ",
            "麦茶", "小宴は"];


// 以下の行を書き換えて、目的の文を完成させてください。ただしlucy配列と+を（たくさん）足すだけで出来るはず。
var onigori = "さて、" + lucy[1] + "。";

MessageBox.show(onigori);</textarea>
    <b>結果:</b> <span class="console"></span><br>
    <span class="result"></span><br>
    <input type="button" value="答えを見る" />
    <div class="answer hideanswer">
答え:<br>
var onigori = "さて、" + lucy[2] + lucy[5] + lucy[0] + "。";
    </div>        
</div>
  
　  
こんな感じです。現時点では、とりあえず書き方に慣れてください。使い方はおいおい分かって来ると思うので。

**配列の最初は0番目？1番目？**  
配列の最初が0番目か1番目かは、言語によって異なります。
だいたいかっこつけてる言語は0番目から数えて、ゆとりっぽい言語は1番目から数えます。  
　  
例えばJavaScript、C、Javaなどはみんな0番目ですね。
一方で有名な所ではVBが1番目ですね。プログラムじゃないけどExcelも1から始まりますね。  
そういえばRとかMatlab、Octaveなどの数値計算系の言語も1番目か。  
こうして並べてみると、むしろ1番目から始まる言語の方が難しそうなのが多いですね。  
ゆとり説は最近は嘘か。  
　  
なんにせよ、配列の最初の要素が0か1かは言語によって決まっていて、
JavaScriptはたまたま0だ、という事です。
{: .column}


# 乱数でランダム

配列だけだといまいち面白い例が作れないので、ついでに乱数もやっておきましょう。
乱数は難しい概念ですが、ツクールとか触っている人は結構余裕でしょう。

さて、乱数も厳密には環境ごとに定義される物ですが、これはどこの環境もだいたい似たりよったりです。
このシリーズでは、`Math.randomInt`という物をこの目的に使う事にします。

例えば、0, 1, 2, 3, 4のどれかの数字を得たい場合、以下のようにします。

```
Math.randomInt(5);
```

このrandomIntは、0から指定された数字の「一つ下」までの乱数を返します。
いつも0からです。で、`5`を指定すると`5`は返ってきません。
`4`までしか返って来ないのです。  
なんでよ、って思うかもしれないけれど、ツクール MVがそうだから揃えました…  
0から数えるので一つ下まで、という事なのかもしれません。

実際に動かしてみましょう。


<div id="ex5">
<input type="button" value="実行" />
<textarea>
var doreka = Math.randomInt(5);
MessageBox.show(doreka);</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
何度か実行すると、0〜4の数字のどれかが毎回変わって実行されるはずです。
そして何回実行しても5にはならないはずです。

でも毎回0からじゃ困る事がありますよね。
例えばサイコロ作るなら1から6です。0の目とか出られても困ります。

そういう時は、結果に1を足せば良いのです。
サイコロはわかりやすいので課題にまわして、例えば3〜5の乱数が欲しいとします。

そういう時は、0〜2の乱数を作って、3を足せば良いのです。
やってみましょう。

**3, 4, 5の３つの数のどれかを表示**
<div id="ex6">
<input type="button" value="実行" />
<textarea>
// 0, 1, 2のどれか
var doreka = Math.randomInt(3);

// 3を足すので、3, 4, 5のどれかになる。
doreka = doreka + 3;

MessageBox.show(doreka);</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
どうですかね。足し算！算数！無理！とかだったらごめんなさい…












**コラム**  
一ブロック  
　  
二ブロック
{: .column}




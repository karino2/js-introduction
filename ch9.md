---
title: "第九回: 関数その3 関数に渡すもの"
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


  setupAllREPL2(3);
  setupAllQuestionsWithScnario(questions);
}
</script>


第九回では、関数にいろいろ`渡す`事について説明していきます。
JavaScriptの用語では`arguments`の説明となります。

第八回の`return`とはちょうど対照的な話です。
もともと一回だったものを二つに分けたので、こっちは短めです。たまにはいいでしょう。

### 「渡す」とお嬢様とセバスチャン

今回の内容を[第八回](8.md)で見た「お嬢様とセバスチャン」というたとえで説明すると、
関数に何かを`渡す`というのは、お嬢様からセバスチャンに「呼びかける時に渡す物」という事になります。

例えば欲しい物のメモとかをお嬢様がさらさら書いて、「セバスチャン、これよろしくね」と渡す感じですね。

それをセバスチャンが受け取って、そこに書いてあることを元にいろいろやる、という事になります。

`お嬢様ー＞セバスチャン`

という向きを意識するのが大切です。  
では具体的に見ていきましょう。


# これまでの例から見る「渡す」

`渡す`というのは、実はこれまでこっそりやっていました。
これまで見てきた、`MessageBox.show("むぇーー");`や`Math.randomInt(5);`というのは、
実は第九回のテーマである`渡す`という事をやっています。

そこで導入として、これまでやってきた`渡す`というコードについて、該当部分を見てみる事から始めましょう。

## 文字を`渡す`、数字を`渡す`

[第七回](ch7.md)では、関数を作って使う、という話をしました。
`lucy();`などのように、`()`をつけると関数が使える、という話でした。

ですが、第七回でやった`lucy();`のような関数の呼び方と、`MessageBox.show("むぇーー");`には、名前の所が長い以外にも違いがあります。

`"むぇーー"`というのがカッコの中に入ってますね。
これが関数に文字を`渡す`というコードになります。
お嬢様が`MessageBox.show`さんに`"むぇーー"`と書いたメモを渡す感じです。

また、[第五回](ch5.md)では、`Math.randomInt(5);`という乱数を作る方法もやりました。
こうすると、0から4までの数字がランダムに得られる、という奴です。

で、この`Math.randomInt(5);`も実は関数だったのです！  
って別に驚かないですか。そうですか(´・ω・｀)

とにかくこれは関数を`使っている`コードなのですが、やはりカッコの中には5が入ってますね。
つまり`(5)`となっている。
この`(5)`も、関数に`5`を`渡している`、というコードになります。
この場合はお嬢様がrandomIntさんに`5`と書いたメモを渡している感じですね。

このように、何かを関数に`渡す`時は、その関数を`使う`時に、`(`と`)`の間にそれを入れます。

さらに、`MessageBox.yesNo`は、3つも文字を`渡します`。
例えば以下のコードは、


```
MessageBox.yesNo("こちんこちん？", "はい", "いいえ");
```

以下の3つの文字を`渡しています`。

1. `"こちんこちん？"`
2. `"はい"`
3. `"いいえ"`

もう一つ例を挙げると以下のコードは

```
MessageBox.yesNo("ついに念願のアイスソードを手に入れたぞ！",
"そう関係ないね",
"殺してでもうばいとる"
);
```

以下の3つの文字を`渡しています`。

1. `"ついに念願のアイスソードを手に入れたぞ！"`
2. `"そう関係ないね"`
3. `"殺してでもうばいとる"`

このように、文字を3つとか`渡す`時は、`,`で区切って並べる事で複数の文字を`渡す`事が出来ます。

### このように、「渡す」は既にやっていた

ここまでで、導入として既に見てきたコードを見直す事で`渡す`という事について、簡単に見てきました。

実は第九回のテーマのうち半分は別に新しくありません。
ただこれまであまりちゃんと説明せずにやっていた事なので、今回はそれをちゃんと説明していこう、という話です。

後半では関数を`使う`側でそれをどう使うか、という新しい話も出てきますが、
まずは`渡す`というのをこれまでのコードとしっかり結びつけた上で見ていくと、
整理されて見えてくると思います（だといいな）。

今回の難しい部分も、結局は嬢様とセバスチャン的な考え方がちゃんと出来るか、という問題になります。
そういう点で難しい部分のかなりの部分は第八回でやってしまった事になります。
だから意外とちょろいかも？

という事で以下で個々の解説をしていきましょう。

# 関数に渡す、受け取る

ここでは、関数に文字などを`渡し`、関数の側では`受け取る`という事を話していきます。
お嬢様が渡して、セバスチャンが受け取る訳ですね。

それぞれ関数を`使う側`と`作る側`に対応しています。


| 使う側（お嬢様側）      | 作る側（セバスチャン側）       |
| ----------- | --------    |
| （文字や数字を）渡す        | （文字や数字を）受け取る     |


`渡す側`はここまで見てきた、`MessageBox.show("むぇーー");`などの事です。
この渡された文字を、関数を`作る側`では`arguments`という特殊な変数で`受け取る`、というのが、第九回の全体像となります。


## 関数に文字や数字を渡す

まずはお嬢様側から。

関数を`使う`時には、文字や数字を`渡す`事が出来ます。

まず、関数は、変数名の後に`()`をつけると`使う`事が出来る、というのを第七回でやりました。
`naku();`とか`lucy();`とかですね。

このカッコの中に`渡したい物`を入れると、`渡す`事が出来ます。
例えば、

```
naku("ほげー");
```

とか

```
lucy("こちんこちん");
```

とかで、文字を渡す事が出来ます。

複数の文字とか数字を渡したい場合は、`,`で区切ります。

```
lucy("こちんこちん", 15321, 25);
```

という感じです(数字に意味は無いです）。

## 渡された文字や数字を受け取る(arguments)

次にセバスチャン側。

関数を`作る時`に、使われる時に渡される物を`arguments`という変数で受け取る事が出来ます。
`arguments`は配列になっています。
1つ目が`arguments[0]`、2つ目が`arguments[1]`で取り出せます。
セバスチャン側はお嬢様から渡された物をargumentsという変数で見てみる事が出来る訳です。

やってみましょう。


<div id="ex1">
<input type="button" value="実行" />
<textarea>
var awa = function() {
   MessageBox.show(arguments[0]);
};

awa("むぇーー");</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
短いですがなかなか複雑なプログラムです。
重要な所を抜き出してみましょう。


```
var awa = function() {
   MessageBox.show(arguments[0]);
};
```

関数を作る時には（セバスチャン側）、`arguments`という変数で、数字や文字を受け取る事が出来ます。
この`arugments`は配列になっていて、（お嬢様側から）一番目に渡されたものを、`arguments[0]`で、
二番目に渡された物を`arguments[1]`で受け取る事が出来ます。

だから上のコードの関数の`中身`、つまり以下の部分は、

```
   MessageBox.show(arguments[0]);
```

1つ目にお嬢様側から渡された物を表示する、という意味となります。

だから、使う時が`awa("むぇーー"）;`なら`”むぇーー”`と表示されますし、
`awa(5, "コケー");`なら`5`が表示されます。1つ目が表示されるので`"コケー"`じゃない事に注意です。

やってみましょう。

<div id="ex2">
<input type="button" value="実行" />
<textarea>
var awa = function() {
   MessageBox.show(arguments[0]);
};

awa(5, "コケーー");</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
なお、渡されてない物を受け取ろうとすると、そんなの無い、とエラーになります。

もうひとつ例を見てみましょう。文字を3つ受け取って、受け取った物を逆の順番に表示する、という関数を作ります。

<div id="ex3">
<input type="button" value="実行" />
<textarea>
var gyaku = function() {
   MessageBox.show(arguments[2]);
   MessageBox.show(arguments[1]);
   MessageBox.show(arguments[0]);
};

gyaku("こちんこちんに", "冷えた", "麦茶");</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
実行してみると、渡した順番と逆の順番で表示されますね。

```
var gyaku = function() {
   MessageBox.show(arguments[2]);
   MessageBox.show(arguments[1]);
   MessageBox.show(arguments[0]);
};
```

セバスチャンとしては、お嬢様から渡される物を、2番目、1番目、0番目という逆の順番でshowしている訳です。

そしてお嬢様の側は以下のコードになっています。

```
gyaku("こちんこちんに", "冷えた", "麦茶");
```

|0番目|`"こちんこちんに"`|
|1番目|`"冷えた"`|
|2番目|` "麦茶"`|

という順番に文字を渡しているので、これを2, 1, 0の順番に表示すると、上のような結果となります。

ま、いろいろやっていくと分かってくる部分もあると思うので、幾つか実際にやってみましょう。

### 課題：むぇーと表示せよ

渡された`"むぇー"`を表示してください。
渡されてない物を表示しても正解って出ちゃいますが、ズルしないで！


<script>
var qobj = {
    id: "q1",
    scenarios: []
}


qobj.scenarios.push({
    setup: ()=> {},
    verify: (intp) => {
        if(scenarioLogs.length == 0 || scenarioLogs[0].name != 'alert') {
          return "結果が表示されていません。MessageBox.show使ってね。";
        }
        var actual = scenarioLogs[0].val;
        if(actual != "むぇー") {
          return "表示されたメッセージが違います。";
        }
        return true;
    }
});
  questions.push(qobj);
 </script>


<div id="q1">
    <input type="button" value="実行" />
    <textarea>
// TODO: 以下をargumentsを使って書き換えよ
var awa = function() {
};

awa("むぇー");</textarea>
    <b>結果:</b> <span class="console"></span><br>
    <span class="result"></span><br>
    <input type="button" value="答えを見る" />
    <div class="answer hideanswer">
答え:<br>
var awa = function() { <br>
&nbsp;&nbsp;&nbsp;&nbsp;MessageBox.show(arguments[0]);<br>
}<br>
    </div>        
</div>
  
　  
次はもうちょっと複雑なのをやってみましょう。


### 課題：こちんこちんに、麦茶、冷えたと受け取る奴

以下の関数を書き換えて、

1. `"こちんこちんに"`
2. `"麦茶"`
3. `"冷えた"`

の順に表示せよ。

ヒント： 上の`gyaku`と似てる。


<script>
var qobj = {
    id: "q2",
    scenarios: []
}


qobj.scenarios.push({
    setup: ()=> {},
    verify: (intp) => {
        if(scenarioLogs.length != 3 || scenarioLogs[0].name != 'alert') {
          return "結果が表示されていません。MessageBox.show使ってね。";
        }
        var expects = ["こちんこちんに", "麦茶", "冷えた"];
        for(var i = 0; i < expects.length; i++) {
            if(expects[i] != scenarioLogs[i].val) {
                return `${i}番目に表示された物が"${expects[i]}"ではありません。`;
            }
        }
        return true;
    }
});
  questions.push(qobj);
 </script>


<div id="q2">
    <input type="button" value="実行" />
    <textarea>
// TODO: 以下を書き換えよ
var lucy = function() {
};


lucy("こちんこちんに", "冷えた", "麦茶");</textarea>
    <b>結果:</b> <span class="console"></span><br>
    <span class="result"></span><br>
    <input type="button" value="答えを見る" />
    <div class="answer hideanswer">
答え:<br>
var lucy = function() { <br>
&nbsp;&nbsp;&nbsp;&nbsp;MessageBox.show(arguments[0]);<br>
&nbsp;&nbsp;&nbsp;&nbsp;MessageBox.show(arguments[2]);<br>
&nbsp;&nbsp;&nbsp;&nbsp;MessageBox.show(arguments[1]);<br>
}<br>
    </div>        
</div>
  
　  
もっと難しいのもやってみますか。


### 課題: ニワトリか餅かに応じて、「むぇー」か「コケー」を表示せよ

今度はランダムで`"ニワトリ"`か`"餅"`が渡ってきます。
`"ニワトリ"`だったら`"コケー"`と表示し、`"餅"`だったら`"むぇー"`と表示してください。

これは第九回の内容どうこうよりも、これまでやってきた所が難しい、という課題ですね。


**ヒント**

- argumentsを使います
- 関数の中でif文が必要です
- お嬢様側のコードは理解しなくても、何が渡されてくるかだけ気をつければ書けるはずだし、そうやって反対側を考えない方がむしろ良い。（その為、わざとお嬢様側は難しく書いてます）


<script>
var qobj = {
    id: "q3",
    scenarios: [],
    sampleNum: 50
}




qobj.scenarios.push({
    setup: ()=> {},
    verify: (intp) => {
        if(scenarioLogs.length == 0 || scenarioLogs[0].name != 'alert') {
            return "結果が表示されていません。MessageBox.show使ってね。";
        }

        var counts = countElem(scenarioLogs.map((res)=> res.val));
        var resKeys = Object.keys(counts);
        if(resKeys.length != 2) {
            return "結果が2通りじゃありません。";
        }
        expects = ["むぇー", "コケー"];
        if(expects[0] != resKeys[0]) {
            if(expects[0] != resKeys[1]) {
               return `"${expects[0]}"が表示されていません。`;
            }
        }
        if(expects[1] != resKeys[0]) {
            if(expects[1] != resKeys[1]) {
               return `"${expects[1]}"が表示されていません。`;
            }
        }
        return true;  
    }
});
  questions.push(qobj);
 </script>


<div id="q3">
    <input type="button" value="実行" />
    <textarea>
// TODO; 以下を渡される物に応じて表示を変えよ
var awa = function() {
}


// 以下はいじらないでね。
var labels = ["餅", "ニワトリ"];

awa(labels[Math.randomInt(2)]);</textarea>
    <b>結果:</b> <span class="console"></span><br>
    <span class="result"></span><br>
    <input type="button" value="答えを見る" />
    <div class="answer hideanswer">
答え:<br>
var awa = function() { <br>
&nbsp;&nbsp;&nbsp;&nbsp;if(arguments[0] == "餅") {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MessageBox.show("むぇー");<br>
&nbsp;&nbsp;&nbsp;&nbsp;} else {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MessageBox.show("コケー");<br>
&nbsp;&nbsp;&nbsp;&nbsp;}<br>
}<br>
    </div>        
</div>
  
　  
もしこのままでは分からない場合の追加のヒント。お嬢様側は以下と同じコードになります。

```
var niwatori = Math.randomInt(2);
if(niwatori == 1) {
   awa("ニワトリ");
} else {
   awa("餅");
}
```

一見難しいですが、理解しなくてはいけないのは、以下の2つがランダムに呼ばれる、という事だけ！

- `awa("ニワトリ");`
- `awa("餅");`



### 課題：「当たり！」を出せ

次はセバスチャンはこちらで用意したものを使う事にして、お嬢様側を書く、という課題をやってみましょう。

今回はtakarakuji関数のコードを読んで、「当たり！」がでるように渡す物を考えて関数を呼び出します。
複雑に見えるようにしてますが、こけおどしなので騙されてはいけません。

<script>
var qobj = {
    id: "q4",
    scenarios: []
}


qobj.scenarios.push({
    setup: ()=> {},
    verify: (intp) => {
        if(scenarioLogs.length != 1 || scenarioLogs[0].name != 'alert') {
          return "結果が表示されていません。takarakujiが呼び出せてない？";
        }
        if("当たり！" != scenarioLogs[0].val) {
                return `当たり！って表示されてません。`;
        }
        return true;
    }
});
  questions.push(qobj);
 </script>


<div id="q4">
    <input type="button" value="実行" />
    <textarea>
var takarakuji = function() {
    if(arguments[0] == 1) {
        MessageBox.show("ハズレ！");
    } else if(arguments[0] < 3) {
        MessageBox.show("ハズレ！");
    } else if(arguments[0] == 5132) {
        MessageBox.show("当たり！");
    } else {
        MessageBox.show("ハズレ！");
    }
};

// TODO: 以下を書き換えて「当たり！」と表示せよ
takarakuji(0);</textarea>
    <b>結果:</b> <span class="console"></span><br>
    <span class="result"></span><br>
    <input type="button" value="答えを見る" />
    <div class="answer hideanswer">
答え:<br>
takarakuji(5132);<br>
    </div>        
</div>
  
　  
もうひとつお嬢様側を書く課題をやってみましょう。

### 課題：安心と信頼の雲鯖


プレーヤーに「twitterとmastodon、どっちが安定している？」と質問して、
twitterって答えたら`"鳥はオワコン"`と表示し、mastodonと答えたら`"安心と信頼の雲鯖"`と表示するように、
関数kumosabaを呼び出すコードを書いてください。

普通に書くとif文が要ります。（配列を使ってif文無しでも解けます）


<script>
// dup from ch8.md

function verifyYesNoAlert_Yes(expect, label) {
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
    if(scenarioLogs[1].val != expect) {
        return label;
    }
    return true;
}

function verifyYesNoAlert_No(expect, label) {
    if(scenarioLogs.length == 1) {
        return "「いいえ」を選んだ時に、結果が表示されていません。MessageBox.showを使って表示してください。";
    }
    if(scenarioLogs.length >= 3) {
        return "「いいえ」を選んだ時、たぶん二回表示されています。";
    }
    if(scenarioLogs[1].name == "yesNo") {
        return "「いいえ」を選んだ時、二回質問されました。なんで？";
    }

    
    if(scenarioLogs[1].val != expect) {
        return label;
    }
    return true;
}

function yesNoAlertQuestionPush(id, yesExpect, yesFailLabel, noExpect, noFailLabel) {
    var qobj = {
        id: id,
        scenarios: []
    };

    qobj.scenarios.push({
        setup: ()=> returnValues.push(1),
        verify: () => verifyYesNoAlert_Yes(yesExpect, yesFailLabel)
    });
    qobj.scenarios.push({
        setup: ()=> returnValues.push(0),
        verify: () => verifyYesNoAlert_No(noExpect, noFailLabel)
    });
    questions.push(qobj);
}

yesNoAlertQuestionPush("q5", "鳥はオワコン", "twitter選んでも「鳥はオワコン」って出てない！",
 "安心と信頼の雲鯖", "mastodonを選んでも「安心と信頼の雲鯖」って出てない！");

 </script>


<div id="q5">
    <input type="button" value="実行" />
    <textarea>
// 以下はいじらないでください。
var kumosaba = function() {
    if(arguments[0] == "雲鯖") {
       MessageBox.show("安心と信頼の雲鯖");
    } else if(arguments[0] == "鳥") {
       MessageBox.show("鳥はオワコン");
    } else {
       // ここには来ないように！
       MessageBox.show("むぇー");
    }
};

var docchi = MessageBox.yesNo("twitterとmastodon、どっちが安定してる？",
 "twitter", "mastodon");

// TODO: 以下をdocchiを使って書き直せ。（ヒント：ifが要ります）
kumosaba();

</textarea>
    <b>結果:</b> <span class="console"></span><br>
    <span class="result"></span><br>
    <input type="button" value="答えを見る" />
    <div class="answer hideanswer">
答え:<br>
if(docchi == 1) { <br>
&nbsp;&nbsp;&nbsp;&nbsp;kumosaba("鳥");<br>
} else {<br>
&nbsp;&nbsp;&nbsp;&nbsp;kumosaba("雲鯖");<br>
}<br>
    </div>        
</div>
  
　  
`arguments`自体はどうって事無くても、課題はかなり難しいですね。
課題が解けなくてもその前まで理解出来ていればそんな落ち込まなくてもいいと思います。


# まとめ

1. 関数を使う側（お嬢様側）は、文字や数字を`渡せる`。
2. 関数を作る側（セバスチャン側）は、文字や数字を`arguments`という変数で受け取る事が出来る。

ついでに言っておくと、この渡す物をプログラムの用語で`引数`と呼びます。読み方は「ひきすう」です。
別にこんな言葉は使わなくてもいいですが、よその解説読む時に出てくるかもしれないので、一応触れておきます。



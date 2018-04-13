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


  setupAllREPL2(5);
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
次はもう少し複雑な関数も作ってみましょう。

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



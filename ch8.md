---
title: "第八回: 関数その2 関数に渡すもの、もらうもの"
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


  setupAllREPL2(1);
  setupAllQuestionsWithScnario(questions);
}
</script>


前回は、関数という物を`作って`そして`使う`方法を見てきました。

第八回では、この関数にいろいろ渡したり、関数から結果をもらったりする事について説明していきます。
JavaScriptの用語では`arguments`と`return`の説明となります。

# これまで（実は）出てきていた関数たち

突然ですが、実はこれまで、既に幾つかの関数が出てきていました。具体的には、

1. MessageBox.show()
2. MessageBox.yesNo()
3. Math.randomInt()

の3つは関数です。
なんと、既に関数は使っていたのですね。


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


**なんで`.`でも要素が取り出せるのか？の勝手な予想**  
JavaScriptの辞書は、キーがローマ字っぽい時だけは`.`でも取り出せる、という機能があります。
これは無くても同じ事が`["show"]`とかで出来るので、不要な感じがしますよね。  
なんでこんな中途半端な機能があるのか？  
　  
これは私の勝手な予想ですが、たぶん見た目を`Java`というプログラミング言語に似せる為だと思います。
Javaは辞書とは全く別の仕組みで、`MessageBox.show("むぇーー");`というような書き方でメッセージを表示する言語です。  
これと見た目の上では似た感じにする為、辞書から要素を取り出すのに、ローマ字っぽいキーの時は`.`でも取り出せるようにしよう、というヘンテコな機能がついたのだと思います。
　  
勉強する側としてはあまり深く考えず、当時のNetscape社の頭の硬い上司を説得する為に、
見た目はJava言語っぽいですよ〜と嘘をつかなきゃいけなかったので、この`.`でも取り出せる、とか良く分からない事があるんだなぁ、くらいに思っておけば良いと思います。  
本当かどうかは知りませんが。
{: .column}


## 文字を`渡す`、数字を`渡す`

さて、前回やった、`lucy();`と`MessageBox.show("むぇーー");`には、
名前の所が長い以外にも違いがあります。`"むぇーー"`というのがカッコの中に入ってますね。
これが関数に文字を`渡す｀というコードになります。

第八回の2つのテーマの一つ目ですね。

また、[第五回](ch5.md)では、`Math.randomInt(5);`という乱数を作る方法もやりました。
こうすると、0から4までの数字がランダムに得られる、という奴です。
さすがにもう忘れちゃってますかね…  
まぁやったんです。ツクールユーザー的にはそんな難しくないので、忘れてても今見れば分かるでしょう。

で、この`Math.randomInt(5);`も関数を使っているコードなのですが、やはりカッコの中には5が入ってますね。
`(5)`となっている。
この`5`も、関数に`5`を`渡している`、というコードになります。








この辞書の話はあとで改めて行う事にしますが、ここではとにかく、`MessageBox.show`というのは、
関数が入っている変数のようなものだ、と思っておいてください。

で、`変数`の後に`()`をつけると関数が呼び出せるというのを前回やったので、
`MessageBox.show()`で関数が呼び出せる事になります。



まずはこれまでやってきた｀MessageBox.show｀や`Math.randomInt`

### MessageBox.showを考え直す

突然ですが、`MessageBox.show("むぇーー");`というコードも、
実は関数を`使う`というコードです。


`MessageBox.show



# 結果を返す、結果を受け取る

関数は`中身`を実行したあと、`結果を返す`事が出来ます。
返ってきた結果は`受け取って`、その結果に応じて処理が行なえます。

### TODO: 図



ここでは、まず関数を`使う`側からそれがどう見えるのか話をして、
その後で`作る`側がそれをどう実現するのかを見ていきます。



## 結果を受け取る（使う側から見た話）

関数は、`lucy();`とか、`naku();`などという風にすると`使う`事が出来る、
という話を前回しました。

結果を受け取るには、これを以下のようにします。

```
var kekka = lucy();
```

この結果を受け取る、という事について、少し詳しく見ていきましょう。





<div id="ex2">
<input type="button" value="実行" />
<textarea>

// 関数を作る
var naku = function() {
   MessageBox.show("むぇーー");
};

// 関数を使う
naku();</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
実行すると、












**コラムの例**  
最初のブロック  
　  
二つ目のブロック
{: .column}



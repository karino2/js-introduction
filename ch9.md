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


  setupAllREPL2(1);
  setupAllQuestionsWithScnario(questions);
}
</script>


第九回では、関数にいろいろ`渡す`事について説明していきます。
JavaScriptの用語では`arguments`の説明となります。


# これまでの例から見る「渡す」

`渡す`というのは、実はこれまでこっそりやっていました。
これまで見てきた、`MessageBox.show("むぇーー");`や`Math.randomInt(5);`というのは、
実は第九回のテーマである`渡す`という事をやっています。

そこで導入として、これまでやってきた`渡す`というコードについて、該当部分を見てみる事から始めましょう。

## 文字を`渡す`、数字を`渡す`

第七回でやった`lucy();`のような関数の呼び方と、`MessageBox.show("むぇーー");`には、名前の所が長い以外にも違いがあります。
`"むぇーー"`というのがカッコの中に入ってますね。
これが関数に文字を`渡す`というコードになります。

また、[第五回](ch5.md)では、`Math.randomInt(5);`という乱数を作る方法もやりました。
こうすると、0から4までの数字がランダムに得られる、という奴です。
さすがにもう忘れちゃってますかね…  
まぁやったんです。ツクールユーザー的にはそんな難しくないので、忘れてても今見れば分かるでしょう。

で、この`Math.randomInt(5);`も実は関数だったのです！  
って別に驚かないですか。そうですか(´・ω・｀)

とにかくこれは関数を`使っている`コードなのですが、やはりカッコの中には5が入ってますね。
つまり`(5)`となっている。
この`(5)`も、関数に`5`を`渡している`、というコードになります。

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

という事で以下ではちゃんと解説していきましょう。

# 関数に渡す、受け取る

ここでは、関数に文字などを`渡し`、関数の側では`受け取る`という事を話していきます。
それぞれ関数を`使う側`と`作る側`に対応しています。


| 使う側      | 作る側       |
| ----------- | --------    |
| （文字や数字を）渡す        | （文字や数字を）受け取る     |


`渡す側`はここまで見てきた、`MessageBox.show("むぇーー");`などの事です。
この渡された文字を、関数を`作る側`では`arguments`という特殊な変数で`受け取る`、というのが、残りの内容になります。

まずは`渡す`方から詳しく見ていきましょう。



## 関数に文字や数字を渡す

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

とかですね。

複数の文字とか数字を渡したい場合は、`,`で区切ります。

```
lucy("こちんこちん", 15321, 25);
```

という感じですね(数字に意味は無いです）。

## 渡された文字や数字を受け取る(arguments)

関数を`作る時`に、使われる時に渡される物を`arguments`という変数で受け取る事が出来ます。
`arguments`は配列になっています。
1つ目が`arguments[0]`、2つ目が`arguments[1]`で取り出せます。

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

`関数を作る時`には、`arguments`という変数で、数字や文字を`受け取れます`。
この`arugments`は配列になっていて、一番目に`渡された`ものを、`arguments[0]`で、
二番目に渡された物を`arguments[1]`で受け取る事が出来ます。

だから上のコードの関数の`中身`、つまり以下の部分は、

```
   MessageBox.show(arguments[0]);
```

1つ目に`渡された物`を表示する、という意味となります。
だから、使う時が`awa("むぇーー"）;`なら`”むぇーー”`と表示されますし、
`awa(5, "コケー");`なら`5`が表示されます。1つ目が表示されるので`"コケー"`じゃない事に注意です。

なお、`渡されてない物`を`受け取ろう`とすると、そんなの無い、とエラーになります。

ここまでで分かるように、`受け取る`というのは、`渡される`側とセットで考える必要があります。
`受け取る`のは`渡された物`なので、何を`渡した`かが大切です。

この`渡す`とか`受け取る`とかを頭の中で行ったり来たりするのが関数の難しさですね…




**コラムの例**  
最初のブロック  
　  
二つ目のブロック
{: .column}



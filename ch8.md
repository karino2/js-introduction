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


  setupAllREPL2(5);
  setupAllQuestionsWithScnario(questions);
}
</script>


前回は、関数という物を`作って`そして`使う`方法を見てきました。

第八回では、この関数にいろいろ渡したり、関数から結果をもらったりする事について説明していきます。
JavaScriptの用語では`arguments`と`return`の説明となります。

第八回は

1. 関数に数字や文字を`渡す`
2. 関数から結果を`もらう`

の二つを扱います。

# これまで（実は）出てきていた関数たち

突然ですが、実はこれまで、既に幾つかの関数が出てきていました。具体的には、

1. MessageBox.show()
2. MessageBox.yesNo()
3. Math.randomInt()

の3つは関数です。
なんと、既に関数は使っていたのですね。

そしてこれらは実は、文字や数字を`渡したり`、結果を`もらったり`してました。
第八回のテーマは、実は既にやっていた事なのです。

これまでぼやかして使っていたこれらの事を、今回は真面目に解説していきます。


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
　  
勉強する側としてはあまり深く考えず、当時のNetscape社の頭の硬い上司を説得する為に、
見た目はJava言語っぽいですよ〜と嘘をつかなきゃいけなかったので、この`.`でも取り出せる、とか良く分からない事があるんだなぁ、くらいに思っておけば良いと思います。  
本当かどうかは知りませんが。
{: .column}


## 文字を`渡す`、数字を`渡す`

さて、前回やった`lucy();`と、これまで見てきた`MessageBox.show("むぇーー");`には、
名前の所が長い以外にも違いがあります。`"むぇーー"`というのがカッコの中に入ってますね。
これが関数に文字を`渡す｀というコードになります。

第八回の2つのテーマの一つ目です。

また、[第五回](ch5.md)では、`Math.randomInt(5);`という乱数を作る方法もやりました。
こうすると、0から4までの数字がランダムに得られる、という奴です。
さすがにもう忘れちゃってますかね…  
まぁやったんです。ツクールユーザー的にはそんな難しくないので、忘れてても今見れば分かるでしょう。

で、この`Math.randomInt(5);`も関数を使っているコードなのですが、やはりカッコの中には5が入ってますね。
`(5)`となっている。
この`5`も、関数に`5`を`渡している`、というコードになります。

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

このように、文字を3つとか`渡す`時は、`,`で区切って並べる事で`渡す`事が出来ます。


## 結果を`もらう`


さて、`Math.randomInt(5)`や、`MessageBox.yesNo`などは、結果を変数に受け取る事が出来ました。
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

これが第八回の二つ目のテーマ、`結果をもらう`です。

`MessageBox.yesNo`も同様です。

<div id="ex4">
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


### 関数を使う側から見た、渡す事ともらう事

以上見てきた二つの内容が、第八回で扱う内容です。
もう一度ここにまとめておきましょう。

1. 関数に数字や文字を`渡す`
2. 関数から結果を`もらう`

以下でこの二つについて解説していく訳ですが、
ここまでの話はどちらも関数を`使う`側の話です。

関数には、`使う`側と`作る`側がありました。`作る側`でも、それぞれ対応する事をやらないといけません。
対応は以下の表のようになります。


| 使う側      | 作る側       |
| ----------- | --------    |
| 渡す        | 受け取る     |
| 結果をもらう |  結果を返す  |


つまり関数を`作る`側では、渡された文字や数字を`受け取り`、結果を`返す`必要があります。

この

1. `渡す`-`受け取る`
2. `結果をもらう`-`結果を返す`

という組みについて以下では解説していきますが、いつもそれが「使う側」の話か「作る側」の話か、注意して読んでいってください。

なお、2の方が簡単なので、2から話します。


# 結果を返し、返ってきた結果をもらう

まず、`結果をもらう`事と`結果を返す`事から始めましょう。

| 使う側      | 作る側       |
| ----------- | --------    |
| 結果をもらう |  結果を返す  |

関数は`中身`を実行したあと、`結果を返す`事が出来ます。
返ってきた結果を`もらって`、その結果に応じて処理が行なえます。

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

というコードを、以下のようにします。

```
var kekka = lucy();
```

このように、関数を`使う`これまでのコードの左に、`var kekka = `という風に書くと、
`lucy()`の結果を`もらう`事が出来ます。（なお、プログラム用語では`受け取る`といいます。ただ今回はちょっとした事情により`もらう`で統一します）

このように関数を`使う`時に、必要ならその結果を`もらう`事が出来るのです。



### 課題：6が多めに出るイカサマサイコロを振って、結果をもらえ

こちらが、6の目が多めに出るikasama_saikoroという関数を用意しました。
この関数を`使って`、結果を`もらって`ください。

```
var ikasama_saikoro = function() {
    var num = Math.randomInt(12);
    if(num < 5) {
        return num+1;
    }
    return 6;
};

// TODO: 以下の行を書き換えて、ikasama_saikoro関数の結果を受け取れ
var kekka = 0;


MessageBox.show(kekka);
```

なお、ikasama_saikoroのコードが何をやっているか、想像つきますか？


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

<div id="ex5">
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
返す文字は`"蕎麦充した"`にしておきましょう。

```
// TODO: 以下で"蕎麦充した"と返せ
var lucy = function() {
};


var kekka = lucy();
MessageBox.show(kekka);
```

もう一つ同じような問題をやってみましょう。

### 課題：いつも6を返すサイコロを作れ

ただ決まった数字を返す関数も似たような物です。
ここで書いてみましょう。

いつも6を返すイカサマサイコロを作ってみましょう。

```
// TODO: 以下を、いつも6を返す関数に変更せよ
var ikasama_saikoro = 0;



var kekka = ikasama_saikoro();
MessageBox.show(kekka);

```

これでは決まった値を返すだけなのでありがたみが無いですね。
次はもう少し複雑な関数も作ってみましょう。

### 課題：1から6までの数字をランダムに返すサイコロを作れ

今度はちゃんと乱数を使って、1から6までランダムに`結果を返す`関数を作りましょう。
ヒントとしては、[第五回](ch5.md)の「課題: 6面サイコロを作れ」のあたりを参考にすると良いでしょう。

```
// TODO:以下を書き換えて、1から6の数字をランダムに返すようにせよ
var saikoro = function() {
};

var kekka = saikoro();
MessageBox.show(kekka);
```

### returnすると、そこから先は実行されない





### 課題： こちんこちん？って聞いて、麦茶がこーしーを返す関数を作れ

```



```


----



この辞書の話はあとで改めて行う事にしますが、ここではとにかく、`MessageBox.show`というのは、
関数が入っている変数のようなものだ、と思っておいてください。

で、`変数`の後に`()`をつけると関数が呼び出せるというのを前回やったので、
`MessageBox.show()`で関数が呼び出せる事になります。



まずはこれまでやってきた｀MessageBox.show｀や`Math.randomInt`

### MessageBox.showを考え直す

突然ですが、`MessageBox.show("むぇーー");`というコードも、
実は関数を`使う`というコードです。


`MessageBox.show















**コラムの例**  
最初のブロック  
　  
二つ目のブロック
{: .column}



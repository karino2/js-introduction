---
title: "第一回: はじめてのJavaScriptプログラム"
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

</style>

<script type="text/javascript" src="https://rawgit.com/karino2/js-introduction/master/scripts/env.js"></script>
<script>
var questions = [];
// , "q1", "q2", "q3", "q4"

  document.body.onload = function() {
    var idlist = ["ex1", "ex2", "ex3", "ex4", "ex5", "ex6", "ex7", "ex8"];
    setupAllRepls(idlist);

    setupAllQuestions(questions);
  }
</script>

# はじめてのJavaScriptプログラム

さて、記念すべき第一回です。

ただ、プログラムは最初が一番難しい。
プログラムの最初は、ちゃんと説明するといろいろ複雑です。

そこで、最初は分からないまま動かす方が簡単です。
動かしているうちになんとなく分かっていくものです。

そういう訳で、この最初の章では、あまり理屈は考えずに、とにかくいろいろ動かしてみる所から始めたいと思います。

## 計算をしてみよう

まずは「3たす4」を計算してみましょう。

<div id="ex1">
<input type="button" value="実行" />
<textarea>
 3 + 4</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>


こうなります。「+」の前後の空白は無くても構いません。「実行」ボタン押してみてください。「結果」の所に7と表示されたはずです。
3たす4は7、という事ですね。

なお、テキストエリアは変更して実行する事が出来るので、いろいろ変えて試してみてください。

では次に掛け算です。「5掛ける12」は以下のようになります。

<div id="ex2">
<input type="button" value="実行" />
<textarea>
 5*12</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>


掛けるはJavaScriptでは「*」で表します。なお、割り算は「/」です。
つなげて書く事も出来ます。

<div id="ex3">
<input type="button" value="実行" />
<textarea>
 5*2-3</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

こうやって普通に計算する事が出来ます。


### 課題1. 8たす4を計算せよ

以上を参考に、8たす4を計算してみてください。

これが記念すべき初の課題となるので、課題の解き方を説明します。

下のテキスト入力する所に、コードを書いて実行を押してください。
正解なら「正解です」と表示されます。

また、答えを見たい時は「答えを見る」のボタンを押してください。

<script>
  questions.push({
    id: "q1",
    verifyScript: function(str) {
        if(str.indexOf("+") != -1){
            return true;
        }
        return "+を使ってください。"
    },
    verifyAnswer: function(val) {
        if(val == 12) {
            return true;
        }
        return "結果が違います。"
    }
  });
 </script>

<div id="q1">
<input type="button" value="実行" />
<textarea>
</textarea>
<b>結果:</b> <span class="console"></span><br>
<span class="result"></span><br>
<input type="button" value="答えを見る" />
<div class="answer hideanswer">
答え:<br>
8+4
</div>        
</div>

もう一つやってみます。

### 課題2. 8割る2を計算せよ

<script>
  questions.push({
    id: "q2",
    verifyScript: function(str) {
        if(str.indexOf("/") != -1){
            return true;
        }
        return "/を使ってください。"
    },
    verifyAnswer: function(val) {
        if(val == 4) {
            return true;
        }
        return "結果が違います。"
    }
  });
 </script>

<div id="q2">
<input type="button" value="実行" />
<textarea>
</textarea>
<b>結果:</b> <span class="console"></span><br>
<span class="result"></span><br>
<input type="button" value="答えを見る" />
<div class="answer hideanswer">
答え:<br>
8/2
</div>        
</div>


## 文字を作ろう

さて、プログラムでは、計算の他に、文字を表示したい事もあります。
文字というのはプログラムでは「文字列」と言います。

例えば、「ぬっくぬくなこーしー」という文字は、以下のように表します。

<div id="ex4">
<input type="button" value="実行" />
<textarea>
 "ぬっくぬくなこーしー"</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

JavaScriptでは、文字はダブルクオート、「"」で囲むという決まりになっています。
文字は英語でも日本語でもこうやってダブルクオートで囲んで書く事が出来ます。

例えばこんなのや、

<div id="ex5">
<input type="button" value="実行" />
<textarea>
 "しゅるしゅるする"</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>


英語の文字とか、
<div id="ex6">
<input type="button" value="実行" />
<textarea>
 "Second Life"</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>


鳴き声（？）やら、
<div id="ex7">
<input type="button" value="実行" />
<textarea>
 "むぇ〜〜〜"</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

もこういう風に書けます。

さらに、文字は「+」でつなげる事が出来ます。
<div id="ex8">
<input type="button" value="実行" />
<textarea>
 "ぬくぬくなこーしーを"+"しゅるしゅるする"</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

結果では「+」がなくなって一つの文になりましたね。
今はなんだか良く分からなくても、そんな事もある、と思っておいてください。

### 課題1. 「筋トレしろ！」という文字を作れ


<script>
  questions.push({
    id: "q3",
    verifyScript: function(str) { return true; },
    verifyAnswer: function(val) {
        if(val == "筋トレしろ！") {
            return true;
        }
        return "結果が違います。"
    }
  });
 </script>

<div id="q3">
<input type="button" value="実行" />
<textarea>
</textarea>
<b>結果:</b> <span class="console"></span><br>
<span class="result"></span><br>
<input type="button" value="答えを見る" />
<div class="answer hideanswer">
答え:<br>
"筋トレしろ！"
</div>        
</div>



### 課題2. 「自意識チェックを」という文字と「しろ！」という文字を連結せよ

<div id="q4">
<input type="button" value="実行" />
<textarea>
</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>


# 第一回まとめ

第一章はとりあえず動かしてみるのを目的としたので、細かい所で分からない所もあったかもしれませんが、
あまり気にしないで先に進んでください。
以下の事くらいが分かっていればとりあえずはOKです。

1. JavaScriptでは足し算とか出来る
2. 文字はダブルクオートで囲む
3. 文字は+で連結出来る


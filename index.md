---
title: "算数で挫折した人向けのJavaScript入門"
layout: page
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.35.0/codemirror.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.35.0/codemirror.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.35.0/mode/javascript/javascript.js"></script>
<style>
    .CodeMirror { height: auto; border: 1px solid #ddd; }
    .console { border: 1px solid #333; color: rgb(48, 68, 216); padding: 0px 5px 0px 5px; }
</style>

<script type="text/javascript" src="https://rawgit.com/karino2/js-introduction/master/scripts/env.js"></script>
<script>
  document.body.onload = function() {
    var idlist = ["ex1", "ex2", "ex3", "ex4", "ex5", "ex6", "ex7", "ex8", "q1", "q2", "q3", "q4"];
    setupAll(idlist);
  }
</script>

# あらすじ（モチベーション）

まず始めるにあたり、何をやりたいのか、みたいなのをつらつら書いてみたいと思います。
ここはプログラマ向けの話で対象読者向けの話じゃないので、最終的にはどっかに移動します。

もともとは、「算数挫折したけど、ツクールMVのプラグインとかいじる為、JavaScript覚えたい」という話を聞いたのがきっかけ。

JavaScriptって昨今はそういう拡張系の用途が結構あって、そういう理由で覚えたい人も結構多いと思う。
そういう用途ってだいたいは降ってくるオブジェクトやらAPI呼び出しで得たオブジェクトのメソッド呼んだりするだけで、別に自分でオブジェクト作ったりする必要も無いし、そんな複雑な処理も要らない事が多い。

でもそういった入門は、だいたい「環境の理解」と「プログラム言語の理解」を同時にしていかなきゃいけないので、不必要に難しい。

世の中のJavaScriptの本は、htmlを前提としているか、または他のプログラム言語の知識を前提としている物が多い。
でもhtmlの中でJS使うって凄いトリッキーで、htmlとJSを同時にしらないといけないし、入門としては全然優しくない。
言語自体の解説は本格的なのばかりで、算数挫折した人向けに、簡単な言語要素だけを説明する、というのはあまり無い気がする。

という事で、あまり難しい事は説明しないで、簡単なプラグインをいじったり出来るくらいの所までの説明を、プログラムをしらない人向けにしておきたいな、と思った。

## 内容

基本的には特定の環境は前提としないけれど、ツクールのMVやら（ディスコンだけど）Unityとかで使う事を前提に、コンベンションもそれらに近い形で書いていきたい。これは通常のwebのJSとは大分異なる。
文字列の出力などのAPIは独自の物を用意するが、多少似せる。

文字列の処理はそんなにはやらない事が多いので、通常の入門よりも文字列周辺を浅めにしていきたい（連結くらい）。
また、for文もそんなに使わないので、ループなどは扱わない。

関数は無名な奴も名前付きな奴も割とじっくり扱う。
メソッド呼び出しは細かい理屈は説明しないが、使う側はたくさん例を出す。

基本的には対話的に試していって、幾つか問題も問いていく形にする。

なお、まずテキストをざーっと書いていって試したり問題とかは後でコード書きます。

# はじめてのJavaScriptプログラム

プログラムの最初は、ちゃんと説明するといろいろ複雑なので、
分からないまま動かす方が簡単です。
動かしているうちになんとなく分かっていくものです。

そこで、この最初の章では、あまり理屈は考えずにいろいろ動かしてみる所から始めたいと思います。

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

<div id="q1">
<input type="button" value="実行" />
<textarea>
</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

### 課題2. 8割る2を計算せよ

<div id="q2">
<input type="button" value="実行" />
<textarea>
</textarea>
<b>結果:</b> <span class="console"></span><br>
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

<div id="q3">
<input type="button" value="実行" />
<textarea>
</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>


### 課題2. 「自意識チェックを」という文字と「しろ！」という文字を連結せよ

<div id="q4">
<input type="button" value="実行" />
<textarea>
</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>


## 文字を表示しよう








---
title: "第二回: "
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
    var idlist = ["ex1", "ex2", "ex3", "ex4", "ex5"];
    setupAllRepls(idlist);
  }
</script>

## 文字を出力してみよう

第一回では、数字を足し算したり文字を作ったりしました。
第二回では作った文字を使ったりしていきます。

まずは文字を表示してみましょう。
MessageBox.showというのを使うと画面にメッセージボックスが表示されます。
（実は文字を出力するというのはちょっと難しい問題があるのですが、その事については最後に解説します）

TODO: smoke.jsあたりで実装

試してみましょう。

<div id="ex1">
<input type="button" value="実行" />
<textarea>
MessageBox.show("聴け！")</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

まず「MessageBox.show」と書いた後に、かっこをつけて、中に表示したい文字を入れます。
突然難しくなりましたね。

説明をする前に、幾つか他のも見てみましょう。
なにはともあれ、まずは「むぇ〜〜〜」を表示してみます。

<div id="ex2">
<input type="button" value="実行" />
<textarea>
MessageBox.show("むぇ〜〜〜")</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

なんだか難しそうなのは相変わらずですが、良く見ると一つ前の例とほとんど同じです。

表示させたいメッセージを変えたい時には、どこを変えたらいいか分かるでしょうか？
クラウド女学院、と表示させたければこうなります。

<div id="ex3">
<input type="button" value="実行" />
<textarea>
MessageBox.show("クラウド女学院")</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

さて、第一回では文字を作る他に、もうひとつやった事があります。
覚えていますか？数字の計算です。

ここでは「12ひく3」を計算して表示してみましょう。
以下のコードで実行ボタンを押すと何が起こると思いますか？

<div id="ex4">
<input type="button" value="実行" />
<textarea>
MessageBox.show(12-3)</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

なんと、「12-3」と表示されずに、それを計算した結果である「9」が表示されてしまいました。
JavaScriptでは、カッコの中を計算した結果が表示されます。

第一回ではもうひとつ、文字の連結、という事をやりました。覚えていますか？
ここでは「こーしーを」と「しゅるしゅるする」を連結して表示してみましょう。

<div id="ex5">
<input type="button" value="実行" />
<textarea>
MessageBox.show("こーしーを"+"しゅるしゅるする")</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

ここでも表示されるのは、つなげた結果になっていますね。





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

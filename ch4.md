---
title: "第四回: if文で分岐しよう"
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


    setupAllREPL2(4);
    setupAllQuestions2(questions);
  }
</script>


さて、このシリーズもついに第四回まで来ました。
第四回からは中盤戦、という事で、アニメだったらオープニングが変わる感じですね。
ドラクエ2に例えると船とったくらい？(今の子には分からない例え)

第四回はif文なのですが、if文はこのシリーズの読者にはチョロい。  
何故なら、このシリーズは「ツクールとかである程度ゲーム作って、プログラム覚えたいと思った人」を対象としているからです。

ツクールでゲーム作る、というのは、ようするにマウスで延々とif文書いているようなものです。
普段からやってる事なので、割とすぐ理解出来ると思います。やったね！

ただこのシリーズは、油断しないでじっくりやっていきます。

# 「はい」か「いいえ」を聞く

if文の説明に入る前に、新たな機能を説明しましょう。「はい」か「いいえ」をプレーヤーに聞く方法です。
RPGのゲームとかで良くありますよね？

「はい」と「いいえ」は、このシリーズでは`MessageBox.yesNo`という物で質問する事にします。  
以下のようなコードです。

<div id="ex1">
<input type="button" value="実行" />
<textarea>
MessageBox.yesNo("最後の戦いだ。準備はいいかい？", "はい", "いいえ");</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
何度か実行して、「はい」を押したり「いいえ」を押したりしてみてください。どう結果が違うか分かりますか？
テキストエリアの下の「結果」という所に注目してください。

この`MessageBox.yesNo`の使い方は以下のようになります。

`MessageBox.yesNo(`**メッセージ**`,`**「はい」のラベル**`,`**「いいえ」のラベル**`);` 

この手の奴は、カンマ、つまり`,`で区切っていろいろ指定します。
一番最初のメッセージはまぁいいでしょう。

2つ目と3つ目のラベル、というのは、「はい」と「いいえ」のボタンのメッセージを変える事が出来ます。

例えば以下のようになります。

<div id="ex2">
<input type="button" value="実行" />
<textarea>
MessageBox.yesNo("ついに念願のアイスソードを手に入れたぞ", "そう関係ないね", "殺してでも奪い取る");</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
ちょっと横に長くて見づらいですね。こういう時には、改行を入れても大丈夫です。
たとえばこんな感じです。

<div id="ex3">
<input type="button" value="実行" />
<textarea>
MessageBox.yesNo("ついに念願のアイスソードを手に入れたぞ",
                 "そう関係ないね",
                 "殺してでも奪い取る");</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
これでも同じ結果になります。「はい」のボタンが「そう関係ないね」になって、「いいえ」のボタンが「殺してでも奪い取る」になっていますよね。

TODO: スクリーンんショットと図解

こんな風にプレーヤーに2つの選択肢を尋ねるのがyesNoボックスです。ツクールでもこういう事やりますよね。

**yesNoボックスの2つの流儀**  
`MessageBox.yesNo`は、このシリーズで勝手に決めた物です。`MessageBox.show`と同様で、
JavaScriptを実行する人、つまりツクールMVとかUnityとかそうした物が決める奴ですね。  
　  
第四回で説明しているyesNoボックスは、Windowsプログラミングを参考にした形です。  
Mac OS、Linux(厳密にはX）などもこの形式ですね。
吉里吉里にもこの形のyesNoボックスがありますし、Unityも開発中にしか使えないデバッグ目的ですが、似たような機能があります。  
専門用語ではこれらのスタイルを、「モーダルダイアログ」といいます。難しいカタカナを使うと長渕に怒られるのでこのシリーズではコラム以外ではこの用語は使いません。日本語バンザイ。  
とにかく、Windowsのアプリを作ったりする時のスタイルです。  
　  
さて、yesNoボックスにはもうひとつ流儀があって、それは「コールバック」スタイル、と呼ばれています。
こちらは関数が必要となるので解説はこのシリーズの後半となりますが、残念な事にSecond LifeやツクールMVはコールバック型です。
コールバック型はちょっと難しいので、中盤のif文の説明として使う用途としては、Windows型の方がいいかな、
と思ったので、こちらを採用しています。  
このシリーズの最後の方ではコールバック型のyesNoボックスも扱います（たぶん）。  
　  
なお、webのJavaScriptはその中間みたいな立ち位置です。
基本的にはWindows型なのですが、これで出てくるボタンがださい。  
で、おしゃれなボタンを出すライブラリはコールバック型で作られています。
だから最近のおしゃれwebアプリはみんなコールバックで書く。
{: .column}

## 選択した結果を、変数で受け取る

さて、プレーヤーに「はい」と「いいえ」を聞く事は出来ましたが、
まだプログラムでは何も対応していません。
これでは聞くだけ聞いておいて投げっぱなしです。

対応するプログラムを書くのはこの第四回の主題となるif文という事になりますが、
その前にまずは結果を「受け取る」ということを見てみましょう。

何かを実行した時の結果は、「変数」で受け取ります。
例を見てみましょう。プレーヤーの選択なので`sentaku`という変数で受け取る事にします。

コードとしては以下のようになります。

```
var sentaku = MessageBox.yesNo("最後の戦いだ。準備はいいかい？", "はい", "いいえ");
```

第三回でやった、文字に名前をつける、というコードと似ていますが、
`=`の右側が文字じゃなくて、`MessageBox.yesNo("最後の戦いだ。準備はいいかい？", "はい", "いいえ")`になっています。

このように、`=`の右側に結果をうみだす何かを置いておくと、左の変数に入るのです。

試しに、変数に結果を受け取った後に、この変数を`MessageBox.show`で表示してみましょう。

<div id="ex4">
<input type="button" value="実行" />
<textarea>
var sentaku = MessageBox.yesNo("最後の戦いだ。準備はいいかい？", "はい", "いいえ");
MessageBox.show(sentaku);</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
何度か実行して、「はい」を選んだり、「いいえ」を選んだりしてみてください。
なかなか複雑ですね。ちょっと自分でも書いてみましょう。

### 課題: プレイヤーが選択した結果に5を足して表示せよ

ちょっと難しい課題をやってみましょう。

1. まずyesNoボックスを表示します
  - メッセージには「あじゃは鶏ですか？」を表示します
  - ボタンは「はい」と「いいえ」です
2. 結果を`sentaku`という変数で受け取ります
3. sentakuに5を足した物を`MessageBox.show`で表示します

TODO: yesNoボックスの課題化

このように、`MessageBox.yesNo`という物を使って、プレーヤーに「はい」と「いいえ」をたずねる事が出来ます。





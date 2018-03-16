---
title: "第六回: 辞書"
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
  myInterpreter = new Interpreter('MessageBox = {show: SmokeAlert, yesNo: SmokeYesNo}; Math = {randomInt: _randomInt};',initFunc);
  scenarioPlayer = new Interpreter('MessageBox = {show: SmokeAlert, yesNo: SmokeYesNo};  Math = {randomInt: _randomInt};', initScnearioPlayerFunc);


  setupAllREPL2(1);
  setupAllQuestionsWithScnario(questions);
}
</script>


第六回は辞書とjsonです。
辞書はツクールとかだとあまり使う機会が無いと思うのですが、
プラグインが辞書で出来ているので説明しておこうと思います。

面倒な割にはあまり使い道が無い、残念な回です。グレンラガンで言うと温泉回、ビバップで言う所の冷蔵庫回みたいなもんです。

ではいってみましょう。

# 辞書って何よ？

`配列`は、`要素`を数字で取り出す物です。例えば`hairetu[3]`とかやります。

`辞書`は、`要素`を文字で取り出す物です。例えば`jisyo["hogehoge"]`とかやります。

「あー、そういうことね、完全に理解した」

と思ったらここで終えても良いのですが、もうちょっと細かい話もしていきましょう。

## 何はともあれ実際の使い方

まずは細かい説明の前に、実際の使い方を見て雰囲気をつかみ、その後説明をしていきます。
では行きましょう。

空（カラって読んでね）の`辞書`は、`{}`で作ります。以下のようなコードです。

```
var nakigoe = {};
```

これで中身がからっぽの、何も入ってない辞書が作れます。

### 辞書への要素の追加は`=`

コードネームはセーラーVみたいですね（若い人には通じない）。

からっぽの`辞書`には、`=`で`要素`を追加していく事が出来ます。
例えば以下みたいな感じです。

```
nakigoe["犬"] = "わんわん";
nakigoe["猫"] = "にゃーん";
nakigoe["おっさん"] = "にゃーん";
nakigoe["あじゃ"] = "むえぇ〜〜";
```

JavaScriptでは、変数の場合、`=`は、右の物を左に入れる、という意味でした。
`辞書`の場合も同じ意味で、`=`で要素を追加出来ます。

### 取り出し方は配列と同様`[]`


`要素`を取り出すには、`配列`と同様`[]`を使います。ただし、配列の場合は`hairetu[0]`とか`hairetu[1]`とかの数字でしたが、
`辞書`は文字です。

```
nakigoe["あじゃ"];
```

`要素`を表示するなら、`MessageBox.show`を使えばOK。

```
MessageBox.show(nakigoe["あじゃ"]);
```

取り出した`要素`を変数に入れる場合は、以下のような感じです。


```
var message = nakigoe["あじゃ"];
```

少し実際のコードを動かしてみましょう。


<div id="ex1">
<input type="button" value="実行" />
<textarea>
// カラの辞書を作る
var nakigoe = {};

// 要素を4つ入れる
nakigoe["犬"] = "わんわん";
nakigoe["猫"] = "にゃーん";
nakigoe["おっさん"] = "にゃーん";
nakigoe["あじゃ"] = "むえぇ〜〜";

// 「あじゃ」に入っている物を取り出して表示
MessageBox.show(nakigoe["あじゃ"]);</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
`辞書`とはこんな感じです。
以下、このコードの細かい説明をしていきます。


## `辞書`という言葉を考える

現実世界には、`辞書`という物がありますよね。
ここでは国語辞典を考えましょう。なお、紙の辞典を思い浮かべてください。
紙の辞典、もう引かなくなりましたねぇ…

ある日突然、みんなが忖度とかいう言葉を使いまくり始めたとします。
「忖度」、知らねーよ、何この単語。こういう難しい言葉流行らせるのやめろよなぁ、めんどくせー。
というかなんて読むの？そんたく？

という事で仕方ないので、`辞書`で`忖度`を`引いて`みます。
まずは「そ、そ、そ…」と「そ」で探して、次に「ん、ん、ん、」と「ん」で探して、その次に「た、た、た…」と「た」で探すと、この辺で、「そんたく」という単語が見つかります。

で、そこには「他人の心をおしはかる事」という`説明`が書いてあります。

辞書というのは、`単語`で意味の説明を`引く`物、と言えます。
プログラムにおける辞書も、これと似た振る舞いをするものです（というか似ているので辞書と呼ぶ事にしました）。

辞書を引く単語は、普通載っている説明よりは短いですよね。
この短い単語で調べて、該当箇所を見つけて、そこにある長い説明を得る、
というのが辞書という物と言えます。

なんかもってまわった言い方ですが、こう言うとプログラムの辞書と似た物になります。  
プログラムの辞書も、何かの単語でそこに紐付いた何かをとってくるものです。
プログラムの場合はその単語で引けるのが「説明」とは限らないのですが。


### 辞書は`キー`で引く

プログラムにおいては、この`引く`対象の単語を、`キー`と呼びます。これが噂の乙キーって奴ですね。
違います。

つまり、先程の例では、`忖度`がキーです。

辞書で忖度を引く事を、プログラムの用語では、

「国語辞典という`辞書`を、忖度を`キーに`して`引く`」

といいます。
先程のプログラムの例だと、`nakigoe["あじゃ"]`というコードがありました。

このコードは、

「nakigoeという`辞書`を"あじゃ"を`キー`にして`引く`」

といいます。
言葉なんてどうでもいいんですが、`辞書`と`キー`に着目すると辞書は分かりやすくなるので、この2つに注意してみてください。







**コラム**  
一行目  
　  
二行目
{: .column}


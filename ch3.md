---
title: "第三回: 変数で名前をつけよう"
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
    myInterpreter = new Interpreter('MessageBox = {show: SmokeAlert};', initFunc);


    setupAllREPL2(1);
    setupAllQuestions2(questions);
  }
</script>

# 変数は難しい？

さて、このシリーズも第三回までやってきました。
そしてついに出てきました。変数です。

変数、なんか数学っぽいですね〜。  
「小学校の算数で挫折したって言ってるだろっ！脳みそついてんのかー！」と怒られそうですが、やはり変数は避けては通れない。すみません。いや、私のせいじゃないですが。

そんな難しい物でも無いんですが、難しそうに見えるのにも理由はあります。

- 普段の生活であまり聞かない（ので馴染みが無い）
- 変数を使っても別段何も新しく出来るようにならないので、盛り上がらない（楽しくない）

さて、ここでは変数の話に入る前に、変数の難しさについて、軽くポエムを書いてみたいと思います。

## 変数は、普段の生活であまり聞かない

変数という言葉は普段の生活では、あまり出てきません。  
たとえば、女子高生がマクドで「今日考えた変数、超イケてるじゃん？」とか言う話は、あまりしてない気がする。
わみたゃんとかが突然「私、変数大好き」とか言い始めたら相当ビビる。いや、ビビらないか？うーん、どうだろう。

とにかく、日常生活であまり出てこない考え方というのは、たとえそれが簡単なものでも、やっぱり慣れるまでにちょっと練習が必要です。
特に数学とかで慣れている人向けの説明だと、ちょっと早い、と感じる事はあるかもしれません。

ただ幸いな事に変数は結構簡単なものなので、ゆっくりやればどうって事無いと思います。
後に出てくる関数とかは残念な事に結構難しいですが、変数はぶっちゃけチョロい。

## 変数を使っても、新しい事は出来ない（からつまんない）

変数は、ループや関数まで行くといろいろ使いみちも出てくるのですが、この第三回の時点では何も新しく出来るようになりません。
だから例もつまらないし、コードを書いていてもつまらない。

だから、世の中の入門ページでは、軽くざざっと終わらせて次に進みがちです。  
でもそれが難しい感じをかもし出してしまっています。

そこでこのシリーズでは、変数はゆっくり説明する事にします。
こうする方がわかりやすいとは思いますが、その分退屈な回になると思います。
退屈なのは頑張って気合で乗り切ってください！








<div id="ex1">
<input type="button" value="実行" />
<textarea>
var msg = "自意識チェックをしろ！";
MessageBox.show(msg)</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

　  


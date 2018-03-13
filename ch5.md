---
title: "第五回: 配列"
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
    scenarioPlayer = new Interpreter('MessageBox = {show: SmokeAlert, yesNo: SmokeYesNo};', initScnearioPlayerFunc);


    setupAllREPL2(1);
    setupAllQuestionsWithScnario(questions);
  }
</script>


第五回は配列です。

配列は、文字なんかを複数並べた物です。  
どうという事は無いのですが、RPGやアドベンチャーなどを作る時には良く使う事になるので、使いみちは多いものです。

また、この辺でプログラムに慣れていく事で、プログラマレベルを上げておいて、最後の関数に備えていきましょう。

という事で配列とはなんぞや？という所からやっていきましょう。

# 配列って何よ？



<div id="ex1">
<input type="button" value="実行" />
<textarea>
MessageBox.yesNo("最後の戦いだ。準備はいいかい？", "はい", "いいえ");</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
何か説明。

**コラム**  
一ブロック  
　  
二ブロック
{: .column}



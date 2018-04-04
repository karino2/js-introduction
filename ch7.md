---
title: "第七回: 関数を作る事、呼び出す事"
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

第七回はついに関数です。このシリーズのラスボスですね。
二回か三回に分けて説明していくつもりです。




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
  
　  
コードの例。

**コラムの例**  
最初のブロック  
　  
二つ目のブロック
{: .column}



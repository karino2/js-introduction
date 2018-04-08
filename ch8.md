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


  setupAllREPL2(1);
  setupAllQuestionsWithScnario(questions);
}
</script>

第八回は、関数にいろいろ渡したり、関数から結果をもらったりします。


<div id="ex1">
<input type="button" value="実行" />
<textarea>

// 関数を作る
var naku = function() {
   MessageBox.show("むぇーー");
};

// 関数を使う
naku();</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>
  
　  
実行すると、


### MessageBox.showを考え直す

突然ですが、`MessageBox.show("むぇーー");`というコードも、
実は関数を`使う`というコードです。

MessageBoxといのは実は辞書です。この話はあとで改めて行う事にして、
今は関数の方に着目します。

変数名の後に`()`をつけると関数が呼び出せるのですが、










**コラムの例**  
最初のブロック  
　  
二つ目のブロック
{: .column}



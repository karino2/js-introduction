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
チェーンソーで切れたり石化くちばしで石に出来たりしたらいいのですが、ラスボスにはバニッシュが効かないのでバニッシュデス出来ないものです。（若い子には通じない）

二回か三回に分けて説明していくつもりです。

# 関数の難しさ

とりあえず最初は関数は難しいんだ、というどうでも良い私のポエム的なお話から入ります。これは単なる私の趣味です。

関数の難しさは、二つの見方をする為に、頭を切り替える必要がある所です。しかもそれが以下の二か所もあります。

1. 関数を作る所と使う所
2. 関数を使う側と使われる側

この、頭を切り替える、という所は、慣れるまでなかなか難しい。



**JavaScriptの関数は特別難しい**  
関数自体、非プログラマには非常に難しいものですが、JavaScriptの関数は、プログラミング言語の中でもトップクラスに難しいと思います。  
　  
無名関数も作れて、ネストした関数も作れて、フリー変数もアリなレキシカルスコープなクロージャでargumentsのような特殊な変数がありながら仮引数も使え、
高階関数もいくらでも定義出来、
関数自身がオブジェクトであり特殊なメンバも持っていて、さらに自動的にコンストラクタとしても使え、
呼ばれる時のレシーバをいろいろ細工するようなcallやapplyのような物まである。  
　  
そもそもに型無しラムダ計算を人類が理解出来ているかは意味論の進展を見てもかなり怪しい所なので、そもそも人類は理解出来ていない可能性すらある。  
　  
さすがにこの書き方は事実ではあっても大げさとは思いますが、JavaScriptは実際、かなり関数がいろんな使い方が出来る言語の一つです。
もともとJavaScriptは簡易的な、ちょっとした事に使うおもちゃ言語で、あまり本格的に使おうという言語ではありませんでした。  
ですが、関数だけは作った人の趣味で非常に強力で本格的だったおかげで、Chromeが出た頃からかなり本格的な用途に使おう、という人が増えてきて現在の地位につけました。  
　  
これは偶然では無く、もともとJavaScriptは、Schemeという言語をかなりの程度真似て作られています。SchemeをJavaっぽい見た目で実装した、という噂もあるほどです。  
このSchemeというのは、関数だけの言語といっても良いくらい関数以外の要素が無い言語で、その代わり関数だけが凄く強力、という物でした。
その言語は真似したJavaScriptも関数が凄く強力、というのは狙ってやった事でしょう。  
　  
現在ではJavaScriptの関数のようなレキシカルなスコープを持つクロージャも珍しくはありませんが、結構最近までは、主流の言語には珍しい機能でした。  
例えばC言語などには無い機能ですし、似たような機能がC++にも入ったのは2011年の事です。  
実はJavaScriptと言えば関数、と言っても良いくらい、JavaScriptの関数は強力で、かつ先進的でした。
{: .column}










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



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


    setupAllREPL2(10);
    setupAllQuestions2(questions);
  }
</script>

## 文字を出力してみよう

第一回では、数字を足し算したり文字を作ったりしました。
第二回では作った文字を使ったりしていきます。

まずは文字を表示してみましょう。
MessageBox.showというのを使うと画面にメッセージボックスが表示されます。
（実は文字を出力するというのはちょっと難しい問題があるのですが、その事については最後に解説します）

試してみましょう。

<div id="ex1">
<input type="button" value="実行" />
<textarea>
MessageBox.show("聴け！")</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

　  

まず `MessageBox.show`と書いた後に、かっこ、つまり`(`と`)`をつけて、中に表示したい文字を入れます。
突然難しくなりましたね。

なんだか良く分からない時は似たようなのを幾つか見るのが良いと思います。
という事で幾つか他のも見てみましょう。
なにはともあれ、まずは「むぇ〜〜〜」を表示してみます。

<div id="ex2">
<input type="button" value="実行" />
<textarea>
MessageBox.show("むぇ〜〜〜")</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

　  

なんだか難しそうなのは相変わらずですが、良く見ると一つ前の例とほとんど同じです。  
表示させたいメッセージを変えたい時には、どこを変えたらいいか分かるでしょうか？

もう一つ見てみましょう。`クラウド女学院`、と表示させたければこうなります。

<div id="ex3">
<input type="button" value="実行" />
<textarea>
MessageBox.show("クラウド女学院")</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

　  

この位見ると、なんとなくどう使えばいいのか分かってきたでしょうか？   

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


## セミコロンをつけよう

セミコロンってなんやねん！って思うかもしれませんが、「;」こういう記号です。
この変な記号`;`がセミコロンって奴です。
点2つで、下がにょろってなってる奴。

さて、JavaScriptでは、行の最後に`;`は、つけてもつけなくても良い、という決まりになっています。
例えば以下の二行は、どちらも正しいJavaScriptのコードです。


<div id="ex6">
<input type="button" value="実行" />
<textarea>
MessageBox.show("この行にはセミコロンが有る");
MessageBox.show("この行にはセミコロンが無い")</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

　  

理由は話すと長くなるので話しませんが、本シリーズではこれ以後、セミコロンをつける事にします。

セミコロンをつけると、同じ行に2つ、MessageBox.show()を書く事が出来ます。

<div id="ex7">
<input type="button" value="実行" />
<textarea>
MessageBox.show("一つ目！"); MessageBox.show("二つ目！");</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

　  

あまり同じ行に並べても良い事はありませんが、こんな事も出来ますよ、という事で。   

**セミコロンっているの？**  
セミコロンをつけるかどうかは、JavaScriptでは少し論争のある所です。  
だいたいの人はつけていると思いますが、JavaScriptには「セミコロンオートインサーション」という、セミコロンを忘れてるっぽかったら勝手につけて解釈する、という機能があり、これが意図的につけないコードをつけ忘れと勘違いして、非常に分かりにくいバグを生んだりします。  
そこで最初からつけない方が良いのでは無いのか、という人も居ます。  
ですが、このシリーズでは全てつける事にしました。理由としては、このコースの目的が、JavaScriptだけでなく、JavaScriptに「似た」プラグイン等を書く場合も視野に入れているからです。  
JavaScripに似た言語、例えばUnit Scriptや吉里吉里のTJS、SecondLifeのLSLなどは、普通セミコロンが必須となっています。  
何も考えずにつけておくのがゆとりの生き様って奴だと思います。
{: .column}

# コメントをつけよう

JavaScriptにはコメントという物をつける事が出来ます。
コメントとはプログラムの結果には影響は無く、人間があとでコードを読む時の為の説明を書くものです。

コメントには二種類あります。順番に見ていきましょう。

## 一行コメント

プログラムの中に、「//」が入っていると、そこから後はコメントになります。

<div id="ex8">
<input type="button" value="実行" />
<textarea>
// MessageBox.show("この行にはコメントなので実行されない。");
MessageBox.show("この行は実行される。");
// MessageBox.show("この行も実行されない。");</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

　  

コメントの部分は実行されません。
実行されない物になんの意味があるのか？と思うかもしれませんが、
ちょっとコードのそばにメモを書いておきたい、とかいう時に使います。

あとは、コードの一部を一時的に削りたいけど、すぐ後に戻せるようにしておきたい、
という時にも、コードの一部をコメントにします。

下のテキストの先頭の「//」をつけたりとったりして実行してみてください。

<div id="ex9">
<input type="button" value="実行" />
<textarea>
// 3+4;</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

　  

なお、行の途中に「//」があると、そこより右側だけがコメントになります。


<div id="ex10">
<input type="button" value="実行" />
<textarea>
MessageBox.show("ここは表示される"); // MessageBox.show("ここはコメントなので実行されない");
MessageBox.show("ここも表示される"); </textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

　  

コメントはメモを書いておけるだけで、別になんの意味もありません。


### 課題: 間の行をコメントせよ



<script>
  questions.push({
    id: "q1",
    verifyScript: function(str) {
        if(str.indexOf('MessageBox.show("ここの行をコメントせよ");') != -1){
            return true;
        }
        return '「MessageBox.show("ここの行をコメントせよ");」 の行はコメントで残してください。';
    },
    verifyAnswer: function(val) {
        if(messageBoxShowLogs.length != 2) {
          return "結果が違います。"          
        }
        if(messageBoxShowLogs[0] == "ここは表示させたまま" &&
        messageBoxShowLogs[1] == "ここも表示させたまま"){
            return true;
        }
        return "結果が違います。"
    }
  });
 </script>

<div id="q1">
<input type="button" value="実行" />
<textarea>
MessageBox.show("ここは表示させたまま");
MessageBox.show("ここの行をコメントせよ");
MessageBox.show("ここも表示させたまま");</textarea>
<b>結果:</b> <span class="console"></span><br>
<span class="result"></span><br>
<input type="button" value="答えを見る" />
<div class="answer hideanswer">
答え:<br>
MessageBox.show("ここは表示させたまま");<br>
// MessageBox.show("ここの行をコメントせよ");<br>
MessageBox.show("ここも表示させたまま");
</div>        
</div>


   

こんな風にプログラムの一部を一時的に無効にしたり、メモを書いたりするのがコメントです。

## 複数行コメント

JavaScriptには二種類コメントがあります。これまで見てきた一行コメントと、もうひとつは複数行コメントです。
ここでは複数行コメントを見ていきましょう。

複数行コメントは、`/*`から始まって、`*/`で終わります。間に挟まれた物はコメントとなります。
例を見てみましょう。

<div id="ex11">
<input type="button" value="実行" />
<textarea>
/* ここはコメント
この行もコメント

MessageBox.show("この行もコメント");
ここまでコメント。
*/
MessageBox.show("ここはコメントではありません。");</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>



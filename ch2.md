---
title: "第二回: 文字の表示とコメント"
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


    setupAllREPL2(11);
    setupAllQuestions2(questions);
  }
</script>

## 文字を出力してみよう

第一回では、数字を足し算したり文字を作ったりしました。
第二回では作った文字を表示してみます。表示ってなんやねん？というのはやってみたら分かります。

`MessageBox.show`というのを使うと画面にメッセージボックスが表示されます。
（実は文字を出力するというのはちょっと難しい問題があるのですが、その事については最後に解説します）

理屈はおいといて、以下のコードを実行してみましょう。

<div id="ex1">
<input type="button" value="実行" />
<textarea>
MessageBox.show("聴け！")</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

　  

文字がウィンドウに出てきたと思います。おーすげー。プログラムっぽい。

コードの説明をします。
まず `MessageBox.show`と書いた後に、かっこ、つまり`(`と`)`をつけて、中に表示したい文字を入れます。

おぉ、突然難しくなりましたね。  
分からん！と思うかもしれませんが、なんだか良く分からない時は似たようなのを幾つか見るのが良いと思います。

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
上のコードを変更して、「こちんこちん」とかいろいろ表示してみて下さい。   

さて、第一回では文字を作る他に、もうひとつやった事があります。
覚えていますか？数字の計算です。

ここでは「12 引く 3」を計算して表示してみましょう。
以下のコードで実行ボタンを押すと何が起こると思いますか？

<div id="ex4">
<input type="button" value="実行" />
<textarea>
MessageBox.show(12-3)</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

　  

なんと、「12-3」と表示されずに、それを計算した結果である「9」が表示されてしまいました。
JavaScriptでは、カッコの中を計算した結果が表示されます。
何言ってるか分からないならあんまり気にしなくてOKです。

第一回ではもうひとつ、文字の連結、という事をやりました。覚えていますか？
ここでは「こーしーを」と「しゅるしゅるする」を連結して表示してみましょう。

<div id="ex5">
<input type="button" value="実行" />
<textarea>
MessageBox.show("こーしーを"+"しゅるしゅるする")</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

　  

ここでも表示されるのは、つなげた結果になっていますね。


**JavaScriptでは文字は表示出来ない！？（環境ってなんなのさ）**  
実は、JavaScriptには文字を表示する機能はありません。  
このシリーズで使っている「MessageBox.show()」という物は、説明の為に私が作った物で、普通のJavaScriptには存在しません。  
でもツクールMVでもwebでもSecond LifeでもUnityでも文字は表示しています。これはどうした事でしょう？    
　  
これらは、実はJavaScriptを動かす側が勝手に決める、という決まりになっています。動かす側、というのは、ツクールMVとかwebとかUnityとかSecond Lifeとかの事です。  
これら、JavaScriptを動かしている人を「環境」と呼んだりします。  
JavaScriptでプログラムを書く為には、普通「JavaScriptプログラムの勉強」と、「それを動かす環境の勉強」の両方をする必要があります。  
　  
なんてこった、大変じゃないか、と思うかもしれませんし、実際ちょっと大変です。  
ただ、環境はどれも似ている事が多いので、一つ何かのプラグインの書き方とか覚えてしまえば、他の環境を勉強するのは、最初思うほどにはたいした事ありません。  
　   
また、世の中のプラグインなどの入門サイトなどが難しく感じるのは、プログラムと環境を一緒に説明しているからです。  
プログラムの方だけこのシリーズでマスターしてしまえば、環境の所についての入門だけ注意して読めば良くなるので、ずっと簡単になります。  
　  
本シリーズでは、基本的にはツクールMVやUnityの環境を参考に、なるべく似ているが一部簡単にした物を作って説明していきます。  
本シリーズで勝手に決めている部分についてはこうしてコラムの形で触れていきますが、最初のうちはあまり細かい事は気にしないで、全部JavaScriptだと思って進めていってOKです。  
　  
そもそもこのコラムも最初は意味分からないですよね。それでOKです。そのうち分かる日が来るだろう、くらいに思って先に進んでください。
{: .column}



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

　  

つけてもつけなくてもいいって何なの…って思うかもしれませんが、JavaScriptはそういう奴なのです。  
で、理由は話すと長くなるので話しませんが、本シリーズでは今後はセミコロンをつける事にします。
理由なんて気にせず、そういうもの、と思って飲み込んでください。

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
　  
ですが、このシリーズでは全てつける事にしました。理由としては、このコースの目的が、JavaScriptだけでなく、JavaScriptに「似た」言語でプラグイン等を書く場合も視野に入れているからです。  
JavaScripに似た言語、例えばUnit Scriptや吉里吉里のTJS、SecondLifeのLSLなどは、セミコロンが必須となっています。  
　  
何も考えずにつけておくのがゆとりの生き様って奴でしょう。
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
// コメントには何を書いても平気です。
// 
// ゑゑですな
// アテは搾菜を。
// とかなんでもOK。
//
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

下のテキストの先頭の`//`をつけたりとったりして実行してみてください。

<div id="ex9">
<input type="button" value="実行" />
<textarea>
// 3+4;</textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

　  
コードの一部をコメントにして実行されなくする事を、「コメントアウト」とか言ったりします。
カタカナとか使ってなんか偉そうですよね。

なお、行の途中に`//`があると、そこより右側だけがコメントになります。


<div id="ex10">
<input type="button" value="実行" />
<textarea>
MessageBox.show("ここは表示される"); // MessageBox.show("ここはコメントなので実行されない");
MessageBox.show("ここも表示される"); </textarea>
<b>結果:</b> <span class="console"></span><br>
</div>

　  

コメントはメモを書いておけるだけで、別になんの意味もありません。


### 課題: 間の行をコメントせよ

以下の三行のプログラムのうち、二行目だけをコメントにしてみてください。

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

JavaScriptには二種類コメントがあります。

これまで見てきたのは一行コメントとという物ですが、JavaScriptにはもうひとつ、複数行コメントという物があります。

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

　  

複数行コメントはその名の通り、複数行を一気にコメントに出来ます。
複数行コメントもコメントなので、動作には影響がありません。


### 課題: 上4行を一気にコメントせよ

以下の五行のプログラムのうち、上四行を、複数行コメントを使ってコメントにしてみてください。

<script>
  questions.push({
    id: "q2",
    verifyScript: function(str) {
        var mustExists = [
          'MessageBox.show("一行目、ここはコメントアウト");',
          'MessageBox.show("二行目、ここもコメントアウト");',
          'MessageBox.show("三行目、ここもコメントアウト");',
          'MessageBox.show("四行目、ここもコメントアウト");',

        ];

        for(var i = 0; i < mustExists.length; i++) {
          var cur = mustExists[i];
          if(str.indexOf(cur) == -1){
            return '「' + cur + '」 の行はコメントで残してください。';
          }
        }
        if(str.indexOf("/*") == -1) {
          return "複数行コメントを使って下さい。"
        }
        return true;
    },
    verifyAnswer: function(val) {
        if(messageBoxShowLogs.length != 1) {
          return "結果が違います。"          
        }
        if(messageBoxShowLogs[0] == "ここだけ残す"){
            return true;
        }
        return "結果が違います。"
    }
  });
 </script>

<div id="q2">
<input type="button" value="実行" />
<textarea>
MessageBox.show("一行目、ここはコメントアウト");
MessageBox.show("二行目、ここもコメントアウト");
MessageBox.show("三行目、ここもコメントアウト");
MessageBox.show("四行目、ここもコメントアウト");
MessageBox.show("ここだけ残す");</textarea>
<b>結果:</b> <span class="console"></span><br>
<span class="result"></span><br>
<input type="button" value="答えを見る" />
<div class="answer hideanswer">
答え:<br>
/*
MessageBox.show("一行目、ここはコメントアウト");<br>
MessageBox.show("二行目、ここもコメントアウト");<br>
MessageBox.show("三行目、ここもコメントアウト");<br>
MessageBox.show("四行目、ここもコメントアウト");<br>
*/
MessageBox.show("ここだけ残す");</div>        
</div>

　  
このように、複数行コメントという物を使うと、プログラムの複数の行を一気にコメントに出来ます。
一時的に無視したい時などに便利です。

また、複数行コメントは長いメモを書くのにも便利です。
昔は謎のアニメのSSなどがコメントで書かれていた事も多かったのですが、最近は減りましたね…


**コメントに意味がある場合もある**  
JavaScriptのコメントは動作に関係無い、というのは正しいのですが、世の中のプラグインなどでは、こっそりこのコメントに意味を持たせている環境もあります。  
　  
例えば、ツクールMVのプラグインでは、コメントの中に@plugindescとか@authorなど、アットマークで始まる行はプラグインの管理画面に表示されたり、@paramでパラメータを設定出来たりします。  
これらはJavaScriptの機能という訳では無いので、JavaScriptの本などには使い方は載っていません。あくまでツクールMVが勝手にやっている事なので、ツクールMVのドキュメントでこれらの特殊なコメントの使い方は勉強する必要があります。  
{: .column}


# 第二回 まとめ

さて、第二回はいかがでしたでしょうか？
幾つか良く分からない所も残ったと思いますが、それは今後説明していくので、現時点ではなんとなく分かってもらえればOKです。

第二回では以下の事を学びました。

- `MessageBox.show("何か")` という形で文字が表示出来る
- 行の最後はセミコンという奴、`;`という点二つの下がにょろっとしているのを付ける
- コメントというのがあって、一行コメントと複数行コメントというのがある
   - 一行コメントは`//`で始まり、そこより右側がコメントになる
   - 複数行コメントは`/*`で始まり、`*/`で終わる。複数行を一気にコメントに出来る
   - コメントは実行する時には無視されるので、メモなどを好きに書いておける

文字を表示する所は今後詳しく話をしていくので、まずは何も考えずにコピペで表示出来るようになればOKです。


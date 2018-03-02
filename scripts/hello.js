console.log("Hello world");

/* memo okiba-
<script>
  questions.push({
    id: "q1",
    verifyScript: function(str) {
        if(str.indexOf("+") != -1){
            return true;
        }
        return "+を使ってください。"
    },
    verifyAnswer: function(val) {
        if(val == 12) {
            return true;
        }
        return "結果が違います。"
    }
  });
 </script>

<div id="q1">
<input type="button" value="実行" />
<textarea>
</textarea>
<b>結果:</b> <span class="console"></span><br>
<span class="result"></span><br>
<input type="button" value="答えを見る" />
<div class="answer hideanswer">
答え:<br>
8+4
</div>        
</div>
*/
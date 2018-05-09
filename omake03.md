---
title: "おまけ第三回: クリティカル時のみステート付与のプラグインを読んでみよう"
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


  // setupAllREPL2(9);
  setupAllQuestionsWithScnario(questions);
}
</script>

このシリーズもついに今回で最終回です。
といっても今回もおまけとして簡単なプラグインを読んでみよう、という事には変わりません。

第一回と第二回がどちらも突然新しい話だったので、もう一回くらい読んでみて終わりにしよう、という趣旨の回となります。


# クリティカル時のステート付与プラグイン

最後はクリティカル時に防御力を無視する、などのような効果を付与するプラグインを見てみたいと思います。

以下のサイト

[https://github.com/Sigureya/RPGmakerMV/](https://github.com/Sigureya/RPGmakerMV/)

の、Mano_CriticalHook.jsというプラグインを、解説の為に少し簡略化した物を見ていきたいと思います。（ほとんど同じ内容です）

オリジナルのリンクはこちら。[github:Mano_CriticalHook.js](https://github.com/Sigureya/RPGmakerMV/blob/master/Mano_CriticalHook.js)

```
(function (global) {
    'use strict';
    var stateID=4;
    var Manosasayaki_criticalHook={name:'Manosasayaki_criticalHook'};
    var params = PluginManager.parameters('Mano_CriticalHook');
    stateID = Number(params['StateID'] || 4);

    var zz_Game_Action_prototype_makeDamageValue_preDef = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue　=function (target,critical) {
        if( critical ){            
            target.addState(stateID);
        }
        return zz_Game_Action_prototype_makeDamageValue_preDef.apply(this,arguments);
    };

})();
```


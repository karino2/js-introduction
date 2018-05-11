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
今回は第二回よりは簡単だと思います。

グラディウスもラスボスは変な脳みそで何もしなくてもクリア出来るじゃないですか。そういうもんです。

# クリティカル時のステート付与プラグイン

最後はクリティカル時に防御力を無視する、などのような効果を付与するプラグインを見てみたいと思います。

以下のサイト

[https://github.com/Sigureya/RPGmakerMV/](https://github.com/Sigureya/RPGmakerMV/)

の、Mano_CriticalHook.jsというプラグインを、解説の為に少し簡略化した物を見ていきたいと思います。（ほとんど同じ内容です）

読んで行くコードは以下になります。

```
(function () {
    'use strict';
    var params = PluginManager.parameters('Mano_CriticalHook');
    var stateID = Number(params['StateID'] || 4);

    var zz_Game_Action_prototype_makeDamageValue_preDef = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue　=function (target,critical) {
        if( critical ){            
            target.addState(stateID);
        }
        return zz_Game_Action_prototype_makeDamageValue_preDef.apply(this,arguments);
    };

})();
```

プラグインの名前は「`Mano_CriticalHook`」です。Manoはハンドル名の一部っぽいですね。もともと魔のささやきという名前だったのを、短くManoだけ残したようです。

オリジナルのリンクはこちら。[github:Mano_CriticalHook.js](https://github.com/Sigureya/RPGmakerMV/blob/master/Mano_CriticalHook.js)

### 英単語の話

前回同様、単語の表を作っておきます。

なお、use, strict, applyはプログラムの話になるので本文で解説します。(といっても大して解説しませんが)

**カタカナ対応表**

| 英単語 | カタカナ |
| ---- | ----- |
| critical | クリティカル |
| PluginManager | プラグインマネージャー |
| parameters | パラメータ |
| Game | ゲーム |
| Action | アクション（行動） |
| Damage | ダメージ |
| target | ターゲット |

だいたい前にも出た奴ですね。結局似たような単語しか出てこないんですよ。


**辞書**

この表は見ながらコード読んでOK。本文でも解説します。

| 英単語 | 意味 |
| ---- | ----- |
| preDef(previously definedの略かな) | 前に定義されていた（もともと、という意味） |
| hook | フック(プログラム用語なので下で解説します) |

フック、というのはお風呂場とかに吸盤ではっつける、ひっかけておく奴の事なんですが、プログラム界隈では特定の用途で使われれる専門用語です。

プログラム用語としては、何かが実行された時についでに実行される物をぶらさげておく場所、というような意味です。
今回のプラグインだと、クリティカルが起こった時についでに何か実行される物を指定しておく場所、という意味でしょうか。

あまり深く考えずに、そういうのをフックって言うんだな、と一度理解したら、あとはCriticalHookという名前のプラグインだ、
程度の認識で十分です。


**これは頑張って覚える！**

| 英単語 | 意味 |
| ---- | ----- |
| make | 作る |
| value | 値 |
| state | 状態（ステートの事だけど、ちゃんと覚えたい） |

valueは今回は大した意味が無いのですが、大した意味が無い物も覚えておく方が読む時の脳の負荷が下げられるので覚えておきましょう。

stateは「ステートの付与」という事自体がツクールMVの用語としてあるようなのでカタカナで「ステート」でいいのですが、
「状態」という意味もちゃんと覚えておく方が読む時に楽になると思います。
この機会に覚えておきましょう。

## コードを読んで行こう

では上から順番に読んで行きましょう。

まず最初の行はいつもの関数を作ってすぐ実行、です。[第十一回](ch11.md)でやった奴ですね。
という事で気にしない。

### use strictは気にしない

そして次の行に見慣れない物があります。

```
'use strict';
```

これはJavaScriptの落とし穴っぽい部分の挙動を変えてよりかっちり動く為に書いておく物で、
これを書いておくと存在しない変数を触った時の挙動などが変わります。（エラーになる）

ただ、2018年現在、今この辺を真面目に学ぶのは時期的にオススメしないので、
間違ったコードを書いた時により厳しくエラーにする機能を有効にする為のおまじないで、普通に書いているコードには影響無い、
くらいに思っておいて先に進むのがオススメです。

### StateIDという名前のパラメータの取得

次のコードは以下のようになっています。

```
var params = PluginManager.parameters('Mano_CriticalHook');
var stateID = Number(params['StateID'] || 4);
```

一行目は[おまけ第二回](omake02.md)の「パラメータ取得の所のコードも一応読む」でも解説した物ですね。
PluginManager.parametersという関数に、プラグインの名前をつけて呼ぶと、そのプラグインのパラメータ一覧が辞書で返ってくる。

二行目のNumberは数字っぽい文字を数字にする関数で、とりあえずこういう物と思っておいてください、という話を第二回でやりました。

この二行はプラグインのパラメータを使う時のお決まりの書き方なので、このパターン自体に慣れてしまうとプラグインのコードを読むのが楽になります。

StateIDというのはパラメータの名前で、`params['StateID'] || 4`というのはパラメータが存在しない時には代わりに4を使う、
というJavaScriptの`||`を本来の用途以外に使った裏技、という話を[おまけ第二回](omake02.md)の「`||`を使ってパラメータが無い場合の処理をするトリック」で解説しました。

以上のコードを日本語に直すと、

1. `'Mano_CriticalHook'`という名前のプラグインのパラメータの一覧を辞書としてもらう
2. その辞書のStateIDが入ってたらその値を使い、入ってなかったら4を使う

という意味になります。ようするにこの二行のコードでstateIDという変数にプラグインを使う人がマウスとキーボードでぽちぽち指定したパラメータが入るんですね。

なお、ステートIDが4、というのはググった感じだと毒っぽい？（「ツクールMV addState」でググりました。addStateはあとで出てきます）。



### applyを使ったthisの偽造

次は以下のようなコードになってます。

```
var zz_Game_Action_prototype_makeDamageValue_preDef = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue　=function (target,critical) {
    if( critical ){            
        target.addState(stateID);
    }
    return zz_Game_Action_prototype_makeDamageValue_preDef.apply(this,arguments);
};
```

ぎゃー、さっぱりわからない！となるかもしれませんが、間の所を抜いてみると、

```
var zz_Game_Action_prototype_makeDamageValue_preDef = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue　=function (target,critical) {
    // ... 中略 ...
    return zz_Game_Action_prototype_makeDamageValue_preDef.apply(this,arguments);
};
```

このようになります。

zz_Game_Action_prototype_makeDamageValue_preDefが凄い長い変数名なので「やっぱり分からない！」って気がしますが、
良く注意して見てみると、これは[おまけ第一回](ch01.md)でやった、「callを使った関数の差し替え」と凄く似たコードになっています。

見比べてみましょう。

```
var motomoto = ゲーム主.prototype.pluginCommand;

ゲーム主.prototype.pluginCommand = function(command, args)
{
    motomoto.call(this, command, args);

    // 以下略
};
```
zz_Game_Action_prototype_makeDamageValue_preDefという長い変数名がmotomotoにすれば、ほとんど同じコードでしょう。

試しに今回のコードも変数名をmotomotoにしてみましょう。

```
var motomoto = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue　=function (target,critical) {
    // ... 中略 ...
    return motomoto.apply(this,arguments);
};
```

こうしてみると、違いは、以下の二か所くらいです。

|| 第一回のコード | 今回のコード |
|------| ------- | ------ |
| もともとの関数を呼び出す所 | `motomoto.call` | `motomoto.apply` |
| 差し替えている対象 | `ゲーム主.prototype.pluginCommand` | `Game_Action.prototype.makeDamageValue` |

つまりこれは、おまけ第一回でやった、

1. 何かの変数にもともとの関数を取り出す
2. 自分の関数で差し替える
3. 自分の関数の中で、もともとの関数を`motomoto.call(this, なんちゃら～);`と呼ぶ

の、最後のcallをapplyに変えただけのコードになっています。

差し替える対象は、前回は`pluginCommand`というのを差し替えた。今回は`makeDamageValue`という物を差し替えています。

applyとcallは凄く似た物で、なんとなく読んでる段階では区別してなくてもOKです。callみたいな物なんだな、と思っておいてください。

**callとapplyの違い**  
一応説明しておくと、セバスチャンに何かを言いつける時に、渡す物を「,」で区切って並べて渡すか、配列に入れて渡すかの違いしかありません。
callは「,」で区切って、applyは配列で渡します。  
　  
例えば今回のケースでは、以下の三つは全く同じ意味になります。
{: .column}

- `motomoto.call(this, target, critical)`
- `motomoto.apply(this, [target, critical])`
- `motomoto.apply(this, arguments)`

と、一応説明はしましたが、使っていればやがて違いは分かるので、最初のうちは同じようなもんだ、と思っておいてOKです。  
なお、arguments使ってる時はだいたいapply、それ以外はだいたいcallです。
{: .column}

という事で話を戻すと、このコードはapplyを使って元の関数を呼ぶ、というパターンのコードなのです。

ただ最終回なので、元のなんだか長い変数名でもひるまない訓練をしておきましょう。
motomotoと置き換えたコードじゃなくて、元のままで頑張って読みます。

```
var zz_Game_Action_prototype_makeDamageValue_preDef = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue　=function (target,critical) {
    // ... 中略 ...
    return zz_Game_Action_prototype_makeDamageValue_preDef.apply(this,arguments);
};
```

zz_Game_Action_prototype_makeDamageValue_preDefはなんだか長いけど、もともとの関数を表している何かだ！と心の中で強く思って上のコードを読むのです。たそがれよりもくらきものちのながれよりあかきもの、と言われたらドラグスレイブと思うようなもんです（若い人には通じない）。

### 名前から何の関数を差し替えているかを推測する

さて、上のコードは関数を差し替えるパターンだ、という事は分かったとします。
では何の関数を差し替えているのでしょうか？

本来はここでググったりドキュメントを読んだりソースコードを読んだりして調べるのが正攻法ですが、
この位なら名前から推測してしまっても良い気もします。

という事で、名前から推測してみましょう。

上のコードで取り出している対象は`Game_Action.prototype.makeDamageValue`ですね。
Game_Actionというのはおいといて、`makeDamageValue`という方が重要そう。

makeは作るって意味です。Damageはダメージ。Valueは値という意味ですが、この場合はどうでも良い。
ダメージをmakeする、つまりダメージを作っている所らしいです。
たぶんダメージ計算をする関数っぽい。という事で以下ダメージ計算の関数だと思って進みましょう。

で、差し替える前の関数を呼ぶともともとの計算方法でダメージが作られる。
でもこのプラグインでは、ダメージを作る前に、クリティカルの時だけ今のtargetにステートを追加してからダメージを作る、という事をやりたいらしい。

targetっていうのはたぶんモンスターですかね。

これを踏まえて、先ほど「中略」とした所のコードを読んでみましょう


### ステートの付与のコード（プラグインの本体）の所を読む

先程抜いたコードを戻すと、以下のようになっていました。

```
var zz_Game_Action_prototype_makeDamageValue_preDef = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue　=function (target,critical) {
    if( critical ){            
        target.addState(stateID);
    }
    return zz_Game_Action_prototype_makeDamageValue_preDef.apply(this,arguments);
};
```

最後のreturnの所は「元の関数を呼ぶ」という事なので、その前のif文の所に注目します。

```
    if( critical ){            
        target.addState(stateID);
    }
```

プラグインのコアの部分は、実はこの三行だけなんですよね。それ以外は全てお約束のコードなので、慣れてきたらそれ以外の所はさらっと読み飛ばせるようになると思います。

さて、このコアの所は何をやっているでしょうか？  
このコアの所を日本語で読み下すと、「クリティカルだったらターゲットにstateIDをaddStateする」という感じでしょうか。

stateIDはステートのID。addは追加って意味です。addStateで「ステートを追加する」という感じですね。

そのIDのステートを付与する、というのはググった感じだとツクール用語っぽいので、読者はこの説明だけで分かったりするのでしょうか？

毒とか防御0とか一ターン行動不能とか、そういう状態変化をするのとステートを付与する、と呼ぶらしいです。

なお、この付与したステートがいつ解除されるかは元のコードのコメントにこう書いてありました。

```
 * ■ステートの解除条件は？
 * ・そのターン中ずっと防御０％なら「１ターン終了時」
 * ・会心時一回だけなら「ダメージで解除１００％」
```

だから防御0にするステートなら、別段解除するコードを書かなくても一回で解除されるっぽいです。  
まぁこの辺は良く分からんがそういうもんだ、と思っておけばいいでしょう。

つまり、以下のコードで、

```
Game_Action.prototype.makeDamageValue　=function (target,critical) {
    if( critical ){            
        target.addState(stateID);
    }
    return zz_Game_Action_prototype_makeDamageValue_preDef.apply(this,arguments);
};
```

感じとしては、こんな事をしている事になります。

```
Game_Action.prototype.ダメージ計算　=function (target,critical) {
    クリティカルの時だけStateIDのステートを付与
    return もともとのダメージ計算を実行;
};
```

以上でプラグインのコードを一通り見た事になります。

どうでしょう？そんなに難しくも無いと思うのですが。


### 最後に全体を見直す

いつもコマ切れに見て理解したら、最後に全体を見直して分かっているかどうかを確認しましょう。
確認する過程で定着するものですから。

コメントを追加しておきます。

```
(function () {
    // これは気にしない
    'use strict';

    // プラグインのパラメータを取ってる所
    var params = PluginManager.parameters('Mano_CriticalHook');
    var stateID = Number(params['StateID'] || 4);

    // 関数を差し替えるべく、元の関数をとっておく
    var zz_Game_Action_prototype_makeDamageValue_preDef = Game_Action.prototype.makeDamageValue;

    // ダメージ計算の関数を差し替える
    Game_Action.prototype.makeDamageValue　=function (target,critical) {
        // クリティカルだったらsateIDというステートを付与して
        if( critical ){            
            target.addState(stateID);
        }

        // もともとのダメージ計算を呼ぶ。applyでthisを偽装
        return zz_Game_Action_prototype_makeDamageValue_preDef.apply(this,arguments);
    };

})();
```

こんな感じになります。

こんなの全部理解出来てたら結構ちゃんとプログラム分かってる人っぽいんじゃないでしょうか。

シリーズ全十一回とおまけの三回で一通りの事は説明したつもりですが、この位は分かるようになりましたか？

個々の要素が分かった所で全体が分かるという物でも無いので、分からなくても不思議はないのですが、
分かっていてくれたらここまでシリーズ頑張って書いた私としては嬉しいなぁ。

なんにせよ、これだけの事を全部やったのは、なかなか大したものだと思いますよ。本当に。

[おわりに](ending.md)を書きました。
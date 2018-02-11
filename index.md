---
title: "ゆるふわTensorflow入門ページ"
layout: page
---

<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script> 


既存のTensorflow入門が気に食わないので自分で動画の説明を作ろうと思い、そのための補助教材置き場です。
少し触ってみたけど良く分からない、という人向けに、エッセンスを話すのを目的とします。


# このサイト以前の入門

このサイト自体は「Tensorflowを少し触ってみたが良く分からなかった」という人向けのつもりなので、
インストールした事が無い、とか、Pythonを全く知らない、という人は対象にしていません。

そこで「とりあえずこの位知っている事を前提に話をします」というような前提をここに記しておきます。
自分に不足しているな、と思う所があれば、以下を適当に参考にしてください。

## これだけ知っていれば大丈夫、という自己診断

- 「https://github.com/karino2/tensorflow-introduction/ をgit cloneしてsourcesの中を見て」と言われて出来る
- [CS231nのPython Numpyチュートリアル](http://cs231n.github.io/python-numpy-tutorial/) を見て大体分かる (分からない場合は以下の「Pythonの最低限の基礎知識」を参考の事）
- [本家の Getting Started](https://www.tensorflow.org/get_started/get_started)の「Complete program」の所にあるコードを見て、似たようなコードに見覚えがある（初めて見た！という人は「Tensorflowを全く触った事が無い、という人はまず何をやるべきか？」を参考の事）

とりあえずこの3つが分かるなら、後述の事前準備から初めて問題ありません。

## Pythonの最低限の知識

あまり専門的な知識を前提とする気はないので、関数とクラスが書けてリスト内包表記がわかるくらいの人なら、別段予習は必要ありませんが、苦手と思っている人は以下くらいをいやっておくと万全。

- [CS231nのPython Numpyチュートリアル](http://cs231n.github.io/python-numpy-tutorial/)
  - これ見るくらいで十分です。
- [Pythonチュートリアル](https://docs.python.jp/3/tutorial/index.html)
  - 上記のチュートリアルでは分からない、という人はこちらを先にやるのがオススメ。
  - CS231nのチュートリアルを見て、分からない所をこちらで調べる、という感じに使えば十分
  - CS231nの方がついていくのが辛くてこちらのPythonチュートリアルの方がやりやすい、という人は以下の感じで進める
    - 最低1から4まで
    - 出来たらさらに
      - 6
      - 9.1から9.3まで
      - 12くらいを読んでおくと万全
- [Python Cookbook](http://shop.oreilly.com/product/0636920027072.do)
  - こちらはさらに学びたい人用(事前準備というレベルでは不要です)
  - 辞書的に使う。目次に軽く目を通しておいて、調べたい事が出てきたら、調べるついでに付近を読む、という感じに使う
  - （この入門という枠を超えて）データ分析のPythonとしては、Pythonチュートリアルとcookbookだけで十分

## Tensorflowを全く触った事が無い、という人はまず何をやるべきか？


まずは本家のgetting startedを読んで行くのが良い。

- [本家の Getting Started](https://www.tensorflow.org/get_started/get_started) 

これの「Complete program」までを読めば良いと思う（estimatorからは見なくて良い）
このComplete programを見て、見慣れた物だと感じる人なら十分です。


Getting startedをはじめ見た人で、さっぱりなんだか分からない、という人は、次にCS 20SIのスライドを二つ程眺める。

- [CS 20SI](https://web.stanford.edu/class/cs20si/syllabus.html)
  - [Overview of Tensorflow](http://web.stanford.edu/class/cs20si/lectures/slides_01.pdf)
  - [Operations](http://web.stanford.edu/class/cs20si/lectures/slides_02.pdf)

ここまで見て、良く分からない！という人が対象の話となります。

# 事前準備

動画に入る前に少し触ってみた事はある、という事を前提にしたいと思うので、
以下くらいをやってみて欲しいと思います。

1. tensorflowとjupyter notebookのセットアップ（してなければ）
2. 2つのkoansを解いておく
   - 分離直線を求める [koans_linear_classifier.ipynb](https://github.com/karino2/tensorflow-introduction/blob/master/sources/koans_linear_classifier.ipynb)
      - [解答](https://github.com/karino2/tensorflow-introduction/blob/master/sources/koans_linear_classifier_answer.ipynb)
   - 多項式フィッティング [koans_curve_fitting.ipynb](https://github.com/karino2/tensorflow-introduction/blob/master/sources/koans_curve_fitting.ipynb)
      - [解答](https://github.com/karino2/tensorflow-introduction/blob/master/sources/koans_curve_fitting_answer.ipynb)

なお、上記のkoansには必要なDockerfileが入っているので、Docker分かる人はそれを使ってもらっても構いません（分からない人は無視してもらってもOKです）

# ゆるふわTensorflow入門

tensorflowの基礎を説明する入門動画のシリーズです。karino2が ＠Ikeda_yu にTensorflolwを教える、という形をとった、Tensorflow解説動画シリーズです。

このサイトをここまで見てきた事を前提に、少し分かりにくい所などを説明していきます。

[ゆるふわTensorflow 全五回 再生リスト](https://www.youtube.com/playlist?list=PL3J_mLcl4YCfQsBbQ2dHiAb3feX9EN6Qv)



## 第一回 はじめに

第一回はこのシリーズの狙いと、聞き手の ＠Ikeda_yu の簡単な自己紹介です。

<iframe width="560" height="315" src="https://www.youtube.com/embed/iodVFlGqdio?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


## 第二回 Tensorflow概要

- Tensorflowとは何か
   - コアはグラフを分散実行するライブラリ
      - Computation Graphは設計図
      - 何故グラフか？
      - ノードはop、エッジはtensorが流れる
      - client, master, worker
   - Python部は自動微分やOptimizer

<iframe width="560" height="315" src="https://www.youtube.com/embed/b8u8mmrtyY0?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


## 第三回 CPUとGPUってなーに？

- CPUとGPUの違い
   - マニュアルとベルトコンベア


<iframe width="560" height="315" src="https://www.youtube.com/embed/bHCK0DL7SJc?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


## 第四回 PlaceholderとVariable

- tf.Variableとtf.Placeholder
   - グラフのcollectionsとtrainnable
- Pythonにおける足し算とシンタックスシュガー


<iframe width="560" height="315" src="https://www.youtube.com/embed/tiKRJbvvLoM?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


## 第五回 train_opってなんなのさ？

- Optimizerとは何なのか？
  - compute_grads
  - apply_gradsとassign

<iframe width="560" height="315" src="https://www.youtube.com/embed/ccCIGpCyIAM?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


## 番外編


[つくってわかる！computation graph](https://karino2.github.io/tensorflow-introduction/computation_graph.html)（ゆるふわTensorflow入門、番外編）

computation graphが良く分からない、というフィードバックがあったので、computation graphの補講を作ってみる事にしました。

computation graphは説明を受けてもいまいち分かったような分かってないような気になるだけだと思うので、
今回は演習メインで行きたいと思います。
自分でもぜひやってみて下さい。

[CS231n](http://cs231n.stanford.edu)のLecture 4あたりにある話。


## 第一回、まずはcomputation graphを書いてみよう

第一回はcomputation graphって何？という話をしていきます。
back propagationの事は忘れて、computation graphを実際に自分で書いてみよう。

foward propagationもここでやります。

とりあえず以下の問題のforward propagationを幾つか書いてみよう。

### 定義

- 葉は変数。変数名だけか、四角で描く流儀もある。とにかく間のノードとは区別出来るように。
- 間はオペレーション
- 枝には途中経過を書けるように水平な部分を作る。
- 中間変数を置く場合は、オペレーションの後(今回はノードのちょっと右下くらい）に書く（backpropagationする場合など）
- forwardは上に書く、backwardは下に書く。今回はforwardは緑、backwardは赤にする。
- backwardの最初はいつも1
- 最終的には、細かい事はどうでもいい（あくまで計算に使うツールなので、計算さえ出来ればどうでも構わない）
    - +1はどうする？-xか*-1か、etc.



## 第二回、三回 backpropagation


- まずは具体例から。問題1をやってみる
    - まずは解析的に
    - 次にbackpropagationで
- 次に一つのノードに着目
    - forwardの値と、そのノードの前の微分の結果だけを使って、そのノードの微分を計算する
    - local gradientとupstream gradient(ある程度やってみたあとに）
    - みんなChain Ruleって言うけどさ
    - 掛け算のケースで意味する所を考える。
- 良く使うパターンを導出する
   - x + y
   - x * y
   - -x
   - 1/x
   - max
   - exp
   - $$\sigma(x)$$
   - カーネルも実際この単位

## 第四回（？） tensorflowとの関係

```python
  l = y-a*x-b
  loss = tf.reduce_sum((l-y_label)**2)
  g = tf.gradients(loss, [a, b])

  opt = tf.train.GradientDescentOptimizer(0.001)
  grad_vars = list(zip(g, [a, b]))
  opt.apply_gradients(grad_vars)

  # だいたいは以下
  train_op = [assign_op(v, v-grad*0.001) for v, grad in grad_vars]
```


### 問題
1. $$f(x, y, z) = (x+y)z $$を $$ (x,y,z) = (-2, 5, -4)$$で
2. $$f(a, b, x, y) = y-a*x-b $$ を $$ (a, b, x, y) = 2, 3, 1, 5 $$で
    - -1の扱い方
3. $$ f(w_0, w_1, w_2, x_0, x_1) = \frac{1}{1 + e^{-(w_0 \cdot x_0+w_1 \cdot x_1+w_2}} $$で、$$(w_0, w_1, w_2, x_0, x_1) = (2, -3, -3, -1, -2)$$。$$\sigma (x) = \frac{1}{1+e^{-x}}$$の微分を使ったパターンも考える。
    - この辺でlocal gradientの話とか
4. $$ f(x, y, w, z) = 2 \cdot (x \cdot y+max(w, z)) $$を$$ (x, y, w, z) = (3, -4, -1, 2) $$で。
5. $$ y\_pred = a+b \cdot x+c \cdot x^2 $$で、 $$ loss = tf.reduce\_sum((y\_pred-y\_label)^2)$$ の時で、
たとえば $$ (a, b, c, x, y\_label) = ((1, 1), (2, 2), (3, 3) , (2, 4), (5, 20)） $$の時
    - 行列の扱い
    - 複数回同じ変数が使われる場合
    - 毎回自力で出す
    - backward全部は辛いのでaとbくらいで

答えはだいたい[CS231nのLecture note](http://cs231n.github.io/optimization-2/)にある。


## 自分用メモ

ops.GraphKeys.TRAINABLE_VARIABLESは
```
TRAINABLE_VARIABLES = "trainable_variables"
```

ops.add_to_colectionsはdefault_graphのadd_to_collectionsを呼ぶ

Graphは_collectionsというメンバ変数の辞書に、このキーで変数を保持する。


Optimizerのminimimzeはcomnpute_gradsした後にapply_gradientsした結果を返す。


```
var_list = (
          variables.trainable_variables() +
          ops.get_collection(ops.GraphKeys.TRAINABLE_RESOURCE_VARIABLES))
```


が微分対象

variables.trainable_variables()は

```
ops.get_collection(ops.GraphKeys.TRAINABLE_VARIABLES, scope)
```

で、だいたいdefault_graphから取ってくる。






---




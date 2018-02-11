---
title: "つくってわかる！Computation Graph"
layout: page
---

<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script> 


# 作って分かる、computation graph！（ゆるふわTensorflow入門、番外編）

[ゆるふわTensorflow入門](https://karino2.github.io/tensorflow-introduction/)を作ってみたところ、computation graphが良く分からない、というフィードバックがあったので、computation graphの補講を作ってみる事にしました。

computation graphは説明を受けてもいまいち分かったような分かってないような気になるだけだと思うので、
今回は演習メインで行きたいと思います。
皆さんもぜひ自分でやってみて下さい。オススメのやり方は、動画を第四回まで見てから以下の問題一覧をやってみる事です。

[CS231n](http://cs231n.stanford.edu)のLecture 4あたりにある話。

動画の再生リストは以下です。

<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PL3J_mLcl4YCe7rPLONT5hULT9bOzf9Mnj" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


### 問題一覧

動画の中でやってる問題は以下になります（5は動画にはありませんが、練習問題です）。

1. $$f(x, y, z) = (x+y)z $$を $$ (x,y,z) = (-2, 5, -4)$$で
   - [解答01](./01_answer.png)
2. $$f(a, b, x, y) = y-a*x-b $$ を $$ (a, b, x, y) = (2, 3, 1, 5) $$で
   - -1の扱い方
   - [解答02](./02_answer.png)
3. $$ f(w_0, w_1, w_2, x_0, x_1) = \frac{1}{1 + e^{-(w_0 \cdot x_0+w_1 \cdot x_1+w_2)}} $$で、$$(w_0, w_1, w_2, x_0, x_1) = (2, -3, -3, -1, -2)$$。
   - [解答03](./03_answer.png)
   - $$\sigma (x) = \frac{1}{1+e^{-x}}$$の微分を使ったパターンも考える価値あり。
4. $$ f(x, y, w, z) = 2 \cdot (x \cdot y+max(w, z)) $$を$$ (x, y, w, z) = (3, -4, -1, 2) $$で。
   - [解答04](./04_answer.png)
5. $$ y\_pred = a+b \cdot x+c \cdot x^2 $$で、 $$ loss = tf.reduce\_sum((y\_pred-y\_label)^2)$$ の時で、
たとえば $$ (a, b, c) = (1, 2, 3)) $$で、$$(x, y\_label) = ((2, 4), (5, 20)）$$の時
   - 行列の扱い
   - [解答05](./05_answer.png)
      - 結果がベクトルになっていますが、これをどうしたいかは問題設定によります。この場合は足すのが期待値でしょうが、今回は分かりやすさを優先する為そこまではやっていません。

幾つかの問題は[CS231nのLecture note](http://cs231n.github.io/optimization-2/)からとっているので、あちらの解説も参考にしてください。


## 第一回、まずはcomputation graphを書いてみよう

第一回はcomputation graphって何？という話をしていきます。

<iframe width="560" height="315" src="https://www.youtube.com/embed/8N657sTcTyU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Computation Graphとは？

以下のような物です。

- 葉は変数。変数名だけか、四角で描く流儀もある。とにかく間のノードとは区別出来るように。
- 間はオペレーション
- 枝には途中経過を書けるように水平な部分を作る。
- 中間変数を置く場合は、オペレーションの後(今回はノードのちょっと右下くらい）に書く（backpropagationする場合など）
- forwardは上に書く、backwardは下に書く。今回はforwardは緑、backwardは赤にする。
- backwardの最初はいつも1
- 最終的には、細かい事はどうでもいい（あくまで計算に使うツールなので、計算さえ出来ればどうでも構わない）
    - +1はどうする？-xか*-1か、etc.

下の方のback propagationうんぬんはおいといて、実際に書いてみましょう。


この動画では、以下の2つについて書きます

- $$f(x, y, z) = (x+y)z $$を $$ (x,y,z) = (-2, 5, -4)$$という条件
- $$f(a, b, x, y) = y-a*x-b $$ を $$ (a, b, x, y) = 2, 3, 1, 5 $$という条件



## 第二回 Backpropagationをやってみよう

第二回は、細かい理屈はおいといてBackpropagationをやってみよう、という回です。
細かい理屈はおいといているのでなんだか良く分からないと思いますが、
先に実例を見た方が解説が簡単なので、この回は我慢して見てみてください。


<iframe width="560" height="315" src="https://www.youtube.com/embed/X9yatthh1I8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


前回と同じ例についてbackpropagationの計算を実際にやってみます。


## 第三回 Backpropagationをやってみよう （その2）

第三回も具体的に計算してみる、というのを続けます。sigmoid関数についてのcomputation graphを計算してみます。その過程でもう少しback propagationについての説明を追加していきます。

$$ f(w_0, w_1, w_2, x_0, x_1) = \frac{1}{1 + e^{-(w_0 \cdot x_0+w_1 \cdot x_1+w_2}} $$で、$$(w_0, w_1, w_2, x_0, x_1) = (2, -3, -3, -1, -2)$$の元でcomputation graphを書いてback propagationを計算します。

<iframe width="560" height="315" src="https://www.youtube.com/embed/3dXzPuTHUqY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

最終的な説明は次の第四回で行います。


## 第四回 Backpropagationとは何をやっているのか？

第二回、第三回とあまり解説せずにとりあえず計算してきたBackpropagationの詳細な解説となります。
また、幾つかの良く使うノードのパターンとして、+, *, exp, 1/x を説明します。


<iframe width="560" height="315" src="https://www.youtube.com/embed/Vqez4b6Gcwk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>



## 第五回 maxを計算してみよう

第四回までで理論的な解説が終わったので、もう一度それを踏まえて

$$ f(x, y, w, z) = 2 \cdot (x \cdot y+max(w, z)) $$を$$ (x, y, w, z) = (3, -4, -1, 2) $$

を計算してみましょう。
ここで登場するmaxを題材に、back propagationについて、変数が変わった時のエラーへの影響という視点からも考えてみます。

<iframe width="560" height="315" src="https://www.youtube.com/embed/N8yFvqONAS0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


## 第六回 Tensorflowの視点から

第五回まででComputation graphを書いてみる、という話をしてきました。

第六回では、最後にTensorflowの典型的なコードとの対応関係を簡単に話していきたいと思います。


<iframe width="560" height="315" src="https://www.youtube.com/embed/NnbMWXOI664" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

コードとしては、だいたい以下のようなコードの話をします。

```python
  l = y-a*x-b
  loss = tf.reduce_sum((l-y_label)**2)
  g = tf.gradients(loss, [a, b])

  opt = tf.train.GradientDescentOptimizer(0.001)
  grad_vars = list(zip(g, [a, b]))
  opt.apply_gradients(grad_vars)

  # 上のブロックは、だいたいは以下と同じ
  train_op = [assign_op(v, v-grad*0.001) for v, grad in grad_vars]
```

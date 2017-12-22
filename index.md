---
title: "Tensorflow入門ページ"
layout: page
---

既存のTensorflow入門が気に食わないので自分で動画の説明を作ろうと思い、そのための補助教材置き場です。
少し触ってみたけど良く分からない、という人向けに、エッセンスを話すのを目的とします。


# このサイト以前の入門

このサイト自体は「Tensorflowを少し触ってみたが良く分からなかった」という人向けのつもりなので、
インストールした事が無い、とか、Pythonを全く知らない、という人は対象にしていません。

そこで「とりあえずこの位知っている事を前提に話をします」というような前提をここに記しておきます。
自分に不足しているな、と思う所があれば、以下を適当に参考にしてください。


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



# Tensorflow入門

- CPUとGPUの違い
   - マニュアルとベルトコンベア
- 自動微分
- Computation Graphは設計図
- Pythonにおける足し算とシンタックスシュガー
- assign
- global registryとtrainnable


---




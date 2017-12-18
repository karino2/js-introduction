---
title: "Tensorflow入門ページ"
layout: page
---

既存のTensorflow入門が気に食わないので自分で動画の説明を作ろうと思い、そのための補助教材置き場です。

[内輪でやっている詳解ディープラーニングの勉強会](https://karino2.github.io/deeplearning-tensorflow-keras-study/)

で話した内容からブランチして手直ししていくつもりです。



# Pythonの最低限の知識

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
  - （この勉強会という枠を超えて）データ分析のPythonとしては、Pythonチュートリアルとcookbookだけで十分



# Tensorflow入門

- CPUとGPUの違い
   - マニュアルとベルトコンベア
- 自動微分
- Computation Graphは設計図
- Pythonにおける足し算とシンタックスシュガー
- assign
- global registryとtrainnable

## さらに勉強する為に
- [本家の Getting Started](https://www.tensorflow.org/get_started/get_started) 最初はこれ
- [CS 20SI](https://web.stanford.edu/class/cs20si/syllabus.html) 次はこれ。前半のスライドは入門に良い。

---




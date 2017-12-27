#!/bin/sh

jupyter-notebook --ip=0.0.0.0 2>&1 | tee out_notebook.log | sed -n "/^ *http.*8888/s/ *http.*token=//p"

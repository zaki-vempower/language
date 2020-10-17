#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Sep 17 09:29:37 2020

@author: yousuf
"""
"""
*Catalan-->ca
*Spanish-->es
"""

import argparse
from tqdm import tqdm
import pickle
parser = argparse.ArgumentParser()
   
parser.add_argument('-l', '--language', 
    help="input language")

args = parser.parse_args()

#args.language='ca'
import json
from googletrans import Translator
translator = Translator()

with open('main.json','rb') as f:
    sss=json.load(f)

ssss={}
for i,j in tqdm(zip(sss.keys(),sss.values()),total=len(sss.keys())):
    jjj={}
    try:
        j_keys=list(j.keys())
    except:
        ssss[i]=j
        continue
    j_values=list(j.values())

    for l,m in zip(j_keys,j_values):
        lll={}
        if type(m)==dict:
            for r,s in zip(m.keys(),m.values()):
                try:
                    translations = translator.translate(s, dest=str(args.language))
                    translations=translations.text
                except:
                    translations=s
                lll[r]=translations
            jjj[l]=lll
        else:
            try:
                translations = translator.translate(m, dest=str(args.language))
                translations=translations.text
            except:
                translations=m
            jjj[l]=translations
    ssss[i]=jjj

#with open(f'main_{args.language}.json','wb') as fp:
#    pickle.dump(ssss,fp)

with open(f'main_{args.language}.json', 'w') as fp:
    json.dump(ssss, fp)








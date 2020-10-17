const obj = require('./main.json');
const translate = require('@vitalets/google-translate-api')
const fs = require('fs')

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
class Main {
    constructor(){
        this.data = obj;
        this.data1 = {};
        this.data2 = {};
        this.num = 0;
        this.arg = myArgs[0]

    }

    firstLoop(){
        const wap = this.data
        for(let i in wap){
            if(wap.hasOwnProperty(i)){
                if(typeof wap[i] === 'string'){
                   translate(wap[i],{to:this.arg}).then(res=>{
                    this.data2[i] = res.text
                   })
                }
            }
        }
    }

    secondLoop(){
        const wap = this.data
        for(let i in wap){
            if(wap.hasOwnProperty(i)){
                if(typeof wap === 'object'){
                   this.data1[i] = wap[i]
                }
            }
        }

    }

    thirdLoop(){
        const wap = this.data1
        for(let i in wap){
            if(wap.hasOwnProperty(i)){
                if(typeof wap === 'object'){
                    for(let j in wap[i]){
                        if(wap[i].hasOwnProperty(j)){
                            if(typeof wap[i][j] === 'string'){
                                translate(wap[i][j], {to: this.arg}).then((res)=>{
                                    this.data1[i][j] = res.text
                                     this.num += 1
                                     console.log(this.num)
                                     this.fifthLoop()
                                  }).catch(err=>{
                                      console.log(err)
                                  })
                            }
                        }
                    }
                }
            }
        }
    }

    fourthLoop(){
        const wap = this.data
        for(let i in wap){
            if(wap.hasOwnProperty(i)){
                if(typeof wap === 'object'){
                    for(let j in wap[i]){
                        if(wap[i].hasOwnProperty(j)){
                            if(typeof wap[i][j] === 'object'){
                                for(let k in wap[i][j]){
                                    if(wap[i][j].hasOwnProperty(k)){
                                        
                                        translate(wap[i][j][k], {to: this.arg}).then((res)=>{
                                          this.data1[i][j][k] = res.text
                                           this.num += 1
                                           this.fifthLoop()
                                        }).catch(err=>{
                                            console.log(err)
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    fifthLoop(){
        fs.writeFile(`./mainn_${this.arg}.json`, JSON.stringify({...this.data2,...this.data1}), err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file',this.num)
            }
        })
    }
}

const dat = new Main()
dat.firstLoop()
dat.secondLoop()
dat.thirdLoop()
dat.fourthLoop()
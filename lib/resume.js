#!/usr/bin/env node
'use strict';

var log = console.log;
var info = require('./../lib/info.json');
var basicinfo = info.basicinfo;//基本信息预览：

function preview_basicinfo(){
    log()
    log(" "+basicinfo._title)
    log()
    for (var a in basicinfo.data) {
        log("   - " + basicinfo.data[a].info + " : " + basicinfo.data[a].val)
    };
    log()
}

module.exports = function(cmd,options) {
    // console.log("IF::",cmd);
    // console.log("IF::",options);
    if(cmd === "preview" && options.basicinfo === true){
        preview_basicinfo();
    }else if(options.basicinfo){
        for (var a in basicinfo.data) {
            if(a === options.basicinfo) log(basicinfo.data[a].info + " : " + basicinfo.data[a].val);
        };
    } 
};
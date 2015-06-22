#!/usr/bin/env node
'use strict';

var log = console.log;
var info = require('./../lib/info.json');
var basicinfo = info.basicinfo;//基本信息数据：
var education = info.education;//教育经历数据：

function preview_basicinfo(){
    log()
    log(" "+basicinfo.title)
    log()
    for (var a in basicinfo.data) {
        log(" › " + basicinfo.data[a].info + " : " + basicinfo.data[a].val)
    };
    log()
}

function preview_education(){
    var edu = education.data;
    log()
    log(" "+education.title)
    for (var i = 0; i < edu.length; i++) {
        for(var a in edu[i]){
            if(a === "timePeriod") log(),
                log("   ■ "  + edu[i][a].val),
                log("   ----------------------------");
            else log("   › " + edu[i][a].info + " : " + edu[i][a].val);
        }
    };
    log()
}

module.exports = function(cmd,options) {
    console.log("IF::",cmd);
    console.log("IF::",options);
    // console.log("message:123:",cmd);
    // console.log("message:124:",options.basicinfo);
    // console.log("message:124:",options.education);
    if(cmd === "preview" && options.basicinfo === true){
        preview_basicinfo();
    }else if(cmd === "preview" && options.education === true){
        preview_education();
    }else if(options.basicinfo){
        for (var a in basicinfo.data) {
            if(a === options.basicinfo) log(basicinfo.data[a].info + " : " + basicinfo.data[a].val);
        };
    }else if(options.education){


    } 
};
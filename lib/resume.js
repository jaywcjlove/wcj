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
        log("   › " + basicinfo.data[a].info + " : " + basicinfo.data[a].val)
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

function error_undefine(options,alias){
    log()
    log("   wcj:"+"'"+alias+"'"+" is not a wcj command. See 'wcj "+options._alias+" --help'.")
    log()
}

module.exports = function(cmd,options) {
    // console.log("IF::",options);
    // console.log("message:123:",cmd);
    // console.log("message:124:",options.basicinfo);
    // console.log("message:124:",options.education);
    if(cmd === 'preview'){
        preview_basicinfo();
        preview_education();
    }else if(options.basicinfo){
        if(options.basicinfo === true && !cmd){
            preview_basicinfo();
        }else if(!basicinfo.data[cmd || options.basicinfo]){
            error_undefine(options,(cmd||options.basicinfo))
        }else{
            for (var a in basicinfo.data) {
                if(cmd === a || a === options.basicinfo){
                    log(basicinfo.data[a].info + " : " + basicinfo.data[a].val);
                }
            };
        }
    }else if(options.education){
        if(options.education === true && !cmd){
            preview_education();
        }else{
            error_undefine(options,(cmd||options.education))
        }
    }
};
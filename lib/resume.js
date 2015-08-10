#!/usr/bin/env node
'use strict';

var log = console.log;
var clc = require('cli-color');
var info = require('./../lib/info.json');
var basicinfo = info.basicinfo;//基本信息数据：
var education = info.education;//教育经历数据：
var itskill = info.itskill;//教育经历数据：

//基本信息  预览
function preview_basicinfo(){
    var dt = basicinfo.data
    log()
    log("  "+ clc.xterm(46).bold(basicinfo.title + ': ' +(dt.name.val||''))  )
    log()
    log("   " + (dt.workExperience?dt.workExperience.val + '|' :'') + 
        (dt.gender?dt.gender.val + '|' :'') +
        (dt.dateOfBirth?dt.dateOfBirth.val + '|' :'') +
        (dt.maritalStatus?dt.maritalStatus.val + '|' :'') +
        (dt.height?dt.height.val :'') )

    log("   ----------------------------");
    if(dt.hukou)log("   " + dt.hukou.info + " : " + dt.hukou.val);
    if(dt.residency)log("   " + dt.residency.info + " : " + dt.residency.val);
    if(dt.nation || dt.region || dt.currentCity || dt.postalCode){
        var address = '' + (dt.nation.val||'') + ' ' +
            (dt.currentCity.val || '') + ' ' + 
            (dt.postalCode.val?' (邮编: '+dt.postalCode.val+')':'');

        log("   地　址 : "+ address);
    }
    if(dt.mobile)log("   " + dt.mobile.info + " : " + dt.mobile.val);
    if(dt.email)log("   " + dt.email.info + " : " + dt.email.val);
    if(dt.website)log("   " + dt.website.info + " : " + dt.website.val);
    log()
}
//教育经历  预览
function preview_education(){
    var edu = education.data;
    log()
    log(" "+clc.xterm(46)(education.title))
    for (var i = 0; i < edu.length; i++) {
        for(var a in edu[i]){
            if(a === "timePeriod") log(),
                log("   " + clc.xterm(161)('■ ') + edu[i][a].val),
                log("   ----------------------------");
            else log("   " + clc.xterm(161)('› ') + edu[i][a].info + " : " + edu[i][a].val);
        }
    };
    log()
}

//IT技能  预览
function preview_itskill(){
    var its = itskill.data;
    log()
    log(" "+clc.xterm(46)(itskill.title))
    log()
    for (var i = 0; i < its.length; i++) {

        var txt = ''

        for(var a in its[i]){
            if(its[i][a]) {
                txt += a + ':' + its[i][a] + ' | ';
                // log("   ■ " + (its[i][a]? a + ':' + its[i][a]:"") )
            }
        }
        log("   " + clc.xterm(161)('■ ') + txt)
        // log("   ----------------------------");
    };
    log()
}

//错误处理
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
        //提供可选参数预览简历
        preview_basicinfo();
        preview_education();
        preview_itskill();
    }else if(options.basicinfo){
        //基本信息
        if(options.basicinfo === true && !cmd){
            preview_basicinfo();
        }else if(!basicinfo.data[cmd || options.basicinfo]){
            error_undefine(options,(cmd||options.basicinfo))
        }else{
            for (var a in basicinfo.data) {
                if(cmd === a || a === options.basicinfo){
                    log()
                    log('   '+clc.xterm(46).bold('› '+basicinfo.data[a].info + " : ") + clc.xterm(161)(basicinfo.data[a].val));
                    log()
                }
            };
        }
    }else if(options.education){
        //教育经历预览
        if(options.education === true && !cmd){
            preview_education();
        }else{
            error_undefine(options,(cmd||options.education))
        }
    }else if(options.itskill){
        //IT技能 预览
        if(options.itskill === true && !cmd){
            preview_itskill();
        }else{
            error_undefine(options,(cmd||options.itskill))
        }
    }else{
        //如果没有任何参数就是预览简历
        preview_basicinfo();
        preview_education();
        preview_itskill();
    }
};
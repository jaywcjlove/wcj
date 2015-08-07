#!/usr/bin/env node 
var program = require('commander');
var appInfo = require('./../package.json');
var resume = require('../lib/resume.js');
var log = console.log;

program
    // .allowUnknownOption()//不报错误
    .version(appInfo.version)
    .usage('这里是我私人玩耍的命令哦！[options] <package>')

program
    .command('resume [cmd]')
    .alias('rs')
    .description('  这里是我的简历详情！')
    .option("-b, --basicinfo [type]", "基本信息")
    .option("-e, --education [type]", "教育经历")
    .action(function(cmd, options){
        var nm = typeof options.name=='string'?options.name:""
        // log('resume "%s" 使用 %s 模式', cmd, nm);
        // log("test:",program);
        resume(cmd,options);

    }).on('--help', function() {
        log('  basicinfo 说明:');
        log();
        log('    preview 预览简历');
        log();
        log('    -b, --basicinfo 基本信息');
        log('       name : 名字');
        log('       height : 身高');
        log('       dateOfBirth : 出生日期');
        log('       workExperience : 工作经验');
        log('       mobile : 手机号码');
        log('       telephone : 电话号码');
        log('       email : 邮箱地址');
        log('       residency : 居住地点');
        log('       currentSituation : 现状');
        log('       currentCity : 当前城市');
        log('       nation : 国家');
        log('       region : 地区');
        log('       postalCode : 邮编地址');
        log('       ID : 身份证ID');
        log('       website : 个人网赚');
        log('       maritalStatus : 婚姻状况');
        log('       politicalStatus : 政治面貌');
        log('    -e, --education 教育经历');
        // log('    $ wcj resume ss');
        log();
    });

    

program.parse(process.argv);

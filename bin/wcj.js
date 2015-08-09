#!/usr/bin/env node 
var program = require('commander');
var appInfo = require('./../package.json');
var resume = require('../lib/resume.js');
var info = require('./../lib/info.json');
var basicinfo = info.basicinfo;//基本信息数据：
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
    .option("-i, --itskill   [type]", "IT技能")
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
        for (var a in basicinfo.data) {
            log("       "+ a + ': ' + basicinfo.data[a].info)
        };
        log('    -e, --education 教育经历');
        log('    -i, --itskill 教育经历');
        // log('    $ wcj resume ss');
        log();
    });

    

program.parse(process.argv);

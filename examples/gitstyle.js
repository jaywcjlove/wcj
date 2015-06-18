#!/usr/bin/env node 
var program = require('commander');
var appInfo = require('./../package.json');

program
    .version(appInfo.version)
    .usage('这里是我私人玩耍的命令哦！[options] <package>')

//像git风格一样的子命令
program
    //子命令
    .command('resume <cmd>')
    //短命令 - 简写方式
    .alias('rs')
    //说明
    .description('这里是我的简历详情！')
    //resume的子命令
    .option("-n, --name <mode>", "输出我的名字")
    //注册一个callback函数
    .action(function(cmd, options){
        var nm = typeof options.name=='string'?options.name:""
        console.log('resume "%s" 使用 %s 模式', cmd, nm);
    }).on('--help', function() {
        //这里输出子命令的帮助
        console.log('  Examples:');
        console.log('    运行方法：');
        console.log('    $ ./bin/wcj.js resume ss -n aaaaa');
        console.log('    $ ./bin/wcj.js resume ss');
        console.log();
    });


program.parse(process.argv);
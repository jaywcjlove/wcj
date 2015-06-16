#!/usr/bin/env node  
var program = require('commander');

// var fs = require("fs"),
//     path = process.cwd();

// var run= function (obj) {
//     if(obj[0] === '-v'){
//         console.log('version is 1.0.0');
//     }else if(obj[0] === '-h'){
//         console.log('Useage:');
//         console.log('  -v --version [show version]');
//     }else{
//         fs.readdir(path, function(err, files){
//             if(err){
//                 return console.log(err);
//             }
//             for(var i = 0; i < files.length; i += 1){
//                 console.log(files[i]);
//             }
//         });
//     }
// };
// //获取除第一个命令以后的参数，使用空格拆分
// run(process.argv.slice(2)); 

program
    .allowUnknownOption()
    .version('0.0.1')
    .option('-r, --resume', '简历')
    .option('-d, --no-date', '不显示当前的日期')
    .option('-l, --language <lang>', '这个语言是我擅长的语言。')
    .option('-i, --idatabase <db>', '该数据库为我最擅长数据库', 'MySQL')
    .parse(process.argv);

if (program.resume) {
    console.log('简历'
        + '-'
        + '这个是我的简历！'
    );
}

if (program.language) console.log('language: 我擅长的语言`' + program.language + '`');
if (program.database) console.log('db: 我擅长的语言`' + program.database + '`');

var dt = new Date();
if (program.date) {
    console.log(dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate());
}


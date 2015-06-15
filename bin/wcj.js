#!/usr/bin/env node  

var fs = require("fs"),
    path = process.cwd();

var run= function (obj) {
    if(obj[0] === '-v'){
        console.log('version is 1.0.0');
    }else if(obj[0] === '-h'){
        console.log('Useage:');
        console.log('  -v --version [show version]');
    }else{
        fs.readdir(path, function(err, files){
            if(err){
                return console.log(err);
            }
            for(var i = 0; i < files.length; i += 1){
                console.log(files[i]);
            }
        });
    }
};
//获取除第一个命令以后的参数，使用空格拆分
run(process.argv.slice(2)); 
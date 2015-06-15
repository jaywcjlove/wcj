wcj
---

`Node.js` 中发现弄个命令行工具特别轻松，我来学习如何使用 `node.js` 生成自己到command命令，在未来的项目中方便自己。  

- 先弄个小实例感受一下命令行的魅力
- 再用命令行实现输出自己的简历（我觉得这个可能很有趣）
- 常用的命令加入进来
  + ls 查看当前目录
  + ls -a 包括隐藏文件
  + 打开当前目录
- 就先这么计划着吧。

# 小实例

开始编写之前需要确认的一件事情是你已经安装了Node.js。你可以在命令行中运行 `which node` 来确认是否已经安装，或者运行 `node -v` 查看 node 的版本 。如果你已经安装了node，你可以看到类似于下面的输出结果：

```
$ which node
/usr/local/bin/node  

$ node -v
v0.10.36
```

## 创建目录

首先任意创建一个文件夹，初始化 `package.json` 文件，在该文件夹下创建bin目录：

```shell
$ mkdir wcj #创建一个文件夹
$ cd wcj && mkdir bin
$ npm init #初始化 `package.json` 文件
```

## 编写命令行

cd到 `bin` 目录下，新建一个 `wcj.js` 文件(名字自取)，编写如下代码，在js文件顶部加上 `#!/usr/bin/env node` 这段代码：

```js 
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
```


上面的 `#!/usr/bin/env node` 被成为 `shebang` ，表示用后面的路径所示的程序来执行当前文件夹。还需要一个 `package.json` 文件

```json
{
  "name": "wcj",
  "version": "1.0.0",
  "description": "wcj ---",
  "repository": {
    "type": "git",
    "url": "https://github.com/jaywcjlove/wcj.git"
  },
  "main": "index.js",
  "bin": { "wcj": "bin/wcj.js" },
  "author": "kenny wang <wowohoo@qq.com> ",
  "license": "MIT"
}
```

运行 `node bin/wcj.js` 会显示当前文件夹下的所以文件和文件夹名。这个玩意儿真的跑起来了。[更多npm link的信息请查看](https://docs.npmjs.com/cli/link)   

`package.json` 文件中 `bin` 里面的内容表示这个字段将 `wcj` 命令映射到了你的 `bin/wcj.js` 脚本。 

此工具采用 npm版本号采用的 [semver](http://semver.org/lang/zh-CN/) 规则

```
"bin": { "wcj": "bin/wcj.js" }
```


## 全局运行命令调试
> 确保你在 `package.json` 文件中添加了 `bin` 节点。然后打开命令了工具进入 `wcj` 

如果在项目目录下运行没有问题，可以将当前目录模块安装到全局，也可以采用此方法来更新你的命令行工具

```
sudo npm install . -g
```

或者目录输入 `npm link` 会自动添加全局的 `symbolic link` ，然后就可以使用自己的命令了。

```shell 
$ wcj
#README.md
#bin
#package.json

$ cmd -v
# version is 1.0.0

$ cmd -h 
#Useage:
#  -v --version [show version]
```


## 错误

在运行 `sudo npm install . -g` 会有一堆警告可以忽视

如果你已经 `npm link` 搞了一遍你再 link 一遍，会报如下错误。即使你 `npm unlink` 也会报如下错误：

```
npm link
npm ERR! Darwin 14.3.0
npm ERR! argv "node" "/usr/local/bin/npm" "link"
npm ERR! node v0.10.36
npm ERR! npm  v2.7.1
npm ERR! path /usr/local/bin/wcj
npm ERR! code EEXIST

npm ERR! Refusing to delete: /usr/local/bin/wcj not in /Applications/XAMPP/xamppfiles/htdocs/git/github.com/myJS/wcj
File exists: /usr/local/bin/wcj
Move it away, and try again.
```

让你删除 `/usr/local/bin/wcj` 再 `npm link` ， 删除此目录运行 `rm -rf /usr/local/bin/wcj`

## 阅读参考

第一个小实例看了很多文章，记录一下，感觉非常简单的样子。

- [用node.js开发命令行工具](http://binbinliao.com/programming/commandline-nodejs.html)
- [Command-line utilities with Node.js](http://cruft.io/posts/node-command-line-utilities/)
- [使用Node.js创建命令行工具](http://zdan.me/post/2015/04/23/build-commands-with-nodejs.html)



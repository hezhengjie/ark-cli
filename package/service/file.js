const fs = require('fs');
const path = require('path');
const {fileIgnore,fileType,fileGetDenpend,fileDenpendReg}  = require('../config/config');
const rootPath = path.resolve(process.cwd());

// 遍历当前根目录文件
function traverseCurrentDir() {
    let allFileList = traverseDir(rootPath);
    // console.log(allFileList)
    
}

// 遍历文件
function traverseDir(filePath){
    let fileList = [];
    const files = fs.readdirSync(filePath);
    //遍历读取到的文件列表
    files.forEach(function (filename) {
        //获取当前文件的绝对路径
        const filedir = path.join(filePath, filename);
        // 解析当前文件的相对路径
        const filedirRelate = path.relative(rootPath, filedir);
        let ignoreFlag = fileIgnore.some((item)=>{
            if(item===filedirRelate||new RegExp(item).test(filedirRelate)){
                // 可忽略的文件
                return true;
            }
        });
        if(ignoreFlag){
            return ;
        }
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        let stats = fs.statSync(filedir);
        let file = {
            id:stats.ino,
            filename:filename,
            size:stats.size,
            path:filedir
        }
        if (stats.isFile()) {//是文件
            file.type = 'FILE';
            file.fileType = checkFileType(file);
            if(checkShouldGetDependencies(file)){
                file.dependencies = getDependencies(file);
            }
            
            fileList.push(file);
        }
        if (stats.isDirectory()) {//是文件夹
            file.type = 'DIR';
            fileList.push(file);
            fileList = fileList.concat(traverseDir(filedir));//递归，如果是文件夹，就继续遍历该文件夹下面的文件
        }
    });
    return fileList;
}


//判断文件类型
function checkFileType(file){
    const extname = path.extname(file.filename).replace('.','');
    return fileType[extname.toLocaleLowerCase()];
}


// 判断是否需要获取依赖
function checkShouldGetDependencies(file){
    return fileGetDenpend.indexOf(file.fileType)>-1
}

// 获取文件依赖文件
function getDependencies(file){
    const fileContent = fs.readFileSync(file.path, 'utf8');
    if(file.fileType===fileType['js']){
        // js文件
       const [m, m1, m2] = fileDenpendReg['require'].exec(fileContent);
       console.log(m2,file.filename);
    }
    if(file.fileType===fileType['css']){
        // js文件
       const result =  fileDenpendReg['@import'].exec(fileContent);
       console.log(result);
    }
}

// 获取用户配置的别名
function getAlias(){
    //判断是否是webpack.config.js或者vue.config.js

}



module.exports = {
    traverseCurrentDir,
    traverseDir
};
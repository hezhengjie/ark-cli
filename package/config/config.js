 const fileIgnore = ['node_modules','package.json','README.md','yarn.lock','^[.]'];

 const fileType = {
    'jpg':'IMG',
    'png':'IMG',
    'gif':'IMG',
    'jpeg':'IMG',
    'js':'JS',
    'css':'CSS',
    'less':'CSS',
    'sass':'CSS',
    'scss':'CSS',
    'json':'JSON',
    'vue':'VUE',
    'jsx':'JSX'
 }
 const fileGetDenpend = ['JS','CSS','VUE','JSX'];
//  ES2015 import 语句
// CommonJS require() 语句
// AMD define 和 require 语句
// css/sass/less 文件中的 @import 语句。
// 样式(url(...))或 HTML 文件(<img src=...>)中的图片链接(image url)
 const fileDenpendReg = {
    'require':/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,
    'import':'',
    '@import':/(?:^|\s)?(?:@import)(?:\s)(?:url)?(?:(?:(?:\()(["\'])?([^"\')]+)\1(?:\))|(["\'])(.+)\3)(?:[A-Z\s])*)+(?:;)/g,
    'backgroud':'',
    'img':''
 }
 module.exports = {
    fileIgnore,
    fileType,
    fileGetDenpend,
    fileDenpendReg
 }
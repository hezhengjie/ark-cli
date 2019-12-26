const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const inquirer = require('inquirer');

function queryPort(port){
    const execString = port?`lsof -i:${port}`:'lsof -i'
    shell.exec(execString);
}


module.exports = {
    queryPort
};
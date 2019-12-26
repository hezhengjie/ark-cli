#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const program = require('commander');
const {queryPort} = require('../package/commands/system');
program.version('1.0.0','-v, --version','版本号');

// 查端口
program
    .command('q [port]')
    .description('查询端口')
    .action(queryPort);

program.parse(process.argv);
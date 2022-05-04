#!/usr/bin/env node
import { program } from 'commander'
import pageLoaderCore from '../src/pageLoaderCore.js'

program
    .version('0.0.1')
    .name('page-loader')
    .argument('<string>', 'url to parse')
    .option('-o, --output <pathToFile>', 'add the path', process.cwd())
    .action((url, options) => pageLoaderCore(url, options.output))

program.parse()

// ls
// npx babel-node bin/page-loader https://google.com
// ls
// vim google-com.html
//:wq
// exit

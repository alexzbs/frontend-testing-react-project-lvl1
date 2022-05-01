import { program } from 'commander'
import pageLoaderCore from './src/pageLoaderCore.js'

program
    .version('0.0.1')
    .name('page-loader')
    .argument('<string>', 'url to parse')
    .option('-o, --output <pathToFile>', 'add the path', './')
    .action((url, options) => pageLoaderCore(url, options.output))

program.parse()

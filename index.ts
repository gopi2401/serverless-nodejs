#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { fileCreate } from './src/services/sampleFile';
import { deploy } from './src/main';
const resolvedPath = path.resolve('./servdata.json');
export const servdata = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
console.log(servdata)
if (!servdata['awsConfig']) throw 'awsConfig not defind';
if (!servdata['function']) throw 'function not defind';

(async () => {
    try {
        // Check if the JSON file exists
        const loadingMessage = "Checking JSON file";
        const loading = startDotsLoading(loadingMessage);
        if (fs.existsSync(resolvedPath)) {
            stopDotsLoading(loading, "Start build and deploy!.");
            const args = process.argv.splice(2);
            const arg = args[0];
            if (arg === 'deploy') {
                deploy();
            } else if (arg === 'remove') { }
        } else {
            console.error("JSON file not found!.");
            // process.exit(1);
            // setTimeout(() => {
            fileCreate()
            stopDotsLoading(loading, "Sample json file created!.")
            // }, 3000);
        }

        // const args = process.argv.splice(2);
        // const arg = args[0];

        // if (args.length > 1) {
        //     console.info("You can only pass one argument; `build` or `deploy`");
        // }
        // if (!arg) {
        //     console.info("You need to pass one of the following arguments: `build` or `deploy`.");
        // }
        // if (arg === 'build') {
        // deploy()

        // } else {
        // console.log(`Sorry, ${arg} is not a valid argument.`);
        // }


    } catch (e) {
        console.error(e)
    }
})()



function startDotsLoading(message) {
    const dots = ['.', '..', '...', ''];
    let dotIndex = 0;

    return setInterval(() => {
        process.stdout.write(`\r${message}${dots[dotIndex++]}`);
        dotIndex %= dots.length;
    }, 500); // Update every 500 ms
}

function stopDotsLoading(loadingInterval, message) {
    clearInterval(loadingInterval);
    process.stdout.write(`\r${message}\n`);
}
#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { deploy, remove } from './src/main.js';
import { core_data } from './src/services/coredata/core_file.js';
import ora from 'ora';
const resolvedPath = path.resolve('./servdata.json');

if (!core_data.awsConfig) throw 'awsConfig not defind';
if (!core_data.function) throw 'function not defind';

(async () => {
    try {
        // Check if the JSON file exists
        const spinner = ora('Checking JSON file').start();
        if (fs.existsSync(resolvedPath)) {
            spinner.stop().clear();
            const args = process.argv.splice(2);
            const arg = args[0];
            if (arg === 'deploy') {
                let data = await deploy();
                if (data)
                    data.map((value) => {
                        console.log(value.FunctionName, ' ', value.FunctionUrl)
                    });
            } else if (arg === 'remove') {
                await remove();
            }
        } else {
            spinner.stop().fail("JSON file not found!.");
            // stopDotsLoading(loading, "Sample json file created!.")
        }
    } catch (e) {
        console.error(e)
    }
})();
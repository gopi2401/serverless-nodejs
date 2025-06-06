#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { create, deploy, remove } from './src/main.js';
// import { core_data } from './src/services/coredata/core_file.js';
import ora from 'ora';
import { help } from './src/help.js';

(async () => {
    try {
        const args = process.argv.splice(2);
        const arg = args[0];
        if (arg === 'create') {
            const projectName = args[1] || 'serverless-js-project';
            // Create the project folder
            const projectPath = path.join(process.cwd(), projectName);
            if (!fs.existsSync(projectPath)) {
                fs.mkdirSync(projectPath);
                await create(projectName, projectPath);
            } else {
                console.log(`Directory ${projectName} already exists!`);
                process.exit(1);
            }

        } else
            // if (fs.existsSync(path.resolve('./servdata.json'))) {
            //     // const resolvedPath = ;

            // if (!core_data.awsConfig) throw 'awsConfig not defind';
            // if (!core_data.function) throw 'function not defind';
            // Check if the JSON file exists
            //     const spinner = ora('Checking JSON file').start();
            // spinner.stop().clear();
            if (arg === 'deploy') {
                let data = await deploy();
                if (data)
                    data.map((value: any) => {
                        console.log(value.FunctionName, ' ', value.FunctionUrl)
                    });
            } else if (arg === 'remove') {
                await remove();
            } else if (arg === '--help' || arg === 'help') {
                help()
            }
        // } else {
        // spinner.stop().fail("JSON file not found!.");
        // stopDotsLoading(loading, "Sample json file created!.")
        // }
        if (arg === '--version' || arg === 'version' || arg === '-v') {
            // Display the version of the CLI tool
            console.log("Serverless JS CLI Version 1.0.0");
        }
    } catch (e) {
        console.error(e)
    }
})();
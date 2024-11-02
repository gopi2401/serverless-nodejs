import * as fs from 'fs';
import { JSONFilePreset } from 'lowdb/node';
import { LogData } from './types.js';
import { core_data } from './core_file.js';

const defaultData: LogData = {
    ...core_data,
    role: {},
    policy: []
};

if (!fs.existsSync('./sls')) {
    fs.mkdirSync('sls');
};

const logdata = await JSONFilePreset('sls/log.json', defaultData);

export let log_data = logdata.data;

export const log_create = async () => {
    await logdata.write()
}

export const role_log_create = async (roledata: object) => {
    logdata.data.role = roledata;
    await logdata.write()
}
export const policy_log_create = async (policydata: object) => {
    logdata.data.policy.push(policydata);
    await logdata.write()
}

export const function_log_create = async (function_data: object) => {
    logdata.data.function.push(function_data);
    await logdata.write()
}
import * as fs from 'fs';
import { JSONFilePreset } from 'lowdb/node';
import { LogData, roleType } from './types.js';
import { core_data } from './core_file.js';
import { getAWSAccountId } from '../id/get_aws_account_Id.js';

const template = {
    awsid: await getAWSAccountId(),
    function: [],
    functionPath: '',
    policy: [],
    role: {},
};
const defaultData: LogData = template;

if (!fs.existsSync('./sls')) {
    fs.mkdirSync('sls');
};

export const logdata = await JSONFilePreset('sls/log.json', defaultData);

export let log_data = logdata.data;

export const role_log_create = async (roledata: any) => {
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

export const find_function_index = (FunctionName: string) => log_data.function.findIndex((value) => (
    value.FunctionName === FunctionName));
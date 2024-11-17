import * as fs from 'fs';
import { JSONFilePreset } from 'lowdb/node';
import { core_data } from './core_file.js';
import { log_data } from './log_data.js';
import { policyTypes } from './types.js';
let log_policy_statement: any = () => {
    return {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "logs:CreateLogGroup",
                "Resource": `arn:aws:logs:${core_data.awsConfig.region + ":" + log_data.awsid}:*`
            },
            {
                "Effect": "Allow",
                "Action": [
                    "logs:CreateLogStream",
                    "logs:PutLogEvents"
                ],
                Resource: []
            }
        ]
    };
}
// const resource = core_data.function.map((value: any) => (
//     `arn:aws:logs:${core_data.awsConfig.region + ":" + log_data.awsid}:log-group:/aws/lambda/${value.name}:*`
// ));
// log_policy_statement.Statement[1].Resource = resource;
let url_policy_statement = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "StatementId": "FunctionURLAllowPublicAccess",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "lambda:InvokeFunctionUrl",
            "Resource": "arn:aws:lambda:ap-south-1:908027393427:function:*",
            "Condition": {
                "StringEquals": {
                    "lambda:FunctionUrlAuthType": "NONE"
                }
            }
        }
    ]
}
const template = {
    log_policy: log_policy_statement,
    url_policy: url_policy_statement
};
const defaultData: policyTypes = template;

export const policydata = await JSONFilePreset('sls/policy.json', defaultData);

export let policy_data = policydata.data;

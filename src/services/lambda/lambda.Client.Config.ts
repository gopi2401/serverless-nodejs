import { LambdaClient } from "@aws-sdk/client-lambda";
import * as fs from 'fs';

const data = JSON.parse(fs.readFileSync('../example/servdata.json', 'utf8'))
if (!data.awsConfig) throw 'awsConfig not defined!'

export const lambda_client = new LambdaClient(data.awsConfig);

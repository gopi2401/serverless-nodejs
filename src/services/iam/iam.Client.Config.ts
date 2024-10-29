import * as fs from 'fs';
import * as path from 'path';
import { IAMClient } from "@aws-sdk/client-iam";

const resolvedPath = path.resolve('./servdata.json');
export const servdata = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
if (!servdata['awsConfig']) throw 'awsConfig not defined!'

export const iamClient = new IAMClient(servdata.awsConfig);

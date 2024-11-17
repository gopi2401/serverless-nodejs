import * as fs from 'fs';
import * as path from 'path';
import { IAMClient } from "@aws-sdk/client-iam";
import { core_data } from '../coredata/core_file.js';

// if (!core_data.awsConfig) throw 'awsConfig not defined!'
export const iamClient: any = () => new IAMClient(core_data.awsConfig);

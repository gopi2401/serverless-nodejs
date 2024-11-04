import { LambdaClient } from "@aws-sdk/client-lambda";
import { core_data } from "../coredata/core_file.js";


if (!core_data.awsConfig) throw 'awsConfig not defined!'

export const lambda_client = new LambdaClient(core_data.awsConfig);

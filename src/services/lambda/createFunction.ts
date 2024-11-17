import { CreateFunctionCommand, FunctionUrlAuthType } from '@aws-sdk/client-lambda';
import { lambda_client } from './lambda.Client.Config.js';
import { create_function_url_config } from './create_function_url_config.js';
import { log_data, logdata } from '../coredata/log_data.js';
import { addPermission } from './add_permission.js';


export const createFunction = async (input: any) => {
    try {
        let index = log_data.function.findIndex((value: any) => (
            value.FunctionName === input.FunctionName
        ));
        if (index != -1) { } else {
            const command = new CreateFunctionCommand(input);
            const response = await lambda_client.send(command);
            if (response.$metadata.httpStatusCode == 201) {
                const {
                    CodeSize,
                    Description,
                    FunctionArn,
                    FunctionName,
                    Handler,
                    LastModified,
                    MemorySize,
                    PackageType,
                    Role,
                } = response;
                logdata.data.function.push({
                    CodeSize,
                    Description,
                    FunctionArn,
                    FunctionName,
                    FunctionUrl: null,
                    Handler,
                    LastModified,
                    MemorySize,
                    PackageType,
                    Role,
                    Permission: []
                });
                logdata.write();
            }
            await addPermission({
                FunctionName: response.FunctionName, // required
                StatementId: "FunctionURLAllowPublicAccess" + response.FunctionName, // required
                Action: "lambda:InvokeFunctionUrl", // required
                Principal: "*", // required
                FunctionUrlAuthType: "NONE"
            });
            const urlConfig = {
                FunctionName: response.FunctionName,
                AuthType: FunctionUrlAuthType.NONE
            };
            await create_function_url_config(urlConfig);
            return response;
        }
    } catch (e: any) {
        console.error(e.message);
    }
};

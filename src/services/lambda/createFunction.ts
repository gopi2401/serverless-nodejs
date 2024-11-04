import { CreateFunctionCommand, FunctionUrlAuthType } from '@aws-sdk/client-lambda';
import { lambda_client } from './lambda.Client.Config.js';
import { create_function_url_config } from './create_function_url_config.js';
import { log_data, logdata } from '../coredata/log_data.js';
import { addPermission } from './add_permission.js';


export const createFunction = async (input: any) => {
    try {
        let index = log_data.function.findIndex((value) => (
            value.FunctionName === input.FunctionName
        ));
        if (index != -1) { } else {
            const command = new CreateFunctionCommand(input);
            const response = await lambda_client.send(command);
            const inputdata = {
                FunctionName: response.FunctionName,
                AuthType: FunctionUrlAuthType.NONE
            };
            const data = {
                FunctionName: response.FunctionName, // required
                StatementId: "FunctionURLAllowPublicAccess" + `-${response.FunctionName}`, // required
                Action: "lambda:InvokeFunctionUrl", // required
                Principal: "*", // required
                SourceArn: `arn:aws:lambda:ap-south-1:908027393427:function:*`,
                // SourceAccount: "STRING_VALUE",
                // EventSourceToken: "STRING_VALUE",
                // Qualifier: "STRING_VALUE",
                // RevisionId: "STRING_VALUE",
                // PrincipalOrgID: "STRING_VALUE",
                FunctionUrlAuthType: FunctionUrlAuthType.NONE
            };
            await addPermission(data);
            let functions = await create_function_url_config(inputdata);
            // console.debug('create_function_url_config', functions);
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
                // const { } = functions;
                logdata.data.function.push({
                    CodeSize,
                    Description,
                    FunctionArn,
                    FunctionName,
                    FunctionUrl: functions?.FunctionUrl,
                    Handler,
                    LastModified,
                    MemorySize,
                    PackageType,
                    Role,
                });
                logdata.write();
            }
            return response;
        }
    } catch (e: any) {
        console.error(e.message);
    }
};

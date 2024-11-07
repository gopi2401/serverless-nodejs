import { AddPermissionCommand, AddPermissionCommandInput } from "@aws-sdk/client-lambda";
import { lambda_client } from "./lambda.Client.Config.js";
import { find_function_index, log_data, logdata } from "../coredata/log_data.js";

export const addPermission = async (params: AddPermissionCommandInput) => {
    try {
        let index = find_function_index(params.FunctionName!);
        if (index != -1) {
            let i = log_data.function[index].Permission.findIndex((value: any) => {
                value.Sid === "FunctionURLAllowPublicAccess-" + params.FunctionName
            });
            if (i === -1) {
                const command = new AddPermissionCommand(params);
                const response = await lambda_client.send(command);

                if (response.$metadata.httpStatusCode === 201) {
                    logdata.data.function[index].Permission.push(JSON.parse(response.Statement!));
                    logdata.write();
                };
                return response;
            }
        }
    } catch (e: any) {
        console.error(e.message)
    }
};
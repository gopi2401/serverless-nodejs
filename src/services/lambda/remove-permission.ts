import { RemovePermissionCommand } from "@aws-sdk/client-lambda"; // ES Modules import
import { lambda_client } from "./lambda.Client.Config.js";
import { find_function_index, log_data, logdata } from "../coredata/log_data.js";

export const remove_permission = async (FunctionName: string) => {
    try {
        const input = {
            FunctionName,
            StatementId: "FunctionURLAllowPublicAccess" + FunctionName
        };
        const command = new RemovePermissionCommand(input);
        const response = await lambda_client.send(command);
        let index = find_function_index(FunctionName);
        if (index != -1) {
            let permission = logdata.data.function[index].Permission
            permission = permission.filter((value: any) => (
                value.Sid === input.StatementId
            ));
            logdata.write();
        };
        return response;
    } catch (e: any) {
        console.log(e.message);
    }
};

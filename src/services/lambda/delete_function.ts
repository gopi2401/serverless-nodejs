import { DeleteFunctionCommand } from "@aws-sdk/client-lambda";
import { lambda_client } from "./lambda.Client.Config.js";
import { logdata } from "../coredata/log_data.js";

export const delete_function = async (funcName: string) => {
    try {
        const command = new DeleteFunctionCommand({ FunctionName: funcName });
        const response = await lambda_client.send(command);
        if (response?.$metadata.httpStatusCode === 204) {
            logdata.data.function = logdata.data.function.filter((value: any) => (value.FunctionName != funcName));
            logdata.write();
        };
        return response
    } catch (e: any) {
        console.error(e.message);
    }
};

import { DeleteFunctionCommand } from "@aws-sdk/client-lambda";
import { lambda_client } from "./lambda.Client.Config.js";
import { log_data, logdata } from "../coredata/log_data.js";

export const delete_function = async (funcName: string) => {
    try {
        const command = new DeleteFunctionCommand({ FunctionName: funcName });
        const response = await lambda_client.send(command);
        // console.debug('delete_function', response);
        return response
    } catch (e: any) {
        console.error(e.message);
    }
};

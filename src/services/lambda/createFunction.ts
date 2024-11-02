import { CreateFunctionCommand } from "@aws-sdk/client-lambda";
import { lambda_client } from "./lambda.Client.Config.js";


export const createFunction = async (input: any) => {
    try {
        const command = new CreateFunctionCommand(input);
        const response = await lambda_client.send(command);
        return response;
    } catch (e: any) {
        console.error(e.message);
    }
};

import { CreateFunctionCommand } from "@aws-sdk/client-lambda";
import { lambda_client } from "./lambda.Client.Config";


const createFunction = async (input) => {
    const command = new CreateFunctionCommand(input);
    return await lambda_client.send(command);
};

export { createFunction };
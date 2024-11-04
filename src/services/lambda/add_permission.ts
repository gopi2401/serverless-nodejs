import { AddPermissionCommand, AddPermissionCommandInput } from "@aws-sdk/client-lambda";
import { lambda_client } from "./lambda.Client.Config.js";

export const addPermission = async (params: AddPermissionCommandInput) => {
    try {
        const command = new AddPermissionCommand(params);
        const response = await lambda_client.send(command);
        return response;
    } catch (e: any) {
        console.error(e.message)
    }
};
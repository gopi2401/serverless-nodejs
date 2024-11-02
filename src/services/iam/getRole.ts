import { GetRoleCommand } from "@aws-sdk/client-iam";
import { iamClient } from "./iam.Client.Config.js";


export const getRole = async (roleName: string) => {
    try {
        const command = new GetRoleCommand({
            RoleName: roleName,
        });
        let response = await iamClient.send(command);
        return response
    } catch (e) {
        console.error(e);
        return e
    }
}


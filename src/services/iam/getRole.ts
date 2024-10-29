import { GetRoleCommand, IAMClient } from "@aws-sdk/client-iam";
import { iamClient } from "./iam.Client.Config";


export const getRole = async (roleName) => {
    try {
        const command = new GetRoleCommand({
            RoleName: roleName,
        });
        let response = await iamClient.send(command);
        return response
    } catch (e) {
        console.error(e);
    }
}


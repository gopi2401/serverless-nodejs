import { AttachRolePolicyCommand } from "@aws-sdk/client-iam";
import { iamClient } from "./iam.Client.Config.js";

export const attachRolePolicy = async (policyArn: string, roleName: string) => {
    try {
        const command = new AttachRolePolicyCommand({
            PolicyArn: policyArn,
            RoleName: roleName,
        });

        return await iamClient.send(command);
    } catch (e) {
        console.error(e);
    }

};


import { AttachRolePolicyCommand } from "@aws-sdk/client-iam";
import { iamClient } from "./iam.Client.Config";

export const attachRolePolicy = async (policyArn, roleName) => {
    try {
        const command = new AttachRolePolicyCommand({
            PolicyArn: policyArn,
            RoleName: roleName,
        });

        return await iamClient.send(command);
    } catch (e) {
        throw e;
    }

};


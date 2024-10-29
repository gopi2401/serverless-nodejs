import { CreateRoleCommand } from "@aws-sdk/client-iam";
import { iamClient } from "./iam.Client.Config";
import { getRole } from "./getRole";
import { getLog, storeLog } from "../log";

export const createRole = async (roleName) => {
    try {
        const command = new CreateRoleCommand({
            AssumeRolePolicyDocument: JSON.stringify({
                Version: "2012-10-17",
                Statement: [
                    {
                        Effect: "Allow",
                        Principal: {
                            Service: "lambda.amazonaws.com",
                        },
                        Action: "sts:AssumeRole",
                    },
                ],
            }),
            RoleName: roleName,
        });
        let response = await iamClient.send(command);
        return response;
    } catch (e) {
        let response = await getRole(roleName);
        if (response.$metadata.httpStatusCode == 200) {
            let log = getLog();
            log['role'] = response.Role;
            storeLog(log);
            return response.Role.Arn;
        }
    }
};
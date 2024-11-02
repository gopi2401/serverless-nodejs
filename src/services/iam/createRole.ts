import { CreateRoleCommand } from "@aws-sdk/client-iam";
import { iamClient } from "./iam.Client.Config.js";
import { getRole } from "./getRole.js";
import { log_data, log_role_create } from "../coredata/log_data.js";
import { isNotEmpty } from "../utils.js";

export const createRole = async (roleName: string) => {
    try {
        if (isNotEmpty(log_data.role)) {
            return log_data.role;
        } else {
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
            if (response.$metadata.httpStatusCode == 200) {
                await log_role_create(response.Role!)
                console.log(response);
            } else {
                console.warn(response);
            }
            return response;
        }
    } catch (e) {
        console.error(e);
        let response: any = await getRole(roleName);
        console.log(response);
        if (response?.$metadata?.httpStatusCode == 200) {
            await log_role_create(response.Role!)
            return response?.Role?.Arn;
        }
    }
};
import { CreateRoleCommand } from "@aws-sdk/client-iam";
import { iamClient } from "./iam.Client.Config.js";
import { getRole } from "./getRole.js";
import { log_data, role_log_create } from "../coredata/log_data.js";
import { isNotEmpty } from "../utils.js";
import ora from "ora";

export const createRole = async (roleName: string) => {
    const dep = ora('Create role!').start();
    try {
        if (isNotEmpty(log_data.role)) {
            dep.stop().succeed('role created');
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
            // console.debug('createRole', response);
            if (response.$metadata.httpStatusCode == 200) {
                await role_log_create(response.Role!)
                dep.stop().succeed('role created');
            } else {
                console.error(response);
            }
            return response.Role;
        }
    } catch (e: any) {
        console.error(e.message);
        dep.stop().fail(e.message);
        let response: any = await getRole(roleName);
        // console.debug("getRole", response);
        if (response?.$metadata?.httpStatusCode == 200) {
            await role_log_create(response.Role!)
            return response?.Role;
        }
    }
};
import { CreatePolicyCommand, GetPolicyCommand } from "@aws-sdk/client-iam";

import { iamClient } from './iam.Client.Config.js'
import { log_data, policy_log_create, } from "../coredata/log_data.js";

export const createPolicy = async (params: { PolicyName: string, policy_statement: any }) => {
    try {
        let item = log_data.policy.find(item => (item.PolicyName === params.PolicyName));
        if (item) {
            // return item;
        } else {
            let data = {
                PolicyDocument: JSON.stringify(params.policy_statement),
                PolicyName: params.PolicyName,
            };
            const command = new CreatePolicyCommand(data);
            let response = await iamClient.send(command);
            if (response.$metadata.httpStatusCode == 200) {
                await policy_log_create(response.Policy!)
            }
            return response.Policy;
        }
    } catch (e: any) {
        console.error(e.message);
        // const command = new GetPolicyCommand({
        //     PolicyArn: `arn:aws:iam::908027393427:policy/${params.PolicyName}`,
        // });
        // const response = await iamClient.send(command);
        // if (response.$metadata.httpStatusCode == 200) {
        //     await policy_log_create(response.Policy!)
        // }
        // return response.Policy
    };
};

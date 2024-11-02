import { CreatePolicyCommand, GetPolicyCommand } from "@aws-sdk/client-iam";

import { iamClient } from './iam.Client.Config.js'
import { log_data, log_policy_create } from "../coredata/log_data.js";

export const createPolicy = async (params: { PolicyName: string; }) => {
    try {
        let item = log_data.policy.find(item => (item.PolicyName === params.PolicyName));
        if (item) {
            return item;
        } else {
            const PolicyDocumentData = {
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Effect": "Allow",
                        "Action": "logs:CreateLogGroup",
                        "Resource": "arn:aws:logs:ap-south-1:908027393427:*"
                    },
                    {
                        "Effect": "Allow",
                        "Action": [
                            "logs:CreateLogStream",
                            "logs:PutLogEvents"
                        ],
                        "Resource": [
                            "arn:aws:logs:ap-south-1:908027393427:log-group:/aws/lambda/test:*"
                        ]
                    }
                ]
            }

            let data = {
                PolicyDocument: JSON.stringify(PolicyDocumentData),
                PolicyName: params.PolicyName,
            };
            const command = new CreatePolicyCommand(data);
            let response = await iamClient.send(command);
            if (response.$metadata.httpStatusCode == 200) {
                await log_policy_create(response.Policy!)
            }
            return response;
        }
    } catch (e: any) {
        console.error(e.message);
        const command = new GetPolicyCommand({
            PolicyArn: `arn:aws:iam::908027393427:policy/${params.PolicyName}`,
        });
        console.warn(await iamClient.send(command));
        return await iamClient.send(command);
    };
};

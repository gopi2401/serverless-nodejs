import { CreatePolicyCommand } from "@aws-sdk/client-iam";

import { iamClient } from './iam.Client.Config.js'

export const createPolicy = async (params) => {
    try {
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
        console.log(response);
        return response
    } catch (e) {
        throw e
    }

};


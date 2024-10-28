import { iamClient } from './iam.Client.Config.js'
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

var params = {
    PolicyDocument: JSON.stringify(PolicyDocumentData),
    PolicyName: "myDynamoDBPolicy",
};

iamClient.createPolicy(params, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
});

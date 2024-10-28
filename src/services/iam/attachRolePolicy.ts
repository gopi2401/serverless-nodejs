// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "REGION" });

// Create the IAM service object
var iam = new AWS.IAM({ apiVersion: "2010-05-08" });

var paramsRoleList = {
    RoleName: process.argv[2],
};

iam.listAttachedRolePolicies(paramsRoleList, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        var myRolePolicies = data.AttachedPolicies;
        myRolePolicies.forEach(function (val, index, array) {
            if (myRolePolicies[index].PolicyName === "AmazonDynamoDBFullAccess") {
                console.log(
                    "AmazonDynamoDBFullAccess is already attached to this role."
                );
                process.exit();
            }
        });
        var params = {
            PolicyArn: "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess",
            RoleName: process.argv[2],
        };
        iam.attachRolePolicy(params, function (err, data) {
            if (err) {
                console.log("Unable to attach policy to role", err);
            } else {
                console.log("Role attached successfully");
            }
        });
    }
});

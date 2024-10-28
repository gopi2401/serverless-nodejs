import * as AWS from "aws-sdk";
import * as fs from 'fs';

const data = JSON.parse(fs.readFileSync('../example/servdata.json', 'utf8'))
if (!data.awsConfig) throw 'awsConfig not defined!'

AWS.config.update(data.awsConfig);

export var iamClient = new AWS.IAM({ apiVersion: "2010-05-08" });

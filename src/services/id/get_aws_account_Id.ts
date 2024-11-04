import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";
import { core_data } from "../coredata/core_file.js";

export const getAWSAccountId = async () => {
    try {
        const client = new STSClient(core_data.awsConfig);
        const input = {};
        const command = new GetCallerIdentityCommand(input);
        const response = await client.send(command)
        return String(response.Account);
    } catch (e: any) {
        console.error(e.message)
    }

};
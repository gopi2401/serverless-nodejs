import { DeletePolicyCommand } from "@aws-sdk/client-iam";
import { iamClient } from "./iam.Client.Config.js";

export const delete_policy = async (PolicyArn: string) => {
    try {
        const input = {
            PolicyArn
        };
        const command = new DeletePolicyCommand(input);
        const response = await iamClient.send(command);
        // console.debug('delete_policy', response);
        return response;
    } catch (e: any) {
        console.error(e.message)
    }
}


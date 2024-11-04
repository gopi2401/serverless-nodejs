import { DeleteRoleCommand } from "@aws-sdk/client-iam";
import { iamClient } from "./iam.Client.Config.js";
import { logdata } from "../coredata/log_data.js";

export const delete_role = async (RoleName: string) => {
    try {
        const input = {
            RoleName
        };
        const command = new DeleteRoleCommand(input);
        const response = await iamClient.send(command);
        if (response.$metadata.httpStatusCode === 200) {
            logdata.data.role = {}
            logdata.write();
        };
        return response;
    } catch (e: any) {
        console.error(e.message)
    }
};


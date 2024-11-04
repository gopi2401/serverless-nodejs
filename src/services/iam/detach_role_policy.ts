import { DetachRolePolicyCommand } from "@aws-sdk/client-iam";
import { iamClient } from "./iam.Client.Config.js";

export const detach_role_policy = async (RoleName: string, PolicyArn: string) => {
  try {
    const input = {
      RoleName,
      PolicyArn,
    };
    const command = new DetachRolePolicyCommand(input);
    const response = await iamClient.send(command);
  } catch (e: any) {
    console.error(e.message);
  }
}

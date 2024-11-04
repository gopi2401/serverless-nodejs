import { CreateFunctionUrlConfigCommand, CreateFunctionUrlConfigCommandInput } from "@aws-sdk/client-lambda"; // ES Modules import
import { lambda_client } from "./lambda.Client.Config.js";

// const input = { // CreateFunctionUrlConfigRequest
//   FunctionName: "STRING_VALUE", // required
//   Qualifier: "STRING_VALUE",
//   AuthType: "NONE" || "AWS_IAM", // required
//   Cors: { // Cors
//     AllowCredentials: true || false,
//     AllowHeaders: [ // HeadersList
//       "STRING_VALUE",
//     ],
//     AllowMethods: [ // AllowMethodsList
//       "STRING_VALUE",
//     ],
//     AllowOrigins: [ // AllowOriginsList
//       "STRING_VALUE",
//     ],
//     ExposeHeaders: [
//       "STRING_VALUE",
//     ],
//     MaxAge: Number("int"),
//   },
//   InvokeMode: "BUFFERED" || "RESPONSE_STREAM",
// };
export const create_function_url_config = async (input: CreateFunctionUrlConfigCommandInput) => {
  try {
    const command = new CreateFunctionUrlConfigCommand(input);
    const response = await lambda_client.send(command);
    return response;
  } catch (e: any) {
    console.error(e.message)
  }
};




import * as fs from 'fs';
import { createFunction } from './services/lambda/createFunction';
import { servdata } from '..';
import { build_mjs } from './services/build_file';
import { createPolicy } from './services/iam/createPolicy';
import { createRole } from './services/iam/createRole';
import { attachRolePolicy } from './services/iam/attachRolePolicy';




// const client = new LambdaClient(data.config);



// // { // CreateFunctionUrlConfigResponse
// //   FunctionUrl: "STRING_VALUE", // required
// //   FunctionArn: "STRING_VALUE", // required
// //   AuthType: "NONE" || "AWS_IAM", // required
// //   Cors: { // Cors
// //     AllowCredentials: true || false,
// //     AllowHeaders: [ // HeadersList
// //       "STRING_VALUE",
// //     ],
// //     AllowMethods: [ // AllowMethodsList
// //       "STRING_VALUE",
// //     ],
// //     AllowOrigins: [ // AllowOriginsList
// //       "STRING_VALUE",
// //     ],
// //     ExposeHeaders: [
// //       "STRING_VALUE",
// //     ],
// //     MaxAge: Number("int"),
// //   },
// //   CreationTime: "STRING_VALUE", // required
// //   InvokeMode: "BUFFERED" || "RESPONSE_STREAM",
// // };

// async function CreateFunction(value) {
//     const input = { // CreateFunctionUrlConfigRequest
//         FunctionName: value.name, // required
//         // Qualifier: "STRING_VALUE",
//         AuthType: "NONE", //|| "AWS_IAM", // required
//         // Cors: { // Cors
//         //     AllowCredentials: true || false,
//         //     AllowHeaders: [ // HeadersList
//         //         "STRING_VALUE",
//         //     ],
//         //     AllowMethods: [ // AllowMethodsList
//         //         "STRING_VALUE",
//         //     ],
//         //     AllowOrigins: [ // AllowOriginsList
//         //         "STRING_VALUE",
//         //     ],
//         //     ExposeHeaders: [
//         //         "STRING_VALUE",
//         //     ],
//         //     MaxAge: Number("int"),
//         // },
//         // InvokeMode: "BUFFERED"// || "RESPONSE_STREAM",
//     };
//     const command = new CreateFunctionUrlConfigCommand(input);
//     const response = await client.send(command);

// }

// const createFunction = async (funcName, roleArn) => {
//     const code = await readFile(`${dirname}../functions/${funcName}.zip`);

//     const command = new CreateFunctionCommand({
//         // Code: { ZipFile: code },
//         FunctionName: funcName,
//         Role: roleArn,
//         Architectures: [Architecture.arm64],
//         Handler: "index.handler", // Required when sending a .zip file
//         PackageType: PackageType.Zip, // Required when sending a .zip file
//         Runtime: Runtime.nodejs16x, // Required when sending a .zip file
//     });

//     return client.send(command);
// };
export const deploy = async () => {
    try {
        let roleArn = await createRole(servdata.project);
        let policy = await createPolicy({ PolicyName: `${servdata.project}-policy` });
        // let roleArn = attachRolePolicy()
        // for (let value of servdata['function']) {
        //     let filePath = `${servdata.functionPath && servdata.functionPath.trim() != "" ? servdata.functionPath.trim() + "/" + value.source : value.source}`
        //     let zibFile = await build_mjs(filePath);
        //     const code = fs.readFileSync(zibFile);

        //     const input = {
        //         Code: { ZipFile: code },
        //         FunctionName: value.name,
        //         // Role: roleArn,
        //         Architectures: servdata.provider.architectures ? [servdata.provider.architectures] : ["arm64"],
        //         Handler: value.handler,  // Required when sending a .zip file
        //         PackageType: "Zip", // Required when sending a .zip file
        //         Runtime: servdata.provider.runtime, // Required when sending a .zip file
        //     }
        //     let da = await createFunction(input)
        //     console.log(da);
        // } 
    } catch (e) {
        throw e
    }

};
export const remove = async () => {
    try {
        let roleArn = await createRole(servdata.project);
        let policy = await createPolicy({ PolicyName: `${servdata.project}-policy` });
        // let roleArn = attachRolePolicy()
        // for (let value of servdata['function']) {
        //     let filePath = `${servdata.functionPath && servdata.functionPath.trim() != "" ? servdata.functionPath.trim() + "/" + value.source : value.source}`
        //     let zibFile = await build_mjs(filePath);
        //     const code = fs.readFileSync(zibFile);

        //     const input = {
        //         Code: { ZipFile: code },
        //         FunctionName: value.name,
        //         // Role: roleArn,
        //         Architectures: servdata.provider.architectures ? [servdata.provider.architectures] : ["arm64"],
        //         Handler: value.handler,  // Required when sending a .zip file
        //         PackageType: "Zip", // Required when sending a .zip file
        //         Runtime: servdata.provider.runtime, // Required when sending a .zip file
        //     }
        //     let da = await createFunction(input)
        //     console.log(da);
        // } 
    } catch (e) {
        throw e
    }

};
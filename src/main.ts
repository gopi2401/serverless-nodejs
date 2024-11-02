import * as fs from 'fs';
import { build_mjs } from './services/build_file.js';
import { core_data } from './services/coredata/core_file.js';
import { createPolicy } from './services/iam/createPolicy.js';
import { createRole } from './services/iam/createRole.js';
import { createFunction } from './services/lambda/createFunction.js';
import { attachRolePolicy } from './services/iam/attachRolePolicy.js';

export const deploy = async () => {
    try {
        let role = await createRole(core_data.project);
        let policy = await createPolicy({ PolicyName: `${core_data.project}-policy` });
        await attachRolePolicy(policy.Arn, role.RoleName)

        for (let value of core_data.function) {
            let filePath = `${core_data.functionPath && core_data.functionPath.trim() != "" ? core_data.functionPath.trim() + "/" + value.source : value.source}`
            let zibFile = await build_mjs(filePath);
            const code = fs.readFileSync(zibFile);
            const input = {
                Code: { ZipFile: code },
                FunctionName: value.name,
                Role: role.Arn,
                Architectures: core_data.provider.architectures ? [core_data.provider.architectures] : ["arm64"],
                Handler: value.handler,  // Required when sending a .zip file
                PackageType: "Zip", // Required when sending a .zip file
                Runtime: core_data.provider.runtime, // Required when sending a .zip file
            }
            let function_data = await createFunction(input);
        }
    } catch (e) {
        console.error(e);
    }
};
export const remove = async () => {
    // try {
    //     let roleArn = await createRole(servdata.project);
    //     let policy = await createPolicy({ PolicyName: `${servdata.project}-policy` });
    //     // let roleArn = attachRolePolicy()
    //     // for (let value of servdata['function']) {
    //     //     let filePath = `${servdata.functionPath && servdata.functionPath.trim() != "" ? servdata.functionPath.trim() + "/" + value.source : value.source}`
    //     //     let zibFile = await build_mjs(filePath);
    //     //     const code = fs.readFileSync(zibFile);

    //     //     const input = {
    //     //         Code: { ZipFile: code },
    //     //         FunctionName: value.name,
    //     //         // Role: roleArn,
    //     //         Architectures: servdata.provider.architectures ? [servdata.provider.architectures] : ["arm64"],
    //     //         Handler: value.handler,  // Required when sending a .zip file
    //     //         PackageType: "Zip", // Required when sending a .zip file
    //     //         Runtime: servdata.provider.runtime, // Required when sending a .zip file
    //     //     }
    //     //     let da = await createFunction(input)
    //     //     console.log(da);
    //     // } 
    // } catch (e) {
    //     throw e
    // }

};
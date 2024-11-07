import * as fs from 'fs';
import { build_mjs } from './services/build_file.js';
import { core_data } from './services/coredata/core_file.js';
import { createPolicy } from './services/iam/createPolicy.js';
import { createRole } from './services/iam/createRole.js';
import { createFunction } from './services/lambda/createFunction.js';
import { attachRolePolicy } from './services/iam/attachRolePolicy.js';
import { delete_function } from './services/lambda/delete_function.js';
import { log_data, logdata } from './services/coredata/log_data.js';
import { delete_policy } from './services/iam/delete_policy.js';
import { delete_role } from './services/iam/delete_role.js';
import { detach_role_policy } from './services/iam/detach_role_policy.js';
import { isEmpty, isNotEmpty } from './services/utils.js';
import { policy_data } from './services/coredata/policy_data.js';
import ora from 'ora';
import { remove_permission } from './services/lambda/remove-permission.js';

export const deploy = async () => {
    const dep = ora('Start build and deploy!').start();
    try {
        let role = await createRole(core_data.project);
        let policy = await createPolicy({ PolicyName: `${core_data.project}_log_policy`, policy_statement: policy_data.log_policy });
        if (policy?.Arn) { await attachRolePolicy(policy.Arn, role.RoleName) };
        let data = await new Promise((resolve, reject) => setTimeout(async () => {
            try {
                // console.warn('10 sec...');
                for (let value of core_data.function) {
                    let filePath = `${core_data.functionPath && core_data.functionPath.trim() != "" ? core_data.functionPath.trim() + "/" + value.source : value.source}`
                    let zibFile = await build_mjs(filePath);
                    const codeZibBuffer = fs.readFileSync(zibFile!);
                    const input = {
                        Code: { ZipFile: codeZibBuffer },
                        FunctionName: value.name,
                        Role: role.Arn,
                        Architectures: core_data.provider.architectures ? [core_data.provider.architectures] : ["arm64"],
                        Handler: value.handler,  // Required when sending a .zip file
                        PackageType: "Zip", // Required when sending a .zip file
                        Runtime: core_data.provider.runtime, // Required when sending a .zip file
                    }
                    await createFunction(input);
                };
                resolve(log_data.function);
            } catch (e: any) {
                console.error(e.message);
                reject(e.message);
                dep.stop().fail(e.message);
            }
        }, 10000));
        dep.stop().succeed('deploy done!');
        return log_data.function;
    } catch (e: any) {
        console.error(e.message);
        dep.stop().fail(e.message);
    }
};
export const remove = async () => {
    const rem = ora('removing project').start();
    try {
        if (log_data.function.length === 0 && log_data.policy.length === 0 && isEmpty(log_data.role)) {
            rem.stop().warn('Does not exist any function!');
        } else {
            log_data.function.map(async (fun) => {
                await remove_permission(fun.FunctionName);
                await delete_function(fun.FunctionName);
            })
            for (let i = 0; i < log_data.policy.length; ++i) {
                if (isNotEmpty(log_data.role)) {
                    await detach_role_policy(log_data.role.RoleName, log_data.policy[i].Arn)
                }
                const response = await delete_policy(log_data.policy[i].Arn);
                if (response?.$metadata.httpStatusCode === 200) {
                    delete logdata.data.policy[i];
                    logdata.data.policy = logdata.data.policy.filter((value) => (value.Arn != log_data.policy[i].Arn));
                    logdata.write();
                };
            }
            if (isNotEmpty(log_data.role)) { await delete_role(log_data.role.RoleName); }
            rem.stop().succeed('removed project');
        }
    } catch (e: any) {
        console.error(e.message)
        rem.stop().fail(e.message);
    }

};
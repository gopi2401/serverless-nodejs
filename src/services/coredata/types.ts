export type Data = {
    project: string
    stage: string
    provider: {
        architectures: string
        runtime: string
    }
    awsConfig: {
        region: string
        credentials: {
            accessKeyId: string,
            secretAccessKey: string
        }
    },
    functionPath: string
    function: functions[]
}

type functions = {
    name: string
    handler: string
    source: string
}

export type LogData = {
    awsid: string | undefined
    function: Array<any>
    functionPath: string
    policy: Array<any>
    role: any
};

export type roleType = {
    Path: string,
    RoleName: string,
    RoleId: string,
    Arn: string,
    CreateDate: string,
    AssumeRolePolicyDocument: string,
    MaxSessionDuration: number,
    RoleLastUsed: {}
}

export type policyTypes = {
    log_policy: any
    url_policy: any
};
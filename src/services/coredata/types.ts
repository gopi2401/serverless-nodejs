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
    function: Array<any>
    role: object
    policy: Array<any>
}
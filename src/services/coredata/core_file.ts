import { JSONFilePreset } from 'lowdb/node';
import { Data } from './types.js';

let servdata: any;

export const core_data: any = () => servdata.data;

export const core_file_create = async () => {
  const template = {
    project: "example",
    stage: "",
    provider: {
      architectures: "arm64",
      runtime: "nodejs18.x"
    },
    awsConfig: {
      region: "REGION",
      credentials: {
        accessKeyId: "your_access_Key_id",
        secretAccessKey: "your_secret_access_key"
      }
    },
    functionPath: "./src",
    function: [
      {
        name: "test",
        handler: "index.handler",
        source: "index.js"
      }
    ]
  };
  const defaultData: Data = template;

  servdata = await JSONFilePreset('servdata.json', defaultData);
}

import { JSONFilePreset } from 'lowdb/node';
import { Data } from './types.js';

const template = {
  project: "exapmle",
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
const servdata = await JSONFilePreset('servdata.json', defaultData);

export let core_data = servdata.data;

export const core_file_create = async () => {
  // for (let key in template) {
  //   (db.data as any)[key] = (template as any)[key];
  // }

  await servdata.write()
}

import * as fs from 'fs'

export const fileCreate = () => {
  const template = `{
  "project": "exapmle",
  "stage": "",
  "provider": {
    "architectures": "arm64",
    "runtime": "nodejs18.x"
  },
  "awsConfig": {
    "region": "REGION",
    "credentials": {
      "accessKeyId": "your_access_Key_id",
      "secretAccessKey": "your_secret_access_key"
    }
  },
  "functionPath": "./src",
  "function": [
    {
      "name": "test",
      "handler": "index.handler",
      "source": "index.js"
    }
  ]
}
`
  fs.writeFileSync('./servdata.json', template);
}
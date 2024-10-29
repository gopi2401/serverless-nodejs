import * as fs from 'fs'
import * as path from 'path';
const resolvedPath = path.resolve('./log.json');

if (!fs.existsSync(resolvedPath)) {
  const template = `{
            "project": "exapmle",
            "stage": "",
            "provider": {
              "architectures": "arm64",
              "runtime": "nodejs18.x"
            },
            "functionPath": "./src",
            "function": [
              {
                "name": "test",
                "handler": "index.handler",
                "source": "index.js"
              }
            ],
            "log":{}
          }
          `;
  fs.writeFileSync('./log.json', template);
};

export const getLog = () => {
  const { log } = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
  return log;
}

export const storeLog = (log) => {
  let data = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
  let l = { ...data.log, log }
  data['log'] = l
  fs.writeFileSync('./log.json', JSON.stringify(data));
};
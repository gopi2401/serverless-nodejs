const colorCode: { [key: string]: string } = {
    black: '\u001b[30m',
    red: '\u001b[31m',
    green: '\u001b[32m',
    orange: '\u001b[33m',
    blue: '\u001b[34m',
    purple: '\u001b[35m',
    cyan: '\u001b[36m',
    white: '\u001b[37m',
    reset: '\u001b[39m'
};

// Updated Stream type to NodeJS.WriteStream to match Node.js streams
type TypeObj = {
    info: NodeJS.WriteStream;
    error: NodeJS.WriteStream;
};

const logType = (
    mess: string,
    eol: string,
    type: string,
    stream: NodeJS.WriteStream,
    colors: boolean
): void => {
    if (colors) {
        stream.write(colorCode[type] || colorCode.white!);
    }
    stream.write(mess + eol);
    if (colors) {
        stream.write(colorCode.reset!);
    }
};

const fullLog = (
    mess: string,
    type: string = 'info',
    eol: string = '',
    colors: boolean = false,
    typeObj: TypeObj | any = { info: process.stdout, error: process.stderr }
): void => {
    logType(mess, eol, type, typeObj[type], colors);
};

// Typically log function
const api = (mess: string, type: string = 'info', eol: string = ''): void => {
    fullLog(mess, type, eol, undefined, {
        info: process.stdout,
        error: process.stderr
    });
};

// Typical settings for clean output
api.clean = (mess: string, type: string = 'info'): void => {
    fullLog(mess, type, '', false);
};

// Making full log method public
api.fullLog = fullLog;

export default api;

export const isEmpty = (obj: object) => {
    return Object.keys(obj).length === 0;
};

export const isNotEmpty = (obj: object) => {
    return Object.keys(obj).length != 0;
};

export const formatString = (str: string, ...args: any[]) => {
    return str.replace(/\$(\d+)/g, (match: any, index: number) => args[index - 1] || match);
}

export const logPrint = (mess: any, eol: any, stream?: any) => {
    mess = mess || '';
    eol = eol || '';
    stream = stream === undefined ? process.stdout : stream;
    stream.write(mess + eol);
};

export let prints: any;
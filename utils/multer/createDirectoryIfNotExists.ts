import fs from 'fs'

const createDirectoryIfNotExists = (directoryPath: string) => {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
};

export default createDirectoryIfNotExists;
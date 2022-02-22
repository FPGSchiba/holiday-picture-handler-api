import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
    algorithm?: string;
    encryptionKey?: string;
    salt?: string;
    iv?: Buffer;
}

const defaultConfig = {
    algorithm: process.env.ALGORITHM || 'aes-256-cbc',
    encryptionKey: process.env.ENCRYPTION_KEY || '0b135e8d97629a1d495d559e879e1a3cf30d3618fb9db2fc60e4954d00e4742b',
    salt: process.env.SALT || 'salt',
    iv: Buffer.from(process.env.IV || 'dd7a31bf89d671b1a5522beded4ab01c', 'hex'),
}

class Encryption {
    private algorithm: string;
    private key: Buffer;
    private salt: string;
    private iv: Buffer | null;

    constructor(config: IConfig = defaultConfig) {
        this.algorithm = config.algorithm || '';
        this.salt = config.salt || '';
        this.key = Buffer.from(config.encryptionKey || '', "hex");
        // initialize IV
        this.iv = config.iv || null;
        
        // validate missing config options
        if (!this.algorithm && !this.key) {
            throw Error('Configuration Error!');
        }
    }

    /**
     * Function to encrypt a string into a url slug
     */
    encrypt = (value: string, isInt: boolean = false): string => {
        // Validate missing value
        if (!value) {
            throw Error('A value is required!');
        }
        // Initialize Cipher instance
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);

        // Return Buffer as a binary encoded string
        let buffer = Buffer.from(value, 'utf8').toString("binary");

        // Support for small and big integers
        if (isInt) {
            // Set byte auto padding to false
            cipher.setAutoPadding(false);

            // allocate Buffer instance 8 bytes
            const buf = Buffer.allocUnsafe(8);

            // Write value to buf instance at the specified offset as big-endian.
            buf.writeBigUInt64BE(BigInt(value));

            // encode as binary
            buffer = buf.toString("binary");
        }

        // Get encrypted data from the cipher instance
        const firstPart = cipher.update(buffer, "binary", "hex");
        const finalPart = cipher.final("hex");

        // concat and return both parts
        return `${firstPart}${finalPart}`;
    }

    /**
     * Function to decrypt a url token
     */
    decrypt = (token: string, isInt: boolean = false): string => {
        // Validate missing token
        if (!token) {
            throw Error('A token is required!');
        }
        
        // Initialize Decipher instance
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);

        // Support for small and big integers
        if (isInt) {
            // Set byte auto padding to false
            decipher.setAutoPadding(false);
        }

        // encodes encrypted value from base64 to hex
        const buffer = Buffer.from(token, "hex").toString("hex");

        // Get decrypted data from decipher instance
        const firstPart = decipher.update(buffer, 'hex', 'base64');
        const finalPart = decipher.final('base64') || '';

        // concat both parts
        const decrypted = `${firstPart}${finalPart}`;

        // Encode decrypted value as a 64-bit Buffer
        const buf = Buffer.from(decrypted, "base64");

        // Support for small and big integers
        if (isInt) {
            // Reads an unsigned, big-endian 64-bit integer from buf at the specified offset
            // and returns as a string
            return buf.readBigUInt64BE(0).toString();
        }
        // convert decrypted value from base64 to utf-8 string
        return buf.toString('utf8');
    }
}

function createHash(input: string): string {
    return crypto.createHash("sha512").update(input).digest('hex')
}

function checkPassword(password: string): string {
    const regexp = new RegExp('^([a-z]|[0-9]){128}$');
    if (!regexp.test(password)) {
        password = createHash(password);
    }
    return password;
}

export function generateUserToken(username: string, password: string): string {
    const encryption = new Encryption();
    password = checkPassword(password);  
    username = createHash(username);

    const tokenValue = `${username}-${password}`;
    return encryption.encrypt(tokenValue);
}

export function isUserTokenValid(token: string, username:string, password: string): boolean {
    const decription = new Encryption();
    password = checkPassword(password);

    const hashValue = decription.decrypt(token);
    const usernameHash = hashValue.split('-')[0]
    const passwordHash = hashValue.split('-')[1]

    return (createHash(username) === usernameHash && checkPassword(password) === passwordHash);
}
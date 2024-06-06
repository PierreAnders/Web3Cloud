import crypto from 'crypto';

// Fonction de chiffrement
export const encrypt = (buffer: Buffer, key: Buffer): Buffer => {
    const algorithm = 'aes-256-ctr';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    return result;
};

// Fonction de déchiffrement
export const decrypt = (buffer: Buffer, key: Buffer): Buffer => {
    const algorithm = 'aes-256-ctr';
    const iv = buffer.subarray(0, 16);
    const encryptedText = buffer.subarray(16);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const result = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return result;
};
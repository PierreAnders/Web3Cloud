import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

export class Security {
    private algorithm = 'aes-192-cbc';
    private password = 'secretPassword'; // Trouver une solution sécurisé !

    encrypt(content: string): string {

        const key = scryptSync(this.password, 'salt', 24);

        const iv = randomBytes(16);

        const cipher = createCipheriv(this.algorithm, key, iv);
        
        let encryptedContent = cipher.update(content, 'utf8', 'hex');
        encryptedContent += cipher.final('hex');

        return `${iv.toString('hex')}:${encryptedContent}`;
    }


    decrypt(encryptedContent: string): string {

        const [ivHex, content] = encryptedContent.split(':');
        
        const iv = Buffer.from(ivHex, 'hex');
        
        const key = scryptSync(this.password, 'salt', 24);
        
        const decipher = createDecipheriv(this.algorithm, key, iv);
        
        let decryptedContent = decipher.update(content, 'hex', 'utf8');
        decryptedContent += decipher.final('utf8');

        return decryptedContent;
    }
}
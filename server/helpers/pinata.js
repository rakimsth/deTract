require('dotenv').config();

const PINATA_JWT = process.env.PINATA_JWT;

const pinataUploadFileWithRetry = async(filePath, timeout = 10000) => {
    const pinata = new pinataSDK({ pinataJWTKey: PINATA_JWT });
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), timeout);
    });
    const readStream = fs.createReadStream(filePath);
    let pinataResponse = pinata.pinFileToIPFS(readStream);
    try {
        const response = await Promise.race([
        pinataResponse,
        timeoutPromise
        ]);      
        return response.IpfsHash;
    } catch (error) {
        console.error(`pinata upload failed: ${JSON.stringify(error)}`);
        // Retry 
        return pinataUploadFileWithRetry(filePath, timeout);
    }
} 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  
const busboy = require('busboy');
const pinataSDK = require('@pinata/sdk');
const { Readable } = require('stream');
require('dotenv').config();
const { readAllNestedDocs, readNestedDocs, writeNestedDocs, updateFirestoreDocument, writeFirestoreDocument, readFirestoreDocument, readAllDocumentsFromCollection } = require("./helpers/firestore");
const { storePaperHash } = require("./helpers/blockchains");
const { COLLECTIONS } = require('./constants/firebase');

const { writePapers } = require('./client-scripts/write-papers-to-firestore');
const PINATA_JWT = process.env.PINATA_JWT;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;

const pinata = new pinataSDK({ pinataJWTKey: PINATA_JWT});

const PINATA_GATEWAY = "violet-electric-meadowlark-667.mypinata.cloud/ipfs";

const busboyFileHandler = (req, res, next) => {
	const bb = busboy({ headers: req.headers });
	const payload = {};
    let fileName;
	bb.on('field', (fieldname, val) => {
		payload[fieldname] = JSON.parse(val);
	});
	let buffer = Buffer.alloc(0);
	bb.on('file', async (field, file, filename) => {
		file.on('data', data => {
            fileName = filename.filename;
			buffer = Buffer.concat([buffer, data]);
		});
	});
	bb.on('error', err => {
		next(err);
	});
	bb.on('finish', async () => {
        const options = {
            pinataMetadata: {
                name: fileName,
            },
        };
        const readableStream = Readable.from(buffer);
        
        const result = await pinata.pinFileToIPFS(readableStream, options);
        const imageURL = `${PINATA_GATEWAY}/${result.IpfsHash}`;
        let metadata = {...payload.metadata, image: imageURL, createdAt: new Date()};
        const metadataString = JSON.stringify(metadata);
        const metadataReadableStream = Readable.from(metadataString);
        const metadataOptions = {
            pinataMetadata: {
                name: `${fileName}_metadata`,
            },
        };
        let metadataResult = await pinata.pinFileToIPFS(metadataReadableStream, metadataOptions);
        metadataResult.IpfsHash = `${PINATA_GATEWAY}/${metadataResult.IpfsHash}`;
        console.log(JSON.stringify(result));

        // write challenge data to firestore
        const userAddress = payload.metadata.user_address;
        await writeNestedDocs(COLLECTIONS.USER_CHALLENGES, userAddress, COLLECTIONS.CHALLENGES, metadata);
        metadataResult.doi = metadata.doi;
        res.json(metadataResult);
	});
	req.pipe(bb);
};

app.post('/upload',  async (req, res) => {
    busboyFileHandler(req, res);
});

app.post('/get-paper',  async (req, res) => {
    try {
        let docId = req.body.paper_id;
        docId = docId.replace(/\//g, '_');
        const paperData = await readFirestoreDocument(COLLECTIONS.PAPERS, docId);
        res.json({status: "Ok", message: {paperData}});
    } catch (e) {
        res.json({status: "Error", message: e});
    }
});

app.post('/get-all-papers',  async (req, res) => {
    try {
        const result = await readAllDocumentsFromCollection(COLLECTIONS.PAPERS);
        res.json({status: "Ok", message: result});
    } catch (e) {
        res.json({status: "Error", message: e});
    }
});

app.post('/get-user-challenges',  async (req, res) => {
    try {
        const userAddress = req.body.user_address;
        const userChallenges = await readNestedDocs(COLLECTIONS.USER_CHALLENGES, userAddress, COLLECTIONS.CHALLENGES);
        res.json({status: "Ok", message: userChallenges});
    } catch (e) {
        res.json({status: "Error", message: e});
    }
});

app.post('/get-all-challenges',  async (req, res) => {
    try {
        const allChallenges = await readAllNestedDocs(COLLECTIONS.USER_CHALLENGES, COLLECTIONS.CHALLENGES);
        res.json({status: "Ok", message: allChallenges});
    } catch (e) {
        console.log(e);
        res.json({status: "Error", message: e});
    }
});

app.post('/write',  async (req, res) => {
    await writePapers("./papers-data/papers.json", COLLECTIONS.PAPERS);
    res.json({status: "Ok"});
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


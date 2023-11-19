const { COLLECTIONS } = require("../constants/firebase");
const { readPapers } = require("../admin-scripts/read-papers");
const { writeFirestoreDocument } = require("../helpers/firestore");

const writePapers = async (filePath, collectionId) => {
    const papers_data = readPapers(filePath);
    papers_data.forEach((paper, index) => {
        let docId;
        if (typeof paper.doi === "string") {
            docId = paper.doi.replace(/\//g, '_');
            paper.counter = index;
        }
        writeFirestoreDocument(collectionId, docId, paper);
    });
}

module.exports = {
    writePapers
}
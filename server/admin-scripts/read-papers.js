const fs = require('fs');

const readJsonFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return null;
  }
}

const readPapers = (filePath) => {
    const jsonList = readJsonFile(filePath);
    if (jsonList) {
      console.log('JSON List:', jsonList);
    } else {
      console.log('Failed to read JSON file.');
    }
    return jsonList;
}


module.exports = {
    readPapers
}
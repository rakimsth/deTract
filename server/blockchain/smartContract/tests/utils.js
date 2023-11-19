
const generateMultiCallData = (
    contract,
    functionName,
    callData
) => {
    let encodedData = [];
    if (callData) {
        for (const callD of callData) {
            const encodedD = contract.interface.encodeFunctionData(functionName, [
                ...callD,
            ]);
            encodedData.push(encodedD);
        }
    }
    return encodedData;
}

module.exports = {
    generateMultiCallData
}
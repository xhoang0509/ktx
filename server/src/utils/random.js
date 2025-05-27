const generateCode = (contract) => {
    const code = `HD_${contract.id}:${new Date().getMonth() + 1}_${new Date().getFullYear()}`;
    return code;
}

module.exports = {
    generateCode
}
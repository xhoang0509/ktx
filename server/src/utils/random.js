const generateCode = (room) => {
    const code = `HD_${room.id}:${new Date().getMonth() + 1}_${new Date().getFullYear()}`;
    return code;
}

module.exports = {
    generateCode
}
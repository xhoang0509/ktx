const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
}

module.exports = {
    isValidDate
}
const filterDto = (data, privateFields) => {
    const result = {}
    for(const key in data) {
        if(data.hasOwnProperty(key) && !privateFields.includes(key)) {
            result[key] = data[key]
        }
    }
    return result
}

module.exports = filterDto
const { hash, compare } = require('bcryptjs');

exports.doHash = (value, saltValue) => {
    const result = hash(value, saltValue);
    return result;
};

exports.doHashValidation = (value, hashedValue) => {
    const value = compare(value, hashedValue);
    return result;
}
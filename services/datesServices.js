module.exports = {
    /**
     * @param {Date} birthDate 
     * @returns {Number}
     */
    getAge: (birthDate) => {
        return new Date(Date.now() - Date.parse(new Date(birthDate))).getFullYear() - 1970
    }
}
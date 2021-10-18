module.exports = {

    countWords: (string) => {
        const words = string.split(' ');
        return words.length;
    },

    countLetters: (string) => {
        const stringArr = string.split(' ');
        if (stringArr.length > 1) {
            throw new Error('Must be single word');
        }
        return string.length;
    },

    asyncCountWords: (string, cb) => {
        const words = string.split(' ');
            setTimeout(() => {
                console.log(words.length);
                cb(words.length);
            }, 1500);
    }

}
const assert = require('assert');
const strService = require('../../services/strService');
const should = require('chai').should();

// Déclare la série de tests unitaires
describe('String tests', () => {

    // Initialisation d'un test unitaire
    it('Should return number of words', () => {
        const string = 'Ma super phrase';
        const stringArr = string.split(' ');
        const wordsNbr = strService.countWords(string);
        // `wordsNbr` doit être strictement égal (valeur et type) à `stringArr.length`
        assert.deepStrictEqual(wordsNbr, stringArr.length);
    });

    // Initialisation d'un test unitaire
    it('Should return number of letters', () => {
        const string = 'Deux';
        const lettersNbr = strService.countLetters(string);
        assert.equal(typeof lettersNbr, 'number'); // Le type de `lettersNbr` doit être number
        assert.equal(lettersNbr, string.length); // `lettersNbr` et `string.length` doivent être égales
    });

    it('Should return number of words async', (done) => {
        const string = 'Ma super phrase';
        const stringArr = string.split(' ');
        // const wordsNbr = await strService.asyncCountWords(string);
        strService.asyncCountWords(string, (wordsNbr) => {
            // wordsNbr.should.equal(stringArr.length);
            assert.deepStrictEqual(wordsNbr, stringArr.length);
            done();
        });
    });

});
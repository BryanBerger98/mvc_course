const assert = require('assert');
const userController = require('../controllers/userController');

describe('Test userController', () => {

    it('Should return true if number is even', () => {
        const isEven = userController.isEven(8);
        assert.equal(isEven, true);
    });

    it('Should return formatted date', () => {
        const date = userController.formatDate('2000-10-21');
        assert.equal(typeof(date), 'string');
        const dateArr = date.split('/');
        assert.equal(dateArr.length, 3);
        assert.equal(dateArr[0].length, 2);
        assert.equal(dateArr[1].length, 2);
        assert.equal(dateArr[2].length, 4);
        assert.equal(date, '21/10/2000');
    });

    it ('Should return user from email', async () => {
        // const response = await userController.getUserFromEmail('test@test.fr');
        // assert.
    });

});
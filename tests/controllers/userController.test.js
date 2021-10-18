const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../../models/User');
const should = require('chai').should();

mongoose.connect(
    'mongodb://localhost:27017/demo',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
    console.log('MongoDB connected successfully');
}).catch(error => {
    console.error(error);
    process.exit(1);
})

describe('#find()', function() {
    it('respond with matching records', async () => {
      return User.find().lean().should.length(1);
        // const users = await User.find();
        // users.should.have.length(3);
    });
  });

describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User({
          email: 'utilisateur@test.fr',
          password: 'demo1234'
      });
      user.save(done);
    });
});
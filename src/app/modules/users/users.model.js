const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose');
const config = require('../../../config');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        uniquq:true
    },
    password: {
        type: String,
        required:[true,'Password is required']
    }
})

UserSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bycrypt_salt_rounds)
    );
    next();
});
  
const User = model('User', UserSchema);
module.exports = User;
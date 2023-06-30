const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema ({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
    }]
},{
    timestamps: true,
    versionKey: false
});

userSchema.statics.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);  
}

userSchema.statics.comparePassword = async function(password, receivedPassword) {
    return bcrypt.compare(password, receivedPassword);
}

module.exports = mongoose.model('User', userSchema);
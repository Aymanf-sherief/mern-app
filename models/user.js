const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

})

userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {

        bcrypt.hash(user.password, saltRounds, function (err, hashed) {
            if (err) return next(err);

            user.password = hashed;
            next();

        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, cb);
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign({ data: user._id.toHexString() }, 'secret', { expiresIn: 60 * 60 * 24 * 30 })
    user.token = token;
    user.save(cb);
}

userSchema.statics.findByToken = function (token, cb) {
    
    jwt.verify(token, 'secret', (err, decode) => {
        if (err) cb(err, null)
        console.log(decode.data)
        User.findOne({_id: decode.data, token: token}, cb);
    })   
}

const User = mongoose.model('User', userSchema);

module.exports = { User };

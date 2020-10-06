const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Enter A Username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please Enter An Email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please Enter A Password'],
        minlength: [8, 'Minimum password length is 8 characters']
    },
    rank: {
        type: String,
        lowercase: true,
        default: 'user'
    }
});


// hashing password before saving it to the db
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt); // setting the password we want to save to hash password.
    next(); // procceding to saving to the db.
});


// static method to login the user
userSchema.statics.login = async function(email, password) {
    if (!email) throw Error('No email entered');
    if (!password) throw Error('No password entered');

    const user = await this.findOne({ email: email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}


const User = mongoose.model('user', userSchema, 'users');
module.exports = User;


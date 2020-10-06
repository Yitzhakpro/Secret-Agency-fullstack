const User = require('../models/User');
const jwt = require('jsonwebtoken');


// handle errors function
const handleErrors = (err) => {
    let errors = { username: '', email: '', password: '', unique: '' };


    // login error
    if (err.message === 'Incorrect email' || err.message === 'Incorrect password') {
        errors.unique = 'The email/password is wrong.'
    }
    // one of fields not entered.
    if (err.message === 'No email entered') errors.email = 'Please Enter An Email.'
    if (err.message === 'No password entered') errors.password = 'Please Enter A Password.'


    // duplicate email / username error.
    if ( err.code === 11000) {
        errors.unique = 'that email/username is already registerd';
        return errors;
    }

    // signup error
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

// PRIVATE KEY FOR JWT TOKEN
const PRIVATE_JWT_KEY = '' // CHANGE THIS
// MAX AGE of the token created, CONSTANT.
const MAX_AGE = 3 * 24 * 60 * 60;
// create Token function
// gets the id from the db after user is created.
const createToken = (id) => {
    return jwt.sign({ id }, PRIVATE_JWT_KEY, {
        expiresIn: MAX_AGE
    })
}

// fetching users to the users list.
module.exports.fetchUsers = (req, res) => {
    const token = req.cookies.jwt; // for authenticating the user, only owner allow to make this request

    if(token) {

        jwt.verify(token, PRIVATE_JWT_KEY, async (err, decodedToken) => {
            if(err) {
                res.send("You Don't Have Permissions for that!");
            } else {
                // info of the user that sent the request.
                let checkingUser = await User.findById(decodedToken.id);

                if(checkingUser.rank === 'owner') {
                    User.find()
                    .then(result => {
                        res.json(result);
                    })
                    .catch(err => console.log(err));

                }
                else {
                    res.send("You don't have permissions for that!");
                }
            }

        });
    }
    else { 
        res.send("You Don't Have Permissions for that!");
    }
}


// get user info
// getting the user id from the url params
module.exports.getUser = (req, res) => {
    const token = req.cookies.jwt; // for authenticating the user, only owner allow to make this request
    const id = req.params.id; // id of the user we want to get.
    
    if(token) {

        jwt.verify(token, PRIVATE_JWT_KEY, async(err, decodedToken) => {
            if(err) {
                res.send("You Don't Have Permissions For That!");
            }  else {
                // info of the user that sent the request.
                let checkingUser = await User.findById(decodedToken.id);

                if(checkingUser.rank === 'owner') {
                    try{
                        let userToReturn = await User.findById(id);

                        res.json({
                            found: true,
                            username: userToReturn.username,
                            currentRank: userToReturn.rank
                        });
                    }
                    catch {
                        res.json({
                            found: false
                        });
                    }
                    
                }
                else {
                    res.send("You Don't Have Permissions For That!");
                }
            }

        });
    }
    else {
        res.send("You Don't Have Permissions For That!");
    }
}


// sets rank for a user
// id of user you want to set, as well as the rank you want to set are from the body of the request.
// only owner allowed to change ranks.
module.exports.setRank = (req, res) => {
    const token = req.cookies.jwt;
    const { id, rank } = req.body; // rank to set, id of user to set rank to

    if(token) {

        jwt.verify(token, PRIVATE_JWT_KEY, async(err, decodedToken) => {
            if(err) {
                res.send("You Don't Have Permissions for that!");
            } else {
                // info of the user that sent the request.
                let checkingUser = await User.findById(decodedToken.id);

                if(checkingUser.rank === 'owner') {

                    User.findOneAndUpdate({_id: id}, {rank: rank})
                    .then(() => res.json({changed: true}))
                    .catch(err => res.send({changed: false}));
                }
                else {
                    res.send("You Don't Have Permissions For That!");
                }
            }
        });

    } 
    else {
        res.send("You Don't Have Permissions For That!");
    }

}


// delete user reuqest, getting the id of the user you want to delete from the link params,
// only owner allowed to delete users.
module.exports.deleteUser = (req, res) => {
    const token = req.cookies.jwt;
    const id = req.params.id; // id of user you want to delete.

    if (token) {

        jwt.verify(token, PRIVATE_JWT_KEY, async(err, decodedToken) => {
            if(err) {
                res.send("You don't have permissions for that!");

            } else {
                // info of the user that sent the request.
                let checkingUser = await User.findById(decodedToken.id);

                if(checkingUser.rank === 'owner') {
                    User.deleteOne({ _id: id }, function(err) {
                        if(err) {
                            res.json({deleted: false});
                        } else {
                            res.json({deleted: true});
                        }
                    });

                } else {
                    res.send("You Don't Have Permissions For That!");
                }
                
            }
        });

    }
    else {
        res.send("You don't have permissions for that!");
    }

}


// post request for users to signup to the site.
// getting the username, email and password (getting hashed) and storing it in db.
module.exports.signup_post = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        const token = createToken(user._id); // jwt token to send to the user to keep them loged in.
        res.cookie('jwt', token, {httpOnly: true, maxAge: MAX_AGE * 1000 });
        res.status(201).json( {user: user} );
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json( {errors} );
    }
}


// post requests to log users in.
// then sending token to keep user loged in.
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
        res.status(200).json({ user: user });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors: errors });
    }
}


// logout function to log out the user,
// modifies the client jwt cookie to '' and max againg that token to 1,
// resulting immediately logout.
module.exports.logout_post = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.json({ logedOut: true });
}


// checks if the user is loged in, returns true and the rank of the loged in user,
// if not loged in, returns false.
module.exports.checkLogin_get = (req, res) => {
    const token = req.cookies.jwt; // getting the jwt token to know if user is logged in.

    if(token) {
        jwt.verify(token, PRIVATE_JWT_KEY, async (err, decodedToken) => {
            if(err) {
                res.json( {logedIn: false} )
            } else {
                let user = await User.findById(decodedToken.id);
                res.json( {logedIn: true, rank: user.rank} );
            }
        })
    }
    else {
        res.json( {logedIn: false} );
    }
}
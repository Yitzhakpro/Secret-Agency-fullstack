const Wanted = require('../models/Wanted');


// handle errors
const handleErrors = (err) => {
    let errors = { name: '', age: '', bounty: '', unique: '' };

    // duplicate wanted error
    if ( err.code === 11000) {
        errors.unique = 'This wanted is already been listed';
        return errors;
    }

    // signup error
    if(err.message.includes('Wanted validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}


// get request to fetch the wantds
// returns all the wanteds.
module.exports.fetchWanteds = (req, res) => {
    Wanted.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
};


// post request to add wanted to the db.
// getting the info to add to the db from the body of the request.
module.exports.addWanted =  async (req, res) => {
    const { name, age, short_description, bounty} = req.body;

    try {
        const wanted = await Wanted.create({ name, age, short_description, bounty });
        res.status(201).json( {wanted} )
    }
    catch(err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({ errors })
    }
};


// post request to delete wanted
// getting the wanted id to delete from the body of the request.
module.exports.deleteWanted = (req, res) => {
    const { id } = req.body;
    
    Wanted.deleteOne({ _id: id }, function(err) {
        if(err) {
            res.json({deleted: false});
        } else {
            res.json({deleted: true});
        }
    });
};
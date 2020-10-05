const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected correctly to server')

    Dishes.create({
        name: 'UthaPizza',
        description: 'testingDescription'
    })
    .then((dish) => {
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id,{
            $set: { description: 'Updated test'}
        },{
             new: true}
        ).exec();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment:' commenting with the rate 5 ',
            author: 'Gabigol'
        });

        return dish.save();
    })
    .then(()=> {
        console.log(dish);
        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
});
//Remember that the favorite schema will store the reference to the user's document object ID, 
//and an array of dishes document object IDs
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [{



        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
}, {
    timestamps: true
});

var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;
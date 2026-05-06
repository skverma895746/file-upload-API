const monogoose = require('mongoose');
const imageSchema = new monogoose.Schema({
    imageUrl: String,
    caption: String
});
const Image = monogoose.model('Image', imageSchema);
module.exports = Image;
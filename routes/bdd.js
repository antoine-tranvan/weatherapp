var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://david:hgm4lRQq8QM1p3P8@cluster0-9xbpy.mongodb.net/openweatherapp?retryWrites=true&w=majority',
    options,
    function(err){
        console.log(err);
    }
)

var citySchema = mongoose.Schema({
    name: String,
    desc: String,
    img: String,
    temp_min: Number,
    temp_max: Number,
})

var cityModel = mongoose.model('cities', citySchema)

module.exports = cityModel;
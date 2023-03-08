const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

const Campground = require('../models/campground');
const campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('*** Database connected.')
});

const sample = array => array[Math.floor(Math.random() * array.length)];
 
const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 150; i++){
       const random1000 = Math.floor(Math.random() * 1000);
       const price = Math.floor(Math.random() * 20) + 10;
       const camp = new Campground({
            author: '63d8903fedd5548f81fa4b19',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc diam justo.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [ 
                { 
                    "url" : "https://res.cloudinary.com/dr3yuiasb/image/upload/v1676079755/YelpCamp/huyev12f42vcjlmj946w.jpg", 
                    "filename" : "YelpCamp/huyev12f42vcjlmj946w", 
                }, { 
                    "url" : "https://res.cloudinary.com/dr3yuiasb/image/upload/v1676079755/YelpCamp/fapqp755mgdcs3hxtkk4.jpg",
                    "filename" : "YelpCamp/fapqp755mgdcs3hxtkk4",
                } 
            ]

       });
       await camp.save();
    } 
}

seedDB().then(() => {
    mongoose.connection.close();
})
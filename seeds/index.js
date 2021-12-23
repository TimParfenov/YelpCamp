const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const {cities} = require('./cities');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});



const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() *array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000) ;
        const price = Math.floor(Math.random() * 20 )+ 10;
        const camp = new Campground({
            author: '60e7acc6ffcb7404cbf63bd4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ratione dolore modi doloribus laboriosam, similique eaque explicabo nostrum temporibus asperiores unde, perspiciatis enim fugiat omnis facilis eos obcaecati adipisci ab.',
            price,
            geometry: {
                type : "Point",
                coordinates : [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                 ], 
            },
            images: [
            {
                url : 'https://res.cloudinary.com/kokeyka/image/upload/v1626113022/YelpCamp/fzfgmgvgl8fqmp9hw1vt.jpg',
                filename : 'YelpCamp/fzfgmgvgl8fqmp9hw1vt',
            },
            {
                url : 'https://res.cloudinary.com/kokeyka/image/upload/v1626113015/YelpCamp/yh2tngyh6je6mdu5qshl.jpg', 
                filename : 'YelpCamp/yh2tngyh6je6mdu5qsh l',
            }
        ]
        })
        await camp.save();
    }
 
}

seedDB().then(() =>{
    mongoose.connection.close();
})
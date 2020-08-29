const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const dotenv = require('dotenv');

dotenv.config();

const mongoConnect = (callback) => {
	MongoClient
		.connect(
			`mongodb+srv://Powlinett:${process.env.MONGODB_PASSWORD}@cluster0.pjc04.mongodb.net/Project0?retryWrites=true&w=majority`
			)
			.then((client) => {
				console.log('connected');
				callback(client);
			})
			.catch((err) => {
				console.log(err);
			});
};

module.exports = mongoConnect;
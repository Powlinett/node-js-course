const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const dotenv = require('dotenv');

dotenv.config();

let _db;

const mongoConnect = (callback) => {
	MongoClient
		.connect(
			`mongodb+srv://Powlinett:${process.env.MONGODB_PASSWORD}@cluster0.pjc04.mongodb.net/Project0?retryWrites=true&w=majority`
			)
			.then((client) => {
				console.log('connected');
				_db = client.db();
				callback();
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
};

const getDb = () => {
	if (_db) {
		return _db;
	}
	throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
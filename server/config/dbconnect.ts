import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const db = await mongoose.connect(
			process.env.MONGO_URI,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			},
		);

		console.log(`MongoDB Connected: ${db.connection.host}`);
	} catch (err) {
		console.error(err);
		throw Error;
	}
};

export default connectDB;

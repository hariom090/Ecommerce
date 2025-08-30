import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"


const connectDB = async () => {
    try {
         

        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        const hostName = mongoose.connection.host;
        console.log(`\n MONGODB connected!! DB HOSTS: ${hostName}`);
    } catch (error) {
        console.log("MONGODB connection error:", error);
        process.exit(1);
    }
};

export default connectDB

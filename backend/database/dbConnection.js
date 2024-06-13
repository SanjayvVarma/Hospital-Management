import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "HOSPITAL_MANAGEMENT_SYSTEM"
    }).then(() => {
        console.log("Connected to database");
    }).catch((err) => {
        console.log("some error occured while connecting to database:", err);
    });
};

export default dbConnection;
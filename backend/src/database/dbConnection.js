import { connect } from "mongoose";

const dbConnection = async () => {
    await connect(`${process.env.MONGO_URL}`, {
        dbName: "HOSPITAL_MANAGEMENT_SYSTEM"
    }).then((res) => {
        console.log(`DATABASE CONNECTED SUCCESSFULLY !, DB HOST ${res.connection.host}`);
    }).catch((err) => {
        console.log(`DATABASE CONNECTED FAILED!, ${err}`);
        process.exit(1)
    });
};

export default dbConnection;
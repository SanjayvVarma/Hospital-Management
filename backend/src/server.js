import app from './app.js';
import dbConnection from './database/dbConnection.js';

dbConnection();

app.on('error', (error) => {
    console.log("Error", error);
    throw error;
});

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running at port", process.env.PORT || 8000);
});
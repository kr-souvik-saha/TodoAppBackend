const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Connection established with database host: ${connect.connection.host} and name: ${connect.connection.name}`);
    } catch (error) {
        console.log(`Error Encountered: ${error}`);
        process.exit();
    }
}

module.exports = dbConnect;
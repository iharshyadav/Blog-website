const {default: mongoose} = require("mongoose");


const connection={
   isConnected:false,
};

export const connectToDb = async () =>{
   try {
    if(connection.isConnected){
     console.log("Using existing connections");
     return;
    }
    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected =db.connections[0].readyState;
    console.log("connected to MongoDB");
   } catch (error) {
    console.log("Error connecting to MongoDB:",error);
    // throw new Error(error);
   }
}
import mongoose from "mongoose"
const db_name="BLOG-DB"
const DBConnect=async()=>{
    try {
       await mongoose.connect(`${process.env.DB_URL}/${db_name}`);
    } catch (error) {
        console.log("MongoDB connection failed.Error: ",error);
    }
}

export default DBConnect;
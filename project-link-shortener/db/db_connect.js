import mongoose from "mongoose";
const db_name="URL_DB"
const dbconnect=async()=>{
    try {
        await mongoose.connect(`${process.env.DB_URL}/${db_name}`);
    } catch (error) {
        console.log(`There is some error in conneccting the database: ${error}`)
        process.exit(1);
    }
}
export default dbconnect
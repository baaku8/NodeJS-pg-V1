import mongoose from "mongoose"
const dbConnect=async()=>{
    try {
        await mongoose.connect(`${process.env.DB_URL}/userInfo`)
    } catch (error) {
        console.log("MongoDB not connected!")
        console.log(error)
    }
}
export default dbConnect
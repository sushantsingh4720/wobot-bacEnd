const mongoose=require("mongoose")
const connectDB=async(req,res)=>{
    try{
        const conn=mongoose.connect(process.env.MONGO_URL);
        console.log("connected DB")
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }

}
module.exports={connectDB}
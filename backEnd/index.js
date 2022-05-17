const express=require("express");
const cors=require("cors");

const dotenv=require("dotenv").config();
const port=process.env.PORT||5000;
const {connectDB}=require("./dbConfig/db")
const {errorHandler}=require("./middleWare/errorMiddleware")
connectDB();
const app=express();
app.use(cors());
app.use(express());
app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/users",require("./routes/userRouter"))
app.use("/api/products",require("./routes/productRouter"));
app.use("/api/admin",require("./routes/adminRouter"))

app.listen(port,()=>{
    console.log("Server has started on port");
})
const mongoose=require("mongoose");

const listSchema=new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    created_At:{
        type:Date,
        required:true,
        default:Date.now
    },
    status:{
        type:String,
        required:true,
        enum:["Completed","Not-Completed"]
    }
});


const List=mongoose.model("List",listSchema);
module.exports=List;
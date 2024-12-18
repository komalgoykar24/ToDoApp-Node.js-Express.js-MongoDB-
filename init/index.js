const mongoose=require("mongoose");
const List=require("../models/List.js");
const initData=require("./data.js")
const data=require("./data.js");

main().then(()=>{
    console.log("Connecion is establish..");
}).catch((err)=>{
    console.log(err);
});



async function main() {
   await  mongoose.connect("mongodb://127.0.0.1:27017/ToDoApp");
    
}

const initDB=async()=>{
  await  List.deleteMany();
  await  List.insertMany(initData.data);
    console.log("Data was inserted..");
    
};

initDB();
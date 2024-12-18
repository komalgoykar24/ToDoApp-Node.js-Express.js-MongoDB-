const express=require("express");
const app=express();
const mongoose=require("mongoose");
const List = require("./models/List");
const path=require("path");
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());



main().then(()=>{
    console.log("Connecion is establish..");
}).catch((err)=>{
    console.log("Connection Esatblish..")
});

async function main() {
    await  mongoose.connect("mongodb://127.0.0.1:27017/ToDoApp");
 };

 //Testing Route(http://localhost:8080/)
app.get("/",(req,res)=>{
    res.send("Testing Done..");
});

//Index Route(http://localhost:8080/listing)
app.get("/listing",async(req,res)=>{
 let allList= await List.find();
 res.render("index",{allList});
});

//New Route(http://localhost:8080/listing/new?)
app.get("/listing/new",(req,res)=>{
    res.render("new")
});

//Create Route(http://localhost:8080/listing)
app.post("/listing/new",async(req,res)=>{
   let {task,status,created_At}=req.body;
   const newList=new List({task,status,created_At});
   await newList.save();
  res.redirect("/listing");
})



//Show Route(http://localhost:8080/listing/67625e68a1e42597fe271cf6)
app.get("/listing/:id",async(req,res)=>{
let {id}=req.params;
let showList=await List.findById(id);
console.log(showList);
  res.render("show",{showList,id});
});

//Edit Route(http://localhost:8080/listing/67625e68a1e42597fe271cf6/edit?)
app.get("/listing/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let showList=await List.findById(id);
    res.render("edit",{showList});
});

//Update Route(http://localhost:8080/listing/67625e68a1e42597fe271cf6)
app.put("/listing/:id/update",async(req,res)=>{
    let {id}=req.params;
    let showList=await List.findByIdAndUpdate(id,{...req.body.showList});
    res.redirect(`/listing/${id}`);
    
});

//Delte Route
app.delete("/listing/:id/",async(req,res)=>{
    let {id}=req.params;
    let deletedList=await List.findByIdAndDelete(id);
    res.redirect("/listing");

})



app.listen(8080,()=>{
    console.log("App is listing on server 8080..");
})
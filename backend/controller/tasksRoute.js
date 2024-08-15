const express = require("express");
const schema = require("../model/schema");
const route = express.Router();
const mongoose = require("mongoose");

route.post("/create/:id", async (req, res) => {
    const id = req.params.id;
    const { title,category, duedate,time, description } = req.body;
    const newTask = {
      title: title,
      category: category,
      duedate: duedate, 
      // time:time,
      status:false,
      description: description
    };
  
    try {
      const updatedUser = await schema.findOneAndUpdate(
        { _id: id },
        { $push: { tasks: newTask } },
        { new: true } 
      );
      if (updatedUser) {
        res.json("ADDED");
      } else {
        res.json("User not found");
      }
    } catch (e) {
      res.json(e);
    }
  });

route.post("/login",async(req,res)=>{
    const {name,password} = req.body;
    try{
        const check = await schema.findOne({name:name});
        
        if(check && check.password === password){
            res.json({message :"exists", id :check._id.toString()})
        }
        else{
            res.json("User doesn't exist")
        }
    }
    catch(e){
        res.json(e);
    }
})

route.put("/updatedetails/:id",async(req,res)=>{
  const {name,email,password} = req.body;
  const id = req.params.id;
  const userData = await schema.findOne({_id:id});
   if(userData){
    userData.email = email;
    userData.name = name;
    userData.password = password
    userData.save();
   }
   else{
    res.json("error");
   }
})

route.post("/signup",async(req,res)=>{
    const {name,email,password} = req.body;
    const data = {
        name :name,
        email:email,
        password:password
    }
    try{
        const check = await schema.findOne({email:email,name:name,password:password});
        if(check){
            res.json("Added")
        }
        else{
            await schema.insertMany([data]);
                }
    }
    catch(e){
        res.json(e);
    }
})
route.get("/show/:id", async (req, res) => {
  const id = req.params.id || req.query.id; // Get id from params or query
  try {
      const data = await schema.findOne({_id: id});
 
      if(data){
          res.json(data);
      } else {
          res.json("Waiting");
      }
  } catch(e) {
      res.json(e);
  }
});


route.delete('/delete-task/:parentid/:taskid', async (req, res) => {
    const id = req.params.parentid;
    const taskId = req.params.taskid;
    const parentDocument = await schema.findOne({ _id: id });
    const task = parentDocument.tasks.id(taskId);
    if (task) {
      await task.deleteOne();
      await parentDocument.save();
      res.send('Task deleted successfully');
    } else {
      res.send('Task not found');
    }
  });
  route.put("/updatestatus/:parentid/:taskid", async (req, res) => {
    try {
      const parentid = req.params.parentid;
      const taskid = req.params.taskid;
      const parentDocument = await schema.findOne({ _id: parentid });
      if (!parentDocument) {
        return res.status(404).send('Parent not found');
      }
      const task = parentDocument.tasks.id(taskid);
      if (!task) {
        return res.status(404).send('Task not found');
      }
      task.status = !task.status;
      await parentDocument.save();
      res.status(200).send('Task updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  route.put("/updatetask/:parentid/:taskid", async (req, res) => {
    try {
      const parentid = req.params.parentid;
      const taskid = req.params.taskid;
      const {title,category,duedate,time,description} = req.body;
      const parentDocument = await schema.findOne({ _id: parentid });
      if (!parentDocument) {
        return res.status(404).send('Parent not found');
      }
      const task = parentDocument.tasks.id(taskid);
      if (!task) {
        return res.status(404).send('Task not found');
      }
      task.title = title;
      task.category = category;
      task.duedate = duedate;
      task.time = time;
      task.description = description;
      await parentDocument.save();
      res.status(200).send('Task updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  

  
  

module.exports = route;
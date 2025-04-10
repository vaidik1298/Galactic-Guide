const mongoose=require('mongoose');
const OpenAI=require('openai');
const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: "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",
    defaultHeaders: {
    },
  });
const cors = require('cors');
const express = require('express');
const bcrypt=require('bcrypt');

async function askai(userQuery){
    const completion = await openai.chat.completions.create({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
            {
                role: "system",
                content: ` You are an AI agent that and 
                you will get normal questions also and you should respond to each and every question but    
                you will mainly get queries regarding space objects like
                  -planets
                  -black holes
                  and also you will get asked about space missions and all other questions about universe 
                  and there is a restriction you should give the answer in only three to four lines and main points only
                  and dont give any unnecessary details in the answer like keeping it short just 3-4 lines as requested just
                  answer the question and stop dont say let me know what cosmic topic you are curious about just answer nothing else`
            },
            {
                role: "user",
                content: userQuery
            }
        ],
    });
    return completion.choices[0].message.content;
}


async function main() {
    const app=express();
    app.use(cors());
    app.use(express.json());
    await mongoose.connect('mongodb://127.0.0.1:27017/GalacticLogin');
    console.log("connected to the database");
    const login_schema=new mongoose.Schema({
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    });
    const db=mongoose.model('user',login_schema);
    

    app.post('/signup',async (req,res)=>{
        console.log("post request");
        var { Email, Password } = req.body;
        const salt=await bcrypt.genSalt();
        Password=await bcrypt.hash(Password,salt);
        db.insertOne({email:Email,password:Password}); 
        res.status(201).json({ message: "User registered successfully" });
    })


    app.post('/askai',async(req,res)=>{
        console.log('ask ai post request');
        const response=await askai(req.body.message);
        console.log(response);
        const askai_schema=new mongoose.Schema({
            question:{
                type:String,
            },
            answer:{
                type:String,
            }
        });
        const askai_model=mongoose.model('qna',askai_schema);
        askai_model.insertOne({question:req.body.message,answer:response});
        res.status(201).json({ message: response });
    })

    app.listen(3000, () => {
        console.log("🚀 Server is running on http://localhost:3000");
    });
}
main()
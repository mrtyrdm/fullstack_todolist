import express, { json } from 'express';
import mongoose from 'mongoose';

import Post from '../models/post.js';

const router = express.Router();
require('dotenv').config();


mongoose.connect(process.env.DB_URL,{useNewUrlParser:true}, err => {
    if (err) throw err;
    console.log('MongoDB connection is successful via Mongoose!');
});

router.get('/list', async (req, res) => {
    const data = await Post.find({aktif:true}, {__v:0});
    res.json(data);
});

router.post('/add',async(req,res)=> {
    const data = new Post({
        title: req.body.title,
        content : req.body.content,
    });

    try {
        const savePost = await data.save();
        res.json(savePost);
    }catch (err) {
        res.json({message : data});
    }
});

router.post('/update',async(req,res)=> {

    const {item} =  req.query;
    const {title,content,aktif} = req.body;
    try {    
    const data = await Post.updateOne({ "_id": item},
    { $set: { "title" : title, "content" : content , "aktif" : aktif } }
    );
    res.json(data);
    }catch (err) {
        res.json({message : catID});
    }

});

router.post('/delete',async(req,res)=> {
    const {item} =  req.query;
    const data = await Post.findByIdAndDelete({_id:item});
    try {
        res.json(data);
    }catch (err) {
        res.json({message : err});
    }

});

router.post('/updataData',async(req,res)=> {

    const {item, catID} =  req.query;
    const {titleA,contentA,aktifA} = req.body;
    try {    
    const data = await Post.updateOne({ "_id": item, "new.catID" : parseInt(catID) },
    { $set: { "new.$.titleA" : titleA, "new.$.contentA" : contentA , "new.$.aktifA" : aktifA } }
    );
    res.json(data);
    }catch (err) {
        res.json({message : catID});
    }

    

});

router.post('/addData',async(req,res)=> {

    const {item} =  req.query;

    const data = await Post.findOne({ _id: item });
    data.new.push({
        titleA: req.body.titleA,
        contentA: req.body.contentA,
        aktifA : req.body.aktifA,
        catID : data.new.length
    });

    data.save();
    res.send(data);

});

router.post('/altdelete', async(req,res)=> {
 

        const {item, catID} =  req.query;
        
        try {    
            const get = await Post.findOne({ _id: item }); 
            var boolen = false;
            (get.new[catID].aktifA)  ? boolen=false : boolen=true;

            const data = await Post.updateOne({ "_id": item, "new.catID" : parseInt(catID) },
            { $set: {  "new.$.aktifA" : boolen } }
            );
            res.json(data);
        }catch (err) {
            res.json({message : err});
            console.log({message : err});
        }
    
        

});


export default router;
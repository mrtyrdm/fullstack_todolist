import mongoose from 'mongoose';

const AltSchema = new mongoose.Schema({
    titleA: String,
    contentA: String,
    aktifA : Boolean,
    catID : Number,
});

const postSchema = new mongoose.Schema({
    title : {type :String,required:true},
    content : {type:String,required:false},
    new : [AltSchema],
    date : {type:Date,default:Date.now},
    aktif : {type:Boolean, default:true},
    seq : {type:Number, default:1}
});


export default mongoose.model('Post',postSchema);
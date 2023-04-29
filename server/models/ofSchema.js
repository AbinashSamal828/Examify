const mongoose=require('mongoose');

const ofSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required: true
    },
    comments:{
        type:[{
            id:{
                type:String,
                required:true
            },
            username:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }

        }]
    }
})

const Post=mongoose.model('OF',ofSchema);
module.exports=Post;
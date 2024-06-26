const {Schema}=require('mongoose');
const {model}=require('mongoose');
const demo =new Schema({
    id:{ type:String,required:true},
    date:{ type:String,required:true},
    name:{ type:String, required: true},
    room_no:{ type:String,required:true},
    check_in_date:{type:String,required:true},
    check_out_date:{type:String,required:true},
    

});
const sample=model('roombooking',demo);
module.exports=sample;
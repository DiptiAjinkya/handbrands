
const mongoose =require("mongoose");
const Connection= async()=>{
    try{
    const url="mongodb://DIPTISARWADE:diptisarwade@handcraft-shard-00-00.augt1.mongodb.net:27017,handcraft-shard-00-01.augt1.mongodb.net:27017,handcraft-shard-00-02.augt1.mongodb.net:27017/social?ssl=true&replicaSet=atlas-qrh67v-shard-0&authSource=admin&retryWrites=true&w=majority"
    await mongoose.connect(url,{ useNewUrlParser:true,useUnifiedTopology:true}) 
    //useNewUrlParser-for new url because current url is deprecated
    //useUnifiedTopology-for new discovery & monitoring engine
    console.log("Database Connected Successfully")
    }catch(error)
    {
console.log("Error in Conneting to Database",error);
    }
}
module.exports = Connection;

const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query=req.body.cityName;
    const apikey="33cf2727763b7795789d771a50408fd7";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=metric"
    https.get(url,function(response){
    console.log(response.statusMessage);

    response.on("data",function(data){
        const weatherdata=JSON.parse(data);
        const temp=weatherdata.main.temp;
        const feelslike=weatherdata.main.feels_like;
        const city=query;
        const desc=weatherdata.weather[0].description;
        const icon=weatherdata.weather[0].icon;
        const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.send("<img src="+imageurl+">"+"<b>The temperature in </b>" +city+ "<b> is </b>"+temp+" <b>and it feels like</b> "+feelslike+" <b>and the weather is</b> "+desc+".");
        })
    });
})






app.listen(3000,function(){
    console.log("Server is running on port 3000......");
})
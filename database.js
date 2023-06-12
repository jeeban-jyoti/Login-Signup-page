const mongoose = require("mongoose");
const alert = require('alert')

mongoose.connect("mongodb://localhost:27017/programs", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const contactSchema = {
    email: String,
    passwd: String
};
const DATA = mongoose.model("loginSystemData", contactSchema);

function addDocument(email, passwd, remember, cookie){
  const data = new DATA({
    email: email,
    passwd: passwd
  })
  data.save()
}

function loginCheck(email, passwd, res){
  DATA.find({email: email}).
  then(result =>{
    
    if(result[0].passwd == passwd){
      res.redirect('/')
    }
    else{
      alert("incorrect credentials")
      res.redirect('/err_page')
    }
    console.log(result[0].passwd == passwd)
    console.log(passwd)
  })
}

function signup(email, passwd){
    DATA.find({email: email}).
    then(result =>{
      if (Object.keys(result).length != 0){
        alert("email id already exist")
        console.log("failed")
      }
      else{
        addDocument(email, passwd)
        console.log(email + '--- ---' + passwd)
      }
    })
}

function cookieSetAndCheck(email, passwd, remember, res){
  try{
    var Cookie = req.cookie[0]
    var id = Cookie.id

    DATA.find({email: email}, {passwd: passwd}).
    then(result=>{
      if(result[0]._id == id){
        res.redirect('/')
      }
    })
  }
  catch(e){
    console.log("cookie not found")
  }
  if (remember == 'on'){
    DATA.find({email: email}).
    then(result =>{
      if(result[0].passwd == passwd){
        DATA.updateOne({email: email}, {remember: true})
      }
    })
  }
}

module.exports = {loginCheck, signup, cookieSetAndCheck}
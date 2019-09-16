const mongoose = require('mongoose');
const registrationSchema = new mongoose.Schema({
  emailid:{
    type: String, 
    unique: true
  },
  name: String,
  fname: String,
  password: String,
  percentage: String,
  address:String,
phone: String,
stream: String,
gender:String
});
/*
registrationSchema.methods.encryptPassword=function(password){
return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
};
registrationSchema.methods.validPassword=function(password){
  return bcrypt.compareSync(password,this.password);
  };
  */
module.exports = mongoose.model('registration', registrationSchema);
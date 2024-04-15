import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

// verifiera lösenord
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//Kryptera Lösenord
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const userModel = mongoose.model("User", userSchema);
export default userModel;

//För att använda user.matchPassword i controllers:
// if(user && (await user.matchPassword(password))){

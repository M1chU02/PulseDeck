import { Schema, model } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hashowanie hasła przed zapisaniem użytkownika
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

// Metoda do porównania haseł
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return compare(candidatePassword, this.password); // async fix
};

export default model("User", UserSchema);

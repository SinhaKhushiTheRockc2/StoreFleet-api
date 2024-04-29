import UserModel from "./user.schema.js";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";
import bcrypt from "bcrypt";

export const createNewUserRepo = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  user.password=hashedPassword;
  return await new UserModel(user).save();
};

export const findUserRepo = async (factor, withPassword = false) => {
  if (withPassword) return await UserModel.findOne(factor).select("+password");
  else return await UserModel.findOne(factor);
};

export const findUserForPasswordResetRepo = async (hashtoken) => {
  return await UserModel.findOne({
    resetPasswordToken: hashtoken,
    resetPasswordExpire: { $gt: Date.now() },
  });
};

export const updateUserProfileRepo = async (_id, data) => {
  return await UserModel.findOneAndUpdate(_id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
};

export const getAllUsersRepo = async () => {
  return UserModel.find({});
};

export const deleteUserRepo = async (_id) => {
  return await UserModel.findByIdAndDelete(_id);
};

export const updateUserRoleAndProfileRepo = async (_id, data) => {    try{
         const user=await UserModel.findById(_id);
         if(data.name){
          user.name=data.name;
         };

         if(data.email){
          user.email=data.email;
         };

         if(data.role){
          user.role=data.role;
         }

        return  await user.save();
       }catch(err){
           return err;
       }
 };

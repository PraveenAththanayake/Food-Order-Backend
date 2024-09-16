import { Request, Response, NextFunction } from "express";
import { CreateVendotInput } from "../dto";
import { Vandor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const CreateVandor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    address,
    pincode,
    foodType,
    email,
    password,
    ownerName,
    phone,
  } = <CreateVendotInput>req.body;

  const existingVandor = await Vandor.findOne({ email: email });

  if (existingVandor) {
    return res
      .status(400)
      .json({ message: "A vandor is exists with this email ID" });
  }

  //generate a salt
  const salt = await GenerateSalt();
  const userPassword = await GeneratePassword(password, salt);

  //encrypt the password using the salt

  const createdVandor = await Vandor.create({
    name: name,
    address: address,
    pincode: pincode,
    foodType: foodType,
    email: email,
    password: userPassword,
    salt: salt,
    ownerName: ownerName,
    phone: phone,
    rating: 0,
    serviceAvailable: false,
    coverImages: [],
  });

  return res.json(createdVandor);
};

export const GetVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vandors = await Vandor.find();

  if (vandors != null) {
    return res.json(vandors);
  }

  return res.json({ message: "No vandors found" });
};

export const GetVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vandorId = req.params.id;

  const vandor = await Vandor.findById(vandorId);

  if (vandor != null) {
    return res.json(vandor);
  }

  return res.json({ message: "No vandor found with this id" });
};

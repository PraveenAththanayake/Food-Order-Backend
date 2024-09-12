import express, { Request, Response, NextFunction } from "express";
import { CreateVandor, GetVendor, GetVendorById } from "../controllers";

const router = express.Router();

router.post("/vandor", CreateVandor);

router.get("/vandor", GetVendor);

router.get("/vandor/:id", GetVendorById);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello World Admin" });
});

export { router as AdminRoute };

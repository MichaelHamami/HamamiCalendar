import express from "express";
const router = express.Router();

import {
  signin,
  signup,
  activateUser,
  addPhone,
  verifyPhone,
  changePassword,
  editProfile,
  changeEmail,
  confirmEmail,
} from "../controllers/user.js";
// TODO add auth middleware before deployment and check it
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/email-activate/:token", activateUser);

router.patch("/changePassword", changePassword);
router.patch("/editProfile", editProfile);

router.post("/changeEmail", changeEmail);
router.patch("/confirmEmail/:token", confirmEmail);

router.post("/add-phone", addPhone);

router.patch("/verify_phone/:token", verifyPhone);

export default router;

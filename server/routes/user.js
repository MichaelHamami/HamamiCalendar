import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

import {
  login,
  signup,
  activateUser,
  changePassword,
  editProfile,
  changeEmail,
  confirmEmail,
} from "../controllers/user.js";

// TODO add auth middleware before deployment and check it
router.post("/login", login);
router.post("/signup", signup);
router.post("/email-activate/:token", activateUser);

router.patch("/changePassword", changePassword);
router.patch("/editProfile", auth,editProfile);

router.post("/changeEmail", changeEmail);
router.patch("/confirmEmail/:token", confirmEmail);


export default router;

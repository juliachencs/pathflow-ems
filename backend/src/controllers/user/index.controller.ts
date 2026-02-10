import {
  getBoarding,
  updateboarding,
} from "@/controllers/user/boarding.controller";
import { getProfile, putProfile } from "@/controllers/user/profile.controller";

const userController = {
  getProfile,
  putProfile,
  getBoarding,
  updateboarding,
};

export default userController;

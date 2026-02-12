import {
  getBoarding,
  getBoardings,
  reviewBoarding,
} from "@/controllers/admin/boardings.controller";
import {
  getProfile,
  getProfiles,
} from "@/controllers/admin/profiles.controller";
import {
  getRegistrations,
  sendInvitation,
} from "@/controllers/admin/registrations.controller";
import {
  getAllVisas,
  getProgressVisas,
  reviewVisa,
} from "@/controllers/admin/visas.controller";

const adminController = {
  // registrations
  getRegistrations,
  sendInvitation,

  // profiels
  getProfile,
  getProfiles,

  // boardings
  getBoardings,
  getBoarding,
  reviewBoarding,

  // visas
  getAllVisas: getAllVisas,
  getProgressVisas: getProgressVisas,
  reviewVisa: reviewVisa,
};
export default adminController;

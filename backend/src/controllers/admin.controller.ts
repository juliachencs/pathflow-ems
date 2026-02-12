import {
  getProfile,
  getProfiles,
} from "@/controllers/admin/profiles.controller";
import {
  getRegistrations,
  sendInvitation,
} from "@/controllers/admin/registrations.controller";

const adminController = {
  // registrations
  getRegistrations: getRegistrations,
  sendInvitation: sendInvitation,

  // profiels
  getProfile: getProfile,
  getProfiles: getProfiles,

  // boardings
  // getBoardings: getBoardings,
  // getBoarding: getBoarding,
  // reviewBoarding: reviewBoarding,

  // visas
  // getAllVisas: getAllVisas,
  // getProgressVisas: getProgressVisas,
  // reviewVisa: reviewVisa,
};
export default adminController;

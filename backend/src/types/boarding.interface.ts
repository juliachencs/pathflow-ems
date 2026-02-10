import type { ApplyState } from "@/types/common";
import type { IProfile } from "@/types/profile.interface";

export interface IBoardingApplication {
  _id: string; // employee id
  state: ApplyState; //"UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED";
  profile: IProfile;
  feedback?: string;
}

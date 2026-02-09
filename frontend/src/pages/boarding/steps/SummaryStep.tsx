import { useFormContext } from "react-hook-form";
import type { BoardingFormValues } from "../../../app/schema/boardingSchema";
import ProfileLayout from "../../../components/profile/ProfileLayout";
import type { IProfileFull } from "../../../app/types";
import { boardingProfileMapper } from "../../../app/util/profileMapper";

export default function SummaryStep() {
  const { getValues } = useFormContext<BoardingFormValues>();
  const values: BoardingFormValues = getValues();
  const mapped: IProfileFull = boardingProfileMapper(values);
  return (
    <>
    <ProfileLayout values={mapped} bordered/>
    </>
  );
}

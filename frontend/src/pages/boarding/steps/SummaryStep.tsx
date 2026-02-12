import { useFormContext } from "react-hook-form";
import type { BoardingFormValues } from "../../../app/schema/boardingSchema";
import ProfileLayout from "../../../components/profile/ProfileLayout";
import type { BoardingData } from "../../../app/types";
import type { boardingStepsProps } from "../OnBoard";
import { BoardingFormValueToDataMapper } from "../../../app/util/profileMapper";

const SummaryStep: React.FC<boardingStepsProps> = () =>{
  const { getValues } = useFormContext<BoardingFormValues>();
  const values: BoardingFormValues = getValues();
  const mapped: BoardingData = BoardingFormValueToDataMapper(values);
  return (
    <>
    <ProfileLayout values={mapped} bordered/>
    </>
  );
}

export default SummaryStep;
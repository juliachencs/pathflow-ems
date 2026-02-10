import type { BoardingFormValues } from "../schema/boardingSchema";
import type { ContactInfo, IProfileFull } from "../types";

export const boardingProfileMapper = (values: BoardingFormValues): IProfileFull => {
    return {
        name: {
            firstName: values.firstName,
            lastName: values.lastName,
            middleName: values.middleName,
            preferredName: values.preferedName
        },
        profileImage: values.profileImgUrl,
        address: { ...values.address, secondary: values.address.unit },
        cellPhone: values.cellPhoneNumber,
        workPhone: values.workPhoneNumber,
        email: values.email,
        SSN: values.ssn,
        dob: values.dob,
        gender: values.gender,
        workAuthorization: {
            type: (values.isUSCitizen === 'yes' ? values.greenCardOrCitizen! : values.workAuthorization!),
            title: values.otherVisaTitle,
            startDate: values.visaStartDate,
            endDate: values.visaEndDate,
            url: values.optReceiptUrl,
        },
        reference: values.reference.firstName ? {
            person: { ...values.reference },
            relationship: values.reference.relationship
        } : undefined,
        emergencyContacts:
            values.emergencyContacts?.map((ec): ContactInfo => {
                return {
                    person: {
                        firstName: ec.firstName,
                        lastName: ec.lastName,
                        middleName: ec.middleName,
                        phone: ec.phone,
                        email: ec.email
                    },
                    relationship: ec.relationship
                }
            })

    }
};

export const profileBoardingMapper = (values: IProfileFull): BoardingFormValues => {
    const { name, address, workAuthorization, reference } = values;
    return {
        firstName: name.firstName,
        lastName: name.lastName,
        middleName: name.middleName,
        preferedName: name.preferredName,
        profileImgUrl: values.profileImage,
        address: {
            ...address,
            unit: address.secondary
        },
        cellPhoneNumber: values.cellPhone,
        workPhoneNumber: values.workPhone,
        email: values.email,
        ssn: values.SSN,
        dob: values.dob,
        gender: values.gender,
        isUSCitizen: workAuthorization.type === 'Citizen' ? 'yes' : 'no',
        greenCardOrCitizen: workAuthorization.type === 'Citizen' ? "Citizen" : workAuthorization.type === 'GreenCard' ? 'GreenCard' : undefined,
        workAuthorization: workAuthorization.type === 'Citizen' ? undefined : workAuthorization.type === 'GreenCard' ? undefined : workAuthorization.type,
        otherVisaTitle: workAuthorization.title,
        visaStartDate: workAuthorization.startDate,
        visaEndDate: workAuthorization.endDate,
        optReceiptUrl: values.visaDocuments?.OPT,
        reference: {
            ...reference,
            relationship: reference?.relationship
        },
        // emergencyContacts: emergencyContacts?.map((ele) => {
        //     return {...ele, relationship: ele.relationship}
        // })
    }
};
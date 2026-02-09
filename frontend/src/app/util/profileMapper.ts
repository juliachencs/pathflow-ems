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
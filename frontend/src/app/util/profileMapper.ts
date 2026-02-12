import dayjs from "dayjs";
import type { BoardingFormValues } from "../schema/boardingSchema";
import type { BoardingData, ContactInfo, IProfileFull } from "../types";

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
        greenCardOrCitizen: workAuthorization.type === 'Citizen' ? "Citizen" : workAuthorization.type === 'Green Card' ? 'Green Card' : undefined,
        workAuthorization: workAuthorization.type === 'Citizen' ? undefined : workAuthorization.type === 'Green Card' ? undefined : workAuthorization.type,
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

export const BoardingFormValueToDataMapper = (values: BoardingFormValues): BoardingData => {
    return {
        name: {
            firstName: values.firstName,
            lastName: values.lastName,
            middleName: values.middleName,
            preferredName: values.preferedName
        },
        profileImage: values.profileImgUrl ?? '',
        address: {
            ...values.address,
            secondary: values.address.unit ?? ''
        },
        cellPhone: values.cellPhoneNumber,
        workPhone: values.workPhoneNumber,
        email: values.email,
        SSN: values.ssn,
        dob: values.dob.toISOString(),
        gender: values.gender,
        workAuthorization: {
            type: (values.isUSCitizen === 'yes' ? values.greenCardOrCitizen! : values.workAuthorization!),
            title: values.otherVisaTitle,
            startDate: values.visaStartDate?.toISOString(),
            endDate: values.visaEndDate?.toISOString(),
            url: values.optReceiptUrl,
        },
        reference: {
            person: values.reference && { ...values.reference, firstName: values.reference.firstName!, lastName: values.reference.lastName! },
            relationship: values.reference.relationship
        },
        emergencyContacts:
            values.emergencyContacts ? values.emergencyContacts.map((ec) => {
                return {
                    person: {
                        firstName: ec.firstName,
                        lastName: ec.lastName,
                        middleName: ec.middleName ?? undefined,
                        phone: ec.phone ?? undefined,
                        email: ec.email ?? undefined
                    },
                    relationship: ec.relationship
                }
            }) : undefined
    }
}

export const BoardingDataToFormValueMapper = (values: BoardingData | null): BoardingFormValues | undefined => {
    if (!values) return undefined;
    const { name, address, workAuthorization, reference, emergencyContacts } = values;
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
        dob: dayjs(values.dob).toDate(),
        gender: values.gender,
        isUSCitizen: workAuthorization.type === 'Citizen' ? 'yes' : 'no',
        greenCardOrCitizen: workAuthorization.type === 'Citizen' ? "Citizen" : workAuthorization.type === 'Green Card' ? 'Green Card' : undefined,
        workAuthorization: workAuthorization.type === 'Citizen' ? undefined : workAuthorization.type === 'Green Card' ? undefined : workAuthorization.type,
        otherVisaTitle: workAuthorization.title,
        visaStartDate: dayjs(workAuthorization.startDate).toDate(),
        visaEndDate: dayjs(workAuthorization.endDate).toDate(),
        optReceiptUrl: workAuthorization.url,
        reference: {
            ...reference,
            relationship: reference?.relationship
        },
        emergencyContacts: emergencyContacts ? [...emergencyContacts.map((ele): emContact => {
            const { firstName, lastName, middleName, phone, email } = ele.person
            return { firstName, lastName, middleName, phone, email, relationship: ele.relationship };
        })] : undefined
    }
}

interface emContact {
    firstName: string;
    lastName: string;
    middleName?: string;
    phone?: string;
    email?: string;
    relationship: string;
}
import { z } from "zod";

export const identitySchema = z.object({
  firstName: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Name is required"),
  middleName: z.string().optional(),
  preferedName: z.string().optional(),
  // handle profile image as this for now
  profileImgUrl: z.url().optional(),
});

export const contactSchema = z.object({
  address: z.object({
    unit: z.string().optional(),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "Zipcode is required"),
  }),
  cellPhoneNumber: z
    .string("Phone number is required")
    .min(1, "Phone number is required")
    .max(12, "Please enter valid phone number"),
  workPhoneNumber: z.string().optional(),
  email: z.email(),
  ssn: z.string().min(1, "SSN is required"),
  dob: z.date({ error: "Date of birth is required" }),
  gender: z.enum(["male", "female", "NA"] as const, {
    error: "Please choose from one",
  }),
  // do we really need?
  //   driverLicenceUrl: z.url()
});

export const workAuthSchema = z
  .object({
    isUSCitizen: z.enum(["yes", "no"] as const, {
      error: "Please choose from one",
    }),
    greenCardOrCitizen: z.enum(["Green Card", "Citizen"] as const).optional(),
    workAuthorization: z
      .enum(["H1-B", "L2", "H4", "Other", "F1(CPT/OPT)"] as const)
      .optional(), // H1-B, L2, F1(CPT/OPT), H4, Other
    optReceiptUrl: z.url().optional(), // F1 only
    otherVisaTitle: z.string().optional(), // "Other" only
    visaStartDate: z.date().optional(),
    visaEndDate: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isUSCitizen === 'yes' && !data.greenCardOrCitizen) {
      ctx.addIssue({
        code: "custom",
        message: "Please select Green Card or Citizen",
        path: ["greenCardOrCitizen"],
      });
    }
    if (data.isUSCitizen === "no" && !data.workAuthorization) {
      ctx.addIssue({
        code: "custom",
        message: "Work authorization is required for non-citizens",
        path: ["workAuthorization"],
      });
    }
    if (data.workAuthorization === "F1(CPT/OPT)" && !data.optReceiptUrl) {
      ctx.addIssue({
        code: "custom",
        message: "OPT receipt URL is required for F1",
        path: ["optReceiptUrl"],
      });
    }
    if (data.workAuthorization === "Other" && !data.otherVisaTitle) {
      ctx.addIssue({
        code: "custom",
        message: "Please specify the visa title",
        path: ["otherVisaTitle"],
      });
    }
    if (data.workAuthorization && !data.visaStartDate) {
      ctx.addIssue({
        code: "custom",
        message: "Start date of visa is required",
        path: ["visaStartDate"],
      });
    }
    if (data.workAuthorization && !data.visaEndDate) {
      ctx.addIssue({
        code: "custom",
        message: "End date of visa is required",
        path: ["visaEndDate"],
      });
    }
  });

export const referenceSchema = z.object({
  reference: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      middleName: z.string().optional(),
      phone: z.string().optional(),
      email: z.email().optional(),
      relationship: z.string().optional(),
    }),
  emergencyContacts: z
    .array(
      z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        middleName: z.string().optional(),
        phone: z.string().optional(),
        email: z.email().optional().or(z.literal("")),
        relationship: z.string().min(1, "Relationship is required"),
      })
    )
    .optional(),
}).superRefine((data, ctx) => {
  const hasAnyValue = Object.values(data.reference).some(
    (v) => typeof v === "string" && v.trim() !== ""
  );

  if (!hasAnyValue) return;

  if (!data.reference.firstName) {
    ctx.addIssue({
      code: "custom",
      path: ["reference.firstName"],
      message: "Referencer's First name is required",
    });
  }

  if (!data.reference.lastName) {
    ctx.addIssue({
      code: "custom",
      path: ["reference.lastName"],
      message: "Referencer's Last name is required",
    });
  }

  if (!data.reference.relationship) {
    ctx.addIssue({
      code: "custom",
      path: ["reference.relationship"],
      message: "Referencer's Relationship is required",
    });
  };
});

export const onboardingSchema = identitySchema.merge(identitySchema).merge(contactSchema).merge(workAuthSchema).merge(referenceSchema);


export type BoardingFormValues = z.infer<typeof onboardingSchema>;
import { z } from "zod";

// Validation Schema using Zod
const schema = z.object({
    name: z.string().min(3, "Please enter your full name"),
    email: z.string().email("Enter a valid email"),
    contact: z.string().min(3, "Enter a valid contact number").max(20).regex(/^\+?[1-9]\d{1,14}$/),
    countryCode: z.string().length(2, "Country code is required"),
    location: z.string().min(3, "Location is required"),
    latlng: z.tuple([z.number(), z.number()]),
    gender: z.enum(["Male", "Female"], { errorMap: () => ({ message: "Select your gender" }) }).optional(),
    birthdate: z.date().optional(),
    maritalStatus: z.enum([
        "Never Married",
        "Divorced",
        "Windowed",
        "Separated",
        "Annulled",
        "Divorced(1 child , Living Together)",
        "Divorced(2 children , Living Together)",
        "Divorced(3 children , Living Together)",
        "Awaiting Divorce",
        "Widowed(1 child , Living Together)",
        "Divorced(Without child)",
    ]).optional(),
    profileNote: z.string().optional(),
    profileMadeBy: z.enum(["Self", "Father", "Mother", "Brother", "Sister", "Cousin", "Friend", "Relative", "Uncle", "Aunty", "Other"]).optional(),
    memberShipType: z.enum(["Active Client", "Free Member", "Inactive", "Deactivated", "Refund", "Old Paid Member", "Profile on Hold"]).optional(),
    registeredBy: z.string().min(3).max(50).optional(),
    amount: z.number().min(0).optional(),
    appearance: z.enum(["Hair-cut", "Turbaned(with trimmed beard)", "Gursikh", "Clean Shaven", "Amrit-Dhari", "Female Profile"]).optional(),
    religion: z.enum(["Sikh", "Hindu", "Jain", "Muslim", "Christain"]).optional(),
    subcaste: z.string().optional(),
    height: z
        .string()
        .regex(/^([4-7])'([0-9]|10|11)"$/, "Invalid height format")
        .optional(),
    moreAboutMartialStatus: z.string().optional(),
    vegetarian: z.enum(["Yes", "No"]).optional(),
    doYouDrinkAlcohol: z.enum(["Yes", "No"]).optional(),
    doYouSmoke: z.enum(["Yes", "No"]).optional(),
    phoneNumber: z.number().optional(),
    userCode: z.number().optional(),
    nameOfHighSchool: z.string().optional(),
    education: z.string().optional(),
    employment: z.string().optional(),
    income: z.number().min(0).optional(),
    profession: z.string().optional(),
    familyAffluenceLevel: z.string().optional(),
    fatherEmployment: z.string().optional(),
    motherEmployment: z.string().optional(),
    otherFamilyDetails: z.string().optional(),
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    residencyStatus: z.string().optional(),
    livingInSince: z.string().optional(),
    countryLiving: z.string().optional(),
    countryGrewUpIn: z.string().optional(),
    propertyDetails: z.string().optional(),
    imgURL: z.array(z.string().url("Invalid image URL")).optional(),


    moreAboutPartnerPreference: z.string().optional(),
    memeberStatus: z.string().optional(),
    preferredGender: z.enum(['Male', 'Female']).optional(),
    preferredAge: z.object({
        min: z.number().min(18, "Minimum age must be 18"),
        max: z.number().min(18, "Minimum age must be 18")
    }).superRefine(({ min, max }, ctx) => {
        if (max < min) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Max age must be greater than or equal to min age",
                path: ["max"]
            });
        }
    }).optional(),

    // Preferred Height Range (stored in inches)
    preferredHeight: z.object({
        min: z.number().min(49, "Minimum height should be 4'1\" (49 inches)"),
        max: z.number().min(49, "Minimum height should be 4'1\" (49 inches)")
    }).superRefine(({ min, max }, ctx) => {
        if (max < min) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Max height must be greater than or equal to min height",
                path: ["max"]
            });
        }
    }).optional(),

    preferredReligion: z.enum(['Sikh', 'Hindu', 'Jain', 'Muslim', 'Christain']).optional(),
    preferredSubcaste: z.string().optional(),
    residencyPreferrence: z.string().optional(),
    countryPreferred: z.string().optional(),
    cityPreferred: z.string().optional(),
    preferredAppearance: z.enum(['Hair-cut', 'Turbaned(with trimmed beard)', 'Gursikh', 'Clean Shaven', 'Amrit-Dhari', 'Female Profile']).optional(),
    maritalStatusPreference: z.enum([
        'Never Married', 'Divorced', 'Windowed', 'Separated', 'Annulled',
        'Divorced(1 child , Living Together)', 'Divorced(2 children , Living Together)', 'Divorced(3 children , Living Together)',
        'Awaiting Divorce', 'Widowed(1 child , Living Together)', 'Divorced(Without child)'
    ]).optional(),
    educationPreferrence: z.string().optional(),
    employmentPreferrence: z.string().optional(),
    vegetarianPreferrence: z.enum(['Yes', 'No']).optional(),
    drinkAlcoholPreferrence: z.enum(['Yes,socially', 'yes,regularly', 'No']).optional(),
    
});

export default schema;

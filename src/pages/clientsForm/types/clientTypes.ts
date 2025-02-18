export interface ICustomer {
    _id?: string;
    name: string;
    email: string;
    contact: string;
    countryCode: string;
    location: string;
    latlng: number[];
    gender: 'Male' | 'Female' | 'Other';
    birthdate: string;
    maritalStatus:
    "Never Married" |
    "Divorced" |
    "Windowed" |
    "Separated" |
    "Annulled" |
    "Divorced(1 child , Living Together)" |
    "Divorced(2 children , Living Together)" |
    "Divorced(3 children , Living Together)" |
    "Awaiting Divorce" |
    "Widowed(1 child , Living Together)" |
    "Divorced(Without child)";
    profileNote: string;
    profileMadeBy: "Self" | "Father" | "Mother" | "Brother" | "Sister" | "Cousin" | "Friend" | "Relative" | "Uncle" | "Aunty" | "Other";
    memberShipType: "Active Client" | "Free Member" | "Inactive" | "Deactivated" | "Refund" | "Old Paid Member" | "Profile on Hold";
    registeredBy: string;
    amount: string,
    appearance: "Hair-cut" | "Turbaned(with trimmed beard)" | "Gursikh" | "Clean Shaven" | "Amrit-Dhari" | "Female Profile";
    caste: "Sikh" | "Hindu" | "Jain" | "Muslim" | "Christain";
    subcaste: string;
    height: string;
    moreAboutMartialStatus: string;
    vegetarian: "Yes" | "No";
    doYouDrinkAlcohol: "Yes" | "No";
    doYouSmoke: "Yes" | "No";
    phoneNumber: string;
    userCode: string;
    nameOfHighSchool: string;
    education: string;
    employment: string;
    income: string;
    profession: string;
    familyAffluenceLevel: string;
    fatherEmployment: string;
    motherEmployment: string;
    otherFamilyDetails: string;
    fatherName: string;
    motherName: string;
    residencyStatus: string;
    livingInSince: string;
    countryLiving: string;
    countryGrewUpIn: string;
    propertyDetails: string;
}
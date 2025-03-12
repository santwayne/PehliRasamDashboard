// types.ts
export interface Field {
    _id: string;
    attributeName: string;
    attributeType: string;
    attributePlaceHolder?: string;
    attributeState: boolean;
    attributeEnum?: string[];
    attributeOption?: string[];
    groupId: string;
}

export interface Group {
    _id: string;
    name: string;
    formFields: Field[];
}

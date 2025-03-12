export interface Field {
    _id: string;
    attributeName: string;
    attributeType: string;
    attributePlaceHolder?: string;
    attributeStatus: boolean;
    attributeOption?: string[];
    attributeEnum?: string[];
    form_group_id: string;
    isActive?: boolean;
}


export interface Group {
    _id: string;
    name: string;
    formFields: Field[];
}

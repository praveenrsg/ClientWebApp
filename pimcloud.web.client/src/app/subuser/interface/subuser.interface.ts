export interface IUserDetails {
    id: number;
    name: string;
    email: string;
    mobileNumber: string;
    countryCode: string;
    accesses: [];
    createdAt: string;
    editedAt: string;
    status: [];
    role: [],
    fileUpload:string
}
export interface IUserInviteDetails {
    id: number;
    firstName: string;
    lastName:string
    email: string;
    mobileNumber: string;
    countryCode: string;
    country:string,
    role: string,
    fileUpload:string
}
export interface IUserInviteSuccessResponse {
    invite:IUserDetails,
    message:string
}
export  interface IUserDeleteOrReInvite {
    id:number
}

export interface IRoles {
    id: number,
    name: string,
    access: []
}
export interface Countries {
    code: string
    code3: string
    name: string
    number: string
}

export interface DialCode {
    code: string
    name: string
    isdCode: string
    code3: string
}
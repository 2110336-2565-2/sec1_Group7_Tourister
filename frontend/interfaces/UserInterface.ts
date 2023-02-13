export interface UserInterface {
    _id: string,
    citizenId: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    phoneNumber: string,
    isGuide?: boolean,
    bankName?: string,
    bankAccount?: string,
    remainingAmount?: number,
    licenseId?: string,
}
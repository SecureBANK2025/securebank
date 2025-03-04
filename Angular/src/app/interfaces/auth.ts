export interface Signup {
    readonly name: string;
    readonly email: string;
    readonly PIN: string;
    readonly confirmPIN: string;
    readonly birthday: string;
    readonly nationalId: string;
    readonly phoneNum: string;
    readonly address: {
        street: string,
        city: string,
        governorate: string
    };
}
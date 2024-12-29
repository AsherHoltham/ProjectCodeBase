import * as CryptoJS from 'crypto-js';
import { generateVerificationCode } from "./generateVerificationCode";

export class User {
    private _uname: string;
    private _password: string;
    private _email: string;
    private _trips: string[];
    private _verified: boolean;
    private _verificationCode: string;

    constructor(uname: string, password: string, email: string, 
        trips: string[] = [], verified: boolean = false, verificationCode: string = '') 
    {
        this._uname = uname;
        this._password = CryptoJS.SHA256(password).toString();
        console.log(this._password);
        this._email = email;
        this._trips = trips;
        this._verified = verified;
        //const code: string = generateVerificationCode();
        if(verificationCode !== ''){
            this._verificationCode = verificationCode;
        } else {
            this._verificationCode = generateVerificationCode();
        }
    }

    public getUname(): string {
        return this._uname;
    }

    public getEmail(): string {
        return this._email;
    }

    public getPasswordHash(): string {
        return this._password;
    }   

    public getVerificationStatus(): boolean {
        return this._verified;
    }

    public setVerificationStatus() {
        this._verified = true;
    }

    public getVerificationCode(): string {
        return this._verificationCode;
    }

    public toDB(): Record<string, any> {
        return {
          "_uname": this._uname,
          "_password": this._password,
          "_email": this._email,
          "_trips": this._trips,
          "_verified": this._verified.toString(),
          "_verificationCode": this._verificationCode
        };
      }

    public retIndexes(): string[] {
        return ["_uname", "_email", "_verified"];
    }

    
};
export class VerifyOTPResponse {

    constructor(public code: number = 0,
                public message: string = '',
                public token: string = '') {
    }

}

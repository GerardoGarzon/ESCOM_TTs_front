export class MeResponse {

    constructor(public id: number = 0,
                public name: string = '',
                public email: string = '',
                public phone: string = '',
                public type: number = 0,
                public email_verified_at: string = '',
                public created_at: string = '',
                public updated_at: string = '') {
    }

}

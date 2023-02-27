export class Token {
    constructor(public access_token?: string,
                public token_type?: string,
                public expires_in?: string,
                public message?: string,
                public code?: number) {
    }
}

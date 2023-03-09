export class PendindPreregisterResponse {
    constructor(public code: number = 0,
                public message: string = '',
                public data: Array<PendingPreregister> = new Array<PendingPreregister>()) {
    }
}

export class PendingPreregister {
    constructor(public id: number = 0,
                public email: string = '',
                public created_at: string = '') {
    }
}

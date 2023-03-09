export class TrabajosProfesorResponse {
    constructor(public code: number = 0,
                public message: string = "",
                public data: Array<Trabajo> = new Array<Trabajo>()) {
    }
}

export class Trabajo {
    constructor(public id: number = 0,
                public nombre: string = "",
                public type: number = 0,
                public status: number = 0,
                public identificado: string = "") {
    }
}

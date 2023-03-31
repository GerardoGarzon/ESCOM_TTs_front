export class AlumnoResponse {

    constructor(public code: number = 0,
                public message: number = 0,
                public data: Alumno | null = null) {
    }

}

export class Alumno {

    constructor(public id: number = 0,
                public name: string = '',
                public email: string = '',
                public phone: string = '',
                public type: number = 0,
                public boleta: string = '') {
    }

}

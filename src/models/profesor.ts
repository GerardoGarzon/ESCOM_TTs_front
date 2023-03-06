export class ProfesorsResponse {
    constructor(public code: number = 0,
                public message: string = "",
                public data: Array<Profesor> = new Array<Profesor>()) {
    }
}

export class Profesor {

    constructor(public id: number = -1,
                public name: string = "",
                public email: string = "",
                public phone: string = "",
                public type: number = 0,
                public githubURL: string = '',
                public driveURL: string = '',
                public location: string = '') {
    }

}

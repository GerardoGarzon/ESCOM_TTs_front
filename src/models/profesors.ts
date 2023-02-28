export class ProfesorsResponse {
    constructor(public code: number = 0,
                public message: string = "",
                public data: Array<Profesors> = new Array<Profesors>()) {
    }
}

export class Profesors {

    constructor(public id: number = -1,
                public name: string = "",
                public phone: string = "") {
    }

}

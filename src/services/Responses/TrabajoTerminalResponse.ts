export class TrabajoTerminalResponse {
    constructor(public code: number = 0,
                public message: string = '',
                public data: TrabajoTerminal = new TrabajoTerminal()) {
    }
}

export class TrabajoTerminal {
    constructor(public id: number = 0,
                public name: string = '',
                public description: string = '',
                public type: number = 0,
                public link: string = '',
                public status: number = 0,
                public created_at: string = '',
                public updated_at: string = '',
                public tt_identificador: string = '',
                public alumnos: Array<AlumnosTrabajo> = new Array<AlumnosTrabajo>()) {
    }
}

export class AlumnosTrabajo {
    constructor(public id: number = 0,
                public tt_id: number = 0,
                public student_name: string = '',
                public created_at: string = '',
                public updated_at: string = '' ) {
    }
}

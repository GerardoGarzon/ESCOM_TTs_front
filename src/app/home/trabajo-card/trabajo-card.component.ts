import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-trabajo-card',
  templateUrl: './trabajo-card.component.html',
  styleUrls: ['./trabajo-card.component.scss']
})
export class TrabajoCardComponent implements OnInit {
    @Input() titulo: string = ""
    @Input() identificador: string = ""
    @Input() status: number = 0
    @Input() link: number = 1

    statusString: string = ''

    constructor() {
    }

    ngOnInit(): void {
        if (this.status == 0) {
            this.statusString = 'Protocolo'
        } else if (this.status == 1) {
            this.statusString = 'Trabajo terminal 1'
        } else if (this.status == 2) {
            this.statusString = 'Trabajo terminal 2'
        } else if (this.status == 3) {
            this.statusString = 'Trabajo terminal remedial'
        } else {
            this.statusString = 'Finalizado'
        }
    }

}

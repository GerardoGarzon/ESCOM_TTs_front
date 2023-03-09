import {Component, OnInit} from '@angular/core';
import {TrabajosService} from "../../../services/Trabajos/trabajos.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TrabajoTerminal, TrabajoTerminalResponse} from "../../../services/Responses/TrabajoTerminalResponse";

@Component({
  selector: 'app-trabajo-detail',
  templateUrl: './trabajo-detail.component.html',
  styleUrls: ['./trabajo-detail.component.scss']
})
export class TrabajoDetailComponent implements OnInit {
    showSpinner: boolean = false
    trabajoId: number = 0
    token: string = ''
    // @ts-ignore
    trabajo: TrabajoTerminal

    constructor(private TrabajoInjection: TrabajosService,
                private router: Router,
                private activeRouter: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.trabajoId = this.activeRouter.snapshot.params['id']
        // @ts-ignore
        this.token = localStorage.getItem('token')

        if ( this.token == null || this.trabajoId == null ) {
            this.router.navigate(['/'])
        } else {
            this.obtenerTrabajoTerminal()
        }
    }

    obtenerTrabajoTerminal() {
        this.showSpinner = true
        this.TrabajoInjection.obtenerTrabajoTerminal(this.trabajoId, this.token).subscribe((trabajoResponse) => {
            if (trabajoResponse.code == 200) {
                this.trabajo = trabajoResponse.data
            } else {
                this.router.navigate(['..'])
            }
            this.showSpinner = false
        }, (error) => {
            this.router.navigate(['..'])
            this.showSpinner = false
        })
    }
}

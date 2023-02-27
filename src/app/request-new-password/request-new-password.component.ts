import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-request-new-password',
    templateUrl: './request-new-password.component.html',
    styleUrls: ['./request-new-password.component.scss']
})
export class RequestNewPasswordComponent implements OnInit {
    email: String = ""

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.email = this.route.snapshot.params['email']
    }


}

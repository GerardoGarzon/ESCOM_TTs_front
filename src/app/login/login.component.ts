import {Component, OnInit} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    options: AnimationOptions = {
        path: '/assets/lottie/code_init.json'
    };

    constructor() { }

    ngOnInit(): void {  }

    // This is the component function that binds to the animationCreated event from the package
    onAnimate(animationItem: AnimationItem): void {
        console.log(animationItem);
    }

}

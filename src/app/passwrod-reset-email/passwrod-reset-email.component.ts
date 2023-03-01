import { Component } from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

@Component({
  selector: 'app-passwrod-reset-email',
  templateUrl: './passwrod-reset-email.component.html',
  styleUrls: ['./passwrod-reset-email.component.scss']
})
export class PasswrodResetEmailComponent {
    options: AnimationOptions = {
        path: '/assets/lottie/success-send.json'
    };

    constructor() {
    }

    ngOnInit(): void {
    }

    // This is the component function that binds to the animationCreated event from the package
    onAnimate(animationItem: AnimationItem): void {
        console.log(animationItem);
    }
}

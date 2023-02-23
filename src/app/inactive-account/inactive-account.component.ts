import { Component } from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

@Component({
  selector: 'app-inactive-account',
  templateUrl: './inactive-account.component.html',
  styleUrls: ['./inactive-account.component.scss']
})
export class InactiveAccountComponent {
    options: AnimationOptions = {
        path: '/assets/lottie/teacher-activate.json'
    };

    constructor() { }

    ngOnInit(): void {  }

    // This is the component function that binds to the animationCreated event from the package
    onAnimate(animationItem: AnimationItem): void {
        console.log(animationItem);
    }
}

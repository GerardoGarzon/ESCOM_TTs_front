import {Component} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

@Component({
    selector: 'app-not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent {
    options: AnimationOptions = {
        path: '/assets/lottie/error_404.json'
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

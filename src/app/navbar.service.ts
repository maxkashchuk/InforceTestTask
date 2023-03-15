import { Injectable } from "@angular/core";


@Injectable()
export class NavbarService {

    navBarVisible: boolean;

    public hrefLink: string = window.location.origin;

    constructor() { this.navBarVisible = true; }

    hide() { this.navBarVisible = false; }

    show() { this.navBarVisible = true; }

}
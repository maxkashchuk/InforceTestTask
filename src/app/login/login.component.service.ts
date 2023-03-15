import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserLogin } from '../models/user-login.model';
import { NavbarService } from '../navbar.service';
import { UserLogged } from '../models/user-logged.model';

@Injectable()

export class UserLoginService {
    
    private url_api: string = this.navbarService.hrefLink + "/api/user/login";

    constructor(private http: HttpClient, private router: Router, private navbarService: NavbarService) { }

    public loginUser = (model: UserLogin) => {
        const headers = { 'content-type': 'application/json'}  
        const body = JSON.stringify(model);
        this.http.post(this.url_api, body, {'headers':headers, observe: 'response'}).subscribe(data => 
            { 
                localStorage.setItem("User", JSON.stringify(data.body));
                localStorage.setItem("isLogged", JSON.stringify(true));
                window.location.href = '/';
            });
    }

    public isLogged = () => {
        return JSON.parse(localStorage.getItem("isLogged") || '{}');
    }

    public userGetRole()
    {
        let u: UserLogged = JSON.parse(localStorage.getItem("User") || '{}');
        return u.role;
    }

    public userGetLogin()
    {
        let u: UserLogged = JSON.parse(localStorage.getItem("User") || '{}');
        return u.login;
    }
}
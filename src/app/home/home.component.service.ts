import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarService } from '../navbar.service';
import { UrlAdd } from '../models/url-add.model';

@Injectable()

export class HomeService {
    
    private url_add: string = this.navbarService.hrefLink + "/api/url/urladd";

    private url_delete: string = this.navbarService.hrefLink + "/api/url/urldelete";

    private url_list_recieve: string = this.navbarService.hrefLink + "/api/url/urlget";

    private url_info: string = this.navbarService.hrefLink + "/api/url/urlgetinfo";

    constructor(private http: HttpClient, private navbarService: NavbarService) { }

    public urlAdd = (model: UrlAdd) => {
        const headers = { 'content-type': 'application/json'}  
        const body = JSON.stringify(model);
        return this.http.post(this.url_add, body, {'headers':headers, observe: 'response'});
    }

    public urlDelete = (model: string) => {
        const headers = { 'content-type': 'application/json'}  
        const body = JSON.stringify(model);
        return this.http.post(this.url_delete, body, {'headers':headers, observe: 'response'});
    }

    public urlGet = () => {
        const headers = { 'content-type': 'application/json'}; 
        return this.http.get(this.url_list_recieve, {'headers':headers, observe: 'response'});
    }

    public urlInfo = (model: string) => {
        const headers = { 'content-type': 'application/json'};
        const body = JSON.stringify(model);
        return this.http.post(this.url_info, body, {'headers':headers, observe: 'response'});
    }
}
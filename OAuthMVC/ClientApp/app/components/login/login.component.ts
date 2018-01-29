import { Component, Input, Inject, Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Router } from '@angular/router';


@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
@Injectable()
export class LoginComponent {
    @Input() userName: string;
    @Input() password: string;


    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        
    }

    oAuthLogin(providerName: string) {
        window.location.href = this.baseUrl + 'api/Login/OAuthLogin?providerName=' + providerName;
    }

    public logout() {
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = this.baseUrl + 'api/Login/Logout';
    }

}

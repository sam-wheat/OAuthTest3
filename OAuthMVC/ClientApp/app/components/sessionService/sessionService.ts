import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { Subject } from 'rxjs/Subject';
import { UserClaim } from '../model/model';

@Injectable()
export class SessionService {

    public IsAuthenticated: boolean;

    public authenticationAnnouncedSource = new Subject<boolean>();  // BehaviorSubject
    public autenticationAnnounced$ = this.authenticationAnnouncedSource.asObservable();


    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        this.IsAuthenticated = false;

    }

    AnnounceAuthentication(auth: boolean) {
        this.IsAuthenticated = auth;
        this.authenticationAnnouncedSource.next(auth);
    }

    CheckAuthentication() {
        this.GetAuthentication().subscribe(x => {
            this.AnnounceAuthentication(x);
        })
    }

    GetAuthentication(): Observable<boolean> {
        let url = this.baseUrl + 'api/Login/IsAuthenticated';
        return this.http.get(this.noCache(url))
            .map(response => this.extractData(response) as boolean)
            .catch(this.handleError);
    }

    GetUserClaims(): Observable<UserClaim[]> {
        let url = this.baseUrl + 'api/Login/GetUserClaims';
        return this.http.get(this.noCache(url))
            .map(response => this.extractData(response) as UserClaim[])
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || [];
    }

    private handleError(error: any) {
        let errorMsg = error.message || 'Server error';
        console.error(errorMsg);
        return Observable.throw(errorMsg);
    }

    private noCache(url: string): string {
        if (url === null || typeof (url) === 'undefined')
            return '';

        if (url.slice(-1) === '/')
            url = url.slice(0, -1);

        let connector = url.includes('?') ? '&' : '?';

        url = url + connector + 'noCache=' + (Math.random().toString().replace('.', ''));
        return url;
    }
}
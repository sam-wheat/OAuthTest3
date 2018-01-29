import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoginComponent } from '../login/login.component';
import { SessionService } from '../sessionService/sessionService';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnDestroy {
    IsAuthenticated: boolean;
    authSubscripton: Subscription;

    constructor(public login: LoginComponent, private sessionService: SessionService) {

        this.IsAuthenticated = false;
        this.authSubscripton = this.sessionService.authenticationAnnouncedSource.subscribe(x => {
            this.IsAuthenticated = x as boolean
        });
    }

    ngOnDestroy() {

        if (this.authSubscripton)
            this.authSubscripton.unsubscribe();
    }
}

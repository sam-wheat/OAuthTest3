import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { SessionService } from '../sessionService/sessionService';
import { Subscription } from 'rxjs/Subscription';
import { UserClaim } from '../model/model';

@Component({
    selector: 'securecontent',
    templateUrl: './securecontent.component.html'
})
export class SecureContentComponent implements OnInit, OnChanges, OnDestroy {
    authSubscription: Subscription;
    public IsAuthenticated: boolean;
    public UserClaims: UserClaim[];

    constructor(private sessionService: SessionService) {

        this.IsAuthenticated = false;
        this.authSubscription = this.sessionService.authenticationAnnouncedSource
            .subscribe(x => {
                this.IsAuthenticated = x as boolean;
                
                if (this.IsAuthenticated) {
                    this.sessionService.GetUserClaims().subscribe(y => {
                        this.UserClaims = y;
                    });
                }
            });

        this.sessionService.CheckAuthentication();
    }

    ngOnInit() {

    }
    

    ngOnChanges(changes: SimpleChanges) {
        
    }
    
    ngOnDestroy() {
        if (this.authSubscription)
            this.authSubscription.unsubscribe();
    }
}

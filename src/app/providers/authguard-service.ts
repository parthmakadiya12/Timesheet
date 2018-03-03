import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { fade } from '@clr/angular';
import { SessionManagerService } from './session-manager.service';

@Injectable()
export class AlwaysAuthGuard implements CanActivate {
    constructor(private router: Router, private session: SessionManagerService) { }
    private errorX = true;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.session.getLoggedInUser()) {
            return true;
        }
        this.router.navigate(['/landing', this.errorX]);
        return false;
    }
}
import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, CanDeactivate, Params, Router} from '@angular/router';
import {CanComponentDeactivate} from './can-deactivate-guard.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-edit-server',
    templateUrl: './edit-server.component.html',
    styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivate<CanComponentDeactivate> {
    server: { id: number, name: string, status: string };
    serverName = '';
    serverStatus = '';
    allowEdit = false;
    changesSaved = false;

    constructor(private serversService: ServersService, private  route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        console.log(this.route.snapshot.queryParams);  // if you know that no changes after component is loaded
        console.log(this.route.snapshot.fragment); // only when component is created!!
        this.route.queryParams.subscribe(   // alternative
            (params: Params) => {
                this.allowEdit = params['allowEdit'] === '1' ? true : false;
            }
        );
        this.route.fragment.subscribe((fragment: string) => {
            console.log(fragment);
        });
        const id = this.route.snapshot.params['id'];
        this.server = this.serversService.getServer(id); // we can also user subscribe
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
    }

    onUpdateServer() {
        this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
        this.changesSaved = true;
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
        return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
        return confirm('Do you want to cancel?');
    } else {
        return true;
    }
}

}

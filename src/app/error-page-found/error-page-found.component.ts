import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
    selector: 'app-error-page-found',
    templateUrl: './error-page-found.component.html',
    styleUrls: ['./error-page-found.component.css']
})
export class ErrorPageFoundComponent implements OnInit {

    errorMessage: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        // this.errorMessage = this.route.snapshot.data['message']; 1st variant
        this.route.data.subscribe(
            (data: Data) => {
                this.errorMessage = data['message'];
            }
        );
    }

}

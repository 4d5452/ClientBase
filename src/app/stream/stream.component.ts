import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { StreamService } from './stream.service';

@Component({
    selector: 'stream-status',
    template: `<stream-view
        [event]="event$ | async"
        [hasError]="error$ | async"
        [isOpen]="open$ | async"
        [message]="message$ | async"
        [date]="date$ | async"
        (open)="openStream($event)"
        (close)="closeStream($event)">
    </stream-view>`
})
export class StreamComponent {
    event$: Observable<string>;
    error$: Observable<boolean>;
    open$: Observable<boolean>;
    message$: Observable<string>;
    date$: Observable<number>;

    constructor(private streamService: StreamService) { 
        this.event$ = streamService.getEvent();
        this.error$ = streamService.hasError();
        this.open$ = streamService.isOpen();
        this.message$ = streamService.getMessage();
        this.date$ = streamService.getDate();
    }

    openStream(value: boolean): void {
        this.streamService.open("http://localhost:50001", "/stream");
    }

    closeStream(value: boolean): void {
        this.streamService.close();
    }
}
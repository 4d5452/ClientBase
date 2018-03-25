import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { ValueService } from './value.service';

@Component({
    selector: 'value',
    template: `<div>
            Value: {{value$ | async}}<br/>
            <input type="button" value="Increment" (click)="inc()"/>
            <input type="button" value="Decrement" (click)="dec()"/>
        </div>
    `
})
export class ValueComponent implements OnInit{
    value$: Observable<number>;

    constructor(private valueService: ValueService) {}

    ngOnInit() {
        this.value$ = this.valueService.getValue();
    }

    inc(): void {
        this.valueService.increment();
    }

    dec(): void {
        this.valueService.decrement();
    }
}
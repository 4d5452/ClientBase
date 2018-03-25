import { Component, 
    Input, 
    Output, 
    EventEmitter,
    ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'stream-view',
    template: `
        <div>
            <ul>
                <li>Event: {{event}}</li>
                <li>Error: {{hasError}}</li>
                <li>Open: {{isOpen}}</li>
                <li>Message: {{message}}</li>
                <li>Date: {{toDate(date)}}</li>
            </ul>
            <input type="button" (click)="openStream()" value="Open"/>
            <input type="button" (click)="closeStream()" value="Close"/>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StreamViewComponent {
    @Input() event: string;
    @Input() hasError: boolean;
    @Input() isOpen: boolean;
    @Input() message: string;
    @Input() date: number;

    @Output() open = new EventEmitter<boolean>();
    @Output() close = new EventEmitter<boolean>();

    openStream(): void {
        this.open.emit(true);
    }

    closeStream(): void {
        this.close.emit(true);
    }

    toDate(date: number): Date {
        return new Date(date);
    }
}
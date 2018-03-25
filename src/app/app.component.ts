import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { StreamService } from './stream/stream.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  appTitle: string = 'NW Mapping';
  streamOrigin: string = 'http://localhost:50001'
  streamUrl: string = '/stream';

  constructor(private titleService: Title,
    private streamService: StreamService) { }

  ngOnInit() {
    this.setTitle(this.appTitle);
    this.streamService.open(this.streamOrigin, this.streamUrl);
  }

  // helper function used to set application title
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}


import { Component } from '@angular/core';

import { ArchitectureInfo, Service } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
      types: string[] = ['spline', 'stackedspline', 'fullstackedspline'];
    architecturesInfo: ArchitectureInfo[];

    constructor(service: Service) {
        this.architecturesInfo = service.getArchitecturesInfo();
    }
}

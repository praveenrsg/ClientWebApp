import { Component, Input } from '@angular/core';
import { ObjectDetail } from '../treenode.interface';
import { PanelModule } from 'primeng/panel';
import { NgFor, NgIf,DatePipe } from '@angular/common';

@Component({
  selector: 'app-object-details',
  standalone: true,
  templateUrl: './object-details.component.html',
  imports: [PanelModule, NgIf, NgFor,DatePipe]

})
export class ObjectDetailsComponent {
  @Input() objectDetails: ObjectDetail[] = [];
}

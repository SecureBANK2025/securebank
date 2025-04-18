import { Component } from '@angular/core';
import { numPadComponent } from '../num-pad/num-pad.component';

@Component({
  selector: 'app-test',
  imports: [numPadComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

}

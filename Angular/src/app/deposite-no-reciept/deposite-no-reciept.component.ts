import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposite-no-reciept',
  imports: [],
  templateUrl: './deposite-no-reciept.component.html',
  styleUrl: './deposite-no-reciept.component.scss'
})
export class DepositeNoRecieptComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/another-operation']);
    }, 5000);
  }
}

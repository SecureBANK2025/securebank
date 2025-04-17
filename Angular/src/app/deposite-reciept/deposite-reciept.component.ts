import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposite-reciept',
  imports: [],
  templateUrl: './deposite-reciept.component.html',
  styleUrl: './deposite-reciept.component.scss'
})
export class DepositeRecieptComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/another-operation']);
    }, 5000);
  }
}

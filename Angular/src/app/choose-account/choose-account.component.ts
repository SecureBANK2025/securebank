import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { transactionsService } from '../services/transactions.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-choose-account',
  imports: [],
  templateUrl: './choose-account.component.html',
  styleUrl: './choose-account.component.scss'
})
export class ChooseAccountComponent {
    type: string = 'current';
    
  
    constructor(
      private router: Router,
      private _AuthService: AuthService,
      private _dataService: DataService
    ) {}
  
    ngOnInit(): void {
      
    }
  
    savings() {
      this.type= "savings";
      this.confirm();
    }
    
    current() {
      this.type= "current";
      this.confirm();
    }

    foreigncurrency(){
      this.type= "foreign_currency";
      this.confirm();
    }

    confirm() {
      this._AuthService.chooseAccount(this.type).subscribe({
        next: (res) => {
          this._dataService.setAccountID(res.message);
          this.router.navigate(['/mainOptions']);
        },
        error: (err) => {
            console.log(err);
          
        }
      })
      
    }
}

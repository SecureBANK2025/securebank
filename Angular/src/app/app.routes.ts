import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { Form1Component } from './signup/form1/form1.component';
import { Form2Component } from './signup/form2/form2.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { ScanFingerComponent } from './signup/scan-finger/scan-finger.component';
import { SigninComponent } from './signin/signin.component';
import { SigninFingerComponent } from './signin/signin-finger/signin-finger.component';
import { SigninFormComponent } from './signin/signin-form/signin-form.component';
import { MainOptionsComponent } from './main-options/main-options.component';
import { authGuard } from './gaurd/auth.guard';
import { ManualSigninComponent } from './manual-signin/manual-signin.component';
import { MoneyDepositComponent } from './money-deposit/money-deposit.component';
import { MoneyTransfer1Component } from './money-transfer1/money-transfer1.component';
import { MoneyTransfer2Component } from './money-transfer2/money-transfer2.component';
import { MoneyTransfer3Component } from './money-transfer3/money-transfer3.component';
import { MoneyWithdrawComponent } from './money-withdraw/money-withdraw.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';
import { MoreComponent } from './more/more.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';
import { AuthFailedComponent } from './auth-failed/auth-failed.component';
import { AuthSuccessComponent } from './auth-success/auth-success.component';
import { DepositeSureComponent } from './deposite-sure/deposite-sure.component';
import { DepositeCompletedComponent } from './deposite-completed/deposite-completed.component';
import { DepositeNoRecieptComponent } from './deposite-no-reciept/deposite-no-reciept.component';
import { DepositeRecieptComponent } from './deposite-reciept/deposite-reciept.component';
import { AnotherOperationComponent } from './another-operation/another-operation.component';
import { DepositeInsertComponent } from './deposite-insert/deposite-insert.component';


export const routes: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'mainOptions', canActivate: [authGuard], component: MainOptionsComponent },
    { path: 'manualSignin', component: ManualSigninComponent },
    { path: 'moneyDeposit', canActivate: [authGuard], component: MoneyDepositComponent },
    { path: 'moneyWithdraw', canActivate: [authGuard], component: MoneyWithdrawComponent },
    { path: 'moneyTransfer1', canActivate: [authGuard], component: MoneyTransfer1Component },
    { path: 'moneyTransfer2', component: MoneyTransfer2Component },
    { path: 'moneyTransfer3', component: MoneyTransfer3Component },
    { path: 'accountDetails', canActivate: [authGuard], component: AccountDetailsComponent },
    { path: 'transactionsHistory', canActivate: [authGuard], component: TransactionsHistoryComponent },
    { path: 'more', canActivate: [authGuard], component: MoreComponent },
    { path: 'signupSuccess', component: SignupSuccessComponent },
    { path: 'authFailed', component:AuthFailedComponent },
    { path: 'authSuccess', component:AuthSuccessComponent },
    { path: 'deposit-sure', component:DepositeSureComponent },
    { path: 'deposite-completed', component:DepositeCompletedComponent },
    { path: 'deposite-no-reciept', component:DepositeNoRecieptComponent },
    { path: 'deposite-reciept', component:DepositeRecieptComponent },
    { path: 'another-operation', component:AnotherOperationComponent },
    { path: 'deposite-insert', component:DepositeInsertComponent },

    {
        path: 'login', component: SigninComponent
        , children: [
            { path: 'loginFinger', component: SigninFingerComponent },
            { path: 'loginForm', component: SigninFormComponent }
        ]
    },

    {
        path: 'signup', component: SignupComponent, children: [
            { path: 'form1', component: Form1Component },
            { path: 'form2', component: Form2Component },
            { path: 'scanFinger', component: ScanFingerComponent }
        ]
    },
    { path: '**', component: NotFoundComponent }
];
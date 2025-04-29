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
import { WithdrawSureComponent } from './withdraw-sure/withdraw-sure.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { ViewAvailableComponent } from './view-available/view-available.component';
import {WithdrawCollectComponent} from './withdraw-collect/withdraw-collect.component';
import {WithdrawCompletedComponent} from './withdraw-completed/withdraw-completed.component';
import {BuyCertificateComponent} from './buy-certificate//buy-certificate.component';
import {BuyFingerComponent} from './buy-finger/buy-finger.component';
import { BuyDoneComponent } from './buy-done/buy-done.component';
import { MyCertificatesComponent } from './my-certificates/my-certificates.component';
import { RedeemFingerComponent } from './redeem-finger/redeem-finger.component';
import { RedeemDoneComponent } from './redeem-done/redeem-done.component';
import { CardServicesComponent } from './card-services/card-services.component';
import { ActivateComponent } from './activate/activate.component';
import { ActivateDoneComponent } from './activate-done/activate-done.component';
import { RequestComponent } from './request/request.component';
import { RequestDoneComponent } from './request-done/request-done.component';
import { RequestFingerComponent } from './request-finger/request-finger.component';
import { FreezeDoneComponent } from './freeze-done/freeze-done.component';
import { UnfreezeComponent } from './unfreeze/unfreeze.component';
import { FreezeComponent } from './freeze/freeze.component';




export const routes: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'mainOptions', canActivate: [authGuard], component: MainOptionsComponent },
    { path: 'manualSignin', component: ManualSigninComponent },
    { path: 'moneyDeposit', canActivate: [authGuard], component: MoneyDepositComponent },
    { path: 'moneyWithdraw', canActivate: [authGuard], component: MoneyWithdrawComponent },
    { path: 'moneyTransfer1', canActivate: [authGuard], component: MoneyTransfer1Component },
    { path: 'moneyTransfer2', canActivate: [authGuard], component: MoneyTransfer2Component },
    { path: 'moneyTransfer3', canActivate: [authGuard], component: MoneyTransfer3Component },
    { path: 'accountDetails', canActivate: [authGuard], component: AccountDetailsComponent },
    { path: 'transactionsHistory', canActivate: [authGuard], component: TransactionsHistoryComponent },
    { path: 'more', canActivate: [authGuard], component: MoreComponent },
    { path: 'signupSuccess', component: SignupSuccessComponent },
    { path: 'authFailed', component:AuthFailedComponent },
    { path: 'authSuccess', component:AuthSuccessComponent },
    { path: 'deposit-sure', canActivate: [authGuard], component:DepositeSureComponent },
    { path: 'deposite-completed', canActivate: [authGuard], component:DepositeCompletedComponent },
    { path: 'deposite-no-reciept', canActivate: [authGuard], component:DepositeNoRecieptComponent },
    { path: 'deposite-reciept', canActivate: [authGuard], component:DepositeRecieptComponent },
    { path: 'another-operation', canActivate: [authGuard], component:AnotherOperationComponent },
    { path: 'deposite-insert', canActivate: [authGuard], component:DepositeInsertComponent },
    { path: 'withdraw-sure', canActivate: [authGuard], component:WithdrawSureComponent },
    { path: 'certificates', canActivate: [authGuard], component:CertificatesComponent },
    { path: 'view-available', canActivate: [authGuard], component:ViewAvailableComponent },
    { path: 'withdraw-collect', canActivate: [authGuard], component:WithdrawCollectComponent },
    { path: 'withdraw-completed', canActivate: [authGuard], component:WithdrawCompletedComponent },
    { path: 'buy-certificate', canActivate: [authGuard], component:BuyCertificateComponent },
    { path: 'buy-finger', canActivate: [authGuard], component:BuyFingerComponent },
    { path: 'buy-done', canActivate: [authGuard], component:BuyDoneComponent },
    { path: 'my-certificates', canActivate: [authGuard], component:MyCertificatesComponent },
    { path: 'redeem-finger', canActivate: [authGuard], component:RedeemFingerComponent },
    { path: 'redeem-done', canActivate: [authGuard], component:RedeemDoneComponent },
    { path: 'card-services', canActivate: [authGuard], component:CardServicesComponent},
    { path: 'activate', canActivate: [authGuard], component:ActivateComponent},
    { path: 'activate-done', canActivate: [authGuard], component:ActivateDoneComponent},
    { path: 'request', canActivate: [authGuard], component:RequestComponent},
    { path: 'request-done', canActivate: [authGuard], component:RequestDoneComponent},
    { path: 'request-finger', canActivate: [authGuard], component:RequestFingerComponent},
    { path: 'freeze', canActivate: [authGuard], component:FreezeComponent},
    { path: 'ufreeze', canActivate: [authGuard], component:UnfreezeComponent},
    { path: 'freeze-done', canActivate: [authGuard], component:FreezeDoneComponent},






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
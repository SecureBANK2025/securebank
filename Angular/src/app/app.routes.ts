import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { Form1Component } from './signup/form1/form1.component';
import { Form2Component } from './signup/form2/form2.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { ScanFingerComponent } from './signup/scan-finger/scan-finger.component';
import { fingerComponent } from './scan-finger/scan-finger.component';
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
import { WithdrawCollectComponent } from './withdraw-collect/withdraw-collect.component';
import { WithdrawCompletedComponent } from './withdraw-completed/withdraw-completed.component';
import { BuyCertificateComponent } from './buy-certificate//buy-certificate.component';
import { BuyDoneComponent } from './buy-done/buy-done.component';
import { MyCertificatesComponent } from './my-certificates/my-certificates.component';
import { RedeemDoneComponent } from './redeem-done/redeem-done.component';
import { CardComponent } from './card-services/card-services.component';
import { ActivateComponent } from './activate/activate.component';
import { ActivateDoneComponent } from './activate-done/activate-done.component';
import { RequestComponent } from './request/request.component';
import { RequestDoneComponent } from './request-done/request-done.component';
import { FreezeDoneComponent } from './freeze-done/freeze-done.component';
import { UnfreezeComponent } from './unfreeze/unfreeze.component';
import { FreezeComponent } from './freeze/freeze.component';
import { ChooseAccountComponent } from './choose-account/choose-account.component';
import { UnfreezeDoneComponent } from './unfreeze-done/unfreeze-done.component';
import { NewAccountComponent } from './new-account/new-account.component';

export const routes: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent, data: { animation: 'Welcome' } },
    { path: 'home', component: HomeComponent, data: { animation: 'Home' } },
    { path: 'mainOptions', canActivate: [authGuard], component: MainOptionsComponent, data: { animation: 'MainOptions' } },
    { path: 'manualSignin', component: ManualSigninComponent, data: { animation: 'ManualSignin' } },
    { path: 'moneyDeposit', canActivate: [authGuard], component: MoneyDepositComponent, data: { animation: 'MoneyDeposit' } },
    { path: 'moneyWithdraw', canActivate: [authGuard], component: MoneyWithdrawComponent, data: { animation: 'MoneyWithdraw' } },
    { path: 'moneyTransfer1', canActivate: [authGuard], component: MoneyTransfer1Component, data: { animation: 'MoneyTransfer1' } },
    { path: 'moneyTransfer2', canActivate: [authGuard], component: MoneyTransfer2Component, data: { animation: 'MoneyTransfer2' } },
    { path: 'moneyTransfer3', canActivate: [authGuard], component: MoneyTransfer3Component, data: { animation: 'MoneyTransfer3' } },
    { path: 'accountDetails', canActivate: [authGuard], component: AccountDetailsComponent, data: { animation: 'AccountDetails' } },
    { path: 'transactionsHistory', canActivate: [authGuard], component: TransactionsHistoryComponent, data: { animation: 'TransactionsHistory' } },
    { path: 'more', canActivate: [authGuard], component: MoreComponent, data: { animation: 'More' } },
    { path: 'signupSuccess', component: SignupSuccessComponent, data: { animation: 'SignupSuccess' } },
    { path: 'authFailed', component: AuthFailedComponent, data: { animation: 'AuthFailed' } },
    { path: 'authSuccess', component: AuthSuccessComponent, data: { animation: 'AuthSuccess' } },
    { path: 'deposit-sure', canActivate: [authGuard], component: DepositeSureComponent, data: { animation: 'DepositSure' } },
    { path: 'deposite-completed', canActivate: [authGuard], component: DepositeCompletedComponent, data: { animation: 'DepositeCompleted' } },
    { path: 'deposite-no-reciept', canActivate: [authGuard], component: DepositeNoRecieptComponent, data: { animation: 'DepositeNoReciept' } },
    { path: 'deposite-reciept', canActivate: [authGuard], component: DepositeRecieptComponent, data: { animation: 'DepositeReciept' } },
    { path: 'another-operation', canActivate: [authGuard], component: AnotherOperationComponent, data: { animation: 'AnotherOperation' } },
    { path: 'deposite-insert', canActivate: [authGuard], component: DepositeInsertComponent, data: { animation: 'DepositeInsert' } },
    { path: 'withdraw-sure', canActivate: [authGuard], component: WithdrawSureComponent, data: { animation: 'WithdrawSure' } },
    { path: 'certificates', canActivate: [authGuard], component: CertificatesComponent, data: { animation: 'Certificates' } },
    { path: 'view-available', canActivate: [authGuard], component: ViewAvailableComponent, data: { animation: 'ViewAvailable' } },
    { path: 'withdraw-collect', canActivate: [authGuard], component: WithdrawCollectComponent, data: { animation: 'WithdrawCollect' } },
    { path: 'withdraw-completed', canActivate: [authGuard], component: WithdrawCompletedComponent, data: { animation: 'WithdrawCompleted' } },
    { path: 'buy-certificate', canActivate: [authGuard], component: BuyCertificateComponent, data: { animation: 'BuyCertificate' } },
    { path: 'buy-done', canActivate: [authGuard], component: BuyDoneComponent, data: { animation: 'BuyDone' } },
    { path: 'my-certificates', canActivate: [authGuard], component: MyCertificatesComponent, data: { animation: 'MyCertificates' } },
    { path: 'redeem-done', canActivate: [authGuard], component: RedeemDoneComponent, data: { animation: 'RedeemDone' } },
    { path: 'card-services', canActivate: [authGuard], component: CardComponent, data: { animation: 'CardServices' } },
    { path: 'activate', canActivate: [authGuard], component: ActivateComponent, data: { animation: 'Activate' } },
    { path: 'activate-done', canActivate: [authGuard], component: ActivateDoneComponent, data: { animation: 'ActivateDone' } },
    { path: 'request-card', canActivate: [authGuard], component: RequestComponent, data: { animation: 'RequestCard' } },
    { path: 'request-done', canActivate: [authGuard], component: RequestDoneComponent, data: { animation: 'RequestDone' } },
    { path: 'freeze', canActivate: [authGuard], component: FreezeComponent, data: { animation: 'Freeze' } },
    { path: 'unfreeze', canActivate: [authGuard], component: UnfreezeComponent, data: { animation: 'Unfreeze' } },
    { path: 'freeze-done', canActivate: [authGuard], component: FreezeDoneComponent, data: { animation: 'FreezeDone' } },
    { path: 'chooseAccount', canActivate: [authGuard], component: ChooseAccountComponent, data: { animation: 'ChooseAccount' } },
    { path: 'finger', component: fingerComponent, data: { animation: 'Finger' } },
    { path: 'unfreeze-done', component: UnfreezeDoneComponent, data: { animation: 'UnfreezeDone' } },
    { path: 'newAccount', canActivate: [authGuard], component: NewAccountComponent, data: { animation: 'NewAccount' } },

    {
        path: 'login',
        component: SigninComponent,
        data: { animation: 'Login' },
        children: [
            { path: 'loginFinger', component: SigninFingerComponent, data: { animation: 'LoginFinger' } },
            { path: 'loginForm', component: SigninFormComponent, data: { animation: 'LoginForm' } }
        ]
    },

    {
        path: 'signup',
        component: SignupComponent,
        data: { animation: 'Signup' },
        children: [
            { path: 'form1', component: Form1Component, data: { animation: 'Form1' } },
            { path: 'form2', component: Form2Component, data: { animation: 'Form2' } },
            { path: 'scanFinger', component: ScanFingerComponent, data: { animation: 'ScanFinger' } }
        ]
    },

    { path: '**', component: NotFoundComponent, data: { animation: 'NotFound' } }
];

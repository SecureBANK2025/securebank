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

export const routes: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'mainOptions', canActivate: [authGuard], component: MainOptionsComponent },
    { path: 'manualSignin', component: ManualSigninComponent },
    // { path: 'login/loginForm', component: SigninComponent },
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
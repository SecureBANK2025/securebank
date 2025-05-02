import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { trigger, transition, style, animate, query, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        group([
          query(':leave', [
            animate('0.4s ease-in-out', style({ opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            style({ opacity: 0 }),
            animate('0.4s 0.4s ease-in-out', style({ opacity: 1 })) // delay 0.15s
          ], { optional: true })
        ])
      ])
    ])    
  ]
})
export class AppComponent {
  title = 'BTBank';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}

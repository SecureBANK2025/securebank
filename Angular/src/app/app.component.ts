import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { KeyboardComponent } from "./keyboard/keyboard.component";
import { SendButtonComponent } from "./components/send-button/send-button.component";
import { ChatbotService } from "./services/chatbot.service";
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, KeyboardComponent, SendButtonComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: -2 }),
        animate('0.4s ease-in-out', style({ opacity: 1 }))
      ])
    ])
    
  ]
})
export class AppComponent {
  title = 'BTBank';

  constructor(public chatbotService: ChatbotService) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  // Debug method to analyze event logs
  analyzeEvents(): void {
    const events = this.chatbotService.getEventLog();
    console.log('=== Event Analysis ===');
    console.log('Total events captured:', events.length);
    
    // Group events by type
    const eventTypes = events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {} as any);
    
    console.log('Events by type:', eventTypes);
    
    // Show last 10 events
    console.log('Last 10 events:', events.slice(-10));
    
    // Look for specific patterns
    const inputEvents = events.filter(e => e.type === 'input');
    const changeEvents = events.filter(e => e.type === 'change');
    const keyEvents = events.filter(e => e.type === 'keydown' || e.type === 'keyup');
    
    console.log('Input events:', inputEvents.length);
    console.log('Change events:', changeEvents.length);
    console.log('Key events:', keyEvents.length);
    
    console.log('=== End Analysis ===');
  }

  // Debug method to clear event logs
  clearEvents(): void {
    this.chatbotService.clearEventLog();
    console.log('Event log cleared');
  }

  // Debug method to test virtual keyboard
  testVirtualKeyboard(): void {
    console.log('Testing virtual keyboard...');
    this.chatbotService.insertTextIntoChatbot('test');
  }
}

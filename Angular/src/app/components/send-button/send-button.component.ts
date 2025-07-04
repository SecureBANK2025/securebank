import { Component } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
    selector: 'app-send-button',
    standalone: true,
    template: `
    <button 
      (click)="sendMessage()" 
      class="send-button"
      [disabled]="isLoading">
      {{ isLoading ? '↑' : '↑' }}
    </button>
  `,
    styles: [`
    .send-button {
      background-color: #1c1d71;
    //   background-color: red;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
      font-weight: 900;
    //   margin: 10px;
    position: fixed;
    bottom: 40px;
    right: 35px;
    
    }
    
    .send-button:hover:not(:disabled) {
      background-color: #0056b3;
    }
    
    .send-button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
  `]
})
export class SendButtonComponent {
    isLoading = false;

    constructor(private chatbotService: ChatbotService) { }

    async sendMessage(): Promise<void> {
        this.isLoading = true;

        try {
            // Get the current text from the chatbot input
            const iframe = this.chatbotService.getChatbotIframe();
            if (iframe && iframe.contentDocument) {
                const inputElement = iframe.contentDocument.querySelector('textarea, input[type="text"]') as HTMLInputElement | HTMLTextAreaElement;

                if (inputElement && inputElement.value.trim()) {
                    const message = inputElement.value.trim();
                    await this.chatbotService.sendMessageDirectly(message);

                    // Clear the input after sending
                    inputElement.value = '';

                    // Trigger input event to update Botpress state
                    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
                    inputElement.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        } catch (error) {
            // Silent error handling
        } finally {
            this.isLoading = false;
        }
    }
} 
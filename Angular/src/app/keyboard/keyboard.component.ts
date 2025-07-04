import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ChatbotService } from '../services/chatbot.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-keyboard',
  imports: [],
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements AfterViewInit, OnDestroy {
  // Define the keyboard layouts for English and Arabic
  englishLayout = {
    row2: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    row3: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    row4: ['z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
    row5: ['⇧', 'AR.', 'SPACE', '.', '@']
  };

  arabicLayout = {
    row2: ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح'],
    row3: ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م'],
    row4: ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', '⌫'],
    row5: ['⇧', 'EN.', 'SPACE', '.', '@']
  };

  // Set initial language and shift state
  currentLanguage: 'en' | 'ar' = 'en';
  shiftActive = false;

  // Track the last focused input or textarea element
  lastFocusedElement: HTMLInputElement | HTMLTextAreaElement | null = null;
  
  // Subscription for chatbot state
  private chatSubscription: Subscription;

  constructor(private chatbotService: ChatbotService) {
    // Subscribe to chatbot state changes
    this.chatSubscription = this.chatbotService.isChatOpen$.subscribe(isOpen => {
      if (isOpen) {
        // When chat opens, focus on the chatbot input
        setTimeout(() => {
          this.focusChatbotInput();
        }, 200);
      }
    });
  }

  ngAfterViewInit(): void {
    // Initialize the keyboard layout after view loads
    this.updateLayout();

    // Listen for focus events on the whole document
    // to store the last focused input or textarea
    document.addEventListener('focusin', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        this.lastFocusedElement = target as HTMLInputElement | HTMLTextAreaElement;
      }
    });

    // Add click listener to the entire keyboard to focus chatbot input
    const keyboardElement = document.querySelector('.keyboard-container');
    if (keyboardElement) {
      keyboardElement.addEventListener('click', () => {
        // When keyboard is clicked, try to focus on chatbot input
        setTimeout(() => {
          this.focusChatbotInput();
        }, 100);
      });
    }

    // Event listener for language toggle button
    const toggleLangButton = document.querySelector('.toggle-lang');
    if (toggleLangButton) {
      toggleLangButton.addEventListener('click', () => {
        this.toggleLanguage();
      });
    }

    // Event listener for shift button
    const shiftButton = document.querySelector('.shift');
    if (shiftButton) {
      shiftButton.addEventListener('click', () => {
        this.toggleShift();
      });
    }

    // Space key swipe detection
    const spaceKey = document.querySelector('.space') as HTMLElement;
    let startX = 0;
    let endX = 0;
    if (spaceKey) {
      spaceKey.addEventListener('touchstart', (e: Event) => {
        const touchEvent = e as TouchEvent;
        startX = touchEvent.touches[0].clientX;
      });
      spaceKey.addEventListener('touchend', (e: Event) => {
        const touchEvent = e as TouchEvent;
        endX = touchEvent.changedTouches[0].clientX;
        if (Math.abs(endX - startX) > 50) {
          this.toggleLanguage();
        }
      });
    }

    // Add click event listeners to all key buttons
    const keys = document.querySelectorAll('.keyboard .key');
    keys.forEach(key => {
      key.addEventListener('click', (e: Event) => {
        // Prevent event bubbling to avoid double-focusing
        e.stopPropagation();
        
        const target = e.currentTarget as HTMLElement;
        const keyText = target.textContent?.trim();

        // Ignore control keys (shift, language toggles, etc.)
        if (!keyText || keyText === '⇧' || keyText === 'AR.' || keyText === 'EN.') {
          return;
        }

        // Handle special keys
        if (keyText === 'SPACE') {
          this.insertText(' ');
        } else if (keyText === '⌫') {
          this.handleBackspace();
        } else {
          this.insertText(keyText);
        }
      });
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
  }

  // Focus on the chatbot input field with multiple selectors
  private focusChatbotInput(): void {
    // Try multiple selectors to find the chatbot input
    const selectors = [
      '.bpWebchat input[type="text"]',
      '.bpWebchat textarea',
      '.bpWebchat input[placeholder*="message"]',
      '.bpWebchat input[placeholder*="Message"]',
      '.bpWebchat input[placeholder*="Type"]',
      '.bpWebchat input[placeholder*="type"]',
      '.bpWebchat .bpWebchatInput',
      '.bpWebchat input',
      '.bpWebchat textarea',
      '[data-testid="input"]',
      '[data-testid="textarea"]'
    ];

    let chatbotInput: HTMLInputElement | HTMLTextAreaElement | null = null;

    for (const selector of selectors) {
      chatbotInput = document.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement;
      if (chatbotInput) {
        break;
      }
    }

    if (chatbotInput) {
      chatbotInput.focus();
      this.lastFocusedElement = chatbotInput;
    }
  }

  // Get the current active input field
  private getCurrentInput(): HTMLInputElement | HTMLTextAreaElement | null {
    // First try to get the chatbot input if chat is open
    if (this.chatbotService.getChatOpen()) {
      const chatbotInput = this.findChatbotInput();
      if (chatbotInput) {
        return chatbotInput;
      }
    }

    // Fallback to last focused element or currently active element
    return this.lastFocusedElement || 
           (document.activeElement as HTMLInputElement | HTMLTextAreaElement | null);
  }

  // Find chatbot input with multiple selectors
  private findChatbotInput(): HTMLInputElement | HTMLTextAreaElement | null {
    const selectors = [
      '.bpWebchat input[type="text"]',
      '.bpWebchat textarea',
      '.bpWebchat input[placeholder*="message"]',
      '.bpWebchat input[placeholder*="Message"]',
      '.bpWebchat input[placeholder*="Type"]',
      '.bpWebchat input[placeholder*="type"]',
      '.bpWebchat .bpWebchatInput',
      '.bpWebchat input',
      '.bpWebchat textarea',
      '[data-testid="input"]',
      '[data-testid="textarea"]'
    ];

    for (const selector of selectors) {
      const input = document.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement;
      if (input) {
        return input;
      }
    }

    return null;
  }

  // Update the keyboard layout based on the current language and shift state
  updateLayout(): void {
    const row2Keys = document.querySelectorAll('.keyboard > .row:nth-child(2) .key');
    const row3Keys = document.querySelectorAll('.keyboard > .row:nth-child(3) .key');
    const row4Keys = document.querySelectorAll('.keyboard > .row:nth-child(4) .key');
    const row5Keys = document.querySelectorAll('.keyboard > .row:nth-child(5) .key');

    let layout: any;
    if (this.currentLanguage === 'en') {
      layout = this.englishLayout;
      row2Keys.forEach((key, i) => {
        key.textContent = this.shiftActive
          ? layout.row2[i].toUpperCase()
          : layout.row2[i].toLowerCase();
      });
      row3Keys.forEach((key, i) => {
        key.textContent = this.shiftActive
          ? layout.row3[i].toUpperCase()
          : layout.row3[i].toLowerCase();
      });
      row4Keys.forEach((key, i) => {
        if (layout.row4[i] !== '⌫') {
          key.textContent = this.shiftActive
            ? layout.row4[i].toUpperCase()
            : layout.row4[i].toLowerCase();
        }
      });
      row5Keys.forEach((key, i) => {
        key.textContent = layout.row5[i];
      });
    } else {
      layout = this.arabicLayout;
      row2Keys.forEach((key, i) => {
        key.textContent = layout.row2[i];
      });
      row3Keys.forEach((key, i) => {
        key.textContent = layout.row3[i];
      });
      row4Keys.forEach((key, i) => {
        key.textContent = layout.row4[i];
      });
      row5Keys.forEach((key, i) => {
        key.textContent = layout.row5[i];
      });
    }
  }

  // Toggle between English and Arabic layouts
  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
    if (this.currentLanguage !== 'en') {
      this.shiftActive = false;
      const shiftButton = document.querySelector('.shift');
      if (shiftButton) {
        shiftButton.classList.remove('active');
      }
    }
    this.updateLayout();
  }

  // Toggle the shift state (only works for English)
  toggleShift(): void {
    if (this.currentLanguage === 'en') {
      this.shiftActive = !this.shiftActive;
      const shiftButton = document.querySelector('.shift');
      if (shiftButton) {
        shiftButton.classList.toggle('active', this.shiftActive);
      }
      this.updateLayout();
    }
  }

  // Inserts the provided text into the current input field
  insertText(text: string): void {
    // If chatbot is open, use the chatbot service to insert text
    if (this.chatbotService.getChatOpen()) {
      this.chatbotService.insertTextIntoChatbot(text);
      return;
    }
    
    // Fallback to regular input handling for non-chatbot inputs
    const targetElement = this.getCurrentInput();
    
    if (targetElement && (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      // Insert text at cursor position or append to end
      const start = targetElement.selectionStart || 0;
      const end = targetElement.selectionEnd || 0;
      const currentValue = targetElement.value;
      
      const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);
      targetElement.value = newValue;
      
      // Set cursor position after inserted text
      const newCursorPos = start + text.length;
      targetElement.setSelectionRange(newCursorPos, newCursorPos);
      
      // Focus the element
      targetElement.focus();
      
      // Dispatch events
      targetElement.dispatchEvent(new Event('input', { bubbles: true }));
      targetElement.dispatchEvent(new Event('change', { bubbles: true }));
      targetElement.dispatchEvent(new Event('keyup', { bubbles: true }));
    }
  }

  // Remove the last character from the target input or textarea
  handleBackspace(): void {
    // If chatbot is open, handle backspace in the chatbot
    if (this.chatbotService.getChatOpen()) {
      this.chatbotService.handleChatbotBackspace();
      return;
    }
    
    // Fallback to regular backspace handling for non-chatbot inputs
    const targetElement = this.getCurrentInput();
    
    if (targetElement && (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      const currentValue = targetElement.value;
      if (currentValue.length > 0) {
        const newValue = currentValue.slice(0, -1);
        targetElement.value = newValue;
        
        // Focus the element
        targetElement.focus();
        
        // Dispatch events
        targetElement.dispatchEvent(new Event('input', { bubbles: true }));
        targetElement.dispatchEvent(new Event('change', { bubbles: true }));
        targetElement.dispatchEvent(new Event('keyup', { bubbles: true }));
      }
    }
  }
}
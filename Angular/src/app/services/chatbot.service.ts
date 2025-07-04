import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private isChatOpenSubject = new BehaviorSubject<boolean>(false);
  public isChatOpen$ = this.isChatOpenSubject.asObservable();

  constructor() {
    // Listen for Botpress events
    this.initializeBotpressListeners();
  }

  private initializeBotpressListeners(): void {
    // Listen for custom events dispatched from index.html
    window.addEventListener('botpress:opened', () => {
      this.setChatOpen(true);
      // Start monitoring events when chat opens
      this.startEventMonitoring();
    });

    window.addEventListener('botpress:closed', () => {
      this.setChatOpen(false);
      // Stop monitoring events when chat closes
      this.stopEventMonitoring();
    });

    // Also try to listen for Botpress events directly
    if (typeof window !== 'undefined' && (window as any).botpress) {
      this.setupBotpressEvents();
    } else {
      // If Botpress isn't loaded yet, wait for it
      const checkBotpress = setInterval(() => {
        if ((window as any).botpress) {
          this.setupBotpressEvents();
          clearInterval(checkBotpress);
        }
      }, 100);
    }
  }

  private setupBotpressEvents(): void {
    const botpress = (window as any).botpress;
    
    // Listen for webchat open event
    botpress.on('webchat:opened', () => {
      this.setChatOpen(true);
      this.startEventMonitoring();
    });

    // Listen for webchat close event
    botpress.on('webchat:closed', () => {
      this.setChatOpen(false);
      this.stopEventMonitoring();
    });

    // Listen for webchat ready event
    botpress.on('webchat:ready', () => {
      // Chat is ready but not necessarily open
    });
  }

  public setChatOpen(isOpen: boolean): void {
    this.isChatOpenSubject.next(isOpen);
  }

  public getChatOpen(): boolean {
    return this.isChatOpenSubject.value;
  }

  // Get the chatbot iframe
  public getChatbotIframe(): HTMLIFrameElement | null {
    return document.querySelector('.bpWebchat') as HTMLIFrameElement;
  }

  // Helper method to get the iframe document
  private getIframeDocument(): Document | null {
    const iframe = this.getChatbotIframe();
    return iframe?.contentDocument || iframe?.contentWindow?.document || null;
  }

  // Helper method to get the iframe window
  private getIframeWindow(): Window | null {
    const iframe = this.getChatbotIframe();
    return iframe?.contentWindow || null;
  }

  // Event monitoring for debugging
  private eventLog: any[] = [];
  private isMonitoring = false;

  private startEventMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.eventLog = [];
    
    const iframeDoc = this.getIframeDocument();
    if (!iframeDoc) return;

    // Monitor all input-related events
    const eventsToMonitor = ['input', 'change', 'keydown', 'keyup', 'keypress', 'focus', 'blur', 'compositionstart', 'compositionend'];
    
    eventsToMonitor.forEach(eventType => {
      iframeDoc.addEventListener(eventType, (event) => {
        this.eventLog.push({
          type: eventType,
          target: event.target,
          currentTarget: event.currentTarget,
          bubbles: event.bubbles,
          cancelable: event.cancelable,
          timeStamp: event.timeStamp,
          // Additional properties for different event types
          ...(event instanceof KeyboardEvent && {
            key: event.key,
            code: event.code,
            keyCode: event.keyCode,
            which: event.which,
            isComposing: event.isComposing
          }),
          ...(event instanceof InputEvent && {
            data: event.data,
            inputType: event.inputType,
            isComposing: event.isComposing
          }),
          ...(event instanceof CompositionEvent && {
            data: event.data
          })
        });
        
        // Keep only last 50 events
        if (this.eventLog.length > 50) {
          this.eventLog = this.eventLog.slice(-50);
        }
      }, true); // Use capture phase
    });
  }

  private stopEventMonitoring(): void {
    this.isMonitoring = false;
  }

  // Method to get the event log for debugging
  public getEventLog(): any[] {
    return [...this.eventLog];
  }

  // Method to clear the event log
  public clearEventLog(): void {
    this.eventLog = [];
  }

  // Method to focus on chatbot input when keyboard is used
  public focusChatbotInput(): void {
    // Find the chatbot input field and focus it
    setTimeout(() => {
      const iframeDoc = this.getIframeDocument();
      if (!iframeDoc) {
        return;
      }

      const selectors = [
        'input[type="text"]',
        'textarea',
        'input[placeholder*="message"]',
        'input[placeholder*="Message"]',
        'input[placeholder*="Type"]',
        'input[placeholder*="type"]',
        '.bpWebchatInput',
        'input',
        'textarea',
        '[data-testid="input"]',
        '[data-testid="textarea"]',
        '[contenteditable="true"]'
      ];

      let chatbotInput: HTMLInputElement | HTMLTextAreaElement | HTMLElement | null = null;

      for (const selector of selectors) {
        chatbotInput = iframeDoc.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement | HTMLElement;
        if (chatbotInput) {
          break;
        }
      }

      if (chatbotInput) {
        chatbotInput.focus();
      }
    }, 100);
  }

  // Method to insert text into the chatbot input
  public async insertTextIntoChatbot(text: string): Promise<void> {
    const iframeDoc = this.getIframeDocument();
    if (!iframeDoc) {
      return;
    }

    const selectors = [
      'input[type="text"]',
      'textarea',
      'input[placeholder*="message"]',
      'input[placeholder*="Message"]',
      'input[placeholder*="Type"]',
      'input[placeholder*="type"]',
      '.bpWebchatInput',
      'input',
      'textarea',
      '[data-testid="input"]',
      '[data-testid="textarea"]',
      '[contenteditable="true"]'
    ];

    let chatbotInput: HTMLInputElement | HTMLTextAreaElement | HTMLElement | null = null;

    for (const selector of selectors) {
      chatbotInput = iframeDoc.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement | HTMLElement;
      if (chatbotInput) {
        break;
      }
    }

    if (chatbotInput) {
      // Focus the input first
      chatbotInput.focus();

      if (chatbotInput.getAttribute('contenteditable') === 'true') {
        // Handle contenteditable elements
        const selection = iframeDoc.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          range.insertNode(iframeDoc.createTextNode(text));
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        } else {
          // Fallback: append text
          chatbotInput.textContent = (chatbotInput.textContent || '') + text;
        }
        
        // Try direct approach for contenteditable
        await this.triggerNativeEvents(chatbotInput, iframeDoc, text);
      } else {
        // Handle regular input/textarea elements
        const inputElement = chatbotInput as HTMLInputElement | HTMLTextAreaElement;
        const start = inputElement.selectionStart || 0;
        const end = inputElement.selectionEnd || 0;
        const currentValue = inputElement.value;
        
        // FIX: Don't add text if it's already there (prevents duplication)
        const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);
        inputElement.value = newValue;
        
        // Set cursor position after inserted text
        const newCursorPos = start + text.length;
        inputElement.setSelectionRange(newCursorPos, newCursorPos);
        
        // Try direct approach for regular inputs
        await this.triggerNativeEvents(inputElement, iframeDoc, text);
      }
    }
  }

  // Method to trigger native events on the chatbot input
  private async triggerNativeEvents(element: HTMLElement | HTMLInputElement | HTMLTextAreaElement, doc: Document, value: string): Promise<void> {
    // Method 1: Dispatch keydown event
    const keydownEvent = new KeyboardEvent('keydown', {
      key: value,
      code: `Key${value.toUpperCase()}`,
      keyCode: value.charCodeAt(0),
      which: value.charCodeAt(0),
      bubbles: true,
      cancelable: true
    });
    element.dispatchEvent(keydownEvent);

    // Method 2: Dispatch keypress event
    const keypressEvent = new KeyboardEvent('keypress', {
      key: value,
      code: `Key${value.toUpperCase()}`,
      keyCode: value.charCodeAt(0),
      which: value.charCodeAt(0),
      bubbles: true,
      cancelable: true
    });
    element.dispatchEvent(keypressEvent);

    // Method 3: Dispatch input event
    const inputEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: true,
      data: value,
      inputType: 'insertText'
    });
    element.dispatchEvent(inputEvent);

    // Method 4: Dispatch keyup event
    const keyupEvent = new KeyboardEvent('keyup', {
      key: value,
      code: `Key${value.toUpperCase()}`,
      keyCode: value.charCodeAt(0),
      which: value.charCodeAt(0),
      bubbles: true,
      cancelable: true
    });
    element.dispatchEvent(keyupEvent);

    // Method 5: Dispatch change event
    setTimeout(() => {
      const changeEvent = new Event('change', { bubbles: true, cancelable: true });
      element.dispatchEvent(changeEvent);
    }, 20);
    
    // Try Botpress internal triggers
    await this.tryBotpressInternalTriggers(element, doc, value);
  }

  // Try to find and trigger Botpress's internal input detection mechanisms
  private async tryBotpressInternalTriggers(element: HTMLElement | HTMLInputElement | HTMLTextAreaElement, doc: Document, value: string): Promise<void> {
    // Check for Botpress-specific selectors
    const bpSelectors = [
      '.bpComposerInput',
      '.bpComposer',
      '.bpInput',
      '[data-bp-input]',
      '[data-testid="composer-input"]',
      '.bp-webchat-input'
    ];
    
    // Check for React/Angular components
    const reactElements = doc.querySelectorAll('[data-reactroot], [data-reactid]');
    const angularElements = doc.querySelectorAll('[ng-version], [ng-model]');
    
    // Try to access Botpress global object
    try {
      const botpressGlobal = (window as any).botpress;
      if (botpressGlobal) {
        // Try to call Botpress methods if they exist
        if (typeof botpressGlobal.onInputChange === 'function') {
          await botpressGlobal.onInputChange(value);
        }
        
        if (typeof botpressGlobal.updateInput === 'function') {
          await botpressGlobal.updateInput(value);
        }
        
        if (typeof botpressGlobal.setValue === 'function') {
          await botpressGlobal.setValue(value);
        }
        
        if (typeof botpressGlobal.triggerInput === 'function') {
          await botpressGlobal.triggerInput(value);
        }
        
        // Try sending an event to Botpress
        if (typeof botpressGlobal.sendEvent === 'function') {
          try {
            await botpressGlobal.sendEvent({
              type: 'text',
              payload: { text: value }
            });
          } catch (error) {
            // Silent error handling
          }
        }
        
        // Try to emit a custom event that Botpress might be listening for
        if (typeof botpressGlobal._emit === 'function') {
          try {
            botpressGlobal._emit('input:changed', { text: value });
            botpressGlobal._emit('composer:input', { text: value });
            botpressGlobal._emit('webchat:input', { text: value });
          } catch (error) {
            // Silent error handling
          }
        }
        
        // Check if there's a webchat instance
        if (botpressGlobal.webchat) {
          if (typeof botpressGlobal.webchat.onInputChange === 'function') {
            await botpressGlobal.webchat.onInputChange(value);
          }
        }
        
        // Check if there's a composer instance
        if (botpressGlobal.composer) {
          if (typeof botpressGlobal.composer.setValue === 'function') {
            await botpressGlobal.composer.setValue(value);
          }
        }
      }
    } catch (error) {
      // Silent error handling
    }
    
    // Try to access Botpress from iframe window
    try {
      const iframeWindow = this.getIframeWindow();
      if (iframeWindow) {
        const iframeBotpress = (iframeWindow as any).botpress;
        if (iframeBotpress) {
          // Try the same method calls in iframe context
          if (typeof iframeBotpress.onInputChange === 'function') {
            await iframeBotpress.onInputChange(value);
          }
        }
      }
    } catch (error) {
      // Silent error handling
    }
  }

  // Method to handle backspace in the chatbot input
  public handleChatbotBackspace(): void {
    const iframeDoc = this.getIframeDocument();
    if (!iframeDoc) {
      return;
    }

    const selectors = [
      'input[type="text"]',
      'textarea',
      'input[placeholder*="message"]',
      'input[placeholder*="Message"]',
      'input[placeholder*="Type"]',
      'input[placeholder*="type"]',
      '.bpWebchatInput',
      'input',
      'textarea',
      '[data-testid="input"]',
      '[data-testid="textarea"]',
      '[contenteditable="true"]'
    ];

    let chatbotInput: HTMLInputElement | HTMLTextAreaElement | HTMLElement | null = null;

    for (const selector of selectors) {
      chatbotInput = iframeDoc.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement | HTMLElement;
      if (chatbotInput) {
        break;
      }
    }

    if (chatbotInput) {
      // Focus the input first
      chatbotInput.focus();

      if (chatbotInput.getAttribute('contenteditable') === 'true') {
        // Handle contenteditable elements
        const selection = iframeDoc.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          if (range.collapsed) {
            // If cursor is collapsed, move it back one character
            range.setStart(range.startContainer, Math.max(0, range.startOffset - 1));
          }
          range.deleteContents();
          selection.removeAllRanges();
          selection.addRange(range);
        } else {
          // Fallback: remove last character
          const text = chatbotInput.textContent || '';
          if (text.length > 0) {
            chatbotInput.textContent = text.slice(0, -1);
          }
        }
        
        // Use enhanced keyboard simulation
        this.simulateRealKeyboardTyping(chatbotInput, iframeDoc, '');
      } else {
        // Handle regular input/textarea elements
        const inputElement = chatbotInput as HTMLInputElement | HTMLTextAreaElement;
        const currentValue = inputElement.value;
        
        if (currentValue.length > 0) {
          const newValue = currentValue.slice(0, -1);
          inputElement.value = newValue;
          
          // Set cursor position to end
          const newCursorPos = newValue.length;
          inputElement.setSelectionRange(newCursorPos, newCursorPos);
          
          // Use enhanced keyboard simulation
          this.simulateRealKeyboardTyping(inputElement, iframeDoc, '');
        }
      }
    }
  }

  // Helper method to dispatch comprehensive events that Botpress expects
  private dispatchComprehensiveEvents(element: HTMLElement | HTMLInputElement | HTMLTextAreaElement, doc: Document): void {
    // Create events with proper properties
    const inputEvent = new Event('input', { bubbles: true, cancelable: true });
    const changeEvent = new Event('change', { bubbles: true, cancelable: true });
    const keyupEvent = new KeyboardEvent('keyup', { 
      bubbles: true, 
      cancelable: true,
      key: 'a', // Any key
      code: 'KeyA'
    });
    const keydownEvent = new KeyboardEvent('keydown', { 
      bubbles: true, 
      cancelable: true,
      key: 'a', // Any key
      code: 'KeyA'
    });
    const compositionEvent = new CompositionEvent('compositionend', {
      bubbles: true,
      cancelable: true,
      data: element instanceof HTMLInputElement ? element.value : element.textContent || ''
    });

    // Dispatch events in the correct order
    element.dispatchEvent(keydownEvent);
    element.dispatchEvent(inputEvent);
    element.dispatchEvent(changeEvent);
    element.dispatchEvent(compositionEvent);
    element.dispatchEvent(keyupEvent);

    // Also trigger on the element's parent and document for broader detection
    if (element.parentElement) {
      element.parentElement.dispatchEvent(inputEvent);
      element.parentElement.dispatchEvent(changeEvent);
    }

    // Trigger on the document as well
    doc.dispatchEvent(inputEvent);
    doc.dispatchEvent(changeEvent);
  }

  // Enhanced method to simulate real keyboard typing behavior
  private simulateRealKeyboardTyping(element: HTMLElement | HTMLInputElement | HTMLTextAreaElement, doc: Document, text: string): void {
    console.log('=== Starting Event Simulation ===');
    console.log('Text being simulated:', text);
    
    // Get the current value to determine what changed
    const currentValue = element instanceof HTMLInputElement ? element.value : element.textContent || '';
    
    // Get the character to simulate (use the first character of the text)
    const char = text.charAt(0);
    const keyCode = char.charCodeAt(0);
    
    console.log('Character:', char, 'KeyCode:', keyCode);
    
    // Create the exact event sequence that physical keyboard produces
    // BUT without the blur event at the end to keep focus on input
    const events = [
      // Focus event
      new FocusEvent('focus', { bubbles: true, cancelable: true }),
      
      // Keydown event
      new KeyboardEvent('keydown', { 
        bubbles: true, 
        cancelable: true,
        key: char,
        code: `Key${char.toUpperCase()}`,
        keyCode: keyCode,
        which: keyCode,
        isComposing: false
      }),
      
      // Keypress event - THIS IS THE CRUCIAL EVENT BOTPRESS NEEDS
      new KeyboardEvent('keypress', { 
        bubbles: true, 
        cancelable: true,
        key: char,
        code: `Key${char.toUpperCase()}`,
        keyCode: keyCode,
        which: keyCode,
        isComposing: false
      }),
      
      // Input event
      new InputEvent('input', { 
        bubbles: true, 
        cancelable: true,
        data: char,
        inputType: 'insertText',
        isComposing: false
      }),
      
      // Keyup event
      new KeyboardEvent('keyup', { 
        bubbles: true, 
        cancelable: true,
        key: char,
        code: `Key${char.toUpperCase()}`,
        keyCode: keyCode,
        which: keyCode,
        isComposing: false
      }),
      
      // Change event
      new Event('change', { bubbles: true, cancelable: true })
      
      // Removed blur event to keep focus on input
    ];

    console.log('Dispatching', events.length, 'events');

    // Dispatch events in the exact order with minimal delays
    // ONLY dispatch on the target element, not on parents
    events.forEach((event, index) => {
      setTimeout(() => {
        console.log('Dispatching event', index + 1, ':', event.type, 'for character:', char);
        element.dispatchEvent(event);
      }, index * 5); // 5ms delay between events
    });
    
    // Keep focus on the element after all events
    setTimeout(() => {
      element.focus();
    }, events.length * 5 + 10);
    
    console.log('=== End Event Simulation ===');
  }

  // Method to send a message directly via Botpress sendMessage
  public async sendMessageDirectly(message: string): Promise<void> {
    try {
      const botpressGlobal = (window as any).botpress;
      if (botpressGlobal && typeof botpressGlobal.sendMessage === 'function') {
        await botpressGlobal.sendMessage(message);
      }
    } catch (error) {
      // Silent error handling
    }
  }
} 
import { Component, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-num-pad',
  imports: [],
  templateUrl: './num-pad.component.html',
  styleUrl: './num-pad.component.scss'
})
export class numPadComponent implements AfterViewInit {

  // Track the last focused input or textarea element
  lastFocusedElement: HTMLInputElement | HTMLTextAreaElement | null = null;

  ngAfterViewInit(): void {

    document.addEventListener('focusin', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        this.lastFocusedElement = target as HTMLInputElement | HTMLTextAreaElement;
      }
    });


    // Add click event listeners to all key buttons
    const keys = document.querySelectorAll('.numpad .key');         
    keys.forEach(key => {
      key.addEventListener('click', (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const keyText = target.textContent?.trim();

        if (!keyText) {
          return;
        }

        if (keyText === '⌫') {
          this.handleBackspace();
        } else {
          this.insertText(keyText);
        }
      });
    });
  }


  // Inserts the provided text into the last focused input or textarea
  insertText(text: string): void {
    // Use the stored element if available, otherwise fallback to document.activeElement
    const targetElement = this.lastFocusedElement ||
      (document.activeElement as HTMLInputElement | HTMLTextAreaElement | null);
    if (targetElement && (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      targetElement.value += text;
      targetElement.dispatchEvent(new Event('input'));
    }
  }

  // Remove the last character from the target input or textarea
  handleBackspace(): void {
    const targetElement = this.lastFocusedElement ||
      (document.activeElement as HTMLInputElement | HTMLTextAreaElement | null);
    if (targetElement && (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      targetElement.value = targetElement.value.slice(0, -1);
      targetElement.dispatchEvent(new Event('input'));
    }
  }
}

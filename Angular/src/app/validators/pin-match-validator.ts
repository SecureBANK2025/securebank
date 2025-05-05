import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const pinMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pin = control.get('PIN');
    const confirmPIN = control.get('confirmPIN');
    if (!pin || !confirmPIN) return null;
    return pin.value === confirmPIN.value ? null : { pinMismatch: true };
};
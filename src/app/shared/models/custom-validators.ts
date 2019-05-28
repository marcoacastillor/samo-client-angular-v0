import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static PasswordMustHaveNumbers(control: AbstractControl) {
    if (hasNumber(control.value)) {
      return null;
    }
    return {
      passwordMustHaveNumbers: 'Password without numbers are not allowed'
    };
  }

  static MatchPassword(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ matchPassword: true });
    } else {
      return null;
    }
  }
}

function hasNumber(myString) {
  return /\d/.test(myString);
}

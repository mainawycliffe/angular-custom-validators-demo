import { ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidator {
  static ageLimitValidator(minAge: number, maxAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // if control value is not null and is a number
      if (control.value !== null) {
        // return null  if it's in between the minAge and maxAge and is A valid Number
        return isNaN(control.value) || // checks if its a valid number
        control.value < minAge || // checks if its below the minimum age
          control.value > maxAge // checks if its above the maximum age
          ? { ageLimit: true } // return this incase of error
          : null; // there was not error
      }

      return null; // no error, because there in no input
    };
  }

  static emailDomainValidator(domain: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // if control value is not undefined, then check if the domain name is valid
      if (control.value !== null) {
        const [_, eDomain] = control.value.split('@'); // split the email address to get the domain name
        return eDomain !== domain // check if the domain name matches the one inside the email address
          ? { emailDomain: true } // return incase there is not match
          : null; // return null if there is a match
      }
      return null; // no error, since there was no input
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control

    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword formcontrol
      control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    }
  }
}

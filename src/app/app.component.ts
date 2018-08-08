import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from './custom-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-custom-validators-demo';

  public myform: FormGroup = null;

  constructor(private fb: FormBuilder) {
    // create the form
    this.myform = this.createMyForm();
  }

  createMyForm(): FormGroup {
    return this.fb.group(
      {
        name: [null, Validators.compose([Validators.required])],
        age: [
          null,
          Validators.compose([CustomValidator.ageLimitValidator(18, 60)])
        ],
        email: [
          null,
          Validators.compose([
            Validators.email,
            CustomValidator.emailDomainValidator('theinfogrid.com')
          ])
        ],
        password: [null, Validators.compose([Validators.required])],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // our validator for the form group
        validator: [CustomValidator.passwordMatchValidator]
      }
    );
  }

  submit() {
    console.log('submitted');
  }
}

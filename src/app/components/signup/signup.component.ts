import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import ValidateForm from '../../helpers/validateform';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  singupForm! : FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.singupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.type = this.isText ? 'text' : 'password';
    this.eyeIcon = this.isText ? 'fa-eye' : 'fa-eye-slash';
  }

  onSignup() {
    if (this.singupForm.valid) {
      // send data to backend
      console.log(this.singupForm.value);
    } else {
      // display toaster error message
      ValidateForm.validateAllFormFields(this.singupForm);
      alert("Please fill all fields correctly ⚠️");
    }
  }

}

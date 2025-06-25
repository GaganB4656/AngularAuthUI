import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import ValidateForm from '../../helpers/validateform';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.type = this.isText ? 'text' : 'password';
    this.eyeIcon = this.isText ? 'fa-eye' : 'fa-eye-slash';
  }

  onSubmit() {
    if(this.loginForm.valid) {
      //send data to backend
      console.log(this.loginForm.value);
    }
    else {
      //display toaster error message
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Please fill all fields correctly ⚠️");
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private _authService: AuthService,
  private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.type = this.isText ? 'text' : 'password';
    this.eyeIcon = this.isText ? 'fa-eye' : 'fa-eye-slash';
  }

  onLogin() {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          alert('Login successful! 🎉');
          this.loginForm.reset();
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          alert('Login failed! ❌');
          console.error(err);
        },
      });
    } else {
      //display toaster error message
      ValidateForm.validateAllFormFields(this.loginForm);
      alert('Please fill all fields correctly ⚠️');
    }
  }
}

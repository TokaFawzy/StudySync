import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../Service/auth-service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm=new FormGroup({
    username:new FormControl('',[Validators.required,Validators.pattern(/^[A-Za-z0-9._-]+$/)]),
    password:new FormControl('',[Validators.required,Validators.minLength(1)]),
  })
  constructor(private authService: AuthService, private router: Router,private cdr: ChangeDetectorRef) {}
  hasError=false;
  onLogin() {
    this.hasError=false;
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next:(res)=>{
          if(res.data&&res.data.token){
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('userName',this.loginForm.value.username!);
          }
          this.router.navigate(['/home']);
        },
        error:(err)=>{
          this.hasError=true;
          this.cdr.detectChanges();
        }
      })
    }else {
      this.loginForm.markAllAsTouched();
      this.hasError = true;
    }
  }
}

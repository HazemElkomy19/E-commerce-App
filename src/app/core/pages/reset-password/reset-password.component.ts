import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessegeComponent } from "../../../shared/components/ui/error-messege/error-messege.component";

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, ErrorMessegeComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  _authService=inject(AuthService);
  resetPasswordForm!:FormGroup;
  _router=inject(Router);
  isCallinApi!:boolean;
  apiError!:string;
  ngOnInit(): void {
      this.resetPasswordInitForm();
  }

  resetPasswordInitForm(){
    this.resetPasswordForm=new FormGroup({
     email:new FormControl(null,[Validators.required,Validators.email]),
      newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{5,}$/)])
    });
  }

  resetPassword(){
    this.apiError='';
    this.isCallinApi=true;
    this._authService.resetPassword(this.resetPasswordForm.get('email')?.value,this.resetPasswordForm.get('newPassword')?.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.isCallinApi=false;

          this._router.navigate(['/home']);

      },
      error:(err)=>{
        console.log(err);
        this.apiError=err.error.message;
        this.isCallinApi=false;
      }
    })
  }
}

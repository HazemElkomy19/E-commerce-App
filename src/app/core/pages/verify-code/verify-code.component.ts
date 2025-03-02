import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ErrorMessegeComponent } from "../../../shared/components/ui/error-messege/error-messege.component";

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule, ErrorMessegeComponent],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent {
  _authService=inject(AuthService);
  verifyCodeForm!:FormGroup;
  _router=inject(Router);
  isCallinApi!:boolean;
  apiError!:string;
  ngOnInit(): void {
      this.verifyCodeInitForm();
  }

  verifyCodeInitForm(){
    this.verifyCodeForm=new FormGroup(
      {

        resetCode:new FormControl(null,[Validators.required])

      });
  }

  verifyCode(){
    this.apiError='';
    this.isCallinApi=true;
    this._authService.verifyCode(this.verifyCodeForm.get('resetCode')?.value ).subscribe({
      next:(res)=>{
        console.log(res);
        this.isCallinApi=false;
        if(res.status== 'Success'){
          this._router.navigate(['/auth/reset-password']);
        }
      },
      error:(err)=>{
        console.log(err);
        this.apiError=err.error.message;
        this.isCallinApi=false;

      }
    })
  }
}

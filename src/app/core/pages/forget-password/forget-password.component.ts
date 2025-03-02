import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessegeComponent } from "../../../shared/components/ui/error-messege/error-messege.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, ErrorMessegeComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {
_authService=inject(AuthService);
forgetPasswordForm!:FormGroup;
_router=inject(Router);
isCallinApi!:boolean;
apiError!:string;
ngOnInit(): void {
    this.ForgetPasswordInitForm();
}

ForgetPasswordInitForm(){
  this.forgetPasswordForm=new FormGroup(
    {

      email:new FormControl(null,[Validators.required,Validators.email])

    });
}

forgetPassword(){
  this.apiError='';
  this.isCallinApi=true;
  this._authService.forgetPassword(this.forgetPasswordForm.get('email')?.value ).subscribe({
    next:(res)=>{
      console.log(res);
      this.isCallinApi=false;
      if(res.statusMsg== 'success'){
        this._router.navigate(['/auth/verify-code']);
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

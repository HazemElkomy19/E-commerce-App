import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorMessegeComponent } from "../../../shared/components/ui/error-messege/error-messege.component";
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ErrorMessegeComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy,OnInit {
  subscribtion:Subscription=new Subscription();
  apiError!:string;
  isCallinApi:boolean=false;
registerForm!: FormGroup;
_authService =inject(AuthService);
_router=inject(Router);

ngOnInit(): void {
    this.RegisterInitForm();
}
RegisterInitForm(){
this.registerForm=new FormGroup(
  {
    name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl('islam12178@yahoo.com',[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{5,}$/)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{5,}$/)]),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  },this.validateRepassword

);
}

register(){


  if(this.registerForm.invalid){
    this.registerForm.markAllAsTouched();
  }
  else{
    this.apiError='';

      this.isCallinApi=true;
      if(this.subscribtion) this.subscribtion.unsubscribe()
   this.subscribtion= this._authService.registerUser(this.registerForm.value).subscribe({
      next: (res)=>{
        console.log(res);
        this.isCallinApi=false;
        this._router.navigate(['/auth/login']);
      },
      error: (err)=>{
        console.log(err);
        this.apiError=err.error.message;
        this.isCallinApi=false;
      },
      complete: ()=>{

      }
    })


  }

}

validateRepassword(form: AbstractControl) {
  const password = form.get("password")?.value;
  const rePassword = form.get("rePassword")?.value;

  if (password === rePassword) {
    return null;
  } else {
    return { misMatch: true };
  }
}

ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
}
}

import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-messege',
  imports: [],
  templateUrl: './error-messege.component.html',
  styleUrl: './error-messege.component.scss'
})
export class ErrorMessegeComponent {
@Input() nameControl!:AbstractControl | null;
}

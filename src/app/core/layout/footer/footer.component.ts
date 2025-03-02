import { Component } from '@angular/core';
import { CustomButtonComponent } from "../../../shared/components/ui/custom-button/custom-button.component";

@Component({
  selector: 'app-footer',
  imports: [CustomButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}

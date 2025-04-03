import { Component } from '@angular/core';
import { InitTextComponent } from "../../components/init-text/init-text.component";
import { InitButtonComponent } from "../../components/init-button/init-button.component";

@Component({
  selector: 'chatbot-init-page',
  imports: [InitTextComponent, InitButtonComponent],
  templateUrl: './init-page.component.html',
  styleUrl: './init-page.component.css'
})
export class InitPageComponent {

 }

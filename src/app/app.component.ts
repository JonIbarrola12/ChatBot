import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatbotNavegator } from './components/completed-chatbot/navegator/navegator.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatbotNavegator, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chatbot';
}



import { Component } from '@angular/core';
import { CompletedChatbotComponent } from "../../components/completed-chatbot/completed-chatbot.component";

@Component({
  selector: 'chatbot-main-page',
  imports: [CompletedChatbotComponent],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent { }

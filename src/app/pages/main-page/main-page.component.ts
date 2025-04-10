import { Component } from '@angular/core';
import { CompletedChatbotComponent } from "../../components/completed-chatbot/completed-chatbot.component";
import { ChatbotNavegator } from "../../components/completed-chatbot/navegator/navegator.component";
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'chatbot-main-page',
  imports: [CompletedChatbotComponent, ChatbotNavegator],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {
  constructor(private chatService: ChatService) {}
}


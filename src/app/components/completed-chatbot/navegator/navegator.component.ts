import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'chatbot-navegator',
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: 'navegator.component.html'
})

export class ChatbotNavegator{
chatService= inject(ChatService)



}

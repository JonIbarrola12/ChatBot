import { Component, inject } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  imports:[RouterLink,RouterLinkActive],
  selector: 'chatbot-navegator',
  templateUrl: 'navegator.component.html'
})
export class ChatbotNavegator {

  chatService = inject(ChatService);
  
  startNewChat(): void {
    this.chatService.startNewConversation();
  }

  loadConversation(convoId: number): void {
    this.chatService.loadConversationById(convoId);
  }
}

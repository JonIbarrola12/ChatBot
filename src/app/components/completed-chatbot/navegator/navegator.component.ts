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

  // Método para iniciar un nuevo chat
  startNewChat(): void {
    this.chatService.startNewConversation();  // Llamar al servicio para comenzar un nuevo chat
  }

  // Cargar conversación desde el historial
  loadConversation(convoId: number): void {
    this.chatService.loadConversationById(convoId);
  }
}

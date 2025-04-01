import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ChatService } from '../../../services/chat.service';


@Component({
  selector: 'chatbot-navegator',
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: 'navegator.component.html'
})

export class ChatbotNavegator{
chatService= inject(ChatService)
loadChat(id: number) {
  const selectedConvo = this.chatService.getConversations().find(c => c.id === id);
  if (selectedConvo) {
    this.chatService.arrayChat = [...selectedConvo.messages]; // Cargar mensajes en el chat
  }
}


}

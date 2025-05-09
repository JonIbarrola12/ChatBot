import { Component, inject } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  imports:[RouterLink,RouterLinkActive],
  selector: 'chatbot-navegator',
  templateUrl: 'navigator.component.html',
  styleUrl: 'navigator.component.css'
})
export class ChatbotNavegator {

  chatService = inject(ChatService);
  //Este método llama al metodo startNewConversation del servicio ChatService y sirve para iniciar una nueva conversacion (se utiliza en el botón new chat )
  startNewChat(): void {
    this.chatService.startNewConversation();
  }
  //Este metodo llama al metodo loadConversationById del servicio ChatService
  loadConversation(convoId: number): void {
    this.chatService.loadConversationById(convoId);
  }
  //Este metodo llama al metodo cleanHistory del servicio chatService
  cleanHistory(){
    this.chatService.cleanHistory();
  }
}

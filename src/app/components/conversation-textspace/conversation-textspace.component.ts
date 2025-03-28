import { Component, inject } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'chatbot-conversation-textspace',
  imports: [],
  templateUrl: './conversation-textspace.component.html',
  styleUrl: './conversation-textspace.component.css',
})
export class ConversationTextspaceComponent {
  chatbotService = inject(ChatService)

  loadPost(question_made:string ){
    this.chatbotService.createPost(question_made);
  }


 }

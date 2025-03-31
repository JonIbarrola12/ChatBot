import { Component, inject } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { InteractivePartComponent } from '../interactive-part/interactive-part.component';

@Component({
  selector: 'chatbot-conversation-textspace',
  imports: [],
  templateUrl: './conversation-textspace.component.html',
  styleUrl: './conversation-textspace.component.css',
})
export class ConversationTextspaceComponent {
  chatbotService = inject(ChatService)
  chatbotQuestion =inject(InteractivePartComponent)
  




 }

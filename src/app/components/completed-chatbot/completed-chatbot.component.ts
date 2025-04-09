import { Component } from '@angular/core';
import { ConversationTextspaceComponent } from "./conversation-textspace/conversation-textspace.component";
import { InteractivePartComponent } from './interactive-part/interactive-part.component';

@Component({
  selector: 'chatbot-completed-chatbot',
  imports: [ConversationTextspaceComponent, InteractivePartComponent],
  templateUrl: './completed-chatbot.component.html',
  styleUrl: './completed-chatbot.componen.css'
})
export class CompletedChatbotComponent { }

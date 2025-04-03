import { Component, inject } from '@angular/core';
import { ConversationTextspaceComponent } from "./conversation-textspace/conversation-textspace.component";
import { InteractivePartComponent } from './interactive-part/interactive-part.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'chatbot-completed-chatbot',
  imports: [ConversationTextspaceComponent, InteractivePartComponent],
  templateUrl: './completed-chatbot.component.html',
  styleUrl: './completed-chatbot.componen.css'
})
export class CompletedChatbotComponent {

  private chatService = inject(ChatService);
  
  sendMesagge(){
    this.chatService.sendQuestion('hola').subscribe((resp)=>{
      console.log(resp);
    })
  }
 }

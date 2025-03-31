import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'chatbot-interactive-part',
  imports: [FormsModule],
  templateUrl: './interactive-part.component.html',
  styleUrl: './interactive-part.component.css'
})
export class InteractivePartComponent {

  constructor(private chatService: ChatService){}


  sendMessage(pregunta: string){
    this.chatService.sendQuestion(pregunta).subscribe({
    next: (response)=> console.log(response),
     })
  }


 }

import { ChatService } from './../../../services/chat.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'chatbot-interactive-part',
  imports: [FormsModule],
  templateUrl: './interactive-part.component.html',
  styleUrl: './interactive-part.component.css'
})
export class InteractivePartComponent {
  chatService = inject(ChatService);

  public question:string='';
  public answer:string='';

  sendMesagge(){
    this.chatService.sendQuestion(this.question).subscribe(

    )
  }

 }

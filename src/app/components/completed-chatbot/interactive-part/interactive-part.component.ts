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
  public userMessage:string='';
  public userAnswer:string='';

  constructor(private chatService: ChatService){}


  sendMessage(pregunta: string){
    if (pregunta==''){
      this.chatService.arrayChat.push({
        clase: 'message user',
        texto: pregunta,
        img:false
      })
      this.chatService.arrayChat.push({
        clase: 'message bot',
        texto: 'Pregunta algo que quieras saber',
        img:true
      })
    }else{
    this.chatService.sendQuestion(pregunta).subscribe({
      next: (response) => {
        console.log('Respuesta de la API:', response);
        this.userMessage= pregunta;
        this.chatService.arrayChat.push({
          clase:'message user',
          texto: this.userMessage,
          img:false
        });
        console.log(this.userMessage);
        this.userAnswer= response.answare;
        this.chatService.arrayChat.push({
          clase:'message bot',
          texto: this.userAnswer,
          img: true,
        });
        console.log(this.userAnswer);
      },
  })
  }
 }

}

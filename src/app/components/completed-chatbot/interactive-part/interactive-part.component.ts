// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ChatService } from '../../../services/chat.service';

// @Component({
//   selector: 'chatbot-interactive-part',
//   imports: [FormsModule],
//   templateUrl: './interactive-part.component.html',
//   styleUrl: './interactive-part.component.css'
// })
// export class InteractivePartComponent {
//   public userMessage: string = '';

//   constructor(private chatService: ChatService) {}

//   /*Metodo principal para agregar los mensajes al arrayChat mediante el metodo push. Tambien se suscribe a la señal de la api
//   para recoger la respuesta mandandole la pregunta*/
//   sendMessage(pregunta: string) {
//     if (!pregunta.trim()) {
//       return;
//     }

//     const userMessage = { clase: 'message user', texto: pregunta, img: false };
//     this.chatService.arrayChat.push(userMessage);


//     this.chatService.sendQuestion(pregunta).subscribe({
//       next: (response) => {

//         if (response && response.answare) {
//           const botMessage = { clase: 'message bot', texto: response.answare, img: true };
//           this.chatService.arrayChat.push(botMessage);
//         } else {
//           const errorMessage = { clase: 'message bot', texto: 'Lo siento, no pude entender eso.', img: true };
//           this.chatService.arrayChat.push(errorMessage);
//         }
//         this.chatService.saveConversation();
//       }
//     });
//   }
// }

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'chatbot-interactive-part',
  imports: [FormsModule],
  templateUrl: './interactive-part.component.html',
  styleUrl: './interactive-part.component.css'
})
export class InteractivePartComponent {
  public userMessage: string = '';

  constructor(private chatService: ChatService) {}

  /*Método principal para agregar los mensajes al arrayChat mediante el metodo push. Tambien se suscribe a la señal de la api
  para recoger la respuesta mandandole la pregunta*/
  sendMessage(pregunta: string) {
    //Si no se le envia pregunta simplemente sale del método
    if (!pregunta.trim()) {
      return;
    }
    //Si hay pregunta guarda la pregunta en el array de arrayChat
    const userMessage = { clase: 'message user', texto: pregunta, img: false };
    this.chatService.arrayChat.push(userMessage);

    //Se suscribe a la api con la pregunta y guarda la respuesta del bot en el arrayChat
    this.chatService.sendQuestion(pregunta).subscribe({
      next: (response) => {

        if (response && response.answare) {
          const botMessage = { clase: 'message bot', texto: response.answare, img: true };
          this.chatService.arrayChat.push(botMessage);
        } else {
          const errorMessage = { clase: 'message bot', texto: 'Lo siento, no pude entender eso.', img: true };
          this.chatService.arrayChat.push(errorMessage);
        }
        //Llama al método saveConversationToDatabase del servicio chatService y se subscribe
        this.chatService.saveConversationToDatabase().subscribe();
      }
    });
  }
}


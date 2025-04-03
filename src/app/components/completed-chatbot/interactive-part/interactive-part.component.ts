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

  sendMessage(pregunta: string) {
    // Ignorar mensajes vacíos o solo con espacios
    if (!pregunta.trim()) {
      return;  // No hacer nada si el mensaje está vacío
    }

    // Agregar el mensaje del usuario
    const userMessage = { clase: 'message user', texto: pregunta, img: false };
    this.chatService.arrayChat.push(userMessage);

    // Hacer la solicitud al servicio
    this.chatService.sendQuestion(pregunta).subscribe({
      next: (response) => {
        // Verificamos la respuesta
        console.log('Respuesta de la API:', response);

        // Verificamos que la respuesta esté en el formato esperado
        if (response && response.answare) {
          const botMessage = { clase: 'message bot', texto: response.answare, img: true };
          this.chatService.arrayChat.push(botMessage);
        } else {
          // Si la respuesta no tiene 'answare', mostrar un mensaje de error
          const errorMessage = { clase: 'message bot', texto: 'Lo siento, no pude entender eso.', img: true };
          this.chatService.arrayChat.push(errorMessage);
        }

        // Guardar la conversación después de recibir la respuesta
        this.chatService.saveConversation();
      },
      error: (err) => {
        console.error('Error en la API:', err);

        // En caso de error, agregar un mensaje de error
        const errorMessage = { clase: 'message bot', texto: 'Hubo un error al obtener la respuesta.', img: true };
        this.chatService.arrayChat.push(errorMessage);

        // Guardar la conversación después de recibir el error
        this.chatService.saveConversation();
      }
    });
  }
}

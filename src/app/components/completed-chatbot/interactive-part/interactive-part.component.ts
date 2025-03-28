import { Component, inject } from '@angular/core';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'chatbot-interactive-part',
  imports: [],
  templateUrl: './interactive-part.component.html',
  styleUrl: './interactive-part.component.css'
})
export class InteractivePartComponent {
  chatbotService = inject(ChatService)
  responseMessage: string = '';
  userQuestion: string = '';

  sendQuestion() {
    if (!this.userQuestion.trim()) return; // Evita enviar preguntas vacías

    this.chatbotService.sendMessage(this.userQuestion).subscribe({
      next: (response) => {
        console.log('Respuesta del chatbot:', response);
        this.responseMessage = response?.message || 'No hay respuesta';
      },
    });
  }
 }

// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ArrayChat, Conversations } from '../interfaces/chatbot.interfaces';

// @Injectable({ providedIn: 'root' })
// export class ChatService {
//   public http = inject(HttpClient);
//   private chatbotUrl = 'https://chatbot-normativa-laboral.azurewebsites.net/Chat/Enviar';
//   private apiUrl = 'http://localhost:3000/api';
//   public arrayChat: ArrayChat[] = [];
//   public conversations: Conversations[] = [];
//   private currentConversationId: number | null = null;

//   //El constructor carga las conversaciones al iniciar la pagina web
//   constructor() {
//     this.loadConversations();
//   }

//   //La funcion sendQuestion se hace una llamada a la api con el metodo post y devuelve un observable
//   sendQuestion(question: string): Observable<any> {
//     const body = { pregunta: question };
//     return this.http.post(this.chatbotUrl, body);
//   }

//   //El metodo saveConversation sirve para guardar las conversaciones en memoria, es el metodo principal
//   saveConversation(): void {
//     let storedConversations = this.getConversations();

//     if (this.currentConversationId === null) {
//       this.currentConversationId = Date.now();
//       const firstMessage = this.arrayChat.length > 0 ? this.arrayChat[0].texto : "Conversación sin título";

//       storedConversations.push({
//         id: this.currentConversationId,
//         title: firstMessage,
//         messages: [...this.arrayChat],
//         date: new Date().toISOString()
//       });
//     } else {
//       const existingConversation = storedConversations.find(convo => convo.id === this.currentConversationId);
//       if (existingConversation) {
//         existingConversation.messages = [...this.arrayChat];
//       }
//     }

//     localStorage.setItem('conversations', JSON.stringify(storedConversations));
//     this.conversations = storedConversations;
//   }

//   // El método loadConversation carga las conversaciones en memoria
//   loadConversations(): void {
//     this.conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
//   }
//   // La función getConversation devuelve las conversaciones en memoria
//   getConversations(): Conversations[] {
//     return JSON.parse(localStorage.getItem('conversations') || '[]');
//   }
//   //El método startNewConversation vacia el array de mensajes y hace null el currentConversationId (Este método se usa en el botón de new chat)
//   startNewConversation(): void {
//     this.arrayChat = [];
//     this.currentConversationId = null;
//   }
//   //Este metodo sirve para cargar una conversacion especifica basandos en el id de estas(identificador único)
//   loadConversationById(id: number): void {
//     const storedConversations = this.getConversations();
//     const selectedConvo = storedConversations.find(c => c.id === id);
//     if (selectedConvo) {
//       this.arrayChat = [...selectedConvo.messages];
//       this.currentConversationId = selectedConvo.id;
//     }
//   //Este metodo borra el historial del chat
//   }
//   cleanHistory(): void {
//     localStorage.removeItem('conversations');
//     this.conversations = [];
//     this.arrayChat = [];
//     this.currentConversationId = null;
//   }
//   //Metodo que hace la llamada a la API externa
//   getItems(): Observable<any> {
//     return this.http.get(this.apiUrl);
//   }
// }
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ArrayChat, Conversations } from '../interfaces/chatbot.interfaces';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);
  private chatbotUrl = 'https://chatbot-normativa-laboral.azurewebsites.net/Chat/Enviar';
  private apiUrl = 'http://localhost:3000/api';

  public arrayChat: ArrayChat[] = [];
  public conversations: Conversations[] = [];
  private currentConversationId: number | null = null;

  //Se ejecuta inmediatamente cuando se crea una instancia de la clase
  constructor() {
    //Llamada al backend
    this.loadConversationsFromDatabase().subscribe({
      //Recoge las conversaciones de la base de datos y las inserta en el array de conversations
      next: (conversations) => {
        this.conversations = conversations;
      },
      error: (error) => {
        console.error('Error al cargar las conversaciones:', error);
      }
    });
  }

  // Enviar pregunta al chatbot
  sendQuestion(question: string): Observable<any> {
    const body = { pregunta: question };
    return this.http.post(this.chatbotUrl, body);
  }

  // Método para guardar la conversación en la base de datos
  saveConversationToDatabase(): Observable<any> {
    const conversationData = {
      title: this.arrayChat.length > 0 ? this.arrayChat[0].texto : "Conversación sin título",
      messages: this.arrayChat,
      date: new Date().toISOString(),
    };
    //Esta condición sirve para ver si la conversación fue guardada antes o no
    if (this.currentConversationId !== null) {
      //Esto actualiza una conversación existente mediante put
      return this.http.put<Conversations>(
        `${this.apiUrl}/conversations/${this.currentConversationId}`,
        conversationData
      ).pipe(
        tap((updatedConversation: Conversations) => {
          const index = this.conversations.findIndex(c => c.id === this.currentConversationId);
          if (index !== -1) {
            this.conversations[index] = updatedConversation;
          }
        })
      );
    } else {
      //Este crea una conversación mediante un post
      return this.http.post<Conversations>(
        `${this.apiUrl}/conversations`,
        conversationData
      ).pipe(
        tap((newConversation: Conversations) => {
          this.conversations.push(newConversation);
          this.currentConversationId = newConversation.id;
        })
      );
    }
  }

  // Método para cargar las conversaciones desde la base de datos
  loadConversationsFromDatabase(): Observable<Conversations[]> {
    return this.http.get<Conversations[]>(`${this.apiUrl}/conversations`);
  }

  // Método que comienza una nueva conversación
  startNewConversation(): void {
    if (this.arrayChat.length > 0) {
      this.saveConversationToDatabase().subscribe({
        next: () => console.log('Conversación anterior guardada'),
        error: (err) => console.error('Error al guardar conversación anterior:', err)
      });
    }
    this.arrayChat = [];
    this.currentConversationId = null;
  }

  // Método que carga una conversación específica por ID
  loadConversationById(id: number): void {
    const selectedConvo = this.conversations.find(c => c.id === id);
    if (selectedConvo) {
      this.arrayChat = [...selectedConvo.messages];
      this.currentConversationId = selectedConvo.id;
    }
  }

  // Método que limpia el historial de conversaciones
  cleanHistory(): void {
    //Utiliza delete para eliminar las conversaciones de la base de datos
    this.http.delete(`${this.apiUrl}/conversations`).subscribe(
      () => {
        this.conversations = [];
        this.arrayChat = [];
        this.currentConversationId = null;
        this.startNewConversation();
        console.log('Historial de conversaciones limpiado.');
      },
      (error) => {
        console.error('Error al limpiar el historial de conversaciones:', error);
      }
    );
  }
}


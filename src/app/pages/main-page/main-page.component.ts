import { Component } from '@angular/core';
import { ConversationTextspaceComponent } from "../../components/conversation-textspace/conversation-textspace.component";

@Component({
  selector: 'chatbot-main-page',
  imports: [ConversationTextspaceComponent],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent { }

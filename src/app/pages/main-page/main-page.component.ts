import { Component } from '@angular/core';
import { ConversationTextspaceComponent } from "../../components/conversation-textspace/conversation-textspace.component";
import { InteractivePartComponent } from "../../components/interactive-part/interactive-part.component";

@Component({
  selector: 'chatbot-main-page',
  imports: [ConversationTextspaceComponent, InteractivePartComponent],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent { }

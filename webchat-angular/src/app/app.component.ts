import { Component, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Message } from './message';
import { Subscription } from 'rxjs';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nickname: string;
  message: string;
  messages : Message[] = [];
  private subscriptionMessage$ : Subscription;
  private subscriptionList$ : Subscription;


  @ViewChild(MatList, {read: ElementRef, static:true}) list : ElementRef;
  @ViewChildren(MatListItem) listItems : QueryList<MatList>;
  
  

  constructor(private socketService : SocketIoService) {

  }

  ngOnInit(): void {
    this.subscriptionMessage$ = this.socketService.messsage().subscribe((m:Message)=> {
      console.log(m)
      this.messages.push(m)
    })

  }

  ngAfterViewInit(): void {
   this.subscriptionList$ = this.listItems.changes.subscribe( e => {
      this.list.nativeElement.scrollTop = this.list.nativeElement.scrollHeight;
    })
    

  }

  send() {
    this.socketService.send({
      from: this.nickname,
      message : this.message
    });
    console.log(this.message)
    this.message = "";
  }

   ngOnDestroy(): void {
      this.subscriptionMessage$.unsubscribe();
      this.subscriptionList$.unsubscribe();
   }

}

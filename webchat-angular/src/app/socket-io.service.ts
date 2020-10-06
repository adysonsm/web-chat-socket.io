import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client'
import { Message } from './message';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private url = "http://localhost:4444"
  private socket = socketIo(this.url);
  private subjMessages : Subject<Message> = new Subject<Message>();

  constructor() { 
    this.socket.on('message', (m : Message) => {
      this.subjMessages.next(m)

    }) ;
  }
  
  send(msg : Message) {
    this.socket.emit('message', msg)
  }

  messsage() {
    return this.subjMessages.asObservable();
  }
}

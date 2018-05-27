import { Injectable } from '@angular/core';
import { WebsocketService } from './socket.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operator/map';

@Injectable()
export class DataMiningService {

  messages: Subject<any>;

  // Our constructor calls our wsService connect method
    constructor(
        private wsService: WebsocketService
    ) {

        this.messages = <Subject<any>>wsService
        .connect();
    }

    // Our simplified interface for sending
    // messages back to our socket.io server
    sendMsg(msg) {
        this.messages.next(msg);
    }

}

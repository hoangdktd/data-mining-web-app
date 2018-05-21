import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';

@Injectable()
export class WebsocketService {

  // Our socket connection
  private socket;
  private readonly API_SERVER_URL = 'http://localhost:5000';

  constructor() { }

  connect(): Subject<MessageEvent> {
    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`
    this.socket = io('http://localhost:5000');

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    const observable = new Observable( tempObserver => {
        this.socket.on('message', (data) => {
          console.log('Received message from Websocket Server');
          tempObserver.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
    });

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    const observer = {
        next: (data: Object) => {
            this.socket.emit('message', JSON.stringify(data));
        },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Subject.create(observer, observable);
  }

  /**
     * Get event of socketio from server.
     * @returns {Observable<SDSSSocketIoData>}
     */
    reciveEvents(): Observable<SDSSSocketIoData> {
        return new Observable(observer => {
            this.socket = io(this.API_SERVER_URL, {
                query: `token=${sessionStorage.getItem('sdss::auth-token')}`,
                transports: ['websocket', 'polling']
            });
            this.socket.on('_SOCKET_EVENT', (socketData: SDSSSocketIoData) => {
                observer.next(socketData);
            });
            return () => {
                this.socket.disconnect();
            };
        });
    } // end of getEvents()

}

export interface SDSSSocketIoData {
    from: string;
    action: string;
    data?: any;
}

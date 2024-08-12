import io from 'socket.io-client';

const BaseUrl = 'http://localhost:4000'; // Ensure this is correct

class WSService {
  constructor() {
    this.socket = null;
  }

  initializeSocket = async () => {
    try {
      this.socket = io(BaseUrl, {
        transports: ['websocket'], // Ensure this matches the server's transport configuration
      });

      this.socket.on('connect', () => {
      });

      this.socket.on('disconnect', (reason) => {
      });

      this.socket.on('error', (error) => {

      });
    } catch (error) {
      console.log('Socket is not initialized', error);
    }
  };

  emit(event, data = {}) {
    if (this.socket) {
      this.socket.emit(event, data);
      console.log(`Emitting event: ${event} with data:`, data);
    } else {
      console.log('Socket not initialized');
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    } else {
      console.log('Socket not initialized');
    }
  }

  removeListener(listenerName) {
    if (this.socket) {
      this.socket.off(listenerName);
    } else {
      console.log('Socket not initialized');
    }
  }
}

const socketServices = new WSService();
export default socketServices;

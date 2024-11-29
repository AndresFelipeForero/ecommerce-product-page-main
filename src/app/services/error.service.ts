import { Injectable } from '@angular/core';
import { ErrorMessages } from '../interfaces/error';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  errorMessages: ErrorMessages = {
    default: 'Ocurrió un error desconocido',
    clientSide: 'Ocurrió un error en el lado del cliente',
    400: 'Solicitud incorrecta',
    401: 'No autorizado',
    403: 'Prohibido',
    404: 'Recurso no encontrado',
    500: 'Error interno del servidor',
    timeout: 'Tiempo de espera de la solicitud agotado',
  };

  getErrorMessage(error: any): string {
    if (error instanceof Error) {
      return this.errorMessages.clientSide;
    } else if (error.status) {
      return this.errorMessages[error.status] || this.errorMessages.default;
    } else if (error.name === 'TimeoutError') {
      return this.errorMessages.timeout;
    } else {
      return this.errorMessages.default;
    }
  }
}

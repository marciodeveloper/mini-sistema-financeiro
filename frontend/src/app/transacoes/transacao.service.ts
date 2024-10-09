import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';

export interface Transacao {
  id?: number;
  tipo: string;
  descricao: string;
  valor: number;
  data: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransacaoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTransacoes(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(`${this.apiUrl}/transacoes`);
  }

  getTransacao(id: number): Observable<Transacao> {
    return this.http.get<Transacao>(`${this.apiUrl}/transacoes/${id}`);
  }

  createTransacao(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>(`${this.apiUrl}/transacoes`, transacao);
  }

  updateTransacao(id: number, transacao: Transacao): Observable<Transacao> {
    return this.http.put<Transacao>(
      `${this.apiUrl}/transacoes/${id}`,
      transacao
    );
  }

  deleteTransacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/transacoes/${id}`);
  }

  getResumo(): Observable<{ entradas: number; saidas: number; saldo: number }> {
    return this.http.get<{ entradas: number; saidas: number; saldo: number }>(
      `${this.apiUrl}/resumo`
    );
  }
}

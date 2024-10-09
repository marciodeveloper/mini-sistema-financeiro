import { Component, OnInit } from '@angular/core';
import { TransacaoService } from '../transacoes/transacao.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-resumo-modal',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss'],
})
export class ResumoComponent implements OnInit {
  entradas: number = 0;
  saidas: number = 0;
  saldo: number = 0;
  carregando: boolean = true;
  erro: string | null = null;

  constructor(
    private transacaoService: TransacaoService,
    private dialogRef: MatDialogRef<ResumoComponent>
  ) {}

  ngOnInit(): void {
    this.carregarResumo();
  }

  carregarResumo(): void {
    this.transacaoService.getResumo().subscribe({
      next: (resumo) => {
        this.entradas = resumo.entradas;
        this.saidas = resumo.saidas;
        this.saldo = resumo.saldo;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar resumo', err);
        this.erro = 'Não foi possível carregar o resumo. Tente novamente.';
        this.carregando = false;
      },
    });
  }

  fechar(): void {
    this.dialogRef.close();
  }
}

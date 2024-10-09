import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransacaoService, Transacao } from '../transacao.service';
import { RouterModule } from '@angular/router';

// Importações do Angular Material
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TransacaoFormComponent } from '../transacao-form/transacao-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ResumoComponent } from '../../resumo/resumo.component';

@Component({
  selector: 'app-transacoes-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ResumoComponent,
  ],
  templateUrl: './transacoes-list.component.html',
  styleUrls: ['./transacoes-list.component.scss'],
})
export class TransacoesListComponent implements OnInit {
  transacoes = new MatTableDataSource<Transacao>();
  displayedColumns: string[] = ['tipo', 'descricao', 'valor', 'data', 'acoes'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private transacaoService: TransacaoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTransacoes();
  }

  loadTransacoes(): void {
    this.transacaoService.getTransacoes().subscribe({
      next: (data) => {
        this.transacoes.data = data;
        this.transacoes.paginator = this.paginator;
        this.transacoes.sort = this.sort;
      },
      error: (err) => {
        console.error('Erro ao carregar transações', err);
        this.snackBar.open('Erro ao carregar transações.', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.transacoes.filter = filterValue.trim().toLowerCase();
  }

  deleteTransacao(id: number): void {
    if (confirm('Deseja realmente excluir esta transação?')) {
      this.transacaoService.deleteTransacao(id).subscribe({
        next: () => {
          // Remove a transação da lista localmente
          this.transacoes.data = this.transacoes.data.filter(
            (t) => t.id !== id
          );
          this.transacoes._updateChangeSubscription(); // Atualiza a tabela
          this.snackBar.open('Transação excluída com sucesso.', 'Fechar', {
            duration: 3000,
          });
        },
        error: (err) => {
          console.error('Erro ao excluir transação', err);
          this.snackBar.open('Erro ao excluir transação.', 'Fechar', {
            duration: 3000,
          });
        },
      });
    }
  }

  abrirModalNovaTransacao(): void {
    const dialogRef = this.dialog.open(TransacaoFormComponent, {
      width: '400px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Adiciona a nova transação à lista
        this.transacoes.data = [...this.transacoes.data, result];
        this.transacoes._updateChangeSubscription();
        this.snackBar.open('Transação criada com sucesso.', 'Fechar', {
          duration: 3000,
        });
      }
    });
  }

  abrirModalEditarTransacao(transacao: Transacao): void {
    const dialogRef = this.dialog.open(TransacaoFormComponent, {
      width: '400px',
      data: transacao, // Passamos a transação existente
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.transacoes.data.findIndex((t) => t.id === result.id);
        if (index !== -1) {
          this.transacoes.data[index] = result;
          this.transacoes._updateChangeSubscription(); // Necessário para atualizar a tabela
          this.snackBar.open('Transação atualizada com sucesso.', 'Fechar', {
            duration: 3000,
          });
        }
      }
    });
  }

  abrirModalResumo(): void {
    const dialogRef = this.dialog.open(ResumoComponent, {
      width: '400px',
    });
  }
}

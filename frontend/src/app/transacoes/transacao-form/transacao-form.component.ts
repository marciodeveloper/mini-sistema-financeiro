import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TransacaoService, Transacao } from '../transacao.service';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-transacao-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './transacao-form.component.html',
  styleUrls: ['./transacao-form.component.scss'],
})
export class TransacaoFormComponent {
  transacaoForm: FormGroup;

  tiposTransacao = ['Entrada', 'Saída'];

  constructor(
    private fb: FormBuilder,
    private transacaoService: TransacaoService,
    private dialogRef: MatDialogRef<TransacaoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transacao | null
  ) {
    this.transacaoForm = this.fb.group({
      tipo: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0.01)]],
      data: ['', Validators.required],
    });

    if (data) {
      this.transacaoForm.patchValue(data);
    }
  }

  formatarData(data: any): string {
    const dataObj = new Date(data);
    const ano = dataObj.getFullYear();
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const dia = String(dataObj.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }
  salvar(): void {
    if (this.transacaoForm.valid) {
      const transacao: Transacao = this.transacaoForm.value;

      // Formatar a data antes de enviar
      const dataFormatada = this.formatarData(transacao.data);
      const transacaoParaEnviar = {
        ...transacao,
        data: dataFormatada,
      };

      if (this.data && this.data.id) {
        // Edição de transação existente
        this.transacaoService
          .updateTransacao(this.data.id, transacaoParaEnviar)
          .subscribe({
            next: (transacaoAtualizada) => {
              this.dialogRef.close(transacaoAtualizada);
            },
            error: (err) => {
              console.error('Erro ao atualizar transação', err);
            },
          });
      } else {
        // Criação de nova transação
        this.transacaoService.createTransacao(transacaoParaEnviar).subscribe({
          next: (novaTransacao) => {
            this.dialogRef.close(novaTransacao);
          },
          error: (err) => {
            console.error('Erro ao criar transação', err);
          },
        });
      }
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}

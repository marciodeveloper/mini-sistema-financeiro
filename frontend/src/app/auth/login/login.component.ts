import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importações do Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  hidePassword: boolean = true;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Inicializa o formulário com controles e validadores
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // Método chamado ao submeter o formulário
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          // Redireciona para a página inicial após login bem-sucedido
          this.router.navigate(['/']);
          // Exibe mensagem de sucesso
          this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
            duration: 3000,
          });
        },
        error: (err) => {
          // Trata erros de autenticação
          this.errorMessage = 'Credenciais inválidas ou erro na autenticação.';
          // Exibe mensagem de erro
          this.snackBar.open(this.errorMessage, 'Fechar', {
            duration: 3000,
          });
        },
      });
    } else {
      // Marca todos os campos como tocados para exibir mensagens de erro
      this.loginForm.markAllAsTouched();
    }
  }

  // Método para alternar a visibilidade da senha
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}

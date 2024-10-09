import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResumoComponent } from '../resumo/resumo.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  abrirResumo(): void {
    this.dialog.open(ResumoComponent, {
      width: '400px',
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.snackBar.open('Logout realizado com sucesso.', 'Fechar', {
          duration: 3000,
        });
      },
      error: (err: any) => {
        console.error('Erro ao fazer logout', err);
        this.snackBar.open('Erro ao fazer logout.', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }
}

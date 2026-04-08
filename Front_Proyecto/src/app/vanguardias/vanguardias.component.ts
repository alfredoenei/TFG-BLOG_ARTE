import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObrasService } from '../services/obras.service';
import { ImagePipe } from '../pipes/image.pipe';

@Component({
  selector: 'app-vanguardias',
  standalone: true,
  imports: [CommonModule, ImagePipe],
  templateUrl: './vanguardias.component.html',
  styleUrls: ['./vanguardias.component.css'],
})
export class VanguardiasComponent implements OnInit {
  obraSeleccionada: any = null;
  mostrarModal = false;

  abrirModal(obra: any) {
    this.obraSeleccionada = obra;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.obraSeleccionada = null;
  }

  // Declarar obras2 como una señal que contiene un array
  obras2 = signal<any[]>([]);

  // Declarar isLoading como una señal, inicializada en true
  isLoading = signal(true);

  constructor(private obrasService: ObrasService) {}

  ngOnInit(): void {
    this.obrasService.getObras2().subscribe({
      next: (res: any) => {
        this.obras2.set(res.results);
      },
      error: (err: any) => {
        console.error('Error al cargar obras de vanguardias:', err);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}

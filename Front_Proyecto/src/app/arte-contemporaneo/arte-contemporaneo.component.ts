import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObrasService } from '../services/obras.service';
import { ImagePipe } from '../pipes/image.pipe';

@Component({
  selector: 'app-arte-contemporaneo',
  standalone: true,
  imports: [CommonModule, ImagePipe],
  templateUrl: './arte-contemporaneo.component.html',
  styleUrls: ['./arte-contemporaneo.component.css'],
})
export class ArteContemporaneoComponent implements OnInit {
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

  // Declarar obras3 como una señal que contiene un array
  obras3 = signal<any[]>([]);

  // Declarar isLoading como una señal, inicializada en true
  isLoading = signal(true);

  constructor(private obrasService: ObrasService) {}

  ngOnInit(): void {
    this.obrasService.getObras3().subscribe({
      next: (res: any) => {
        this.obras3.set(res.results);
      },
      error: (err: any) => {
        console.error('Error al cargar obras contemporáneas:', err);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}

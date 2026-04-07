import { Component, OnInit, signal, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ImagePipe } from '../pipes/image.pipe';
import { ObrasService } from '../services/obras.service';
import { CartService } from '../services/cart.service';
import { Obra } from '../models/obra';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, RouterLink, ImagePipe],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  obras = signal<Obra[]>([]);
  isLoading = signal(true);
  errorMsg = signal<string | null>(null);

  // Inyección para escuchar cambios de query params
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // El cart es público para usar cart.count() en el HTML
  constructor(
    private obrasService: ObrasService,
    public cart: CartService
  ) { }

  ngOnInit(): void {
    // Cada vez que cambian los filtros del buscador
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const artista = (params.get('artista') ?? '').trim();
        const anioMin = (params.get('anioMin') ?? '').trim();
        const anioMax = (params.get('anioMax') ?? '').trim();

        const query: any = {};

        if (artista) query.artista = artista;
        if (anioMin) query.anioMin = anioMin;
        if (anioMax) query.anioMax = anioMax;

        this.fetchObras(query);
      });
  }

  // Carga de obras con o sin filtros
  fetchObras(params?: Record<string, any>) {
    this.isLoading.set(true);
    this.errorMsg.set(null);

    this.obrasService
      .getObras(params)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          this.obras.set(res.results ?? []);
        },
        error: (err) => {
          console.error('Error al cargar obras:', err);
          this.errorMsg.set('No se pudieron cargar las obras.');
          this.obras.set([]);
        },
      });
  }

  // Añadir obra al carrito
  addToCart(obra: Obra) {
    this.cart.add(obra, 1);
  }

  // Helper visual (tipo / colección)
  getTipoLabel(tipo?: string): string {
    return (tipo ?? 'Sin tipo').trim();
  }
}

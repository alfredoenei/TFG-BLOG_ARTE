import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ObrasService } from '../services/obras.service';
import { ImagePipe } from '../pipes/image.pipe';

@Component({
  selector: 'app-obras',
  standalone: true,
  imports: [CommonModule, RouterLink, ImagePipe],
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css'],
})
export class ObrasComponent implements OnInit {
  obras1: any[] = [];
  obras2: any[] = [];
  obras3: any[] = [];
  isLoading = true;

  constructor(private obrasService: ObrasService) {}

  ngOnInit() {
    // Carga paralela de las 3 colecciones para el dashboard
    Promise.all([
      this.obrasService.getObras1().toPromise(),
      this.obrasService.getObras2().toPromise(),
      this.obrasService.getObras3().toPromise()
    ]).then(([res1, res2, res3]) => {
      this.obras1 = (res1?.results || []).slice(0, 4); // Mostramos solo 4 por sección como preview
      this.obras2 = (res2?.results || []).slice(0, 4);
      this.obras3 = (res3?.results || []).slice(0, 4);
      this.isLoading = false;
    }).catch(err => {
      console.error('Error cargando el dashboard de obras:', err);
      this.isLoading = false;
    });
  }
}

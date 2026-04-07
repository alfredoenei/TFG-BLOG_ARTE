import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObrasService } from '../services/obras.service';

@Component({
  selector: 'app-obras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css'],
})
export class ObrasComponent implements OnInit {

  obras1: any[] = [];
  obras2: any[] = [];
  obras3: any[] = [];

  constructor(private obrasService: ObrasService) {}

  ngOnInit() {
    // Traer obras por categoría usando el filtro unificado
    this.obrasService.getObras1().subscribe((res: any) => {
      this.obras1 = res.results;
    });

    this.obrasService.getObras2().subscribe((res: any) => {
      this.obras2 = res.results;
    });

    this.obrasService.getObras3().subscribe((res: any) => {
      this.obras3 = res.results;
    });
  }
}

import { Component, OnInit, signal, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para usar *ngIf en el HTML
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../services/connect.services/auth.service';
import { CartService } from '../services/cart.service';

import { ImagePipe } from '../pipes/image.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, ImagePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  user: any = null; // Variable para guardar la información del usuario logueado
  isUserDropdownOpen = signal(false); // Control nativo del desplegable
  isExploraDropdownOpen = signal(false); // Control nativo del desplegable

  private el = inject(ElementRef);

  constructor(
    private authService: AuthService,
    private router: Router,
    public cart: CartService // público para usar cart.count() en el HTML
  ) {}

  ngOnInit(): void {
    // Sirve para saber cuándo el usuario inicia o cierra sesión
    this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  toggleUserDropdown(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isUserDropdownOpen.set(!this.isUserDropdownOpen());
    // Cerramos el otro por si acaso
    this.isExploraDropdownOpen.set(false);
  }

  toggleExploraDropdown(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isExploraDropdownOpen.set(!this.isExploraDropdownOpen());
    this.isUserDropdownOpen.set(false);
  }

  // Cierra los desplegables al navegar
  closeDropdowns() {
    this.isUserDropdownOpen.set(false);
    this.isExploraDropdownOpen.set(false);
  }

  // Cierra los desplegables si se hace clic fuera del componente
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isUserDropdownOpen.set(false);
      this.isExploraDropdownOpen.set(false);
    }
  }

  // ✅ Buscador por ARTISTA 
  // OJO: deje anioMinRaw y anioMaxRaw como OPCIONALES para no romper
  // el código si alguien vuelve a usar años en el navbar en el futuro
  onSearchSubmit(
    event: Event,
    artistaRaw: string,
    anioMinRaw?: string,
    anioMaxRaw?: string
  ) {
    event.preventDefault();

    const artista = (artistaRaw ?? '').trim();

    // Si está vacío, limpiamos query params (vuelve a /store sin filtros)
    const queryParams: any = artista ? { artista } : {};

    // (Opcional) Si algún día vuelves a usar años en el navbar, ya queda listo:
    const anioMin = (anioMinRaw ?? '').trim();
    const anioMax = (anioMaxRaw ?? '').trim();
    if (anioMin) queryParams.anioMin = anioMin;
    if (anioMax) queryParams.anioMax = anioMax;

    this.router.navigate(['/store'], { queryParams });
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
  }
}

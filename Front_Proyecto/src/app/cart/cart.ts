import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CartService } from '../services/cart.service';
import { ImagePipe } from '../pipes/image.pipe';

// Estados posibles del flujo de compra
type CheckoutStep = 'cart' | 'checkout' | 'success';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, ImagePipe],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class CartComponent {

  // Estado del flujo de checkout
  step = signal<CheckoutStep>('cart');

  // Datos del "pedido" generado tras confirmar
  orderNumber = signal('');
  orderDate = signal('');
  orderTotal = signal(0);

  constructor(public cart: CartService) {}

  // Avanzar al paso de checkout (resumen antes de pagar)
  goToCheckout() {
    if (this.cart.items().length === 0) return;
    this.step.set('checkout');
  }

  // Volver al carrito desde el checkout
  backToCart() {
    this.step.set('cart');
  }

  // Confirmar la compra (simulación)
  confirmPurchase() {
    // Generamos un número de pedido aleatorio
    const orderId = 'EON-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Guardamos los datos del pedido antes de vaciar
    this.orderNumber.set(orderId);
    this.orderDate.set(dateStr);
    this.orderTotal.set(this.cart.total());

    // Vaciamos el carrito
    this.cart.clear();

    // Avanzamos a la pantalla de éxito
    this.step.set('success');
  }

  // Volver a la tienda tras la compra
  resetFlow() {
    this.step.set('cart');
  }

  // Helper para calcular el total por línea
  lineTotal(precio: number | undefined | null, qty: number): number {
    return (precio ?? 0) * (qty ?? 0);
  }
}
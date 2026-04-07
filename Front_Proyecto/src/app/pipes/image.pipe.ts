import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'image',
  standalone: true
})
export class ImagePipe implements PipeTransform {
  
  private readonly backendBaseUrl = environment.backendBaseUrl;

  private readonly manualMap: Record<string, string> = {
    'Guernica': 'Guernica.jpg',
    'Máscara funeraria de Tutankamon': 'MascaraTutan-Kamon.jpg',
    'La creacion de Adán (Capilla Sixtina)': 'LaCreacionDeAdan.jpg',
    'Las Meninas': 'LasMeninas.jpg',
    'Pinturas rupestres de la Cueva de Altamira': 'altamira.jpg',
    'Laocoonte y sus hijos': 'Laocoonte.jpg',
    'Mosaico del Emperador Justiniano y su séquito (San Vital, Rávena)': 'MosaicoJustiniano.jpg',
    'David': 'David.jpg',
    'La Piedad de Villeneuve-les-Avignon': 'LaPiedadDeVilleneuve-les-Avignon.jpg',
    'El 3 de Mayo en Madrid (Los fusilamientos)': 'Fusilamiento.jpg',
    'La Libertad guiando al pueblo': 'LibertadGuiandoAlPueblo.jpg',
    'La persistencia de la memoria': 'LaPersistenciaDeLaMemoria.jpg',
    'El grito': 'ElGrito.jpg',
    'La noche estrellada': 'LaNocheEstrellada.jpg',
    'Impresión, sol naciente': 'ImpresionSolNaciente.jpg',
    'Fuente': 'Fountain.jpg',
    'Cena': 'DinnerParty.jpg',
    'Lo imposible': 'ElCorderoImposible.jpg',
    'Niña con globo': 'GirlWithBallon.jpg',
  };

  transform(value: any, type: 'obra' | 'user' = 'obra'): string {
    if (!value) {
      return type === 'user' ? 'assets/default-avatar.png' : 'assets/placeholder.jpg';
    }

    // Si ya es una URL absoluta, la devolvemos tal cual
    if (typeof value === 'string' && value.startsWith('http')) {
      return value;
    }

    // Caso para usuarios
    if (type === 'user') {
      const path = value.startsWith('/') ? value : `/${value}`;
      return `${this.backendBaseUrl}${path}`;
    }

    // Caso para obras
    // 1. Si la obra tiene el campo 'image' directo (desde DB)
    if (typeof value === 'object' && value.image) {
      const path = value.image.startsWith('/') ? value.image : `/${value.image}`;
      return `${this.backendBaseUrl}${path}`;
    }

    // 2. Si es por título (fallback histórico)
    const titulo = typeof value === 'string' ? value : (value.titulo || '');
    const file = this.manualMap[titulo] ?? (this.slugify(titulo) + '.jpg');
    
    return `${this.backendBaseUrl}/ImagenesDeObras/${file}`;
  }

  private slugify(input: string): string {
    return (input ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '')
      .trim();
  }
}

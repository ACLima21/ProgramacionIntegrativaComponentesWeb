// Paso 5 — Web Component <course-card>
class CourseCard extends HTMLElement {
  constructor() {
    super();

    // Leer los atributos del elemento
    const name    = this.getAttribute('name');
    const teacher = this.getAttribute('teacher');
    const credits = this.getAttribute('credits');

    // Generar la estructura interna
    this.innerHTML = `
      <article class="course-card">
        <h2>${name}</h2>
        <p>Docente: ${teacher}</p>
        <p>Créditos: ${credits}</p>
        <button>Ver detalle</button>
      </article>
    `;

    // Asociar el evento al botón interno
    this.querySelector('button').addEventListener('click', () => {
      alert(`Asignatura: ${name}\nCreditos: ${credits}`);
    });
  }
}

// Registrar el elemento personalizado
customElements.define('course-card', CourseCard);

// Paso 8 — Web Component <student-card>
class StudentCard extends HTMLElement {
  constructor() {
    super();

    // Leer los atributos del elemento
    const name   = this.getAttribute('name');
    const career = this.getAttribute('career');
    const level  = this.getAttribute('level');
    const grade  = this.getAttribute('grade');

    // Paso 10 — convertir a número y determinar el estado académico
    const gradeNum = parseFloat(grade);
    let status;
    if (gradeNum >= 16) {
      status = 'Destacado';
    } else if (gradeNum >= 14) {
      status = 'Aprobado';
    } else {
      status = 'Riesgo';
    }

    // Generar la estructura interna
    this.innerHTML = `
      <article class="student-card">
        <h2>${name}</h2>
        <p>Carrera: ${career}</p>
        <p>Nivel: ${level}</p>
        <p>Promedio: ${grade}</p>
        <p>Estado: ${status}</p>
        <button>Mostrar información</button>
      </article>
    `;

    // Asociar el evento al botón interno
    this.querySelector('button').addEventListener('click', () => {
      alert(`Estudiante: ${name}\nPromedio: ${grade}\nEstado: ${status}`);
    });
  }
}

// Registrar el elemento personalizado
customElements.define('student-card', StudentCard);

class ProductCard extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'price', 'stock'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  render() {
    const name = this.getAttribute('name') || 'Producto';
    const price = this.getAttribute('price') || '0';
    const stockValue = this.getAttribute('stock') || '0';
    const stock = Number(stockValue);
    const available = Number.isFinite(stock) && stock > 0;

    const article = document.createElement('article');
    article.className = 'product-card';

    const heading = document.createElement('h2');
    heading.textContent = name;

    const priceText = document.createElement('p');
    priceText.textContent = `Precio: $${price}`;

    const stockText = document.createElement('p');
    stockText.textContent = `Stock: ${stockValue}`;

    const status = document.createElement('p');
    status.className = available ? 'product-status available' : 'product-status unavailable';
    status.textContent = available ? 'Disponible' : 'Agotado';

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Comprar';
    button.disabled = !available;
    button.addEventListener('click', () => {
      const currentStock = Number(this.getAttribute('stock'));
      if (!Number.isFinite(currentStock) || currentStock <= 0) {
        return;
      }

      this.setAttribute('stock', String(Math.max(0, currentStock - 1)));
    });

    article.append(heading, priceText, stockText, status, button);
    this.replaceChildren(article);
  }
}

customElements.define('product-card', ProductCard);

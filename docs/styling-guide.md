# Guía de Estilos

## Sistema de Diseño

### Variables CSS
Ubicación: `src/App.css`

#### Colores
```css
--primary-color: #007bff;
--secondary-color: #6c757d;
--success-color: #28a745;
--danger-color: #dc3545;
--warning-color: #ffc107;
--info-color: #17a2b8;
```

#### Espaciado
```css
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
```

#### Tipografía
```css
--font-family: system-ui, -apple-system, sans-serif;
--font-size-sm: 0.875rem;
--font-size-md: 1rem;
--font-size-lg: 1.25rem;
--font-size-xl: 1.5rem;
```

### Temas
- Light Mode
- Dark Mode

### Componentes
Cada componente tiene:
1. Su propia carpeta
2. Archivo CSS dedicado
3. Nombres de clase específicos del componente

### Convenciones de Nombrado
- BEM (Block Element Modifier)
- Prefijos específicos por componente
- Nombres en inglés

### Responsive Design
- Mobile First
- Breakpoints estándar:
  - sm: 576px
  - md: 768px
  - lg: 992px
  - xl: 1200px

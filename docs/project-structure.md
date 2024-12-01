# Estructura del Proyecto

## Directorios Principales

```
daw-frontend/
├── src/
│   ├── components/
│   │   ├── auth/         # Componentes de autenticación (Login, Register, ProtectedRoute)
│   │   ├── dashboard/    # Componentes del dashboard
│   │   ├── features/     # Características principales
│   │   ├── layout/       # Componentes estructurales
│   │   ├── shared/       # Componentes reutilizables
│   │   └── Home/         # Página principal
│   ├── data/            # Datos JSON mock
│   ├── helpers/         # Utilidades y funciones auxiliares
│   └── styles/          # Estilos globales
├── docs/               # Documentación del proyecto
└── logs/              # Registro de cambios
```

## Componentes Principales

### Auth
- `Login`: Componente de inicio de sesión
- `Register`: Componente de registro de usuarios
- `ProtectedRoute`: Protección de rutas privadas

### Layout
- `Footer`: Pie de página global
- `Main`: Contenedor principal y rutas
- `Navbar`: Barra de navegación superior
- `Sidebar`: Menú lateral

### Features
1. Users
   - UserList
   - UserForm
   - UserProfile
2. Tables
   - TableList
   - TableForm
3. Reservations
   - ReservationList
   - ReservationForm
4. Restaurants
   - RestaurantList
   - RestaurantForm

### Shared Components
- Alert
- Button
- Card
- Input
- Loading
- Modal

## Rutas Principales
- `/`: Dashboard
- `/users`: Gestión de usuarios
- `/tables`: Gestión de mesas
- `/reservations`: Gestión de reservas
- `/restaurants`: Gestión de restaurantes

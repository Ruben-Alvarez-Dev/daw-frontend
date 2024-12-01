# Flujos de Trabajo

## Flujo de Autenticación
1. Usuario accede a la aplicación
2. Si no está autenticado, redirigir a /login
3. Login exitoso -> Redirigir a /dashboard
4. Token JWT almacenado en localStorage
5. Protección de rutas mediante ProtectedRoute

## Flujo de Reservas
1. Cliente selecciona restaurante
2. Elige fecha y hora
3. Selecciona mesa disponible
4. Confirma reserva
5. Recibe confirmación

## Flujo de Gestión de Mesas
1. Administrador accede a /tables
2. Puede ver, crear, editar o eliminar mesas
3. Asignación de mesas a restaurantes
4. Estado de mesas (libre/ocupada)

## Flujo de Gestión de Usuarios
1. Administrador accede a /users
2. CRUD de usuarios
3. Asignación de roles
4. Gestión de permisos

## Estados de Componentes
### Reserva
- Pendiente
- Confirmada
- Cancelada
- Completada

### Mesa
- Libre
- Reservada
- Ocupada
- Mantenimiento

### Usuario
- Activo
- Inactivo
- Bloqueado

## Manejo de Errores
1. Errores de red -> Retry automático
2. Errores de validación -> Feedback inmediato
3. Errores de servidor -> Mensaje al usuario
4. Timeout -> Reintentar conexión

## Optimizaciones
1. Lazy loading de componentes
2. Memorización de datos frecuentes
3. Caché de respuestas API
4. Debounce en búsquedas
5. Throttle en actualizaciones UI

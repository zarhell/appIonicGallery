# **appIonicGallery** - Aplicación de Gestión de Pacientes con Galería de Fotos

Este proyecto es una aplicación móvil basada en **Ionic React** que permite a los usuarios capturar fotos de pacientes, almacenar los datos de pacientes, gestionar registros clínicos y visualizar la ubicación de los traslados. La aplicación utiliza **Capacitor** para acceder a la funcionalidad nativa del dispositivo, incluyendo el acceso a la cámara, almacenamiento local y geolocalización.

## **Tabla de Contenidos**
- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Descripción de la Arquitectura](#descripción-de-la-arquitectura)
- [Instalación](#instalación)
- [Ejecutar la Aplicación](#ejecutar-la-aplicación)
- [Probar en el Emulador de Android](#probar-en-el-emulador-de-android)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

---

## **Características**
- Captura de fotos de pacientes usando la cámara del dispositivo.
- Almacenamiento de fotos en el sistema de archivos local.
- Registro y almacenamiento de datos clínicos de pacientes.
- Visualización de pacientes registrados.
- Gestión de ubicaciones de origen y destino usando geolocalización.
- UI responsiva utilizando componentes de Ionic.
- Uso de la Arquitectura Modular para código mantenible y escalable.

---

## **Estructura del Proyecto**

```bash
appIonicGallery/
├── android/                     # Código nativo de la plataforma Android
├── src/                         # Código fuente de la aplicación
│   ├── application/             # Capa de aplicación (configuración, casos de uso y servicios)
│   │   ├── config/
│   │   │   └── firebaseConfig.ts  # Configuración de Firebase para persistencia en la nube
│   │   ├── services/
│   │   │   ├── AuthService.ts     # Servicio de autenticación
│   │   │   ├── FirestoreService.ts# Servicio para manejar datos en Firestore
│   │   │   ├── GeolocationService.ts  # Servicio para obtener la ubicación del dispositivo
│   │   │   ├── LocalStorageService.ts # Servicio para gestionar almacenamiento local
│   │   │   ├── PhotoService.ts    # Servicio para interactuar con la cámara y el sistema de archivos
│   │   │   └── ReverseGeocodeService.ts # Servicio para convertir coordenadas en direcciones
│   │   └── use-cases/
│   │       ├── AddPhotoToGallery.ts  # Caso de uso para añadir una foto a la galería
│   │       └── GetPhotos.ts          # Caso de uso para obtener todas las fotos guardadas
│   ├── assets/                      # Activos estáticos (imágenes, íconos)
│   │   └── images/
│   ├── components/                  # Componentes de UI reutilizables
│   │   ├── AddPhotoButton.tsx       # Botón flotante para activar la cámara
│   │   ├── HeaderMenu.tsx           # Componente para gestionar la navegación en la aplicación
│   │   ├── PhotoGallery.tsx         # Componente de galería para mostrar las fotos
│   │   └── MapComponent.tsx         # Componente para gestionar la visualización del mapa
│   ├── domain/                      # Capa de dominio (entidades y repositorios)
│   │   ├── entities/
│   │   │   └── Photo.ts             # Definición de la entidad Foto
│   │   └── repositories/
│   │       └── PhotoRepository.ts   # Interfaz del repositorio para el almacenamiento de fotos
│   ├── infrastructure/              # Capa de infraestructura (API, implementación del almacenamiento)
│   │   ├── api/
│   │   └── storage/
│   │       └── LocalPhotoRepository.ts # Implementación de almacenamiento de fotos utilizando la API de Preferences
│   ├── presentation/                # Capa de presentación (componentes, páginas, rutas)
│   │   ├── components/
│   │   │   └── AddPhotoButton.tsx   # Botón flotante para activar la cámara
│   │   │   └── PhotoGallery.tsx     # Componente de galería para mostrar las fotos
│   │   ├── pages/
│   │   │   ├── Login.tsx            # Página de inicio de sesión
│   │   │   ├── MainPage.tsx         # Página principal con opciones de la aplicación
│   │   │   ├── RegisterPatient.tsx  # Página para registrar los datos del paciente
│   │   │   └── RegisteredPatients.tsx # Página para visualizar y gestionar pacientes registrados
│   │   └── routes/
│   │       └── AppRoutes.tsx        # Rutas de la aplicación para la navegación
│   ├── theme/                       # Estilos globales y específicos del tema
│   │   ├── variables.css
│   │   └── global.css
│   ├── App.tsx                      # Componente principal de la aplicación
│   ├── index.tsx                    # Punto de entrada para React
│   └── react-app-env.d.ts           # Configuración del entorno de TypeScript
├── capacitor.config.ts              # Archivo de configuración de Capacitor
├── package.json                     # Dependencias y scripts del proyecto
└── tsconfig.json 

---

## **Descripción de la Arquitectura Limpia**

Este proyecto sigue el modelo de **Clean Architecture**, un patrón de diseño que promueve la separación de responsabilidades mediante diferentes capas, lo que asegura que la lógica de negocio esté desacoplada de los detalles externos, como la UI o las fuentes de datos. A continuación, se describe cada capa:

1. **Capa de Dominio**:
   - Contiene la lógica de negocio central, incluyendo las **entidades** (como `Photo`) y las interfaces (**repositorios**) que definen cómo interactuar con las fuentes de datos.
   - Esta capa es independiente de cualquier framework o librería, lo que la hace reutilizable y fácil de probar.

2. **Capa de Aplicación**:
   - Contiene los **casos de uso**, que encapsulan las reglas de negocio específicas de la aplicación. Por ejemplo, `AddPhotoToGallery.ts` contiene la lógica para capturar y guardar fotos.
   - Los **servicios** en esta capa actúan como puente con la infraestructura (por ejemplo, interactuar con la cámara y el sistema de archivos usando Capacitor).

3. **Capa de Infraestructura**:
   - Proporciona implementaciones concretas de las interfaces definidas en la capa de dominio. En este proyecto, **`LocalPhotoRepository.ts`** implementa la interfaz `PhotoRepository`, almacenando fotos localmente mediante la API de **Preferences** de Capacitor.

4. **Capa de Presentación**:
   - La **capa de presentación** contiene los componentes de React y las páginas que conforman la UI de la aplicación. Componentes como **`AddPhotoButton.tsx`** y **`PhotoGallery.tsx`** son reutilizables, y **`Tab1.tsx`** los integra en una página funcional.

---

## **Instalación**

### Requisitos Previos:
- Node.js (Se recomienda la versión LTS)
- npm o yarn
- Ionic CLI
- Android Studio (para pruebas en Android)

### Pasos:
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-repo/appIonicGallery.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd appIonicGallery
   ```

3. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

---

## **Ejecutar la Aplicación**

Para ejecutar la aplicación en el navegador para propósitos de desarrollo:

```bash
ionic serve
```

Esto abrirá la aplicación en `http://localhost:8100` y recargará automáticamente los cambios.

---

## **Probar en el Emulador de Android**

Para probar la aplicación en un dispositivo o emulador Android:

1. Añade la plataforma Android:
   ```bash
   ionic cap add android
   ```

2. Sincroniza el proyecto de Capacitor:
   ```bash
   ionic cap sync
   ```

3. Abre el proyecto en Android Studio:
   ```bash
   ionic cap open android
   ```

4. Desde Android Studio, selecciona un dispositivo conectado o emulador, luego compila y ejecuta la app.

---

## **Tecnologías Utilizadas**
- **Ionic Framework**: Proporciona los componentes de UI y la estructura de la aplicación para construir apps móviles.
- **React**: Utilizado como la librería de UI para construir componentes reutilizables.
- **Capacitor**: Usado para acceder a funcionalidades nativas del dispositivo, como la cámara y el sistema de archivos.
- **TypeScript**: Añade seguridad de tipos y ayuda a construir código robusto y escalable.

---

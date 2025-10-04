# Parcial1_DesarrolloWeb

Repositorio que contiene el proyecto destinado al parcial 1 de desarrollo Web  
https://docs.google.com/document/d/1BKIKymI85kuoA2CztBO3JdkYLvvpL3XMIRIoNnqi0sE/edit?usp=drivesdk

## Link:
https://parcial1-desarrollo-web-seven.vercel.app/

## Integrantes:
- Juan Arevalo (192389)
- Isaac Garcia (192535)

---

## Descripción del proyecto

Este proyecto está inspirado en una página de videojuegos, la cual tiene las siguientes funcionalidades principales:

- **Base de datos proveniente de Steam:**  
  Todos los juegos que ves en esta página web se importan en tiempo real desde la base de datos de Steam usando la API pública y un archivo `gameList.json` con los AppID de referencia.

- **Registro e inicio de sesión:**  
  Es posible crear una cuenta y acceder con ella. Existen credenciales por defecto almacenadas en `defaultCredentials.json` que se cargan automáticamente si no hay usuarios registrados. Cada usuario tiene nombre, edad, email, contraseña y una biblioteca de juegos (AppIDs).

- **Compra de videojuegos:**  
  Puedes comprar cualquier videojuego mostrado en la web. Para comprar es necesario iniciar sesión. Al comprar, el juego se añade a la biblioteca del usuario en el LocalStorage.

- **Guardado en el LocalStorage:**  
  Todas las credenciales y bibliotecas de usuario se almacenan en el LocalStorage y pueden modificarse al comprar juegos.

- **Reestablecimiento de las credenciales:**  
  Es posible reestablecer todas las cuentas y cambios realizados, volviendo a las credenciales por defecto.

---

## Estructura y modularización del proyecto

El proyecto está organizado en carpetas separando HTML, CSS, JS y datos:

```
/components      -> Fragmentos HTML reutilizables (header, footer)
  header.html
  footer.html

/data            -> Archivos JSON con datos externos
  defaultCredentials.json
  gameList.json

/JS              -> Lógica JavaScript
  biblioteca.js
  dataManager.js
  game.js
  login.js
  productos.js
  registro.js
  settings.js
  /components
    header.js
    setComponents.js

/CSS             -> Estilos CSS
  header.css
  footer.css
  generalStyles.css
  form.css

/pages           -> Páginas HTML principales
  biblioteca.html
  game.html
  login.html
  productos.html
  registro.html
  settings.html

index.html       -> Página principal
README.md        -> Documentación del proyecto
```

---

## Modularización y Componentización

### Fragmentos reutilizables

- **Header y Footer:**  
  Los archivos `header.html` y `footer.html` en `/components` son fragmentos HTML que se cargan dinámicamente en cada página usando JavaScript (`setComponents.js`).  
  Esto permite mantener una sola versión de cada componente y facilita el mantenimiento.

- **Carga dinámica:**  
  El archivo `JS/components/setComponents.js` se encarga de insertar los fragmentos en los contenedores `<div id="header"></div>` y `<div id="footer"></div>` de cada página.

### Uso de plantillas (`<template>`)

- En `header.html` se utiliza un `<template id="link-template">` para definir la estructura de los enlaces de navegación.  
  La clase `headerComponent` en `header.js` clona este template y genera los enlaces dinámicamente según el usuario y la navegación.

- En la página `biblioteca.html` se utiliza un `<template id="game-template">` para definir la estructura de cada juego mostrado en la biblioteca del usuario.  
  El archivo `biblioteca.js` clona este template por cada juego en la biblioteca del usuario logueado, rellenando dinámicamente la imagen, el título y el enlace a la página de detalles del juego.

```html
<template id="game-template">
    <div class="game-card">
        <img class="game-card__image" />
        <h3 class="game-card__title"></h3>
        <a class="game-card__link" href="#">Ver más</a>
    </div>
</template>

- En las páginas de productos y juegos se usan plantillas y componentes personalizados para mostrar la información de cada juego.

### Web Components personalizados

- Se implementó un componente web `<mi-game>` (en productos.js) que recibe atributos como título, imagen y precio, encapsulando su estructura y estilos.

### Uso de datos externos con fetch

- Los juegos se cargan dinámicamente desde el archivo `data/gameList.json` usando la API Fetch en JavaScript.
- Las credenciales por defecto se cargan desde `data/defaultCredentials.json` al iniciar la aplicación si no existen usuarios en LocalStorage.

---

## Formulario de inicio de sesión

- **Validación:**  
  El formulario de login valida el usuario y contraseña contra los datos almacenados en LocalStorage.  
  Si el login es correcto, redirige al usuario a la página principal; en caso contrario, muestra un mensaje de error.

- **Registro:**  
  El formulario de registro permite crear nuevos usuarios, validando que el correo no esté registrado y que las contraseñas coincidan.

> **Nota:**  
> El sistema de autenticación es solo con fines educativos y no es seguro para aplicaciones reales.

---

## Compra y biblioteca de juegos

- Al presionar el botón "Comprar" en la página de un juego, el AppID del juego se añade a la biblioteca del usuario logueado en LocalStorage.
- Cada usuario tiene su propia biblioteca, que puede consultarse en la página `biblioteca.html`.

---

## Reestablecimiento de credenciales

- Existe una opción para restaurar las credenciales y bibliotecas a los valores por defecto definidos en `defaultCredentials.json`.

---

## Paleta de colores

- color-bg: #171a21;
- color-panel: #1b2838;
- color-border: #2a475e;
- color-accent: #66c0f4;
- color-success: #5c7e10;
- color-text: #c6d4df;
- color-muted: #8f98a0;
- color-hover: #417a9b;

---

## Buenas prácticas aplicadas

- **Nombres consistentes:**  
  Uso de camelCase para variables y funciones en JS, y kebab-case para clases CSS.
- **Separación de responsabilidades:**  
  HTML, CSS y JS están claramente separados en carpetas y archivos.
- **Componentización:**  
  Uso de fragmentos, plantillas y Web Components para reutilización y mantenimiento.
- **Código comentado y documentado:**  
  Se incluyen comentarios y documentación en el código y este README.
- **Colaboración:**  
  El repositorio muestra commits, ramas y pull requests de ambos integrantes.

---

## Explicación de fragmentos, plantillas y Web Components

- **Fragmentos:**  
  Son partes de HTML (como header y footer) que se cargan dinámicamente en las páginas para evitar duplicación de código.

- **Plantillas (`<template>`):**  
  Permiten definir estructuras HTML reutilizables que se clonan y personalizan desde JavaScript.

- **Web Components:**  
  Son elementos personalizados (como `<mi-game>`) que encapsulan estructura y estilos, facilitando la reutilización y el mantenimiento.

---

## Evidencia de colaboración

- El repositorio contiene commits y contribuciones de ambos integrantes, siguiendo buenas prácticas de trabajo colaborativo en GitHub.

---

## Sustentación

- La aplicación será presentada mostrando su funcionamiento, la estructura modular, la carga dinámica de componentes, el uso de plantillas y Web Components, y la gestión de usuarios y biblioteca

---

## Proceso de Desarrollo y Mejoras Implementadas

### Fase 1: Análisis y Estructuración Inicial
**Objetivo:** Comprender la estructura del proyecto y establecer bases sólidas

1. **Revisión de la arquitectura existente**
   - Análisis de la estructura de carpetas y archivos
   - Identificación de componentes HTML, CSS y JavaScript
   - Evaluación del flujo de navegación entre páginas
   - Comprensión del sistema de autenticación con LocalStorage

2. **Identificación de áreas de mejora**
   - Diseño visual inconsistente
   - Falta de una paleta de colores cohesiva
   - Necesidad de mejoras en la experiencia de usuario
   - Ausencia de efectos visuales modernos

### Fase 2: Implementación de la Paleta Steam
**Objetivo:** Crear una identidad visual consistente inspirada en Steam

3. **Definición de variables CSS globales**
   - Establecimiento de la paleta de colores Steam en `:root`
   - Variables para background, panels, borders, accent colors
   - Definición de colores para estados (hover, success, error)

4. **Aplicación sistemática de colores**
   - Reemplazo de colores hardcodeados por variables CSS
   - Implementación consistente en todos los componentes
   - Creación de gradientes y efectos visuales Steam-themed

### Fase 3: Desarrollo de Componentes de Tarjetas
**Objetivo:** Crear tarjetas de juegos visualmente atractivas y funcionales

5. **Diseño de tarjetas cuadradas para productos**
   - Implementación de dimensiones fijas (320x420px)
   - Estructura con imagen, información y precio
   - Aplicación de bordes, sombras y efectos de profundidad

6. **Efectos interactivos avanzados**
   - Animaciones hover con transform y scale
   - Efectos de brillo al hacer clic (cardGlow animation)
   - Transiciones suaves para mejor experiencia de usuario
   - Marcos interiores para mayor definición visual

7. **Integración con Shadow DOM**
   - Creación de estilos específicos para Web Components
   - Encapsulación de estilos dentro del Shadow DOM
   - Manejo de object-fit para imágenes de Steam

### Fase 4: Sistema de Autenticación Visual
**Objetivo:** Crear páginas de login y registro con diseño moderno

8. **Implementación de glassmorphism**
   - Formularios con backdrop-filter y transparencias
   - Efectos de cristal esmerilado con blur
   - Sombras múltiples para profundidad visual

9. **Animaciones de entrada y interacción**
   - fadeInUp animation para el contenedor principal
   - formSlideIn para formularios
   - Efectos hover con elevación y escalado
   - Animaciones de pulso para botones

10. **Títulos externos con iconografía**
    - Posicionamiento de títulos fuera de formularios
    - Integración de iconos gaming (🎮)
    - Gradientes de texto con Steam colors
    - Líneas decorativas animadas con keyframes

### Fase 5: Página de Configuración Profesional
**Objetivo:** Diseñar interfaz de settings con estética Steam

11. **Contenedores de opciones estilizados**
    - Backgrounds con transparencias Steam
    - Bordes y efectos de hover coherentes
    - Animaciones slideInUp escalonadas

12. **Botones temáticos específicos**
    - Botón de cerrar sesión con colores de alerta
    - Botón de restablecer con colores de advertencia
    - Efectos de brillo y elevación en interacciones

### Fase 6: Página de Detalles del Juego
**Objetivo:** Crear página de compra atractiva y funcional

13. **Layout de contenido del juego**
    - Contenedor principal con tema oscuro Steam
    - Estructura jerárquica de información
    - Integración de imágenes background y thumbnail

14. **Optimización de imágenes**
    - Configuración de object-fit para mostrar títulos completos
    - Ajuste de proporciones para mejor visualización
    - Backgrounds Steam para espacios vacíos

15. **Botón de compra destacado**
    - Diseño prominent con colores Steam success
    - Animaciones de compra (buyPulse effect)
    - Efectos de brillo deslizante en hover

### Fase 7: Priorización Visual y Layout
**Objetivo:** Establecer jerarquía visual correcta

16. **Sistema de z-index organizado**
    - Header con máxima prioridad (z-index: 9999)
    - Footer estático sin interferir con navegación
    - Contenido principal con niveles apropiados

17. **Layout responsive completo**
    - Breakpoints para tablet (768px) y móvil (480px)
    - Ajustes de dimensiones y espaciado
    - Tipografía escalable según dispositivo

### Fase 8: Consolidación y Optimización
**Objetivo:** Simplificar estructura y mejorar mantenimiento

18. **Consolidación de archivos CSS**
    - Migración de múltiples archivos CSS a generalStyles.css
    - Eliminación de archivos redundantes
    - Mantenimiento de form.css para funcionalidad específica

19. **Actualización de referencias**
    - Modificación de enlaces HTML para nueva estructura
    - Actualización de imports en Web Components
    - Verificación de integridad de rutas

20. **Corrección de compatibilidad**
    - Adición de propiedades CSS estándar
    - Corrección de line-clamp y background-clip
    - Validación de sintaxis CSS

### Resultados Finales Alcanzados

**Mejoras Visuales:**
- Identidad visual Steam cohesiva en todo el proyecto
- Tarjetas de juegos con efectos interactivos avanzados
- Páginas de autenticación con diseño glassmorphism moderno
- Interfaz de configuración profesional y usable

**Mejoras Técnicas:**
- Código CSS organizado y mantenible
- Variables globales para fácil personalización
- Animaciones y transiciones fluidas
- Diseño responsive completamente funcional

**Mejoras de Experiencia:**
- Navegación visual clara con header prioritario
- Efectos de feedback inmediato en interacciones
- Layout adaptativo para todos los dispositivos
- Consistencia visual entre todas las páginas

**Optimizaciones de Rendimiento:**
- Reducción de archivos CSS de carga
- Consolidación de estilos relacionados
- Eliminación de código redundante
- Estructura de archivos más limpia

---

## Fase 9: Desarrollo del Apartado Biblioteca Personalizado
**Objetivo:** Crear una sección única y especializada para la biblioteca de juegos del usuario

### Análisis del Apartado Biblioteca Existente

21. **Revisión de la funcionalidad biblioteca**
    - Identificación de archivos: `pages/biblioteca.html` y `JS/biblioteca.js`
    - Comprensión del flujo: obtener usuario → acceder biblioteca → mostrar juegos
    - Análisis del sistema de templates HTML para tarjetas de juego

22. **Evaluación de necesidades específicas**
    - La biblioteca requería diseño distintivo del resto de páginas
    - Necesidad de estilos únicos sin modificar código JavaScript interno
    - Oportunidad de crear experiencia visual especializada

### Implementación del CSS Biblioteca Único

23. **Creación de `biblioteca.css` independiente**
    - Desarrollo de archivo CSS completamente separado
    - Variables Steam personalizadas específicas para biblioteca
    - Mantenimiento de compatibilidad con estructura HTML existente

24. **Diseño visual especializado para biblioteca personal**
    - Título principal con emoji de libro (📚) y efectos de gradiente
    - Paleta de colores Steam optimizada para contexto de biblioteca
    - Background con múltiples gradientes radiales y lineales

25. **Sistema de tarjetas optimizado para colección personal**
    - Dimensiones ajustadas (300x380px) para mejor visualización
    - Grid responsivo con `auto-fill` y `minmax` para adaptabilidad
    - Efectos hover más pronunciados para sensación de propiedad

### Efectos Visuales Avanzados Específicos

26. **Animaciones personalizadas para biblioteca**
    - `float` animation para el emoji del título principal
    - `libraryPulse` effect exclusivo para interacciones de biblioteca
    - Transiciones de 0.4s para sensación más fluida

27. **Sistema de capas visuales con z-index**
    - Pseudo-elementos `::before` con gradientes superpuestos
    - Efectos de profundidad con múltiples sombras
    - Backdrop-filter blur para efecto de cristal esmerilado

28. **Interacciones mejoradas para colección personal**
    - Transform combinado: `translateY(-12px) scale(1.03)` en hover
    - Escalado de imágenes interno (`scale(1.08)`) para dinamismo
    - Efectos de brillo y color en títulos al interactuar

### Características Técnicas Implementadas

29. **Variables CSS especializadas**
    ```css
    --card-width: 300px;
    --card-height: 380px;
    --image-height: 180px;
    --border-radius: 12px;
    ```
    - Dimensiones optimizadas para visualización de biblioteca
    - Flexibilidad para futuros ajustes de diseño

30. **Sistema responsive adaptado**
    - Breakpoints específicos: 768px (tablet) y 480px (móvil)
    - Grid que se adapta de múltiples columnas a una sola
    - Ajustes de altura y espaciado por dispositivo

31. **Estados adicionales incluidos**
    - `.library-stats` para mostrar estadísticas de biblioteca
    - `.empty-library` para cuando no hay juegos comprados
    - Enlaces a página de productos desde biblioteca vacía

### Actualización de Referencias

32. **Modificación de `biblioteca.html`**
    - Reemplazo de `generalStyles.css` por `biblioteca.css`
    - Actualización del título: "Mi Biblioteca - Game Zone"
    - Mantenimiento de toda la funcionalidad JavaScript existente

33. **Preservación de funcionalidad interna**
    - Sin modificaciones en `biblioteca.js`
    - Compatibilidad total con sistema de templates
    - Respeto a la estructura de componentes existente

### Resultados del Apartado Biblioteca

**Diseño Único y Especializado:**
- Identidad visual distintiva para la biblioteca personal
- Efectos visuales que transmiten sensación de colección
- Paleta Steam optimizada para contexto de propiedad

**Funcionalidad Preservada:**
- Código JavaScript interno sin modificaciones
- Sistema de templates completamente funcional
- Integración perfecta con Steam API y LocalStorage

**Experiencia de Usuario Mejorada:**
- Navegación más intuitiva con diseño especializado
- Feedback visual inmediato en interacciones
- Responsive design completo para todos los dispositivos

**Mantenimiento Simplificado:**
- Archivo CSS independiente para fácil customización
- Variables organizadas para ajustes rápidos
- Separación clara entre biblioteca y otras secciones

Esta implementación demuestra la capacidad de crear módulos visuales especializados sin alterar la lógica de negocio, siguiendo principios de separación de responsabilidades y mantenibilidad del código.




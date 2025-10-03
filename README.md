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




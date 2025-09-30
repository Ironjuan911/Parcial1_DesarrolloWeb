# Parcial1_DesarrolloWeb
Repositorio que contiene el proyecto destinado al parcial 1 de desarrollo Web
https://docs.google.com/document/d/1BKIKymI85kuoA2CztBO3JdkYLvvpL3XMIRIoNnqi0sE/edit?usp=drivesdk

## Integrantes:
- Juan Arevalo (192389)
- Isaac Garcia (192535)

## Paleta de colores:
- color-bg: #171a21;
- color-panel: #1b2838;
- color-border: #2a475e;
- color-accent: #66c0f4;
- color-success: #5c7e10;

- color-text: #c6d4df;
- color-muted: #8f98a0;
- color-hover: #417a9b;

## Componentes

### Header
El header de este proyecto está diseñado de forma componentizada, separando la estructura HTML, la lógica JavaScript y los estilos CSS en archivos independientes. Esto facilita la reutilización, el mantenimiento y la escalabilidad del código.

#### Componentización por fragmentos y plantillas

- **Fragmentos HTML:**  
  El archivo `components/header.html` contiene únicamente el fragmento de HTML correspondiente al encabezado del sitio, incluyendo un `<template>` para los enlaces de navegación.

- **Lógica JS:**  
  El archivo `JS/components/header.js` contiene la clase `headerComponent`, responsable de poblar dinámicamente el menú de navegación utilizando el template definido en el HTML.

- **Carga Dinámica:**  
  El archivo `JS/components/setComponents.js` se encarga de cargar el fragmento HTML del header en el contenedor correspondiente (`<div id="header"></div>`) de cada página, y luego inicializa la lógica del componente.

#### Uso de plantillas (templates)

Se utiliza un `<template>` en el HTML del header para definir la estructura de los enlaces de navegación:

```html
<template id="link-template">
    <a id="content_"></a>
</template>


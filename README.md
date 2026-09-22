# Mujeres desminadoras

Especial multimedia sobre mujeres desminadoras, víctimas de minas antipersonal y el avance del desminado humanitario en Colombia.

El proyecto fue desarrollado a partir del diseño suministrado en Adobe XD, conservando su estructura visual, recursos gráficos, tipografías, colores e interacciones principales.

## Tecnologías

- HTML5 semántico.
- CSS3 responsive.
- JavaScript vanilla.
- Adobe Fonts / Typekit para las tipografías definidas en el diseño.
- Visualizaciones de Flourish integradas mediante `<iframe>`.
- Recursos gráficos en formatos WebP y PNG.
- Sin frameworks de frontend.

## Estructura

```txt
.
├── index.html
├── assets/
│   ├── banner-inicio.webp
│   ├── Grafico1_fondo-D.png
│   ├── Grafico1_Mapa-D.png
│   ├── Grafico1_cifras-D.png
│   ├── Grafico4-D.png
│   ├── natalia-gonzalez.webp
│   ├── yessica-espinosa.webp
│   ├── dewadhy-zuliem-melo.webp
│   ├── alberto-ortiz.webp
│   └── gundiralbo-morales.webp
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── .gitignore
└── README.md
```

## Implementación

La página está construida como una experiencia editorial de una sola vista. El contenido se organiza en bloques de texto, gráficos, visualizaciones externas y galerías de protagonistas, siguiendo la composición y las proporciones definidas en Adobe XD.

El histórico de víctimas de minas antipersonal se compone actualmente mediante tres capas gráficas superpuestas:

1. `Grafico1_fondo-D.png`: base general del gráfico.
2. `Grafico1_Mapa-D.png`: mapa de Colombia por departamentos.
3. `Grafico1_cifras-D.png`: cifras de víctimas por departamento.

Por el momento el mapa se mantiene estático. El archivo `js/main.js` queda disponible para incorporar posteriormente interacciones adicionales sin modificar la estructura principal del proyecto.

Las visualizaciones **Víctimas civiles y fuerza pública** y **Víctimas civiles por género** se integran desde Flourish mediante `iframe`.

## Diseño y tipografías

Los estilos visuales se basan en las especificaciones suministradas desde Adobe XD. El archivo `css/styles.css` contiene las variables de color, familias tipográficas, tamaños, pesos, interlineados y estilos de carácter utilizados en la página.

Las fuentes se cargan mediante Adobe Fonts / Typekit:

```html
<link rel="stylesheet" href="https://use.typekit.net/unh4ecg.css">
```

Typekit se encarga de cargar las familias tipográficas; el CSS del proyecto define cómo se utilizan dentro de cada componente y sección.

## Enlaces e interacciones

La sección final incluye enlaces sobre los cuadros de nombre de las protagonistas. Los enlaces cuentan con un estado `hover` que reproduce el cambio visual definido en Adobe XD y se abren en una nueva pestaña.

Actualmente:

- Natalia González, Yessica Espinosa y Dewadhy Zuliem Melo enlazan a sus notas correspondientes.
- Alberto Ortiz y Gundiralbo Morales utilizan temporalmente `https://www.google.com/` mientras se definen sus URLs finales.

## Consideraciones

- Los recursos utilizados por la página se concentran en la carpeta `assets/`.
- La implementación evita dependencias y frameworks innecesarios para mantener el código simple, legible y fácil de mantener.
- Se utilizan etiquetas semánticas, textos alternativos en imágenes y atributos `aria` en los elementos interactivos principales.
- Los enlaces externos que abren una nueva pestaña incluyen `rel="noopener noreferrer"`.

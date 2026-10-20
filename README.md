# Mujeres desminadoras

Especial multimedia sobre mujeres desminadoras, víctimas de minas antipersonal y el avance del desminado humanitario en Colombia.

El proyecto fue desarrollado a partir del diseño suministrado en Adobe XD, conservando su estructura visual, recursos gráficos, tipografías, colores e interacciones principales.

## Tecnologías

- HTML5 semántico.
- CSS3 responsive.
- JavaScript vanilla.
- Adobe Fonts / Typekit para las tipografías definidas en el diseño.
- Visualizaciones de Flourish integradas mediante `<iframe>`.
- Recursos gráficos en formatos WebP, svg, png y jpg.
- Sin frameworks de frontend.

## Estructura

```txt
.
├── index.html
├── assets/
│   ├── social/
│   │   ├── facebook.svg
│   │   ├── twitter.svg
│   │   └── whatsapp.svg
│   ├── banner-inicio.jpg
│   ├── banner-inicio-M.jpg
│   ├── Grafico1_fondo-D.png
│   ├── Grafico1_Mapa-D.png
│   ├── Grafico1_cifras-D.png
│   ├── Grafico1_Mapa-D-M.png
│   ├── Grafico4-D.png
│   ├── Grafico4-D-M.png
│   ├── natalia-gonzalez.webp
│   ├── NataliaBoton-M.png
│   ├── yessica-espinosa.webp
│   ├── YessicaBoton-M.png
│   ├── dewadhy-zuliem-melo.webp
│   ├── DewadhyBoton-M.png
│   ├── alberto-ortiz.webp
│   ├── AlbertoBoton-M.png
│   ├── gundiralbo-morales.webp
│   ├── GundiralboBoton-M.png
│   └── VictimasDeptoCurvas.svg
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
3. `VictimasDeptoCurvas.svg`: contiene las cifras de víctimas por departamento. (aparecen al dar click.)

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

- Natalia González, Yessica Espinosa y Dewadhy Zuliem Melo enlazan a sus notas correspondientes. (Articulos estilizadas de acuerdo al Adobe XD).
- Alberto Ortiz y Gundiralbo Morales utilizan temporalmente `https://www.google.com/` mientras se definen sus URLs finales.


// Interacciones del mapa.
/*
const mapa = document.getElementById("map-stage");
const datos = document.getElementById("map-datos");

mapa.addEventListener("click", function () {

  if (datos.style.display === "block") {
    datos.style.display = "none";
  } else {
    datos.style.display = "block";
  }

});*/

document.addEventListener("DOMContentLoaded", () => {

  // REDES SOCIALES

  const pagina = document.querySelector(".site-main");

  if (pagina) {

    const url = encodeURIComponent(
      pagina.dataset.shareUrl || location.href
    );

    const enlaces = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}`,
      whatsapp: `https://wa.me/?text=${url}`
    };

    pagina.querySelectorAll("[data-red]").forEach(link => {

      const red = link.dataset.red;

      if (!enlaces[red]) {
        return;
      }

      link.href = enlaces[red];
      link.target = "_blank";
      link.rel = "noopener noreferrer";

    });

  }


  // MAPA INTERACTIVO


  // DATOS DE VÍCTIMAS POR DEPARTAMENTO

  const datosDepartamentos = {

    TOL: 539,
    CUN: 141,
    VDC: 284,
    ANT: 2693,
    ARA: 666,
    ATL: 8,
    BOL: 686,
    BOY: 78,
    CAL: 171,
    CAQ: 954,
    CAS: 91,
    CAU: 745,
    NAR: 1182,
    NDS: 1001,
    SAN: 306,
    PUT: 463,
    QUI: 28,
    SUC: 78,
    VAU: 44,
    AMA: 4,
    VIC: 17,
    CES: 157,
    CHO: 266,
    COR: 284,
    GUI: 3,
    GUV: 275,
    HUI: 242,
    GUA: 59,
    MAG: 46,
    MET: 1153,
    RIS: 22,
    BOG: 30

  };


  // =========================================================
  // POSICIÓN MANUAL DE LOS NÚMEROS
  //
  // x positivo  = derecha
  // x negativo  = izquierda
  //
  // y positivo  = abajo
  // y negativo  = arriba
  //
  // Con x: 0, y: 0 se conserva la posición automática
  // que tenía actualmente cada número.
  // =========================================================

  const posicionesNumeros = {

    TOL: { x: 9, y: 19 },
    CUN: { x: -7, y: -26 },
    VDC: { x: 0, y: 18 },
    ANT: { x: 6, y: 30 },
    ARA: { x: -4, y: -6 },
    ATL: { x: -2, y: -6 },
    BOL: { x: 22, y: 26 },
    BOY: { x: 0, y: 0 },
    CAL: { x: 0, y: 0 },
    CAQ: { x: 0, y: 0 },
    CAS: { x: 0, y: 0 },
    CAU: { x: 0, y: 0 },
    NAR: { x: 0, y: 0 },
    NDS: { x: 0, y: 0 },
    SAN: { x: 0, y: 0 },
    PUT: { x: 0, y: 0 },
    QUI: { x: 0, y: 0 },
    SUC: { x: 0, y: 0 },
    VAU: { x: 0, y: 0 },
    AMA: { x: 0, y: 0 },
    VIC: { x: 0, y: 0 },
    CES: { x: 0, y: 0 },
    CHO: { x: 0, y: 0 },
    COR: { x: 0, y: 0 },
    GUI: { x: 0, y: 0 },
    GUV: { x: 0, y: 0 },
    HUI: { x: 0, y: 0 },
    GUA: { x: 0, y: 0 },
    MAG: { x: 0, y: 0 },
    MET: { x: 0, y: 0 },
    RIS: { x: 0, y: 0 },
    BOG: { x: 0, y: 0 }

  };


  // NOMBRES DE LOS DEPARTAMENTOS

  const nombresDepartamentos = {

    TOL: "Tolima",
    CUN: "Cundinamarca",
    VDC: "Valle del Cauca",
    ANT: "Antioquia",
    ARA: "Arauca",
    ATL: "Atlántico",
    BOL: "Bolívar",
    BOY: "Boyacá",
    CAL: "Caldas",
    CAQ: "Caquetá",
    CAS: "Casanare",
    CAU: "Cauca",
    NAR: "Nariño",
    NDS: "Norte de Santander",
    SAN: "Santander",
    PUT: "Putumayo",
    QUI: "Quindío",
    SUC: "Sucre",
    VAU: "Vaupés",
    AMA: "Amazonas",
    VIC: "Vichada",
    CES: "Cesar",
    CHO: "Chocó",
    COR: "Córdoba",
    GUI: "Guainía",
    GUV: "Guaviare",
    HUI: "Huila",
    GUA: "La Guajira",
    MAG: "Magdalena",
    MET: "Meta",
    RIS: "Risaralda",
    BOG: "Bogotá D.C."

  };


  // CONTENEDOR DEL SVG

  const contenedorMapa =
    document.getElementById("map-svg-layer");


  if (!contenedorMapa) {

    console.error(
      "No se encontró el elemento #map-svg-layer"
    );

    return;

  }


  // NAMESPACE SVG

  const namespaceSVG =
    "http://www.w3.org/2000/svg";


  // CARGAR SVG

  fetch("assets/VictimasDeptoCurvas.svg")

    .then(respuesta => {

      if (!respuesta.ok) {

        throw new Error(
          `No fue posible cargar el SVG. Código: ${respuesta.status}`
        );

      }

      return respuesta.text();

    })


    .then(svgTexto => {


      // CONVERTIR ARCHIVO SVG A DOCUMENTO

      const parser =
        new DOMParser();


      const documentoSVG =
        parser.parseFromString(
          svgTexto,
          "image/svg+xml"
        );


      // COMPROBAR QUE EL SVG SEA VÁLIDO

      const errorParser =
        documentoSVG.querySelector("parsererror");


      if (errorParser) {

        throw new Error(
          "El archivo SVG no pudo interpretarse correctamente."
        );

      }


      // CAPA ORIGINAL DE LOS DEPARTAMENTOS

      const layerDepartamentos =
        documentoSVG.querySelector("#Layer_5");


      if (!layerDepartamentos) {

        throw new Error(
          "No se encontró #Layer_5 dentro del SVG."
        );

      }


      // CREAR SVG NUEVO

      const svgMapa =
        document.createElementNS(
          namespaceSVG,
          "svg"
        );


      svgMapa.setAttribute(
        "width",
        "100%"
      );


      svgMapa.setAttribute(
        "height",
        "100%"
      );


      svgMapa.setAttribute(
        "preserveAspectRatio",
        "xMidYMid meet"
      );


      // CAPA DE DEPARTAMENTOS
      //
      // Las figuras son transparentes,
      // pero detectan el clic.

      const capaDepartamentos =
        document.createElementNS(
          namespaceSVG,
          "g"
        );


      capaDepartamentos.setAttribute(
        "id",
        "departamentos-click"
      );


      svgMapa.appendChild(
        capaDepartamentos
      );


      // COPIAR LOS DEPARTAMENTOS

      Object.keys(datosDepartamentos)
        .forEach(idDepartamento => {


          const departamentoOriginal =
            layerDepartamentos.querySelector(
              `#${idDepartamento}`
            );


          if (!departamentoOriginal) {

            console.warn(
              `No se encontró el departamento ${idDepartamento} en el SVG.`
            );

            return;

          }


          // Clonamos la geometría original

          const departamento =
            departamentoOriginal.cloneNode(true);


          // Clase para manejar estilos

          departamento.classList.add(
            "departamento-click"
          );


          // FIGURAS QUE FORMAN EL DEPARTAMENTO

          const figuras =
            departamento.querySelectorAll(
              "path, polygon, rect, circle, ellipse"
            );


          figuras.forEach(figura => {

            /*
              La forma existe pero no se ve.

              IMPORTANTE:
              el fill transparente permite detectar
              el clic dentro de la geometría.
            */

            figura.style.fill =
              "transparent";


            /*
              La zona clickeable corresponde a la
              forma real del departamento.
            */

            figura.style.pointerEvents =
              "fill";


            /*
              Evita que el grosor del contorno cambie
              cuando el SVG aumenta o disminuye.
            */

            figura.setAttribute(
              "vector-effect",
              "non-scaling-stroke"
            );


            figura.setAttribute(
              "stroke-linejoin",
              "round"
            );


            figura.setAttribute(
              "stroke-linecap",
              "round"
            );

          });


          departamento.style.cursor =
            "pointer";


          /*
            Quitamos el rectángulo de foco
            que dibuja el navegador.
          */

          departamento.style.outline =
            "none";


          capaDepartamentos.appendChild(
            departamento
          );


        });


      // CAPA PARA LOS NÚMEROS

      const capaNumeros =
        document.createElementNS(
          namespaceSVG,
          "g"
        );


      capaNumeros.setAttribute(
        "id",
        "capa-numeros-interactivos"
      );


      svgMapa.appendChild(
        capaNumeros
      );


      // INSERTAR SVG

      contenedorMapa.innerHTML = "";


      contenedorMapa.appendChild(
        svgMapa
      );


      // AJUSTAR VIEWBOX AL MAPA

      const cajaMapa =
        capaDepartamentos.getBBox();


      svgMapa.setAttribute(
        "viewBox",
        `${cajaMapa.x} ${cajaMapa.y} ${cajaMapa.width} ${cajaMapa.height}`
      );


      // OBTENER DEPARTAMENTOS

      const departamentos =
        Array.from(
          capaDepartamentos.children
        ).filter(elemento => {

          return (
            elemento.tagName.toLowerCase() === "g" &&
            elemento.id
          );

        });


      // CONFIGURAR INTERACCIONES

      departamentos.forEach(
        departamento => {


          const idDepartamento =
            departamento.id;


          const nombreDepartamento =
            nombresDepartamentos[idDepartamento]
            || idDepartamento;


          // ACCESIBILIDAD

          departamento.setAttribute(
            "role",
            "button"
          );


          departamento.setAttribute(
            "tabindex",
            "0"
          );


          departamento.setAttribute(
            "aria-label",
            `${nombreDepartamento}: mostrar número de víctimas`
          );


          // CLIC

          departamento.addEventListener(
            "click",
            () => {

              alternarNumero(
                departamento,
                idDepartamento,
                capaNumeros
              );

            }
          );


          // TECLADO

          departamento.addEventListener(
            "keydown",
            evento => {


              if (
                evento.key === "Enter" ||
                evento.key === " "
              ) {


                evento.preventDefault();


                alternarNumero(
                  departamento,
                  idDepartamento,
                  capaNumeros
                );


              }


            }
          );


        }
      );


    })


    // ERROR

    .catch(error => {

      console.error(
        "Error cargando el mapa SVG:",
        error
      );

    });



  // FUNCIÓN MOSTRAR / OCULTAR NÚMERO

  function alternarNumero(
    departamento,
    idDepartamento,
    capaNumeros
  ) {


    const idNumero =
      `numero-${idDepartamento}`;


    const numeroExistente =
      capaNumeros.querySelector(
        `#${idNumero}`
      );


    // SI YA ESTÁ ACTIVO:
    // QUITAR NÚMERO Y CONTORNO

    if (numeroExistente) {


      numeroExistente.remove();


      departamento.classList.remove(
        "departamento-activo"
      );


      const nombreDepartamento =
        nombresDepartamentos[idDepartamento]
        || idDepartamento;


      departamento.setAttribute(
        "aria-label",
        `${nombreDepartamento}: mostrar número de víctimas`
      );


      return;

    }


    // ACTIVAR CONTORNO DEL DEPARTAMENTO

    departamento.classList.add(
      "departamento-activo"
    );


    // POSICIÓN BASE DEL NÚMERO

    const caja =
      departamento.getBBox();


    const posicion =
      posicionesNumeros[idDepartamento]
      || { x: 0, y: 0 };


    /*
      La posición base sigue siendo calculada a partir
      del departamento.

      Después se aplica el movimiento manual x / y.
    */

    const posicionX =
      caja.x +
      (caja.width / 2) +
      posicion.x;


    const posicionY =
      caja.y +
      (caja.height * 0.42) +
      posicion.y;


    // CREAR TEXTO

    const texto =
      document.createElementNS(
        namespaceSVG,
        "text"
      );


    // Clase para controlar fuente, tamaño, color, etc. desde CSS

    texto.classList.add(
      "numero-departamento"
    );


    texto.setAttribute(
      "id",
      idNumero
    );


    texto.setAttribute(
      "x",
      posicionX
    );


    texto.setAttribute(
      "y",
      posicionY
    );


    texto.setAttribute(
      "text-anchor",
      "middle"
    );


    texto.setAttribute(
      "dominant-baseline",
      "middle"
    );


    /*
      Evita que el grosor del borde del número
      cambie al escalar el SVG.
    */

    texto.setAttribute(
      "vector-effect",
      "non-scaling-stroke"
    );


    // El número no debe bloquear clics

    texto.style.pointerEvents =
      "none";


    // FORMATO DEL NÚMERO

    texto.textContent =
      new Intl.NumberFormat(
        "es-CO"
      ).format(
        datosDepartamentos[idDepartamento]
      );


    // AGREGAR NÚMERO

    capaNumeros.appendChild(
      texto
    );


    // ACCESIBILIDAD

    const nombreDepartamento =
      nombresDepartamentos[idDepartamento]
      || idDepartamento;


    departamento.setAttribute(
      "aria-label",
      `${nombreDepartamento}: ocultar número de víctimas`
    );


  }


});
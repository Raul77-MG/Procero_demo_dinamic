const margen = 20;
const espacioEntreElementos = 0;

function graficarPlano(ancho, largo, cantidadCuartos) {
  const svg = d3.select("#plano")
    .append("svg")
    .attr("width", ancho)
    .attr("height", largo);

  // Líneas del contorno
  const lineas = [
    { x1: margen, y1: margen, x2: ancho - margen, y2: margen },
    { x1: margen, y1: margen, x2: margen, y2: largo - margen },
    { x1: ancho - margen, y1: margen, x2: ancho - margen, y2: largo - margen },
    { x1: margen, y1: largo - margen, x2: ancho - margen, y2: largo - margen }
  ];

  svg.selectAll("line.contorno")
    .data(lineas)
    .enter().append("line")
    .attr("class", "contorno")
    .attr("x1", d => d.x1)
    .attr("y1", d => d.y1)
    .attr("x2", d => d.x2)
    .attr("y2", d => d.y2)
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  // Llamadas a funciones para crear elementos específicos
  let cantidadTotalElementos = cantidadCuartos + 4; // Cuartos + Baño + Cocina + Sala + Comedor
  let cantidadElementos=cantidadTotalElementos;
  const pasilloWidth = 90; // Ancho del pasillo
  const incremento=1;
  // Ensure that cantidadTotalElementos is even
  if (cantidadTotalElementos % 2 === 1) {
    cantidadTotalElementos =cantidadTotalElementos+incremento;
  }
  
  // Now you can proceed with the rest of your code, such as calculating anchoColumna and largoElemento
  
  // Ancho y alto de cada columna
  const anchoColumna = (ancho - 2 * margen - pasilloWidth) / 2;
  const largoElemento = (largo - 2 * margen - (cantidadTotalElementos - 1) * espacioEntreElementos) / (cantidadTotalElementos/2);
  // Redimensionar elementos para que ocupen espacios disponibles
  const tamanoElemento = calcularTamanoElemento(anchoColumna, largoElemento, largo);
  // Crear elementos distribuidos en dos columnas
  crearElementos(svg, cantidadElementos, tamanoElemento, [  "Sala","Comedor","Baño","Cocina","Cuarto"], ["blue", "green", "red", "purple", "black"], ancho, largo, cantidadCuartos, pasilloWidth);
  
  const tamanoPrimerElemento = calcularTamanoElemento(anchoColumna, largoElemento, largo);
  const tamanoUltimoElemento = calcularTamanoElemento(anchoColumna, largoElemento, largo);
  const tamanoElementoBano = calcularTamanoElemento(anchoColumna, largoElemento, largoPlano, true);
  
  // Crear pasillo con los tamaños de los primeros y últimos elementos
  crearPasillo(svg, ancho, largo, pasilloWidth, tamanoPrimerElemento, tamanoUltimoElemento);
  

}

function calcularTamanoElemento(anchoElemento, largoElemento, largoPlano, isBano) {
  let nuevoAncho, nuevoLargo;

  if (isBano) {
    // Establecer un ancho y largo fijo para el elemento "Baño"
    nuevoAncho = 300; // Puedes ajustar este valor según sea necesario
    nuevoLargo = 400; // Puedes ajustar este valor según sea necesario
  } else {
    // Calcular el ancho y largo para otros elementos
    const anchoExcedente = Math.max(0, anchoElemento - largoPlano);
    nuevoAncho = anchoElemento - anchoExcedente;
    nuevoLargo = Math.max(0, largoElemento - anchoExcedente);
  }

  return { width: nuevoAncho, height: nuevoLargo };
}

function crearElementos(svg, cantidad, tamanoElemento, clases, colores, ancho, largo, cantidadCuartos, pasilloWidth) {
  const elementosPorColumna = Math.ceil(cantidad / 2);
  const espacioEntreElementosTotal = (elementosPorColumna - 1) * espacioEntreElementos;
  const anchoTotalColumna = (ancho - pasilloWidth - 2 * margen) / 2;

  let cuartoEncontrado = false;

  for (let i = 0; i < cantidad; i++) {
    let x, y;

    if (i < elementosPorColumna) {
      x = margen;
      y = margen + i * (tamanoElemento.height + espacioEntreElementos) + i * espacioEntreElementosTotal / (elementosPorColumna - 1);
    } else {
      x = (ancho - pasilloWidth) / 2 + pasilloWidth;
      const index = i - elementosPorColumna;
      const row = index % elementosPorColumna;
      y = margen + row * (tamanoElemento.height + espacioEntreElementos) + row * espacioEntreElementos;
    }

    const isCuarto = clases[i] === "Cuarto";

    // Agregar líneas horizontales solo a los elementos tipo "Cuarto"
    if (i > 0 && isCuarto) {
      svg.append("line")
        .attr("class", "lineaCuarto")
        .attr("x1", x)
        .attr("y1", y - espacioEntreElementos / 2)
        .attr("x2", ancho - margen)
        .attr("y2", y - espacioEntreElementos / 2)
        .attr("stroke", "black")
        .attr("stroke-width", 2);
    }

    if (cuartoEncontrado) {
      clases[i] = "Cuarto";
      svg.append("line")
        .attr("class", "lineaCuarto")
        .attr("x1", x)
        .attr("y1", y - espacioEntreElementos / 2)
        .attr("x2", ancho - margen)
        .attr("y2", y - espacioEntreElementos / 2)
        .attr("stroke", "black")
        .attr("stroke-width", 2);
    }

    if (isCuarto) {
      cuartoEncontrado = true;
    }

    dibujarElemento(svg, tamanoElemento, clases[i], colores[i], x, y);
  }
}

function crearPasillo(svg, ancho, largo, pasilloWidth, tamanoPrimerElemento, tamanoUltimoElemento) {
  const pasilloHeight = largo - tamanoPrimerElemento.height - tamanoUltimoElemento.height-margen-margen; // Height limited by the first and last elements
  const x = (ancho - pasilloWidth) / 2; // Center the pasillo horizontally

  // Calculate y to align the pasillo with the margins of the first and last elements
  const y = margen + tamanoPrimerElemento.height;

  dibujarElemento(svg, { width: pasilloWidth, height: pasilloHeight }, "Pasillo", "gray", x, y);
}


function dibujarElemento(svg, dimensiones, clase, color, x, y) {
  svg.append("rect")
    .attr("class", clase)
    .attr("x", x)
    .attr("y", y)
    .attr("width", dimensiones.width)
    .attr("height", dimensiones.height)
    .attr("fill", "none")  
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  // agegando nombre con su respectivo color
  svg.append("text")
    .attr("x", x + dimensiones.width / 2)
    .attr("y", y + dimensiones.height / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("fill", color)
    .text(clase);
}

const anchoPlano = 800;
const largoPlano = 800;
const cantidadCuartos = 3;


graficarPlano(anchoPlano, largoPlano, cantidadCuartos);


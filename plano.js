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
  const cantidadTotalElementos = cantidadCuartos + 4; // Cuartos + Baño + Cocina + Sala + Comedor
  const pasilloWidth = 90; // Ancho del pasillo

  // Ancho y alto de cada elemento
  const anchoElemento = (ancho / 2 + margen - pasilloWidth);
  const largoElemento = ((largo-2*margen)/cantidadTotalElementos) ;

  // Redimensionar elementos para que ocupen espacios disponibles
  const tamanoElemento = calcularTamanoElemento(anchoElemento, largoElemento, largo);

  // Crear elementos
  crearElementos(svg, cantidadTotalElementos, tamanoElemento, ["Cuarto", "Sala", "Comedor", "Baño", "Cocina"], ["blue", "green", "red", "purple", "orange"], ancho, largo, cantidadCuartos);

  // Crear pasillo
  crearPasillo(svg, ancho, largo, pasilloWidth);
}

function calcularTamanoElemento(anchoElemento, largoElemento, largoPlano) {
  const anchoExcedente = Math.max(0, anchoElemento - largoPlano);
  const nuevoAncho = anchoElemento - anchoExcedente;
  const nuevoAlto = Math.max(0, largoElemento - anchoExcedente);

  return { width: nuevoAncho, height: nuevoAlto };
}

function crearElementos(svg, cantidad, tamanoElemento, clases, colores, ancho, largo, cantidadCuartos) {
  for (let i = 0; i < cantidad; i++) {
    const x = margen;
    const y = margen + i * (tamanoElemento.height + espacioEntreElementos); // Ajuste para distribuir verticalmente
    dibujarElemento(svg, tamanoElemento, clases[i], colores[i], x, y);
  }
}

function crearPasillo(svg, ancho, largo, pasilloWidth) {
  const pasilloHeight = largo - 2 * margen; // Alto del pasillo
  const x = (ancho - pasilloWidth) / 2; // Posición en el centro del plano
  const y = margen;

  dibujarElemento(svg, { width: pasilloWidth, height: pasilloHeight }, "Pasillo", "gray", x, y);
}

function dibujarElemento(svg, dimensiones, clase, color, x, y) {
  svg.append("rect")
    .attr("class", clase)
    .attr("x", x)
    .attr("y", y)
    .attr("width", dimensiones.width)
    .attr("height", dimensiones.height)
    .attr("fill", color)
    .attr("stroke", "black")
    .attr("stroke-width", 2);
}

// Llamada de ejemplo con dimensiones específicas y 1 cuarto
const anchoPlano = 500;
const largoPlano = 600;
const cantidadCuartos = 4;
graficarPlano(anchoPlano, largoPlano, cantidadCuartos);



document.getElementById("generarBtn").addEventListener("click", function () {
    generarPlano();
  });
  
  const margen = 0;
  const espacioEntreElementos = 0;
  
  function graficarPlano(ancho, largo,dormitorios) {
    const svg = d3.select("#plano")
    .append("svg")
    .attr("width", ancho)
    .attr("height", largo);

  // Crear rectángulo verde para el espacio vacío
  svg.append("rect")
    .attr("width", ancho)
    .attr("height", largo)
    .attr("fill", "lightgreen");  // Color verde para el espacio vacío

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
    .attr("stroke-width", 4);
  
      
    // Llamadas a funciones para crear elementos específicos
    let cantidadTotalElementos = 5; // Cuartos + Baño + Cocina + Sala + 
    let largoBano=120;
    let anchoBano=240;
    let cantidadElementos = cantidadTotalElementos;
    const pasilloWidth = 100; // Ancho del pasillo
    const incremento = 1;
    
    if (cantidadTotalElementos % 2 === 1) {
      cantidadTotalElementos = cantidadTotalElementos + incremento;
    }
    const minWidth = 300; // Establecer el ancho máximo permitido
    const mminHeight = 400;
    // Ancho y alto de cada columna
    const anchoColumna = (ancho - 2 * margen) / 2;
    const largoElemento = (largo - 2 * margen - (cantidadTotalElementos - 1) * espacioEntreElementos) / (cantidadTotalElementos / 2);
  
    // Redimensionar elementos para que ocupen espacios disponibles
    // Ancho y alto personalizado para cada elemento (excepto pasillo)
    const tamanoElemento = [
      { width: minWidth  -margen, height:mminHeight},  //cocina
      { width: minWidth - margen, height: mminHeight },   //comedor        
      { width: minWidth  - margen, height: mminHeight }, // Ancho y alto para "sala"
      { width: ((ancho / 2) -margen- pasilloWidth/2), height: ((largo ) / 3) }, // Ancho y alto para "dor1"
      { width: anchoBano, height: largoBano },   // Ancho y alto para "bano"
    ];
    const tamanoElemento2 = [
      { width: minWidth  -margen, height:mminHeight},  // Ancho y alto para "cocina"
      { width: minWidth - margen, height: mminHeight },            // Ancho y alto para "comedor"
      { width: minWidth  - margen, height: mminHeight }, // Ancho y alto para "sala"
      { width: ((ancho / 2) -margen- pasilloWidth/2), height: ((largo ) / 4) }, // Ancho y alto para "dor1"
      { width: anchoBano, height: largoBano },   // Ancho y alto para "bano"
      { width: ((ancho / 2) -margen- pasilloWidth/2), height: ((largo ) / 4) }, // Ancho y alto para "dor2"
    ];
    const tamanoElemento3 = [
      { width: minWidth  -margen, height:mminHeight},  // Ancho y alto para "cocina"
      { width: minWidth - margen, height: mminHeight },            // Ancho y alto para "comedor"
      { width: minWidth  - margen, height: mminHeight+100 }, // Ancho y alto para "sala"
      { width: ((ancho / 2) -margen- pasilloWidth/2), height: ((largo-100 ) / 4) }, // Ancho y alto para "dor1"
      { width: anchoBano, height: largoBano },   // Ancho y alto para "bano"
      { width: anchoBano, height: largoBano },
      { width: ((ancho / 2) -margen- pasilloWidth/2), height: ((largo-100 ) / 4) }, // Ancho y alto para "dor2"
    ];
    const tamanoElemento4 = [
      { width: minWidth  -margen, height:mminHeight},  // Ancho y alto para "cocina"
      { width: minWidth - margen, height: mminHeight },            // Ancho y alto para "comedor"
      { width: minWidth  - margen, height: mminHeight+150 }, // Ancho y alto para "sala"
      { width: ((ancho / 2) -margen- pasilloWidth/2), height: ((largo ) / 5) }, // Ancho y alto para "dor1"
      { width: anchoBano, height: largoBano },   // Ancho y alto para "bano"
      { width: anchoBano, height: largoBano },
      { width: minWidth -margen, height: ((largo ) / 5) }, // Ancho y alto para "dor2"
      { width: ((ancho / 2) -margen- pasilloWidth/2), height: ((largo ) / 5) }, // Ancho y alto para "dor3"
    ];
    const tamanoElemento5 = [
      { width: minWidth  -margen, height:mminHeight},  // Ancho y alto para "cocina"
      { width: minWidth - margen, height: mminHeight },            // Ancho y alto para "comedor"
      { width: minWidth  - margen, height: mminHeight+150 }, // Ancho y alto para "sala"
      { width: ((ancho / 2) -margen- pasilloWidth/2), height: ((largo ) / 5) }, // Ancho y alto para "dor1"
      { width: anchoBano, height: largoBano },   // Ancho y alto para "bano"
      { width: anchoBano, height: largoBano },
      { width: minWidth -margen, height: ((largo ) / 5) }, // Ancho y alto para "dor2"
      { width: ((ancho / 2) -margen- pasilloWidth/2), height: ((largo ) / 5) }, // Ancho y alto para "dor3"
    ];
    if ((ancho >= 700 && ancho <= 900) && (largo == 1200)) {
      // Crear elementos distribuidos en dos columnas
      crearElementos(svg, cantidadElementos, tamanoElemento, ["Cocina", "Comedor", "Sala", "Dormitorio1", "Baño"], ["green", "red", "purple", "black", "blue"], ancho, largo, pasilloWidth);
      const tamanoPrimerElemento = ((largo - largoBano) / 3) - 2 * margen;
      const tamanoUltimoElemento = calcularTamanoElemento(anchoColumna, largoElemento, largo);
      actualizarTabla(ancho, largo, tamanoElemento, largoBano);
      crearPasillo(svg, ancho, largo, pasilloWidth, tamanoElemento[0].height, margen, largoBano);
  }
  else if ((ancho >= 700 && ancho <= 900)&&(largo > 1200 && largo<=1600)) {
    cantidadElementos=cantidadElementos+1;
    // Create Dormitorio element
    crearElemento2(svg, cantidadElementos, tamanoElemento2, ["Cocina", "Comedor", "Sala", "Dormitorio1", "Baño","Dormitorio2"], ["green", "red", "purple", "black", "blue", "orange"], ancho, largo, pasilloWidth);
    actualizarTabla2(ancho, largo, tamanoElemento2, largoBano);
    crearPasillo(svg, ancho, largo, pasilloWidth, tamanoElemento2[0].height, margen, largoBano);
    crearPasillo2(svg, ancho, largo, pasilloWidth, tamanoElemento2[0].height,tamanoElemento2[3].height, margen, largoBano);
}  
else if ((ancho >= 700 && ancho <= 900)&&(largo > 1600 && largo<=1700 )) {
  cantidadElementos=cantidadElementos+2;
  // Create Dormitorio element
  crearElemento3(svg, cantidadElementos, tamanoElemento3, ["Cocina", "Comedor", "Sala", "Dormitorio1", "Baño", "Baño2","Dormitorio2"], ["green", "red", "purple", "black", "blue","blue", "orange"], ancho, largo, pasilloWidth);
  //actualizarTabla2(ancho, largo, tamanoElemento2, largoBano);
  crearPasillo(svg, ancho, largo, pasilloWidth, tamanoElemento3[0].height, margen, largoBano);
  crearPasillo32(svg, ancho, largo, pasilloWidth, tamanoElemento3[0].height,tamanoElemento3[3].height, margen, largoBano);
}  
else if ((ancho == 700)&&(largo > 1700 && largo<=2000 )) {
  cantidadElementos=cantidadElementos+3;
  // Create Dormitorio element
  crearElemento4(svg, cantidadElementos, tamanoElemento4, ["Cocina", "Comedor", "Sala", "Dormitorio1", "Baño", "Baño2","Dormitorio2","Dormitorio3"], ["green", "red", "purple", "black", "blue","blue", "orange", "orange"], ancho, largo, pasilloWidth);
  //actualizarTabla2(ancho, largo, tamanoElemento2, largoBano);
  crearPasillo(svg, ancho, largo, pasilloWidth, tamanoElemento4[0].height, margen, largoBano);
  
}
else if ((ancho >= 800 && ancho <= 900)&&(largo > 1700 && largo<=2000 )) {
  cantidadElementos=cantidadElementos+3;
  // Create Dormitorio element
  crearElemento5(svg, cantidadElementos, tamanoElemento5, ["Cocina", "Comedor", "Sala", "Dormitorio1", "Baño", "Baño2","Dormitorio2","Dormitorio3"], ["green", "red", "purple", "black", "blue","blue", "orange", "orange"], ancho, largo, pasilloWidth);
  //actualizarTabla2(ancho, largo, tamanoElemento2, largoBano);
  crearPasillo(svg, ancho, largo, pasilloWidth, tamanoElemento5[0].height, margen, largoBano);
  crearPasillo3(svg, ancho, largo, pasilloWidth, tamanoElemento5[6].height,tamanoElemento5[3].height, margen, largoBano);
}
else{
  alert("<<<<<<<<  solicitar plano personalizado  >>>>>>>>>>");
}  
    //agregarMedidas(svg, ancho, largo);
}
  function generarPlano() {
    // Obtener valores del formulario
    const anchoInput = document.getElementById("ancho").value;
    const largoInput = document.getElementById("largo").value;
    const dormitoriosInput = document.getElementById("cuartos").value;
  
    // Validar los valores (puedes agregar más validaciones según tus necesidades)
    let anchoPlano = parseFloat(anchoInput);
    let largoPlano = parseFloat(largoInput);
    let dormitorios = parseInt(dormitoriosInput);
    const Centimetros = 100;
  
    // Verificar que los valores sean números válidos
    if (isNaN(anchoPlano) || isNaN(largoPlano) || isNaN(dormitorios) || anchoPlano <= 0 || largoPlano <= 0 || dormitorios <= 0) {
      alert("Por favor, ingresa valores válidos para el ancho, largo y número de dormitorios.");
      return;
    }
  
    // Enforce minimum and maximum values for width and length
    const minAncho = 5;
    const maxAncho = 20;
    const minLargo = 6;
    const maxLargo = 40;
  
    // Verificar si cumple con las condiciones del mínimo y máximo
    if (anchoPlano < minAncho || anchoPlano > maxAncho || largoPlano < minLargo || largoPlano > maxLargo) {
      alert("Por favor, ingresa un ancho entre 7 y 9 metros y un largo entre 12 y 16 metros.");
      return;
    }
  
    // Convertir las dimensiones
    let ancho = anchoPlano * Centimetros;
    let largo = largoPlano * Centimetros;
  
    // Limpiar el contenedor del plano antes de generar uno nuevo
    document.getElementById("plano").innerHTML = "";
  
    // Llamar a la función para generar el plano
    // if (dormitorios !== 3) {
    //   alert("¡Suscríbete!"); // Show alert message
    //   return; 
    // }
  
    // Crear el plano y obtener los tamaños de los elementos
    graficarPlano(ancho, largo, dormitorios);
  }
  
  
  // Agrega el siguiente código para limpiar el contenido al cambiar el ancho y el largo
  document.getElementById("ancho").addEventListener("input", function () {
    limpiarPlano();
  });
  
  document.getElementById("largo").addEventListener("input", function () {
    limpiarPlano();
  });
  
  function limpiarPlano() {
    document.getElementById("plano").innerHTML = "";
  }
  // CODIGO PARA EJECUTAR EL PLANO
  
  function suscribirse() {
    // Redirigir al enlace proporcionado en la misma pestaña
    window.location.href = "https://procero.tech/pasarela-de-pagos/";
  }
  
  function actualizarTabla(ancho, largo, tamanoElemento, largoBano) {
    const table = document.getElementById("infoTable").getElementsByTagName('tbody')[0];
    table.innerHTML = "";
  
    mostrarEnTabla("Ancho del Plano", (ancho / 100).toFixed(2) + " metros");
    mostrarEnTabla("Largo del Plano", (largo / 100).toFixed(2) + " metros");
  
    mostrarEnTabla("Cocina", (tamanoElemento[0].width / 100).toFixed(2) + " x " + (tamanoElemento[0].height / 100).toFixed(2) + " metros");
    mostrarEnTabla("Comedor", (tamanoElemento[1].width / 100).toFixed(2) + " x " + (tamanoElemento[1].height / 100).toFixed(2) + " metros");
    mostrarEnTabla("Sala", (tamanoElemento[2].width / 100).toFixed(2) + " x " + (tamanoElemento[2].height / 100).toFixed(2) + " metros");
    mostrarEnTabla("Dormitorio 1", (tamanoElemento[3].width / 100).toFixed(2) + " x " + (tamanoElemento[3].height / 100).toFixed(2) + " metros");
    mostrarEnTabla("Baño", (tamanoElemento[4].width / 100).toFixed(2) + " x " + (tamanoElemento[4].height / 100).toFixed(2) + " metros");
  }

  function actualizarTabla2(ancho, largo, tamanoElemento, largoBano) {
    const table = document.getElementById("infoTable").getElementsByTagName('tbody')[0];
    table.innerHTML = "";
  
    mostrarEnTabla("Ancho del Plano", (ancho / 100).toFixed(2) + " metros");
    mostrarEnTabla("Largo del Plano", (largo / 100).toFixed(2) + " metros");
  
    mostrarEnTabla("Cocina", (tamanoElemento[0].width / 100).toFixed(2) + " x " + (tamanoElemento[0].height / 100).toFixed(2) + " metros");
    mostrarEnTabla("Comedor", (tamanoElemento[1].width / 100).toFixed(2) + " x " + (tamanoElemento[1].height / 100).toFixed(2) + " metros");
    mostrarEnTabla("Sala", (tamanoElemento[2].width / 100).toFixed(2) + " x " + (tamanoElemento[2].height / 100).toFixed(2) + " metros");
    mostrarEnTabla("Dormitorio 1", (tamanoElemento[3].width / 100).toFixed(2) + " x " + (tamanoElemento[3].height / 100).toFixed(2) + " metros");
    mostrarEnTabla("Baño", (tamanoElemento[4].width / 100).toFixed(2) + " x " + (tamanoElemento[4].height / 100).toFixed(2) + " metros");
    mostrarEnTabla("Dormitorio 2", (tamanoElemento[5].width / 100).toFixed(2) + " x " + (tamanoElemento[5].height / 100).toFixed(2) + " metros");
  }
  

  function calcularTamanoElemento(anchoElemento, largoElemento, largoPlano) {
    let nuevoAncho, nuevoLargo;
  
    // Calcular el ancho y largo para otros elementos
    const anchoExcedente = Math.max(0, anchoElemento - largoPlano);
    nuevoAncho = anchoElemento - anchoExcedente;
    nuevoLargo = Math.max(0, largoElemento - anchoExcedente);
  
    return { width: nuevoAncho, height: nuevoLargo };
  }
  
  function crearElementos(svg, cantidad, tamanoElemento, clases, colores, ancho, largo, pasilloWidth) {
    const elementosPorColumna = Math.ceil(cantidad / 2);
    const espacioEntreElementosTotal = (elementosPorColumna - 1) * espacioEntreElementos;
    const minanch=700;
    const excendete=(ancho-minanch)/2;
    for (let i = 0; i < cantidad; i++) {
      let x, y;
      
      if (i === 0) {
        x = margen;
        y = margen + i * (tamanoElemento[i].height + espacioEntreElementos);
        
        
      } else if (i === 1) {
        x = margen;
        y = margen + tamanoElemento[0].height;
       
        
      } else if (i === 2) {
        x = margen;
        y = margen + tamanoElemento[0].height + tamanoElemento[1].height + espacioEntreElementos;
       
      } else if (i === 3) {
        x = (ancho / 2)+pasilloWidth/2 -excendete ;
        y = margen+ tamanoElemento[0].height/2;
        
      
      } else if (i === 4) {
        
        x = (ancho / 2)+pasilloWidth/2 -excendete;
        y = margen + tamanoElemento[3].height + tamanoElemento[0].height/2;
  
      } else { 
        x = (ancho) / 2 + pasilloWidth / 2;
        const index = i - 5; 
        const row = index % (elementosPorColumna - 1);
        y = margen + tamanoElemento[i].height + row * (tamanoElemento[i].height + espacioEntreElementos) + row * espacioEntreElementos;
      }

      dibujarElemento(svg, tamanoElemento[i], clases[i], colores[i], x, y);
      
    }
  }

  function crearElemento2(svg, cantidad, tamanoElemento, clases, colores, ancho, largo, pasilloWidth) {
    const elementosPorColumna = Math.ceil(cantidad / 2);
    const espacioEntreElementosTotal = (elementosPorColumna - 1) * espacioEntreElementos;
    const minanch=700;
    const excendete=(ancho-minanch)/2;
    for (let i = 0; i < cantidad; i++) {
      let x, y;
      if (i === 0) {
        x = margen;
        y = margen + i * (tamanoElemento[i].height + espacioEntreElementos);
  
        
      } else if (i === 1) {
        x = margen;
        y = margen + tamanoElemento[0].height;
  
        
      } else if (i === 2) {
        x = margen;
        y = margen + tamanoElemento[0].height + tamanoElemento[1].height + espacioEntreElementos;
       
      } else if (i === 3) {
        x = (ancho / 2)+pasilloWidth/2 -excendete ;
        y = margen+ tamanoElemento[0].height/2;
        
      
      } else if (i === 4) {
        
        x = (ancho / 2)+pasilloWidth/2 +pasilloWidth -excendete;
        y = margen + tamanoElemento[3].height + tamanoElemento[0].height/2;
      
      } else if (i === 5) {
        
        x = (ancho / 2)+pasilloWidth/2 -excendete;
        y = margen+tamanoElemento[4].height+ tamanoElemento[3].height + tamanoElemento[0].height/2;
      
      } else { 
        x = (ancho) / 2 + pasilloWidth / 2;
        const index = i - 6; 
        const row = index % (elementosPorColumna - 1);
        y = margen + tamanoElemento[i].height + row * (tamanoElemento[i].height + espacioEntreElementos) + row * espacioEntreElementos;
      }

      dibujarElemento(svg, tamanoElemento[i], clases[i], colores[i], x, y);
  
    }
  }

  function crearElemento3(svg, cantidad, tamanoElemento, clases, colores, ancho, largo, pasilloWidth) {
    const elementosPorColumna = Math.ceil(cantidad / 2);
    const espacioEntreElementosTotal = (elementosPorColumna - 1) * espacioEntreElementos;
    const minanch=700;
    const excendete=(ancho-minanch)/2;
    for (let i = 0; i < cantidad; i++) {
      let x, y;
      if (i === 0) {
        x = margen;
        y = margen + i * (tamanoElemento[i].height + espacioEntreElementos);
  
        
      } else if (i === 1) {
        x = margen;
        y = margen + tamanoElemento[0].height;
  
        
      } else if (i === 2) {
        x = margen;
        y = margen + tamanoElemento[0].height + tamanoElemento[1].height + espacioEntreElementos;
       //SIGUIENTE COLUMNA
      } else if (i === 3) {
        x = (ancho / 2)+pasilloWidth/2 -excendete ;
        y = margen;
        
      
      } else if (i === 4) {
        
        x = (ancho / 2)+pasilloWidth/2 +pasilloWidth -excendete;
        y = margen + tamanoElemento[3].height ;

      } else if (i === 5) {
        
        x = (ancho / 2)+pasilloWidth/2 +pasilloWidth-excendete;
        y = margen + tamanoElemento[4].height+ tamanoElemento[3].height ;
      } else if (i === 6) {
        
        x = (ancho / 2)+pasilloWidth/2 -excendete;
        y = margen+tamanoElemento[5].height+ tamanoElemento[4].height+ tamanoElemento[3].height ;
      
      } else { 
        x = (ancho) / 2 + pasilloWidth / 2;
        const index = i - 7; 
        const row = index % (elementosPorColumna - 1);
        y = margen + tamanoElemento[i].height + row * (tamanoElemento[i].height + espacioEntreElementos) + row * espacioEntreElementos;
      }

      dibujarElemento(svg, tamanoElemento[i], clases[i], colores[i], x, y);
      
    }
  }
  function crearElemento4(svg, cantidad, tamanoElemento, clases, colores, ancho, largo, pasilloWidth) {
    const elementosPorColumna = Math.ceil(cantidad / 2);
    const espacioEntreElementosTotal = (elementosPorColumna - 1) * espacioEntreElementos;
    const minanch=700;
    const excendete=(ancho-minanch)/2;
    for (let i = 0; i < cantidad; i++) {
      let x, y;
      if (i === 0) {
        x = margen;
        y = margen + i * (tamanoElemento[i].height + espacioEntreElementos);
  
        
      } else if (i === 1) {
        x = margen;
        y = margen + tamanoElemento[0].height;
  
        
      } else if (i === 2) {
        x = margen;
        y = margen + tamanoElemento[0].height + tamanoElemento[1].height + espacioEntreElementos;
       //SIGUIENTE COLUMNA
      } else if (i === 3) {
        x = (ancho / 2)+pasilloWidth/2 -excendete ;
        y = margen;
        
      
      } else if (i === 4) {
        
        x = (ancho / 2)+pasilloWidth/2  -excendete;
        y = margen + tamanoElemento[3].height ;

      } else if (i === 5) {
        
        x = (ancho / 2)+pasilloWidth/2 -excendete;
        y = margen + tamanoElemento[4].height+ tamanoElemento[3].height ;
      } else if (i === 6) {
        
        x = (ancho / 2)+pasilloWidth/2 -excendete;
        y = margen+tamanoElemento[5].height+ tamanoElemento[4].height+ tamanoElemento[3].height ;
      
      } else if (i === 7) {
        
        x = (ancho / 2)+pasilloWidth/2 -excendete;
        y = margen+tamanoElemento[6].height+tamanoElemento[5].height+ tamanoElemento[4].height+ tamanoElemento[3].height ;
      
      } else { 
        x = (ancho) / 2 + pasilloWidth / 2;
        const index = i - 8; 
        const row = index % (elementosPorColumna - 1);
        y = margen + tamanoElemento[i].height + row * (tamanoElemento[i].height + espacioEntreElementos) + row * espacioEntreElementos;
      }

      dibujarElemento(svg, tamanoElemento[i], clases[i], colores[i], x, y);
  
    }
  }
  function crearElemento5(svg, cantidad, tamanoElemento, clases, colores, ancho, largo, pasilloWidth) {
    const elementosPorColumna = Math.ceil(cantidad / 2);
    const espacioEntreElementosTotal = (elementosPorColumna - 1) * espacioEntreElementos;
    const minanch=700;
    const excendete=(ancho-minanch)/2;
    for (let i = 0; i < cantidad; i++) {
      let x, y;
      if (i === 0) {
        x = margen;
        y = margen + i * (tamanoElemento[i].height + espacioEntreElementos);
  
        
      } else if (i === 1) {
        x = margen;
        y = margen + tamanoElemento[0].height;
  
        
      } else if (i === 2) {
        x = margen;
        y = margen + tamanoElemento[0].height + tamanoElemento[1].height + espacioEntreElementos;
       //SIGUIENTE COLUMNA
      } else if (i === 3) {
        x = (ancho / 2)+pasilloWidth/2 -excendete ;
        y = margen;
        
      
      } else if (i === 4) {
        
        x = (ancho / 2)+pasilloWidth/2 +pasilloWidth -excendete;
        y = margen + tamanoElemento[3].height ;

      } else if (i === 5) {
        
        x = (ancho / 2)+pasilloWidth/2 +pasilloWidth-excendete;
        y = margen + tamanoElemento[4].height+ tamanoElemento[3].height ;
      } else if (i === 6) {
        
        x = (ancho / 2)+pasilloWidth+pasilloWidth/2 -excendete;
        y = margen+tamanoElemento[5].height+ tamanoElemento[4].height+ tamanoElemento[3].height ;
      
      } else if (i === 7) {
        
        x = (ancho / 2)+pasilloWidth/2 -excendete;
        y = margen+tamanoElemento[6].height+tamanoElemento[5].height+ tamanoElemento[4].height+ tamanoElemento[3].height ;
      
      } else { 
        x = (ancho) / 2 + pasilloWidth / 2;
        const index = i - 8; 
        const row = index % (elementosPorColumna - 1);
        y = margen + tamanoElemento[i].height + row * (tamanoElemento[i].height + espacioEntreElementos) + row * espacioEntreElementos;
      }

      dibujarElemento(svg, tamanoElemento[i], clases[i], colores[i], x, y);
  
    }
  }
  function mostrarEnTabla(parametro, valor) {
    // Añadir una fila a la tabla con el parámetro y el valor
    const table = document.getElementById("infoTable").getElementsByTagName('tbody')[0];
    const row = table.insertRow(table.rows.length);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.innerHTML = parametro;
    cell2.innerHTML = valor;
  }
  function crearPasillo(svg, ancho, largo, pasilloWidth, tamanoPrimerElemento, margen, largoBano) {
    const minanch=700;
    const excendete=(ancho-minanch)/2;
    const pasilloHeight = largo-margen ; // Reducir la altura según el primer elemento
    const x = ((ancho ) / 2 )-pasilloWidth/2-excendete; // Centrar el pasillo horizontalmente
  
    // Calcular y para alinear el pasillo con los márgenes del primer elemento
    const y =  margen;
  
    dibujarElementoPasillo(svg, { width: pasilloWidth, height: pasilloHeight }, "Pasillo", "gray", x, y);
}

  function crearPasillo2(svg, ancho, largo, pasilloWidth, tamanoPrimerElemento, tamanosegundoElemento, margen,largoBano) {
    const minanch=700;
    const excendete=(ancho-minanch)/2;
    const pasilloHeight = largoBano; // Height limited by the first and last elements
    const x = ((ancho ) / 2) +pasilloWidth/2 -excendete; // Center the pasillo horizontally
  
    // Calculate y to align the pasillo with the margins of the first and last elements
    const y = margen + tamanosegundoElemento+ tamanoPrimerElemento/2 ;
  
    dibujarElementoPasillo(svg, { width: pasilloWidth, height: pasilloHeight }, "Pasillo", "orange", x, y);
    
  }
  function crearPasillo32(svg, ancho, largo, pasilloWidth, tamanoPrimerElemento, tamanosegundoElemento, margen,largoBano) {
    const minanch=700;
    const excendete=(ancho-minanch)/2;
    const pasilloHeight = 2*largoBano; // Height limited by the first and last elements
    const x = ((ancho ) / 2) +pasilloWidth/2 -excendete; // Center the pasillo horizontally
  
    // Calculate y to align the pasillo with the margins of the first and last elements
    const y = margen + tamanosegundoElemento ;
  
    dibujarElementoPasillo(svg, { width: pasilloWidth, height: pasilloHeight }, "Pasillo", "orange", x, y);
    
  }
  function crearPasillo3(svg, ancho, largo, pasilloWidth, tamanoPrimerElemento, tamanosegundoElemento, margen,largoBano) {
    const minanch=700;
    const excendete=(ancho-minanch)/2;
    const pasilloHeight = tamanoPrimerElemento+2*largoBano; // Height limited by the first and last elements
    const x = ((ancho ) / 2) +pasilloWidth/2 -excendete; // Center the pasillo horizontally
  
    // Calculate y to align the pasillo with the margins of the first and last elements
    const y = margen + tamanosegundoElemento ;
  
    dibujarElementoPasillo(svg, { width: pasilloWidth, height: pasilloHeight }, "Pasillo", "orange", x, y);
    
  }
  function dibujarElementoSinBordeEspecifico(svg, dimensiones, clase, color, x, y, bordesOmitidos) {
    // Dibuja los cuatro lados del rectángulo, excepto los especificados en bordesOmitidos
    const bordes = [
      { lado: 'top', x1: x, y1: y, x2: x + dimensiones.width, y2: y }, // Arriba
      { lado: 'right', x1: x + dimensiones.width, y1: y, x2: x + dimensiones.width, y2: y + dimensiones.height }, // Derecha
      { lado: 'bottom', x1: x, y1: y + dimensiones.height, x2: x + dimensiones.width, y2: y + dimensiones.height }, // Abajo
      { lado: 'left', x1: x, y1: y, x2: x, y2: y + dimensiones.height } // Izquierda
    ];
  
    bordes.forEach(borde => {
      if (!bordesOmitidos.includes(borde.lado)) {
        svg.append('line')
          .attr('x1', borde.x1)
          .attr('y1', borde.y1)
          .attr('x2', borde.x2)
          .attr('y2', borde.y2)
          .attr('stroke', 'black')
          .attr('stroke-width', 2);
      }
    });
  
    // Agregando nombre con su respectivo color
    svg.append("text")
      .attr("x", x + dimensiones.width / 2)
      .attr("y", y + dimensiones.height / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", color)
      .text(clase);
  }
  
  function dibujarElementoPasillo(svg, dimensiones, clase, color, x, y) {
   
    // Agregar el contorno o borde del plano
    svg.append("rect")
    .attr("class", "contorno")
    .attr("x", x)
    .attr("y", y)
    .attr("width", dimensiones.width)
    .attr("height", dimensiones.height)
    .attr("fill", "lightgray")
    .attr("stroke", "black")  // Correct the color to white
    .attr("stroke-width", 2);
  
    // Agregando nombre con su respectivo color
    svg.append("text")
      .attr("x", x + dimensiones.width / 2)
      .attr("y", y + dimensiones.height / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "black")
      .text(clase);
  

  }
  
  
  
  function dibujarElemento(svg, dimensiones, clase, color, x, y) {
    
    // Agregar el contorno o borde del plano
    svg.append("rect")
      .attr("class", "contorno")
      .attr("x", x)
      .attr("y", y)
      .attr("width", dimensiones.width)
      .attr("height", dimensiones.height)
      .attr("fill", "white")
      .attr("stroke", "black")  // Utilizar el color condicional para el borde
      .attr("stroke-width", 2);
  
    // Agregando nombre con su respectivo color
    svg.append("text")
      .attr("x", x + dimensiones.width / 2)
      .attr("y", y + dimensiones.height / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", color)
      .text(clase);

    console.log("====================================================================");
    console.log(`${clase}: width=${dimensiones.width}, height=${dimensiones.height}`);
  }
  
  
  

  
  

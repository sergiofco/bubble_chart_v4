/* bubbleChart creation function. Returns a function that will
 * instantiate a new bubble chart given a DOM element to display
 * it in and a dataset to visualize.
 *
 * Organization and style inspired by:
 * https://bost.ocks.org/mike/chart/
 *
 */

// Load the data.
d3.csv('data/orasbolasB.csv', display);

function bubbleChart() {

// Janela e centro
  var width = window.innerWidth * 0.75;
  var height = window.innerHeight * 0.90;
  var center = { x: width / 2, y: height / 2 };

// tooltip for mouseover functionality
  var tooltip = floatingTooltip('gates_tooltip', 360);

// cores para dias da semana e finais de semana
  const corAzul = '#0097ad'
  const corLaranja = '#ffb100'
  const corAll = '#CC7722'

// Grid de 21 pontos em tela
  const corrigeT = 0;
  const corrigeS = 0;
  const corrigeCab = 20;
  const corrige = 0;
  const pos1W = corrigeT + width/4;
  const pos2W = corrigeT + width/4 + width/12;
  const pos3W = corrigeT + width/4 + width/12 + width/12;
  const pos4W = corrigeT + width/2;
  const pos5W = corrigeT + width/2 + width/12;
  const pos6W = corrigeT + width/2 + width/12 + width/12;
  const pos7W = corrigeT + width/2 + width/12 + width/12 + width/12;
  const pos1H = height/2;
  const pos2H = height/2 - height/4;
  const pos3H = height/2 + height/4;

// Variáveis de Filtro
  var buscaId = '';
  var regiaoId = 'capital';
  var formatoId = '100';
  var publicoId = 'todos';
  var temporalId = "todos";
  var uoId = '100';
  var categoriaId = '99';
  var gratisId = null;
  var vendaId = null;
  var acessivelId = null;
  var onlineId = null;
  
  var regiaoMem = 'capital';
  var formatoMem = '100';
  var publicoMem = 'todos';
  var temporalMem = "todos";
  var uoMem = '100';
  var categoriaMem = '99';
  var gratisMem = null;
  var vendaMem = null;
  var acessivelMem = null;
  var onlineMem = null;

// Variáveis de Contador
  var fc = '';
  var fe = '';
  var fuo = '';
  var display_div = document.getElementById("contador");
  var display_filtro = document.getElementById("EmExibicao");
  var new_span = document.createElement('span');
  var novo_span = document.createElement('span');
  var escolhido = "ações na capital e grande são paulo nesta semana e na próxima";
  var atual = " ";


// Posição da vista por semana ---------------------------------------------------------------------------
  var semanaCenters = {
    seg: { x: pos1W, y: height / 2 },
    ter: { x: pos2W, y: height / 2 },
    qua: { x: pos3W, y: height / 2 },
    qui: { x: pos4W, y: height / 2 },
    sex: { x: pos5W, y: height / 2 },
    sáb: { x: pos6W, y: height / 2 },
    dom: { x: pos7W, y: height / 2 },
    sempre: { x: pos4W, y: height / 2 }
  };

  var formatoCenters = {
    1: { x: pos4W, y: pos2H+50 }, // shows
    2: { x: pos2W, y: pos2H+50 }, // cursos
    3: { x: pos5W, y: pos3H-200 }, // debates
    4: { x: pos3W, y: pos3H-200 }, // expos
    5: { x: pos1W+50, y: pos1H-50 }, // filmes
    6: { x: pos7W-100, y: pos1H-50 }, // turismo
  };

  var unidadeCenters = {
  52: {x: pos1W, y:pos1H}, // 24 de Maio
  53: {x: pos2W, y:pos1H}, // Santana
  55: {x: pos3W, y:pos2H}, // Interlagos
  56: {x: pos4W, y:pos2H}, // 
  57: {x: pos5W, y:pos3H}, //
  58: {x: pos6W, y:pos3H}, //
  59: {x: pos7W, y:pos1H}, // Cinesesc
  61: {x: pos1W, y:pos1H}, // Florencio
  62: {x: pos2W, y:pos2H}, // Consolação
  63: {x: pos3W, y:pos2H}, //
  64: {x: pos4W, y:pos3H}, //
  65: {x: pos5W, y:pos3H}, //
  66: {x: pos6W, y:pos1H}, //
  67: {x: pos7W, y:pos1H}, //
  68: {x: pos1W, y:pos2H}, //
  70: {x: pos2W, y:pos2H}, //
  71: {x: pos3W, y:pos3H}, //
  72: {x: pos4W, y:pos3H}, //
  73: {x: pos5W, y:pos1H}, //
  74: {x: pos6W, y:pos1H}, //
  75: {x: pos7W, y:pos2H}, //
  76: {x: pos1W, y:pos2H}, //
  77: {x: pos2W, y:pos3H}, //
  78: {x: pos3W, y:pos3H}, //
  79: {x: pos4W, y:pos1H}, //
  80: {x: pos5W, y:pos1H}, //
  81: {x: pos6W, y:pos2H}, //
  82: {x: pos7W, y:pos2H}, //
  83: {x: pos1W, y:pos3H}, //
  84: {x: pos2W, y:pos3H}, //
  85: {x: pos3W, y:pos1H}, //
  86: {x: pos4W, y:pos1H}, //
  87: {x: pos5W, y:pos2H}, //
  88: {x: pos6W, y:pos2H}, //
  89: {x: pos7W, y:pos3H}, //
  91: {x: pos1W, y:pos3H}, //
  92: {x: pos2W, y:pos1H}, //
  93: {x: pos3W, y:pos1H}, //
  94: {x: pos4W, y:pos2H}, //
  95: {x: pos5W, y:pos2H}, //
  96: {x: pos6W, y:pos3H}, //
};

  var periodoCenters = {
    today: { y: height / 2 - 35 },
    thisW: { y: height / 2 - 30},
    nextW: { y: height / 2 -15},
    thisM: { y: height / 2 + 15},
    nextM: { y: height / 2 + 30},
    sempre: { y: height / 2}
  };

  // Cabeçalhos da visão por semana.
  var semanasTitleX = {
    seg: pos1W-corrigeS, 
    ter: pos2W-corrigeS, 
    qua: pos3W-corrigeS, 
    qui: pos4W-corrigeS, 
    sex: pos5W-corrigeS, 
    sáb: pos6W-corrigeS, 
    dom: pos7W-corrigeS,
    sempre: pos4W-corrigeS 
  };

  var semanasTitleY = {
    seg: pos3H-20, 
    ter: pos3H-20,
    qua: pos3H-20,
    qui: pos3H-20,
    sex: pos3H-20,
    sáb: pos3H-20,
    dom: pos3H-20,
    sempre: pos3H+120
  };

// Cabeçalhos da visão por semana.
   var formatosTitleX = {
      1: pos5W-corrigeS, // shows
      2: pos1W-corrigeS, // cursos
      3: pos6W-corrigeS, // debates
      4: pos3W+50-corrigeS, // expos
      5: pos1W-50-corrigeS, // filmes
      6: pos7W+50-corrigeS, // turismo
    };

   var formatosTitleY = {
    1: pos2H-corrigeS, 
    2: pos2H-corrigeS, 
    3: pos3H-corrigeS, 
    4: pos3H-corrigeS, 
    5: pos1H-corrigeS, 
    6: pos1H-corrigeS, 
  };
  
// Cabeçalhos da visão por semana.
var unidadesTitleX = {
  52: pos1W-corrigeCab,
  53: pos2W-corrigeCab,
  55: pos3W-corrigeCab,
  56: pos4W-corrigeCab,  
  57: pos5W-corrigeCab, 
  58: pos6W-corrigeCab, 
  59: pos7W-corrigeCab,
  61: pos1W-corrigeCab,
  62: pos2W-corrigeCab,
  63: pos3W-corrigeCab, 
  64: pos4W-corrigeCab, 
  65: pos5W-corrigeCab, 
  66: pos6W-corrigeCab, 
  67: pos7W-corrigeCab, 
  68: pos1W-corrigeCab, 
  70: pos2W-corrigeCab, 
  71: pos3W-corrigeCab, 
  72: pos4W-corrigeCab, 
  73: pos5W-corrigeCab, 
  74: pos6W-corrigeCab, 
  75: pos7W-corrigeCab, 
  76: pos1W-corrigeCab, 
  77: pos2W-corrigeCab, 
  78: pos3W-corrigeCab, 
  79: pos4W-corrigeCab, 
  80: pos5W-corrigeCab, 
  81: pos6W-corrigeCab, 
  82: pos7W-corrigeCab, 
  83: pos1W-corrigeCab, 
  84: pos2W-corrigeCab, 
  85: pos3W-corrigeCab, 
  86: pos4W-corrigeCab, 
  87: pos5W-corrigeCab, 
  88: pos6W-corrigeCab, 
  89: pos7W-corrigeCab, 
  91: pos1W-corrigeCab, 
  92: pos2W-corrigeCab, 
  93: pos3W-corrigeCab, 
  94: pos4W-corrigeCab, 
  95: pos5W-corrigeCab, 
  96: pos6W-corrigeCab, 
};

var unidadesTitleY = {
  52: pos1H-corrigeCab, 
  53: pos1H-corrigeCab, 
  55: pos2H-corrigeCab, 
  56: pos2H-corrigeCab,  
  57: pos3H-corrigeCab, 
  58: pos3H-corrigeCab, 
  59: pos1H-corrigeCab, 
  61: pos1H-corrigeCab, 
  62: pos2H-corrigeCab, 
  63: pos2H-corrigeCab, 
  64: pos3H-corrigeCab, 
  65: pos3H-corrigeCab, 
  66: pos1H-corrigeCab, 
  67: pos1H-corrigeCab, 
  68: pos2H-corrigeCab, 
  70: pos2H-corrigeCab, 
  71: pos3H-corrigeCab, 
  72: pos3H-corrigeCab, 
  73: pos1H-corrigeCab, 
  74: pos1H-corrigeCab, 
  75: pos2H-corrigeCab, 
  76: pos2H-corrigeCab, 
  77: pos3H-corrigeCab, 
  78: pos3H-corrigeCab, 
  79: pos1H-corrigeCab, 
  80: pos1H-corrigeCab, 
  81: pos2H-corrigeCab, 
  82: pos2H-corrigeCab, 
  83: pos3H-corrigeCab, 
  84: pos3H-corrigeCab, 
  85: pos1H-corrigeCab, 
  86: pos1H-corrigeCab, 
  87: pos2H-corrigeCab, 
  88: pos2H-corrigeCab, 
  89: pos3H-corrigeCab, 
  91: pos3H-corrigeCab, 
  92: pos1H-corrigeCab, 
  93: pos1H-corrigeCab, 
  94: pos2H-corrigeCab, 
  95: pos2H-corrigeCab, 
  96: pos3H-corrigeCab, 
};


  var fillformatos = d3.scaleOrdinal()
  .domain([1, 2, 3, 4, 5, 6, 7, 8, 9])
  .range(["shows", "cursos", "debates", "expos", "filmes", "turismo", "lazer", "outros", "nove"]);

  var fillunidades = d3.scaleOrdinal()
  .domain([52,53,55,56,57,58,59,61,62,63,64,65,66,67,68,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,91,92,93,94,95,96])
  .range(["24 de maio","53","55","56","57","58","59",
          "61","62","63","64","65","66","67",
          "Belenzinho","70","71","72","73","74","75",
          "76","São José","78","79","80","81","82",
          "83","84","85","86","87","88","89",
          "91","92","93","94","95","96"]);

  //
  //
  //  Fim das variáveis
  //
  //


  // @v4 strength to apply to the position forces
  var forceStrength = 0.06;

  // These will be set in create_nodes and create_vis
  var svg = null;
  var bubbles = null;
  var nodes = [];
  // Charge é o que cria a força de repulsa dentro do ManyBody force.
  // é proporcional ao diâmetro do círculo (var radius) para evitar a 
  // colisão de círculos de tamanho diferentes.
  // Valor negativo para que os nós se afastem
  function charge(d) {
    return -Math.pow(d.radius, 2.1) * forceStrength;
  }

  // Here we create a force layout and
  // @v4 We create a force simulation now and add forces to it.

  var simulation = d3.forceSimulation()
    .velocityDecay(0.15)
    .force('x', d3.forceX().strength(forceStrength).x(nodesemanaPos))
    .force('y', d3.forceY().strength(forceStrength).y(nodeperiodoPos))
    .force('charge', d3.forceManyBody().strength(charge))
    .on('tick', ticked);

  // @v4 Force starts up automatically, which we don't want as there aren't any nodes yet.
  simulation.stop();

  // Define as cores
  var fillColor = d3.scaleOrdinal()
        .domain(['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom','sempre'])
        .range([corAzul, corAzul, corAzul, corAzul, corAzul, corLaranja, corLaranja, corAll]);
  
  var opacidadeColor = d3.scaleOrdinal()
		    .domain(['today', 'thisW', 'nextW', 'thisM', 'nextM','sempre'])
        .range(['1','.8','.6','.4','.2','.9']);


  /*
   * createNodes transforma os dados do CSV em uma matriz de objetos-nós (node objects)
   * Cada nó será um pontyo/bubble que armazena dados do CSV e valores para a visualização
   * rawData deve ser uma matriz de dados, gerado a partir de uma das funções do d3 (d3.csv)
   */
  function createNodes(rawData) {
    // Use the max lugares in the data as the max in the scale's domain
    // note we have to ensure the lugares is a number.
    var maxAmount = d3.max(rawData, function (d) { return +d.lugares; });

    // Tamanho dos pontos baseado na área.
    var radiusScale = d3.scalePow()
      .exponent(0.5)
      .range([5, 30])
      .domain([10, maxAmount]);

    // map() converte rawData em "node data".
    var myNodes = rawData.map(function (d) {
      return {
        id: d.id,
        radius: radiusScale(+d.lugares),
        value: +d.lugares,
        name: d.nome,
        name2: d.complemento,
		    busca: d.nome +" - "+d.complemento +" - "+d.categoria+" - "+d.projeto+" - "+d.dispositivo,
        projeto: d.projeto,
        unidade: d.unidade,
        cod_formato: +d.cod_formato,
        dia_da_semana: d.dia_da_semana,
        cod_uo: +d.cod_uo,
        weekday: +d.weekday+1,
		    regiao: d.regiao,
        filtra_data: d.tempo,
        filtra_dataF: d.tempoF,
        exibirdatas: d.exibirdatas,
        categoria: d.categoria,
        cod_categoria: +d.cod_categoria,
        destaque: d.destaque,
        formato: d.formato,
  	    publico: d.publico,
		    gratis: d.gratis,
		    ingresso: d.ingresso,
		    online: d.online,
		    tem: d.tem,
		    dispositivo: d.dispositivo,
        datainicial: d.datainicial,
        datafinal: d.datafinal,
        hora: d.hora,
        x: Math.random() * 900,
        y: Math.random() * 800
//		    lat: +d.lat,
//		    long: +d.long,
//        weekdaytxt: d.weekdaytxt,
//        sinopse: d.sinopse,
//        cx: projection([+d.long, +d.lat])[0]+Math.random()*10, 
//        cy: projection([+d.long, +d.lat])[1]+Math.random()*10,
//        cxe: projectionE([+d.long, +d.lat])[0]+Math.random()*10, 
//        cye: projectionE([+d.long, +d.lat])[1]+Math.random()*10 

      };
    });

    // sort them to prevent occlusion of smaller nodes.
    myNodes.sort(function (a, b) { return b.value - a.value; });

    return myNodes;
  }

  /*
   * Main entry point to the bubble chart. This function is returned
   * by the parent closure. It prepares the rawData for visualization
   * and adds an svg element to the provided selector and starts the
   * visualization creation process.
   * Selector is expected to be a DOM element or CSS selector that
   * points to the parent element of the bubble chart. Inside this
   * element, the code will add the SVG continer for the visualization.
   */
  var chart = function chart(selector, rawData) {
    // convert raw data into nodes data
    nodes = createNodes(rawData);

    // Create a SVG element inside the provided selector
    // with desired size.
    svg = d3.select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // associa os dados dos nós aos elementos DOM que os representará na visualização.
    bubbles = svg.selectAll('.bubble')
      .data(nodes, function (d) { return d.id; });

// 	Variável/tag crida para receber as fotos dos destaques - Não entendi plenamente como funciona
  var defs = svg.append("defs");
      defs.selectAll(".destaques")
          .data(nodes, function (d) { return d.id; })
          .enter()
          .append("pattern")
           .attr("class","destaques-pattern")
           .attr("id", function(d) { return d.destaque; })
           .attr("width", "100%")
           .attr("height", "100%")
           .attr("patternContentUnits", "objectBoundingBox")
          .append("image")
           .attr("width", 1)
           .attr("height", 1)
           .attr("preserveAspectRatio", "xMidYMid slice")
           .attr("xlink:href", function(d) {
      return "img/" + d.destaque + ".png"});

    // Create new circle elements each with class `bubble`. 
    // There will be one circle.bubble for each object in the nodes array. Initially, their radius (r attribute) will be 0. 
    // @v4 Selections are immutable, so lets capture the enter selection to apply our transtition to below.
    var bubblesE = bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('fill', function (d) { return fillColor(d.dia_da_semana); })
      .attr('opacity', function(d) { return opacidadeColor(d.filtra_data); })
      .attr('stroke', function (d) { return (d.online == 1)
                                             ? "gold" : (d.ingresso == 1) 
                                             ? "darkred" : d3.rgb(fillColor(d.dia_da_semana)).darker();})
      .attr('stroke-width', 2)
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail);

    // @v4 Merge the original empty selection and the enter selection
    bubbles = bubbles.merge(bubblesE);

// Transições 
    bubbles.transition()
      .duration(2000);
//      .attr('r', function (d) { return d.radius; }); // Original

    bubbles.attr('r', function(d) { return (
      (d.regiao != regiaoMem) || 
      (d.gratis != 1 && gratisMem == 1) || 
      (d.ingresso != 0 && vendaMem == 1) || 
      (d.cod_formato != formatoMem && formatoMem != '100') || 
      (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
      (d.online != 1 && onlineMem == 1) ||
      (d.cod_uo != uoMem && uoMem != '100') ||
      (d.publico != publicoMem && publicoMem != 'todos') ||
      (d.tem != 1 && acessivelMem == 1) ||
      (d.filtra_dataF != temporalMem && temporalMem != 'todos') 
      ) ? (formatoMem == '4') ? 0:3 : (d.destaque !== 'undefined') ? d.radius+20 : d.radius
    });

// Cria aro dourado para ação online ou vermelho para esgotado

bubbles.attr('stroke', function(d) { return (
  (d.regiao != regiaoMem) || 
  (d.gratis != 1 && gratisMem == 1) || 
  (d.ingresso != 0 && vendaMem == 1) || 
  (d.cod_formato != formatoMem && formatoMem != '100') || 
  (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
  (d.online != 1 && onlineMem == 1) ||
  (d.cod_uo != uoMem && uoMem != '100') ||
  (d.publico != publicoMem && publicoMem != 'todos') ||
  (d.tem != 1 && acessivelMem == 1) ||
  (d.filtra_dataF != temporalMem && temporalMem != 'todos') 
) ? '#555555' : (d.online == 1)
  ? "gold" : (d.ingresso == 1) 
  ? "darkred" : d3.rgb(fillColor(d.dia_da_semana)).darker()});

bubbles.attr('stroke-width', function(d) { return (
  (d.regiao != regiaoMem) || 
  (d.gratis != 1 && gratisMem == 1) || 
  (d.ingresso != 0 && vendaMem == 1) || 
  (d.cod_formato != formatoMem && formatoMem != '100') || 
  (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
  (d.online != 1 && onlineMem == 1) ||
  (d.cod_uo != uoMem && uoMem != '100') ||
  (d.publico != publicoMem && publicoMem != 'todos') ||
  (d.tem != 1 && acessivelMem == 1) ||
  (d.filtra_dataF != temporalMem && temporalMem != 'todos') 
) ? (formatoMem == '4') ? 0:1 : 3});

// Escolhe cor de acordo com o dia da semana e cinza se não filtrada

bubbles.attr('fill', function(d) { return (
  (d.regiao != regiaoMem) || 
  (d.gratis != 1 && gratisMem == 1) || 
  (d.ingresso != 0 && vendaMem == 1) || 
  (d.cod_formato != formatoMem && formatoMem != '100') || 
  (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
  (d.online != 1 && onlineMem == 1) ||
  (d.cod_uo != uoMem && uoMem != '100') ||
  (d.publico != publicoMem && publicoMem != 'todos') ||
  (d.tem != 1 && acessivelMem == 1) ||
  (d.filtra_dataF != temporalMem && temporalMem != 'todos') 
) ? '#cccccc' : (d.destaque !== 'undefined') ? "url(#" + d.destaque + ")" : fillColor(d.dia_da_semana)});

    // Set the simulation's nodes to our newly created nodes array.
    // @v4 Once we set the nodes, the simulation will start running automatically!
    simulation.nodes(nodes);


// exibe o total de atrações
   var display_tot = document.getElementById("total");
   const total = bubbles.size();
   display_tot.innerText = total + " atrações";

// Set initial layout to single group.
    groupBubbles();

  };

  /*
   * Callback function that is called after every tick of the
   * force simulation.
   * Here we do the acutal repositioning of the SVG circles
   * based on the current x and y values of their bound node data.
   * These x and y values are modified by the force simulation.
   */
  function ticked() {
    bubbles
      .attr('cx', function (d) { return d.x; })
      .attr('cy', function (d) { return d.y; });
  }
  

  /*
   * Provides a x value for each node to be used with the split by semana
   * x force.
   */
  function nodesemanaPos(d) {
    return semanaCenters[d.dia_da_semana].x;
  }

  function nodeperiodoPos(d) {
    return periodoCenters[d.filtra_data].y;
  }

  function nodeformatoXPos(d) {
    return formatoCenters[d.cod_formato].x + semanaCenters[d.dia_da_semana].x/10;
  }

  function nodeformatoYPos(d) {
    return formatoCenters[d.cod_formato].y + (periodoCenters[d.filtra_data].y/50);
  }

  function nodeunidadeXPos(d) {
    return unidadeCenters[d.cod_uo].x + semanaCenters[d.dia_da_semana].x/10;
  }

  function nodeunidadeYPos(d) {
    return unidadeCenters[d.cod_uo].y + (periodoCenters[d.filtra_data].y/2);
  }

// Função que separa o que não foi filtrado e joga pra fora
  function isolate(force, filter) {
  var initialize = force.initialize;
  force.initialize = function() { initialize.call(force, nodes.filter(filter)); };
  return force;
}

// função que faz as contagens e exibe o número de atrações filtradas
function contador(current_count){
  while (display_div.hasChildNodes()) {
         display_div.removeChild(display_div.lastChild);
        }
    new_span.className = 'contador';
    new_span.innerText = filtrado + "" ;
    display_div.appendChild(new_span);
};

function groupBubbles(formatoMem,regiaoMem,temporalMem,publicoMem,vendaMem,gratisMem,
  acessivelMem,onlineMem,uoMem,categoriaMem,atual,escolhido) {
  hidesemanaTitles();

// Força radial para afastar as ações não filtradas
   var radialForce = 
   d3.forceRadial()
     .radius(1000)
     .x(width/2)
     .y(height/2)
     .strength(forceStrength);

    bubbles.transition()
      .duration(2000);
      
    bubbles.attr('fill', function(d) { return (
      (d.regiao != regiaoMem) || 
      (d.gratis != 1 && gratisMem == 1) || 
      (d.ingresso != 0 && vendaMem == 1) || 
      (d.cod_formato != formatoMem && formatoMem != '100') || 
      (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
      (d.online != 1 && onlineMem == 1) ||
      (d.cod_uo != uoMem && uoMem != '100') ||
      (d.publico != publicoMem && publicoMem != 'todos') ||
      (d.tem != 1 && acessivelMem == 1) ||
      (d.filtra_dataF != temporalMem && temporalMem != 'todos') 
    ) ? '#cccccc' : (d.destaque !== 'undefined') ? "url(#" + d.destaque + ")" : fillColor(d.dia_da_semana)});

    bubbles.attr('r', function(d) { return (
      (d.regiao != regiaoMem) || 
      (d.gratis != 1 && gratisMem == 1) || 
      (d.ingresso != 0 && vendaMem == 1) || 
      (d.cod_formato != formatoMem && formatoMem != '100') || 
      (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
      (d.online != 1 && onlineMem == 1) ||
      (d.cod_uo != uoMem && uoMem != '100') ||
      (d.publico != publicoMem && publicoMem != 'todos') ||
      (d.tem != 1 && acessivelMem == 1) ||
      (d.filtra_dataF != temporalMem && temporalMem != 'todos') 
      ) ? (formatoMem == '4') ? 3:3 : (d.destaque !== 'undefined') ? d.radius+20 : d.radius
    });
    

// Define formato da visualização    
  if (atual == "regiao" || atual == "formato" || atual == "categoria") {
      // por Unidades
      hidesemanaTitles();
      showunidadeTitles();
      simulation.force('x', d3.forceX().strength(forceStrength).x(nodeunidadeXPos));
      simulation.force('y', d3.forceY().strength(forceStrength).y(nodeunidadeYPos));
      simulation.alpha(1).restart();
  
      } else 
        if (atual == "unidade") {
            // por Formatos
            hidesemanaTitles();
            showformatoTitles();
            simulation.force('x', d3.forceX().strength(forceStrength).x(nodeformatoXPos));
            simulation.force('y', d3.forceY().strength(forceStrength).y(nodeformatoYPos));
            simulation.alpha(1).restart();
       
            } else 
              if (atual == "") {
               // @v4 Zera a força 'x' para levar tudo ao centro.
                  simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
                  simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));
                  simulation.alpha(1).restart();

               } else {
               // por Agenda
                  hidesemanaTitles();
                  showsemanaTitles();
                  simulation.force('x', d3.forceX().strength(forceStrength).x(nodesemanaPos));
                  simulation.force('y', d3.forceY().strength(forceStrength).y(nodeperiodoPos));
                  simulation.alpha(1).restart();

}

// 	isola as ações que não estão filtradas
   simulation.force("r", isolate(radialForce, function(d) { return (
    (d.regiao != regiaoMem) || 
    (d.gratis != 1 && gratisMem == 1) || 
    (d.ingresso != 0 && vendaMem == 1) || 
    (d.cod_formato != formatoMem && formatoMem != '100') || 
    (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
    (d.filtra_dataF != temporalMem && temporalMem != 'todos') ||
    (d.online != 1 && onlineMem == 1) ||
    (d.cod_uo != uoMem && uoMem != '100') ||
    (d.tem != 1 && acessivelMem == 1) ||
    (d.publico != publicoMem && publicoMem != 'todos')
  );}))
  

// começa a contagem do filtro e a preparação para a retirada das opções com valores zerados

filtroAplicado = bubbles.filter(function(d) { return !(
  (d.regiao != regiaoMem) || 
  (d.gratis != 1 && gratisMem == 1) || 
  (d.ingresso != 0 && vendaMem == 1) || 
  (d.cod_formato != formatoMem && formatoMem != '100') || 
  (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
  (d.filtra_dataF != temporalMem && temporalMem != 'todos') ||
  (d.online != 1 && onlineMem == 1) ||
  (d.cod_uo != uoMem && uoMem != '100') ||
  (d.tem != 1 && acessivelMem == 1) ||
  (d.publico != publicoMem && publicoMem != 'todos')
);})

filtroAplicadoSemCategoria = bubbles.filter(function(d) { return !(
  (d.regiao != regiaoMem) || 
  (d.gratis != 1 && gratisMem == 1) || 
  (d.ingresso != 0 && vendaMem == 1) || 
  (d.cod_formato != formatoMem && formatoMem != '100') || 
  (d.filtra_dataF != temporalMem && temporalMem != 'todos') ||
  (d.online != 1 && onlineMem == 1) ||
  (d.cod_uo != uoMem && uoMem != '100') ||
  (d.tem != 1 && acessivelMem == 1) ||
  (d.publico != publicoMem && publicoMem != 'todos')
);})

filtroAplicadoSemTempo = bubbles.filter(function(d) { return !(
   (d.regiao != regiaoMem) || 
   (d.gratis != 1 && gratisMem == 1) || 
   (d.ingresso != 0 && vendaMem == 1) || 
   (d.cod_formato != formatoMem && formatoMem != '100') || 
   (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
   (d.online != 1 && onlineMem == 1) ||
   (d.cod_uo != uoMem && uoMem != '100') ||
   (d.tem != 1 && acessivelMem == 1) ||
   (d.publico != publicoMem && publicoMem != 'todos')
 );})

 filtroAplicadoSemUO = bubbles.filter(function(d) { return !(
  (d.regiao != regiaoMem) || 
  (d.gratis != 1 && gratisMem == 1) || 
  (d.ingresso != 0 && vendaMem == 1) || 
  (d.cod_formato != formatoMem && formatoMem != '100') || 
  (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
  (d.filtra_dataF != temporalMem && temporalMem != 'todos') ||
  (d.online != 1 && onlineMem == 1) ||
  (d.tem != 1 && acessivelMem == 1) ||
  (d.publico != publicoMem && publicoMem != 'todos')
);})

filtrado = filtroAplicado.size();
contador(filtrado);

// texto amigável do que está sendo filtrado no momento
 function filtroExibido(escolhido){
   while (display_filtro.hasChildNodes()) {
          display_filtro.removeChild(display_filtro.lastChild);
          }
          novo_span.className = 'EmExibicao';

  if (fe == '') {fe = ' atividades '};
  if (atual == "categoria" && categoriaMem != '99') {
      fc = ' de ' + escolhido};
  if (atual == "formato") {fe = escolhido};
  if (atual == "formato") {fc = ''};
  if (atual == "unidade") {fuo = escolhido};
  if (atual == "regiao") {fuo = ''};

  if (fuo != '') {
    var fonde = ' no Sesc ' + fuo  } else if (regiaoMem == 'capital') {
    var fonde = ' na Grande São Paulo' } else { fonde = ' no Interior e Litoral'};

  if (temporalMem == 'todos') {
      var fq = ' nos próximos dias ' } else if (temporalMem == 'semana') {
        var fq = ' nesta semana' } else if (temporalMem == 'depois') { 
                fq = ' em 15 dias ou mais '} else { fq = ' na próxima semana'};

  if (publicoMem == 'todos') {
      var fp = ' para ' + 'todos os publicos' } else { fp = ' para ' + publicoMem};

  if (gratisMem == 1) {
        var fg = ' gratuitos ' } else { fg = ''};
        
  if (onlineMem == 1) {
          var fo = ' online ' } else { fo = ''};

  if (acessivelMem == 1) {
          var fa = ' com dispositivos de acessibilidade' } else { fa = ''};

  if (vendaMem == 1) {
          var fi = ' disponíveis para venda/inscrição' } else { fi = ''};

  if (formatoMem == '7') {fe = ' atividades de lazer '};
  if (formatoMem == '100') {fe = ' atividades'};
        // filtrado + ' ' + 
    novo_span.innerText = fe + fo + fg + fc + fonde + fq + fp + fa + fi;
    display_filtro.appendChild(novo_span);
};

  filtroExibido(escolhido);


  if (atual == "formato") {
    var op = document.getElementById('ca');
        op.classList.add('active');
    }


if (atual != "categoria") {
  var arr = ['1','2','3','4','5','6','7','8','9','10','11','14'];
  for(var i=0; i < arr.length; i++) { 

    document.getElementById(`ca${arr[i]}`).disabled = false; 
    document.getElementById(`ca${arr[i]}`).style.visibility = "visible";

    tem = filtroAplicadoSemCategoria.filter(function(d) { 
      return ((
        d.cod_formato == formatoMem &&
        d.cod_categoria == arr[i]
        ));}).size();
          if (tem == 0) {  
            document.getElementById(`ca${arr[i]}`).style.visibility = "hidden"; 
            document.getElementById(`ca${arr[i]}`).checked = false; 
            document.getElementById(`ca${arr[i]}`).disabled = true; 
          } 
    }
}

// tira as opções zeradas em unidades
 if (atual != "unidade") {
  arr_uos = [52, 53, 55, 56, 57, 58, 59, 61, 62, 63, 64, 65, 66, 67, 68, 70, 71, 72, 73, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96];
  for(var i=0; i < arr_uos.length; i++) { 

    document.getElementById("uo"+arr_uos[i]).disabled = false; 

  if (formatoMem != '100' && formatoMem != '') {
    tem_uo = filtroAplicadoSemUO.filter(function(d) { return (
            d.cod_uo == arr_uos[i] &&
            d.cod_formato == formatoMem
            );}).size();
          if (tem_uo == 0) {  
            document.getElementById("uo"+arr_uos[i]).checked = false; 
            document.getElementById("uo"+arr_uos[i]).disabled = true; 
            uoMem = '100';
          } 
        } else {
          tem_uo = filtroAplicadoSemUO.filter(function(d) { return (
            d.cod_uo == arr_uos[i] 
            );}).size();
          if (tem_uo == 0) {  
            document.getElementById("uo"+arr_uos[i]).checked = false; 
            document.getElementById("uo"+arr_uos[i]).disabled = true; 
            uoMem = '100';
          } 
    }
 }
}

// tira as opções zeradas em PUBLICO

if (atual != "publico") {
  var arr = ['crianças','jovens','idosos'];
  for(var i=0; i < arr.length; i++) { 

    document.getElementById(arr[i]).disabled = false; 

 if (formatoMem != '100' && formatoMem != '') {

    tem = filtroAplicado.filter(function(d) { return (
          d.publico == arr[i] &&
          d.cod_formato == formatoMem
          );}).size();
          if (tem == 0) {  
            document.getElementById(arr[i]).checked = false; 
            document.getElementById(arr[i]).disabled = true; 
            publicoMem = 'todos';
          } 
    } else {
      tem = filtroAplicado.filter(function(d) { return (
        d.publico == arr[i]
        );}).size();
        if (tem == 0) {  
          document.getElementById(arr[i]).checked = false; 
          document.getElementById(arr[i]).disabled = true; 
          publicoMem = 'todos';
        } 
    }
  }
}

// tira as opções zeradas NAS DATAS

if (atual != "temporal") {
  var arr = ['agora','depois'];
  for(var i=0; i < arr.length; i++) { 

    document.getElementById(arr[i]).disabled = false; 

    if (formatoMem != '100' && formatoMem != '') {

    tem = filtroAplicadoSemTempo.filter(function(d) { 
          return (
            d.cod_formato == formatoMem &&
            d.filtra_dataF == arr[i]
          );}).size();

          if (tem == 0) {  
            document.getElementById(arr[i]).checked = false; 
            document.getElementById(arr[i]).disabled = true; 
            temporalMem = 'todos';
          } 
    } else {

      tem = filtroAplicadoSemTempo.filter(function(d) { 
            return (
              d.filtra_dataF == arr[i]
            );}).size();
  
            if (tem == 0) {  
              document.getElementById(arr[i]).checked = false; 
              document.getElementById(arr[i]).disabled = true; 
              temporalMem = 'todos';
            } 
      }
    }
    }

  if (atual != "online") {
      document.getElementById('online').disabled = false; 
      tem = filtroAplicado.filter(function(d) { return (
            d.online == 1
            );}).size();
            if (tem == 0) {  
              document.querySelector('#online').checked = false; 
              document.querySelector('#online').disabled = true; 
              OnlineMem = null;
            } 
  }

  
  if (atual != "gratis") {
    document.getElementById('gratis').disabled = false; 
    tem = filtroAplicado.filter(function(d) { return (
          d.gratis == 1
          );}).size();
          if (tem == 0) {  
            document.querySelector('#gratis').checked = false; 
            document.querySelector('#gratis').disabled = true; 
            GratisMem = null;
          } 
}


if (atual != "venda") {
  document.getElementById('venda').disabled = false; 
  tem = filtroAplicado.filter(function(d) { return (
        d.ingresso == 0
        );}).size();
        if (tem == 0) {  
          console.log('tem venda: ' + tem);
          document.querySelector('#venda').checked = false; 
          document.querySelector('#venda').disabled = true; 
          VendaMem = null;
        } 
}


if (atual != "acessibilidade") {
  document.getElementById('acessivel').disabled = false; 
  tem = filtroAplicado.filter(function(d) { return (
        d.tem == 1
        );}).size();
        if (tem == 0) {  
          console.log('tem acess: ' + tem);
          document.querySelector('#acessivel').checked = false; 
          document.querySelector('#acessivel').disabled = true; 
          AcessivelMem = null;
        } 
}

}

// Visualização de Busca

  function buscaBubbles(buscaId) {
    hidesemanaTitles();
    showunidadeTitles();

// Apaga texto amigável e mostra Busca
  novo_span.innerText = "atrações com o termo '" + buscaId +"'";
  display_filtro.appendChild(novo_span);

// Força para expelir não filtradas  
var radialForceBusca = 
d3.forceRadial()
  .radius(1000)
  .x(width/2)
  .y(height/2)
  .strength(0.2);

    buscaId = buscaId.toLowerCase();
    console.log(buscaId);

    bubbles.transition()
    .duration(2000)
    .attr('r', function(d) { return !(d.busca.toLowerCase().includes(buscaId)) ? 3 : (d.destaque !== 'undefined') 
                    ? d.radius+10 : !(d.busca.toLowerCase().includes(buscaId)) ? 1 : d.radius})

// Cria aro dourado para ação online ou vermelho para esgotado
    .attr('stroke', function(d) { return !(d.busca.toLowerCase().includes(buscaId)) 
      ? '#555555' : (d.online == 1)
      ? "gold" : (d.ingresso == 1) 
      ? "darkred" : d3.rgb(fillColor(d.dia_da_semana)).darker()})
    .attr('stroke-width', function(d) { return !(d.busca.toLowerCase().includes(buscaId)) ? 1 : 3})
    .attr('fill', function(d) { return !(d.busca.toLowerCase().includes(buscaId)) ? '#cccccc' : (d.destaque !== 'undefined')
            ? "url(#" + d.destaque + ")" : fillColor(d.dia_da_semana)});

// 	joga para o canto as ações que não estão filtradas
    simulation.force("r", isolate(radialForceBusca, function(d) { 
        return !(d.busca.toLowerCase().includes(buscaId)); 
        }));

    simulation.force('x', d3.forceX().strength(0.1).x(nodeunidadeXPos));
    simulation.force('y', d3.forceY().strength(0.1).y(nodeunidadeYPos));
//  simulation.alpha(1).restart();

// contador da busca textual
    tot = bubbles.size();
    filtrado = bubbles.filter(function(d) { return (d.busca.toLowerCase().includes(buscaId))}).size()
    contador(filtrado);

// @v4 Reinicia a visuaização
    if (filtrado == tot) {
        atual = '';
        escolhido = '';
        groupBubbles(formatoMem,regiaoMem,temporalMem,publicoMem,vendaMem,gratisMem,
                   acessivelMem,onlineMem,uoMem,categoriaMem,atual,escolhido);
        }

  }

  /*
   * Oculta cabeçalhos.
   */
  function hidesemanaTitles() {
    svg.selectAll('.dia_da_semana').remove();
}

  /*
   * Mostra cabeçalhos semanais
   */
  function showsemanaTitles() {
    var semanasData = d3.keys(semanasTitleX);
    var semanas = svg.selectAll('.dia_da_semana')
      .data(semanasData);

    semanas.enter().append('text')
      .attr('class', 'dia_da_semana')
      .attr('x', function (d) { return semanasTitleX[d]; })
      .attr('y', function (d) { return semanasTitleY[d]; })
      .attr('fill', function(d) { return fillColor(d); })
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }
/*
* Mostra cabeçalhos de formatos
*/
  
  function showformatoTitles() {
    var formatosData = d3.keys(formatosTitleX);
    var formatos = svg.selectAll('.dia_da_semana')
      .data(formatosData);

    formatos.enter().append('text')
      .attr('class', 'dia_da_semana')
      .attr('x', function (d) { return formatosTitleX[d]; })
      .attr('y', function (d) { return formatosTitleY[d]; })
      .attr('text-anchor', 'middle')
      .text(function (d) { return fillformatos(d); });
  }

/*
* Mostra cabeçalhos de unidades
*/
  
function showunidadeTitles() {
  var unidadesData = d3.keys(unidadesTitleX);
  var unidades = svg.selectAll('.dia_da_semana')
    .data(unidadesData);

  unidades.enter().append('text')
    .attr('class', 'dia_da_semana')
    .attr('x', function (d) { return unidadesTitleX[d]; })
    .attr('y', function (d) { return unidadesTitleY[d]; })
    .attr('text-anchor', 'middle')
    .text(function (d) { return fillunidades(d); });
}

// Busca textual
const searchInput = d3.select(".g-search input")
.on("keyup", keyuped)
foco();


// Exibe o detalhamento com o MOuseOver
  function showDetail(d) {
    // change outline to indicate hover state.
    d3.select(this).attr('stroke', 'black');

// tratamento de variáveis para exibição
   const StrToData = d3.timeParse("%Y-%m-%d 00:00:00");
   const formataData = d3.timeFormat("%d.%m.%Y");
   const formataHora = d3.timeFormat("%Hh%M");
    
    if (d.exibirdatas == "de-ate") {
      var exibedata = 'De ' + formataData(StrToData(d.datainicial)) + ' até ' + formataData(StrToData(d.datafinal));
    } else {
      var exibedata = '' + d.dia_da_semana + ', ' + formataData(StrToData(d.datainicial))  + ' ' + formataHora(StrToData(d.hora)) ;
    }
    
    if (d.online == 1) {
      var online = 'ação online<br>';
    } else {var online = ''}
    
    if (d.tem == 1) {
      var tem_acessivel = d.dispositivo + '<br><br>';
    } else {var tem_acessivel = ''}
    
    if (d.publico == 'outros') {
      var publico = '';
    } else {var publico = d.publico}
    
    if (d.ingresso == 1) {
      var ingresso = 'ingressos esgotados/inscrições encerradas';
    } else if (d.cod_formato == 1) { 
           var ingresso = 'ingressos à venda' 
          } else { var ingresso = 'inscrições abertas' }
    
    if (d.gratis == 1) {
      var gratis = 'grátis';
    } else {var gratis = ''}
    
    var content = '<span class="name"></span>' +
                  '<span class="name"><b>' + tem_acessivel + '</b></span>' +
                  '<span class="name"><b>' + online + '</b></span>' +
                  '<span class="value"><b>' + exibedata + '</b></span><br>' +
				          '<span class="value">' + d.projeto + '</span><br/>' +
				          '<span class="name"><a href="https://www.sescsp.org.br/?s=' + d.nome + '" target="_blank"><b>' + d.name + '</b></a><br></span>' +
                  '<span class="value">' + d.name2 + '</span><br/>' +
                  '<span class="value"><br><b>' + d.categoria + '</b></span><br/>' +
                  '<span class="value">' + 'sinopse' + ' | ' + 
                  d.value + ' lugares/vagas</span>.' +
                  '<span class="value"><b> ' + gratis + '<br>' + ingresso + '</b><br>' +
                  '<span class="value"><b>' + publico + '</b></span><br>' +
                  '<span class="value">' + d.regiao + ' | <b>' + d.unidade + '</b> | ' + d.formato + '</span><br/>';

    tooltip.showTooltip(content, d3.event);
  }


// Oculta o detalhamento
  function hideDetail(d) {
    // reset outline
    d3.select(this)
      .attr('stroke', d3.rgb(fillColor(d.dia_da_semana)).darker());
    tooltip.hideTooltip();
  }

  /*
   * Opções de interação do usuário
   */
//  chart.toggleDisplay = function (displayName) {
  chart.toggleDisplay = function (formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                  acessivelId,onlineId,uoId,categoriaId,atual,escolhido) 
                                  {

  //	GUARDA AS ÚLTIMAS ESCOLHAS
  if (regiaoId != null) {
    regiaoMem = regiaoId; 
  };

  if (uoId != null) {
    uoMem = uoId; 
  };

  if (formatoId != null) {
    formatoMem = formatoId; 
  };

  if (categoriaId != null) {
    categoriaMem = categoriaId; 
  };

  if (temporalId != null) {
    temporalMem = temporalId; 
  };

  if (publicoId != null) {
    publicoMem = publicoId; 
  };

  if (gratisId != null) {
    gratisMem = gratisId; 
  };

  if (vendaId != null) {
    vendaMem = vendaId; 
  };

  if (acessivelId != null) {
    acessivelMem = acessivelId; 
  };

  if (onlineId != null) {
    onlineMem = onlineId; 
  };

	if (formatoId == '99') {
    window.location.reload(true);
  }  

     groupBubbles(formatoMem,regiaoMem,temporalMem,publicoMem,vendaMem,gratisMem,
                 acessivelMem,onlineMem,uoMem,categoriaMem,atual,escolhido);
  };


  // return the chart function from closure.
  return chart;

 //	Monitora a digitação da pesquisa textual
 function keyuped() {
  // Find Text 
  if (d3.event.keyCode === 13) {
    buscaId = this.value; 
    }

  if (d3.event.keyCode === 27) {
      window.location.reload(true);
    this.value = ""
    this.blur()
  }
  buscaId = this.value; 
  buscaBubbles(buscaId);
};


}

// Inicia a visualização
var myBubbleChart = bubbleChart();

// Function called once data is loaded from CSV. Calls bubble chart function to display inside #vis div.
function display(error, data) {
  if (error) {
    console.log(error);
  }
  myBubbleChart('#vis', data);
}

// Configura os botões utilizados pelo usuário para escolher a visualização
function setupButtons(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId) {
  d3.select('#toolbar')
    .selectAll('.button')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('.button').classed('active', false);
      // Find the button just clicked
      var button = d3.select(this);

      // Set it as the active button
      button.classed('active', true);

      // Get the id of the button
      var formatoId = button.attr('id').substring(2);
      var atual = "formato";
      var escolhido = button.attr('value');

        var tiraCat = document.querySelector("#mySideNavCategoria");
            tiraCat.querySelector("form").reset();
            categoriaMem = '99';
            categoriaId = '99';

            arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','14'];
             for(var i=0; i < arr.length; i++) { 
                 var op = document.getElementById('ca'+arr[i]);
                     op.classList.remove('active');
            } 

      foco();
      myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual,escolhido);
    });
}

function setupButtonTudo(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId) {
  d3.select('#toolbar')
    .selectAll('.buttonTudo')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('.buttonTudo').classed('active', false);
      // Find the button just clicked
      var buttonTudo = d3.select(this);

      // Set it as the active button
      buttonTudo.classed('active', true);

      // Get the id of the button
      var formatoId = buttonTudo.attr('id').substring(2);
      var atual = "formato";
      
      foco();
      myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual);
    });
}

function setupButtonsFiltroCategorias(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId) {
  d3.select('#mySideNavCategoria')
    .selectAll('.buttonCat')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('.buttonCat').classed('active', false);
      // Find the button just clicked
      var button = d3.select(this);

      // Set it as the active button
      button.classed('active', true);

      // Get the id of the button
      var categoriaId = button.attr('id').substring(2);
      var escolhido = button.attr('value');
          var atual = "categoria";
          foco();
      myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual,escolhido);
    });
}


function setupButtonsFiltroTemporal(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId) {
  d3.select('#temporal')
    .selectAll('.temporal')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('.temporal').classed('active', false);
      // Find the button just clicked
      var temporal = d3.select(this);

      // Set it as the active button
      temporal.classed('active', true);

      // Get the id of the button
      var temporalId = temporal.attr('id');
      var escolhido = temporal.attr('value');

      var atual = "temporal";
      foco();
      myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual,escolhido);
    });
}

function setupButtonsFiltroRegiao(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId) {

  d3.select('#regiao')
    .selectAll('.regiao')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('.regiao').classed('active', false);

// Find the button just clicked
      var regiao = d3.select(this);

// Set it as the active button
          regiao.classed('active', true);

// Get the id of the button
      var regiaoId = regiao.attr('id');

// Zera as unidades
      var uoId = 100;
   var tiraUO = document.querySelector("#unidades");
       tiraUO.querySelector("form").reset();

       var atual = "regiao";
       foco();
      myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual);
    });
}

function setupButtonsFiltroPublico(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId) {
  d3.select('#publico')
    .selectAll('.publico')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('.publico').classed('active', false);
      // Find the button just clicked
      var publico = d3.select(this);

      // Set it as the active button
      publico.classed('active', true);

      // Get the id of the button
      var publicoId = publico.attr('id');

      var atual = "publico";
      foco();
      myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual);
    });
}

function setupButtonsFiltroVenda(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId) {
 
      var venda = document.querySelector('#venda');
          venda.addEventListener('change', function(element) {
      if (venda.checked == true) { 
        var vendaId = 1;
       } else {
        var vendaId = 0;
      }

    var atual = "venda";
    foco()
    myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual);
    });

}


function setupButtonsFiltroGratis(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId) {
 
    var gratis = document.querySelector('#gratis');
        gratis.addEventListener('change', function(element) {
    if (gratis.checked == true) { 
      var gratisId = 1;
      } else {
      var gratisId = 0;
    }

    var atual = "gratis";
    foco()
    myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual);
    });
}


function setupButtonsFiltroAcessivel(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId) {

    var acessivel = document.querySelector('#acessivel');
          acessivel.addEventListener('change', function(element) {
       if (acessivel.checked == true) { 
            var acessivelId = 1;
        } else {
            var acessivelId = 0;
       }

    var atual = "acessibilidade";
    foco()
    myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual);
    });
}


function setupButtonsFiltroOnline(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId) {
  	var online = document.querySelector('#online');
        online.addEventListener('change', function(element) {
	      if (online.checked == true) { 
	         var onlineId = 1;
	         var regiaoId = 'todos';

		    } else {
       var onlineId = 0;
      }

      var atual = "online";
      foco()
      myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual);
    });
}


function setupButtonsFiltroUnidades(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId) {
  d3.select('#unidades')
    .selectAll('.uo')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('.uo').classed('active', false);
      // Find the button just clicked
      var uo = d3.select(this);

      // Set it as the active button
      uo.classed('active', true);

      // Get the id of the button
      var uoId = uo.attr('id').substring(2);
      var escolhido = uo.attr('value');
      var atual = "unidade";
      document.getElementById('capital').checked = false; 
      document.getElementById('interior').checked = false; 

      foco();
      myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual,escolhido);
    });
}

function foco() {
    document.getElementById('buscatextual').focus();
    document.getElementById('buscatextual').select();
    }

//	Inicia os botões
// setupButtonsOld();
 setupButtons();
 setupButtonTudo();
 setupButtonsFiltroCategorias();
 setupButtonsFiltroTemporal();
 setupButtonsFiltroRegiao();
 setupButtonsFiltroPublico();
 setupButtonsFiltroVenda();
 setupButtonsFiltroGratis();
 setupButtonsFiltroAcessivel();
 setupButtonsFiltroOnline();
 setupButtonsFiltroUnidades();

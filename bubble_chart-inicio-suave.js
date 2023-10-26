/* bubbleChart creation function. Returns a function that will
 * instantiate a new bubble chart given a DOM element to display
 * it in and a dataset to visualize.
 *
 * Organization and style inspired by:
 * https://bost.ocks.org/mike/chart/
 *
 */


//	Valores para o tamanho da tela
var width = window.innerWidth * 0.75;
var height = window.innerHeight * 0.90;

escondeMapa();

//	Carrega os dados
d3.csv('data/orasbolasB.csv', display);

//	Inicia a visualização
var myBubbleChart = bubbleChart();

/*
 * Function called once data is loaded from CSV.
 * Calls bubble chart function to display inside #vis div.
 */
function display(error, data) {
  if (error) {
    console.log(error);
  }
  myBubbleChart('#vis', data);
}

function bubbleChart() {

var buscaId = '';
var regiaoId = 'capital';
var formatoId = '100';
var publicoId = 'todos';
var temporalId = 'agora';
var uoId = '100';
var categoriaId = '99';
var gratisId = null;
var vendaId = null;
var acessivelId = null;
var onlineId = null;

var regiaoMem = 'capital';
var formatoMem = '100';
var publicoMem = 'todos';
var temporalMem = 'agora';
var uoMem = '100';
var categoriaMem = '99';
var gratisMem = null;
var vendaMem = null;
var acessivelMem = null;
var onlineMem = null;

var fc = '';
var fe = '';
var fuo = '';


var display_div = document.getElementById("contador");
var display_filtro = document.getElementById("EmExibicao");
var new_span = document.createElement('span');
var novo_span = document.createElement('span');


// cores para dias da semana e finais de semana
const corAzul = '#0097ad'
const corLaranja = '#ffb100'
const corAll = '#CC7722'

//	Ponto central da tela
var center = { x: width / 2, y: height / 2 };

// Grid de 21 pontos em tela
const corrigeT = 200;
const corrigeS = 250;
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

// @v4 strength to apply to the position forces
const forceStrength2 = 0.02;
const forceStrength = 0.03;
const forceStrength5 = 0.05;
const forceStrength7 = 0.07;
const forceStrength10 = 0.1;
const forceStrength20 = 0.2;
const forceStrength30 = 0.3;
const forceStrength50 = 0.5;
const forceStrength70 = 0.7;
const forceStrength80 = 0.8;
const forceStrength90 = 0.9;
const forceStrength100 = 1;

// Tooltip por MouseOver
  var tooltip = floatingTooltip('gates_tooltip', 360);

//  Variaveis para a visualização Semanal (Year) ----------------------------------------------------------------------------------
// Define X e Y para o conjunto

  var semanaCenters = {
    1: { x: pos1W+100 },
    2: { x: pos2W+100 },
    3: { x: pos3W+100 },
    4: { x: pos4W+100 },
    5: { x: pos5W+100 },
    6: { x: pos6W+100 },
    7: { x: pos7W+100 },
    8: { x: pos4W+100 }
  };

  var semanaCentersInicial = {
    1: { x: (center).x-140 },
    2: { x: (center).x-90 },
    3: { x: (center).x-50 },
    4: { x: (center).x },
    5: { x: (center).x+50 },
    6: { x: (center).x+90 },
    7: { x: (center).x+150 },
    8: { x: (center).x+Math.random()*20}
  };


  var periodoCenters = {
    today: { y: height / 2 - 175 },
    thisW: { y: height / 2 - 170},
    nextW: { y: height / 2 -70},
    thisM: { y: height / 2 + 30},
    nextM: { y: height / 2 + 110},
    sempre: { y: height / 2}
  };

  var forcaY = {
    today: { y: 0.4 },
    thisW: { y: 0.4},
    nextW: { y: 0.4},
    thisM: { y: 0.4},
    nextM: { y: 0.4},
    sempre: { y: 0.9}
  };

  var yearCenters = {
    1: { x: width / 8, y: height / 2 },
    2: { x: width / 4, y: height / 2 },
    3: { x: width / 4 + width / 8, y: height / 2 },
    4: { x: width / 2, y: height / 2 },
    5: { x: width / 2 + width / 8, y: height / 2 },
    6: { x: width / 2 + width / 4, y: height / 2 },
    7: { x: width - width / 8, y: height / 2 },
    8: { x: width / 2, y: height / 2 }
  };
  
// Define um valor x para cada ponto para ser usado na visualização semanal (year)
  function nodeYearPos(d) {
  	return yearCenters[d.weekday].x;
  }

// Define posição X para os blocos de dias da semana?
  function nodeSemanalPosX(d) {
  var nodePosSemanalX = d3.scaleOrdinal()
    .domain(['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom','sempre'])
    .range([pos1W+corrige, pos2W+corrige, pos3W+corrige, pos4W+corrige, pos5W+corrige, pos6W+corrige, pos7W+corrige, pos4W+corrige]);
    return nodePosSemanalX(d.weekdaytxt);
  }
  
// Esconde os dias da semana
  function hideYearTitles() {
    svg.selectAll('.DiasDaSemana').remove();
    svg.selectAll('.Semanas').remove();

  }

/////////////////////////////////////////
//  Variaveis para todas as visualizações
/////////////////////////////////////////

    // These will be set in create_nodes and create_vis
  var svg = null;
  var bubbles = null;
  var nodes = [];

  // Charge function that is called for each node.
  // As part of the ManyBody force.
  // This is what creates the repulsion between nodes.
  //
  // Charge is proportional to the diameter of the
  // circle (which is stored in the radius attribute
  // of the circle's associated data.
  //
  // This is done to allow for accurate collision
  // detection with nodes of different sizes.
  //
  // Charge is negative because we want nodes to repel.
  // @v4 Before the charge was a stand-alone attribute
  //  of the force layout. Now we can use it as a separate force!
  
  // Para separar os pontos, valor deve ser correspondente ao atributo 'r'
  function charge(d) {
    return -Math.pow(+d.radius, 2.0) * forceStrength;
  }

  // Here we create a force layout and
  // @v4 We create a force simulation now and
  //  add forces to it.

  if (formatoMem == '4') {
    var simulation = d3.forceSimulation()
      .velocityDecay(0.3)
 //	  .alphaDecay(.00001)
      .force('x', d3.forceX().strength(forceStrength).x(function (d) { return d.cx; }))
      .force('y', d3.forceY().strength(forceStrength).y(function (d) { return d.cy; }))
      .force('charge', d3.forceManyBody().strength(charge))
      .on('tick', tickedMapa);

        } else {
    var simulation = d3.forceSimulation()
      .velocityDecay(0.3)
 //	  .alphaDecay(.00001)
      .force('x', d3.forceX().strength(forceStrength).x(center.x))
      .force('y', d3.forceY().strength(forceStrength).y(center.y))
      .force('charge', d3.forceManyBody().strength(charge))
      .on('tick', ticked);
  }      


      if (formatoMem == '4') {
        simulation.on('tick', tickedMapa);
        } else {
        simulation.on('tick', ticked);
       }      

     simulation.stop();

     console.log('passou na linha 840');

// Define as cores e a opacidade
    var fillColor = d3.scaleOrdinal()
        .domain(['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom','sempre'])
        .range([corAzul, corAzul, corAzul, corAzul, corAzul, corLaranja, corLaranja, corAll]);
  
    var opacidadeColor = d3.scaleOrdinal()
		    .domain(['today', 'thisW', 'nextW', 'thisM', 'nextM','sempre'])
        .range(['1','.8','.5','.35','.15','.9']);
		
  /*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
  function createNodes(rawData) {

//	Define os tamanhos máximo e mínimo dos pontos
    var maxAmount = d3.max(rawData, function (d) { return +d.tamanho; });
    var radiusScale = d3.scalePow()
      .exponent(0.5)
      .domain([10, maxAmount])
      .range([6, 30]);

//	map() converte "raw data" em "node data".
    var myNodes = 	rawData.map(function (d) {

        var projection = d3.geoMercator()  
          .center([-47.03, -23.39])  // GPS of location to zoom on
          .scale(100000)            // This is like the zoom
          .translate([ 0, 0 ]);

        var projectionE = d3.geoMercator()  
          .center([-49.5, -22.3]) // GPS of location to zoom on
          .scale(7500)            // This is like the zoom
          .translate([ width/3,height/3 ]);
              
      return {
        id: d.id,
        radius: radiusScale(+d.tamanho),
        value: +d.tamanho,
        name: d.nome,
        name2: d.complemento,
        projeto: d.projeto,
		    busca: d.nome +" - "+d.complemento +" - "+d.categoria+" - "+d.projeto+" - "+d.dispositivo,
        org: d.uo,
        cod_uo: +d.cod_uo,
		    lat: +d.lat,
		    long: +d.long,
        weekdaytxt: d.weekdaytxt,
        weekday: +d.weekday+1,
		    regiao: d.regiao,
        filtra_data: d.tempo,
        filtra_dataF: d.tempoF,
        uo: d.uo,
        exibirdatas: d.exibirdatas,
        categoria: d.categoria,
        cod_categoria: +d.cod_categoria,
        destaque: d.destaque,
        formato: d.formato,
        cod_formato: +d.cod_formato,
		    publico: d.publico,
		    gratis: d.gratis,
		    ingresso: d.ingresso,
		    online: d.online,
		    tem: d.tem,
		    dispositivo: d.dispositivo,
        datainicial: d.datainicial,
        datafinal: d.datafinal,
        hora: d.hora,
//        sinopse: d.sinopse,
        x: 1+Math.random() * 900, 
        y: 1+Math.random() * 700, 
        cx: projection([+d.long, +d.lat])[0]+Math.random()*10, 
        cy: projection([+d.long, +d.lat])[1]+Math.random()*10,
        cxe: projectionE([+d.long, +d.lat])[0]+Math.random()*10, 
        cye: projectionE([+d.long, +d.lat])[1]+Math.random()*10 
      };
    });
    
    // ordena os pontos (nodes) para prevenir que o maior fique sobre os menores
       myNodes.sort(function (a, b) { return b.value - a.value; });
    return myNodes;
  }

  /*
   * Main entry point to the bubble chart. This function is returned
   * by the parent closure. It prepares the rawData for visualization
   * and adds an svg element to the provided selector and starts the
   * visualization creation process.
   *
   * selector is expected to be a DOM element or CSS selector that
   * points to the parent element of the bubble chart. Inside this
   * element, the code will add the SVG continer for the visualization.
   *
   * rawData is expected to be an array of data objects as provided by d3 loading function like d3csv.
   */
  var chart = function chart(selector, rawData) {
    // convert raw data into nodes data
    nodes = createNodes(rawData);
	
	// Create a SVG element inside the provided selector
    svg = d3.select(selector)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
/* // 	ZOOM -----------------------------------------------------
	          .call(d3.zoom()
		        .extent([[0, 0], [width, height]])
		        .scaleExtent([1, 5])
		        .on("zoom", function () {
		bubbles.attr("transform", d3.event.transform)}));
		
 *///	Vincula os dados com os pontos que irão representá-los
    bubbles = svg.selectAll('.bubble')
                 .attr("viewBox", [0, 0, width, height])
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
    // There will be one circle.bubble for each object in the nodes array.
    // Initially, their radius (r attribute) will be 0.
    // @v4 Selections are immutable, so lets capture the
    //  enter selection to apply our transtition to below.

   var bubblesE = bubbles
      .enter()
      .append('circle')
        .classed('bubble', true)
          .attr('r', 0)
//	Cria uma classe com as variáveis de tempo
      	  .attr("class", function(d){ return d.filtra_data })
// 	Exibe a cor ou a foto
	        .attr("fill", function(d) { return (d.destaque !== 'undefined')
								? "url(#" + d.destaque + ")" : fillColor(d.weekdaytxt)})
	        .attr('opacity', function(d) { return opacidadeColor(d.filtra_data) })
// Cria aro dourado para ação online ou vermelho para esgotado
          .attr('stroke', function(d) { return (d.online == 1)
           ? "gold" : (d.ingresso == 1) ? "darkred" : d3.rgb(fillColor(d.weekdaytxt)).darker()})

          .attr('stroke-width', 3)
//	MouseOver	  
//          .on('click', linkSite)
          .on('mouseover', showDetail)
          .on('mouseout', hideDetail);

//	@v4 Merge - Reúne a seleção original vazia (r=0) com os dados vinculados aos pontos
	bubbles = bubbles.merge(bubblesE);
	
    // Set the simulation's nodes to our newly created nodes array.
    // @v4 Once we set the nodes, the simulation will start running automatically!
    simulation.nodes(nodes);
//    Radialsimulation.nodes(nodes);

// exibe o total de atrações
  var display_tot = document.getElementById("total");
  const total = bubbles.size();
  display_tot.innerText = total + " atrações";

  console.log('passou na linha 1060');


// chama a visualização inicial
    groupBubbles();
  };


////////////////////////////////////////////////
//	Visualização Central (inicial)
////////////////////////////////////////////////

function groupBubbles() {

  hideYearTitles()  

var radialForce2 = 
      d3.forceRadial()
        .radius(950)
  	    .x(width/2)
  	    .y(height/2)
	      .strength(0.3);

     

// filtrar
bubbles.transition()
       .duration(2000)
       .attr('r', function(d) { return (
      (d.regiao != regiaoMem) || 
      (d.gratis != 1 && gratisMem == 1) || 
      (d.ingresso != 0 && vendaMem == 1) || 
      (d.cod_formato != formatoMem && formatoMem != '100') || 
      (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
      (d.online != 1 && onlineMem == 1) ||
      (d.cod_uo != uoMem && uoMem != '100') ||
      (d.publico != publicoMem && publicoMem != 'todos') ||
      (d.tem != 1 && acessivelMem == 1) ||
      (d.filtra_dataF != 'agora') 
	) ? 3 : (d.destaque !== 'undefined') 
		? d.radius+20 : d.radius+2})

// Cria aro dourado para ação online ou vermelho para esgotado
      .attr('stroke', function(d) { return (
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
        ? "darkred" : d3.rgb(fillColor(d.weekdaytxt)).darker()})


    .attr('stroke-width', function(d) { return (
      (d.regiao != regiaoMem) || 
      (d.gratis != 1 && gratisMem == 1) || 
      (d.ingresso != 0 && vendaMem == 1) || 
      (d.cod_formato != formatoMem && formatoMem != '100') || 
      (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
      (d.online != 1 && onlineMem == 1) ||
      (d.cod_uo != uoMem && uoMem != '100') ||
      (d.publico != publicoMem && publicoMem != 'todos') ||
      (d.tem != 1 && acessivelMem == 1) ||
      (d.filtra_dataF != 'agora') 
	    ) ? 1 : 3})
    .attr('fill', function(d) { return (
      (d.regiao != regiaoMem) || 
      (d.gratis != 1 && gratisMem == 1) || 
      (d.ingresso != 0 && vendaMem == 1) || 
      (d.cod_formato != formatoMem && formatoMem != '100') || 
      (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
      (d.online != 1 && onlineMem == 1) ||
      (d.cod_uo != uoMem && uoMem != '100') ||
      (d.publico != publicoMem && publicoMem != 'todos') ||
      (d.tem != 1 && acessivelMem == 1) ||
      (d.filtra_dataF != 'agora') 
	 ) ? '#cccccc' : (d.destaque !== 'undefined')
							? "url(#" + d.destaque + ")" : fillColor(d.weekdaytxt)});


      
  // 	altera atributos das ações não filtradas
  simulation
      .force('x', d3.forceX().strength(0.2).x(nodePosSemanaInicial))
      .force('y', d3.forceY().strength(strengthY).y(nodePosPeriodo))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(function (d) { return d.radius+3; }).strength(-0.3))
	    .force('collision', d3.forceManyBody().strength(forceStrength10))

      .force('r',	(function(d) { return (
      (d.regiao != regiaoMem) || 
      (d.gratis != 1 && gratisMem == 1) || 
      (d.ingresso != 0 && vendaMem == 1) || 
      (d.cod_formato != formatoMem && formatoMem != '100') || 
      (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
      (d.online != 1 && onlineMem == 1) ||
      (d.cod_uo != uoMem && uoMem != '100') ||
      (d.publico != publicoMem && publicoMem != 'todos') ||
      (d.tem != 1 && acessivelMem == 1) ||
      (d.filtra_dataF != 'agora') 
	 ) ? 3 : (d.destaque !== 'undefined') ? d.radius+20 : d.radius+2 }))

     .force('collision', d3.forceCollide().radius(function(d) { return (
      (d.regiao != regiaoMem) || 
      (d.gratis != 1 && gratisMem == 1) || 
      (d.ingresso != 0 && vendaMem == 1) || 
      (d.cod_formato != formatoMem && formatoMem != '100') || 
      (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
      (d.online != 1 && onlineMem == 1) ||
      (d.cod_uo != uoMem && uoMem != '100') ||
      (d.publico != publicoMem && publicoMem != 'todos') ||
      (d.tem != 1 && acessivelMem == 1) ||
      (d.filtra_dataF != 'agora') 
	  ) ? 3 : (d.destaque !== 'undefined') ? d.radius+20 : d.radius+2 }))

     .force('charge', d3.forceManyBody().strength(-2));

   simulation
    .force("r", isolate(radialForce2, function(d) { return (
      (d.regiao != regiaoMem) || 
      (d.gratis != 1 && gratisMem == 1) || 
      (d.ingresso != 0 && vendaMem == 1) || 
      (d.cod_formato != formatoMem && formatoMem != '100') || 
      (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
      (d.online != 1 && onlineMem == 1) ||
      (d.cod_uo != uoMem && uoMem != '100') ||
      (d.publico != publicoMem && publicoMem != 'todos') ||
      (d.tem != 1 && acessivelMem == 1) ||
      (d.filtra_dataF != 'agora')); }))



    // 	isola as ações que não estão filtradas

  // reinicia a visualização
     simulation.alpha(0.2).restart();
  }

  


// Visualização por dias de semana [padrão]
function showsBubbles(formatoMem,regiaoMem,temporalMem,publicoMem,vendaMem,gratisMem,acessivelMem,onlineMem,uoMem,categoriaMem,atual,escolhido) {

  
  // Define X para os títulos
  var yearsTitleX = {
    seg: pos1W-corrigeS, 
    ter: pos2W-corrigeS, 
    qua: pos3W-corrigeS, 
    qui: pos4W-corrigeS, 
    sex: pos5W-corrigeS, 
    sáb: pos6W-corrigeS, 
    dom: pos7W-corrigeS,
    sempre: pos4W-corrigeS 
  };
  var yearsTitleY = {
    seg: pos1H-20, 
    ter: pos1H-20,
    qua: pos1H-20,
    qui: pos1H-20,
    sex: pos1H-20,
    sáb: pos1H-20,
    dom: pos1H-20,
    sempre: pos3H+120
  };

  var SemnanaTitleY = {
    today: height / 2 - 230,
    thisW: height / 2 - 170, 
    nextW: height / 2 - 70, 
    thisM: height / 2 + 30, 
    nextM: height / 2 + 110, 
    sempre: height / 2 + 230
  };

  var SemnanaTitleTxt = {
    today: ' ',
    thisW: 'esta semana', 
    nextW: 'próxima', 
    thisM: 'ainda em maio', 
    nextM: 'em junho', 
    sempre: ' '
  };


  console.log('id ' + regiaoId);
  console.log('Mem ' + regiaoMem);

  showYearTitles(formatoMem);

  //	Mostra os dias da semana
  function showYearTitles(formatoMem) {

    var yearsData = d3.keys(yearsTitleX);
    var years = svg.selectAll('.weekday')
      .data(yearsData);

       years.enter()    
            .append('text')
            .attr('id', 'DiasDaSemana')
            .attr('class', 'DiasDaSemana')
            .attr('text-anchor', 'middle')
            .attr('x',  function (d) { return yearsTitleX[d]; })
            .attr('y', function (d) { return yearsTitleY[d]; })
            .attr('font-size', '25px')
            .attr('font-weight', 'bold')
            .attr('fill', function(d) { return fillColor(d); })
            .text(function (d) { return d; })
            .attr('opacity', (formatoMem == 4) ? 0 : 0.4);

            var PeriodoData = d3.keys(SemnanaTitleY);
            var Periodo = svg.selectAll('.periodo')
              .data(PeriodoData);

       Periodo.enter()    
                  .append('text')
                  .attr('id', 'Semanas')
                  .attr('class', 'Semanas')
                    .attr('text-anchor', 'middle')
                    .attr('y',  function (d) { return SemnanaTitleY[d]; })
                    .attr('x', width*0.85)
                    .text(function (d) { return SemnanaTitleTxt[d]; })
                    .attr('opacity', function(d) { return (formatoMem == 4) ? 0 : opacidadeColor(d); });

 }

// filtrar - transforma o que não foi selecionado em pontos pequenos

if (formatoMem == '4' && regiaoMem == 'capital') {
     bubbles.transition()
      .duration(2000)
      .attr("cx", function(d){ return d.cx })
      .attr("cy", function(d){ return d.cy });
    } else if (formatoMem == '4' && regiaoMem == 'interior') {
      bubbles.transition()
      .duration(2000)
      .attr("cx", function(d){ return d.cxe })
      .attr("cy", function(d){ return d.cye });
    } else {
      bubbles.transition()
      .duration(2000);
    }

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
    })

// Cria aro dourado para ação online ou vermelho para esgotado
    .attr('stroke', function(d) { return (
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
      ? "darkred" : d3.rgb(fillColor(d.dia_da_semana)).darker()})

    .attr('stroke-width', function(d) { return (
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
		) ? (formatoMem == '4') ? 0:1 : 3})
	  .attr('fill', function(d) { return (
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

  var radialForce = 
      d3.forceRadial()
        .radius(1000)
  	    .x(width/2)
  	    .y(height/2)
    	  .strength(forceStrength80);

  var radialForceMapa = 
      d3.forceRadial()
        .radius(1000)
        .x(width/2)
        .y(height/2)
        .strength(forceStrength80);
  
        if (formatoMem == '4' && regiaoMem == 'capital') {
          simulation
            .force("x", d3.forceX().strength(forceStrength80).x(function(d) { return d.cx;}))
            .force("y", d3.forceY().strength(forceStrength80).y(function(d) { return d.cy;}))
          } else if (formatoMem == '4' && regiaoMem == 'interior') {
            simulation
            .force("x", d3.forceX().strength(forceStrength80).x(function(d) { return d.cxe;}))
            .force("y", d3.forceY().strength(forceStrength80).y(function(d) { return d.cye;}))
            } else {
              simulation
              .force('x', d3.forceX().strength(forceStrength70).x(nodePosSemana)) // nodeSemanalPosX

              .force('y', d3.forceY().strength(forceStrength70).y(nodePosPeriodo));
          }

// 	altera atributos das ações não filtradas
	simulation
	  .force('center', d3.forceCenter((width / 2), height / 2))
//    .force('collision', d3.forceCollide().radius(function (d) { return d.radius+1; }).strength(-0.2))
	  .force('collision', d3.forceManyBody().strength(forceStrength100))
    .force('r',	(function(d) { return (
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
    ? (formatoMem == '4') ? 0:3 : (d.destaque !== 'undefined') ? d.radius+20 : d.radius+2 ) }))

    .force('collision', d3.forceCollide().radius(function(d) { return (
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
     ) ? (formatoMem == '4') ? 3:0 : (d.destaque !== 'undefined') 
			 ? d.radius+20 : d.radius+2 }))

    .force('charge', d3.forceManyBody().strength(-1));

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
          );}));
   
    if (formatoMem == '4') {
        simulation.on('tick', tickedMapa);
        } else {
        simulation.on('tick', ticked);
       }

    // @v4 We can reset the alpha value and restart the simulation

    simulation.alphaTarget(0.01).restart();

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



 } // encerra showsBubbles

// Visualização da busca textual

function buscaBubbles(buscaId) {
 buscaId = buscaId.toLowerCase();

// remove formatos previamente selecionados
var tiraForm = document.querySelector("#toolbar");
tiraForm.querySelector("form").reset();
formatoMem = '100';
formartoId = '100';
arr = ['1', '2', '3', '4', '5', '6'];
for(var i=0; i < arr.length; i++) { 
    var op = document.getElementById('fo'+arr[i]);
        op.classList.remove('active');
} 

// remove categorias previamente selecionadas
 var tiraCat = document.querySelector("#mySideNavCategoria");
 tiraCat.querySelector("form").reset();
 categoriaMem = '99';
 categoriaId = '99';
 arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','14'];
 for(var i=0; i < arr.length; i++) { 
     var op = document.getElementById('ca'+arr[i]);
         op.classList.remove('active');
} 



 novo_span.innerText = ' ';
 display_filtro.appendChild(novo_span);

	bubbles.transition()
      .duration(2000)
	    .attr('r', function(d) { return !(d.busca.toLowerCase().includes(buscaId)) ? 3 : (d.destaque !== 'undefined') 
		                  ? d.radius+20 : !(d.busca.toLowerCase().includes(buscaId)) ? 1 : d.radius+20})

// Cria aro dourado para ação online ou vermelho para esgotado
      .attr('stroke', function(d) { return !(d.busca.toLowerCase().includes(buscaId)) 
        ? '#555555' : (d.online == 1)
        ? "gold" : (d.ingresso == 1) 
        ? "darkred" : d3.rgb(fillColor(d.weekdaytxt)).darker()})
      .attr('stroke-width', function(d) { return !(d.busca.toLowerCase().includes(buscaId)) ? 1 : 3})
      .attr('fill', function(d) { return !(d.busca.toLowerCase().includes(buscaId)) ? '#cccccc' : (d.destaque !== 'undefined')
							? "url(#" + d.destaque + ")" : fillColor(d.weekdaytxt)});

  var radialForce = 
      d3.forceRadial()
        .radius(1000)
  	    .x(width/2)
  	    .y(height/2)
	      .strength(0.3);

	simulation
	    .force('x', d3.forceX().strength(0.2).x(nodePosSemana)) // nodeSemanalPosX
	    .force('y', d3.forceY().strength(0.2).y(nodePosPeriodo))
	    .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(function (d) { return d.radius+1; }).strength(-0.2))
	    .force('collision', d3.forceManyBody().strength(0.1))
      .force('r',	(function(d) { return !(d.busca.toLowerCase().includes(buscaId)) ? 3 : (d.destaque !== 'undefined') 
			     ? d.radius+10 : d.radius+2 }))
      .force('collision', d3.forceCollide().radius(function(d) { return !(d.busca.toLowerCase().includes(buscaId)) ? 3 : (d.destaque !== 'undefined') 
				 ? d.radius+10 : d.radius+2 }))
      .force('charge', d3.forceManyBody().strength(-2))

// 	joga para o canto as ações que não estão filtradas
      .force("r", isolate(radialForce, function(d) { 
			        return !(d.busca.toLowerCase().includes(buscaId)); 
					    }));

  if (formatoMem == '4') {
      simulation.on('tick', tickedMapa);
      } else {
      simulation.on('tick', ticked);
     }

// contador da busca textual
    tot = bubbles.size();
    filtrado = bubbles.filter(function(d) { return (d.busca.toLowerCase().includes(buscaId))}).size()
    contador(filtrado);

  simulation.alpha(0.2).restart();
  hideYearTitles()

}


// Reposiciona as bolhas a partir dos novos valores calculados 
// de x e y, calculados pela force simulation.
function ticked() {
  bubbles
   .attr('cx', function (d) { return d.x;}) 
   .attr('cy', function (d) { return d.y;});
}

// Pontos no Mapa
function tickedMapa() {

if (regiaoMem == 'capital') {
bubbles 
.attr('cx', function(d){ return d.cx }) 
.attr('cy', function(d){ return d.cy })
 } else {
bubbles 
.attr('cx', function(d){ return d.cxe }) 
.attr('cy', function(d){ return d.cye })
 }
 
;}


function nodePosSemana(d) {
return semanaCenters[d.weekday].x;
}

function nodePosSemanaInicial(d) {
return semanaCentersInicial[d.weekday].x;
}

function nodePosPeriodo(d) {
return periodoCenters[d.filtra_data].y;
}

function strengthY(d) {
return forcaY[d.filtra_data].y;
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


  // Busca textual
  // These will be set in create_nodes and create_vis
  var svg = null;
  var bubbles = null;
  var nodes = [];

  // Charge function that is called for each node.
  // As part of the ManyBody force.
  // This is what creates the repulsion between nodes.
  //
  // Charge is proportional to the diameter of the
  // circle (which is stored in the radius attribute
  // of the circle's associated data.
  //
  // This is done to allow for accurate collision
  // detection with nodes of different sizes.
  //
  // Charge is negative because we want nodes to repel.
  // @v4 Before the charge was a stand-alone attribute
  //  of the force layout. Now we can use it as a separate force!
  
  // Para separar os pontos, valor deve ser correspondente ao atributo 'r'
  function charge(d) {
    return -Math.pow(+d.radius, 2.0) * forceStrength;
  }

  // Here we create a force layout and
  // @v4 We create a force simulation now and
  //  add forces to it.
  var simulation = d3.forceSimulation()
      .velocityDecay(0.3)
//	.alphaDecay(.00001)
      .force('x', d3.forceX().strength(forceStrength).x(center.x))
      .force('y', d3.forceY().strength(forceStrength).y(center.y))
      .force('charge', d3.forceManyBody().strength(charge));

      if (formatoMem == '4') {
        simulation.on('tick', tickedMapa);
        } else {
        simulation.on('tick', ticked);
       }      

     simulation.stop();

     console.log('passou na linha 840');

// Define as cores e a opacidade
    var fillColor = d3.scaleOrdinal()
        .domain(['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom','sempre'])
        .range([corAzul, corAzul, corAzul, corAzul, corAzul, corLaranja, corLaranja, corAll]);
  
    var opacidadeColor = d3.scaleOrdinal()
		    .domain(['today', 'thisW', 'nextW', 'thisM', 'nextM','sempre'])
        .range(['1','.8','.5','.35','.15','.9']);
		
  /*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
  function createNodes(rawData) {

//	Define os tamanhos máximo e mínimo dos pontos
    var maxAmount = d3.max(rawData, function (d) { return +d.tamanho; });
    var radiusScale = d3.scalePow()
      .exponent(0.5)
      .domain([10, maxAmount])
      .range([6, 30]);

//	map() converte "raw data" em "node data".
    var myNodes = 	rawData.map(function (d) {

        var projection = d3.geoMercator()  
          .center([-47.03, -23.39])  // GPS of location to zoom on
          .scale(100000)            // This is like the zoom
          .translate([ 0, 0 ]);

        var projectionE = d3.geoMercator()  
          .center([-49.5, -22.3]) // GPS of location to zoom on
          .scale(7500)            // This is like the zoom
          .translate([ width/3,height/3 ]);
              
      return {
        id: d.id,
        radius: radiusScale(+d.tamanho),
        value: +d.tamanho,
        name: d.nome,
        name2: d.complemento,
        projeto: d.projeto,
		    busca: d.nome +" - "+d.complemento +" - "+d.categoria+" - "+d.projeto+" - "+d.dispositivo,
        org: d.uo,
        cod_uo: +d.cod_uo,
		    lat: +d.lat,
		    long: +d.long,
        weekdaytxt: d.weekdaytxt,
        weekday: +d.weekday+1,
		    regiao: d.regiao,
        filtra_data: d.tempo,
        filtra_dataF: d.tempoF,
        uo: d.uo,
        exibirdatas: d.exibirdatas,
        categoria: d.categoria,
        cod_categoria: +d.cod_categoria,
        destaque: d.destaque,
        formato: d.formato,
        cod_formato: +d.cod_formato,
		    publico: d.publico,
		    gratis: d.gratis,
		    ingresso: d.ingresso,
		    online: d.online,
		    tem: d.tem,
		    dispositivo: d.dispositivo,
        datainicial: d.datainicial,
        datafinal: d.datafinal,
        hora: d.hora,
//        sinopse: d.sinopse,
        x: Math.random() * 900+100, 
        y: Math.random() * 700+100, 
        cx: projection([+d.long, +d.lat])[0]+Math.random()*30, 
        cy: projection([+d.long, +d.lat])[1]+Math.random()*30,
        cxe: projectionE([+d.long, +d.lat])[0]+Math.random()*30, 
        cye: projectionE([+d.long, +d.lat])[1]+Math.random()*30 
      };
    });
    
    // ordena os pontos (nodes) para prevenir que o maior fique sobre os menores
       myNodes.sort(function (a, b) { return b.value - a.value; });
    return myNodes;
  }

  /*
   * Main entry point to the bubble chart. This function is returned
   * by the parent closure. It prepares the rawData for visualization
   * and adds an svg element to the provided selector and starts the
   * visualization creation process.
   *
   * selector is expected to be a DOM element or CSS selector that
   * points to the parent element of the bubble chart. Inside this
   * element, the code will add the SVG continer for the visualization.
   *
   * rawData is expected to be an array of data objects as provided by d3 loading function like d3csv.
   */
  var chart = function chart(selector, rawData) {
    // convert raw data into nodes data
    nodes = createNodes(rawData);
	
	// Create a SVG element inside the provided selector
    svg = d3.select(selector)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
/* // 	ZOOM -----------------------------------------------------
	          .call(d3.zoom()
		        .extent([[0, 0], [width, height]])
		        .scaleExtent([1, 5])
		        .on("zoom", function () {
		bubbles.attr("transform", d3.event.transform)}));
		
 *///	Vincula os dados com os pontos que irão representá-los
    bubbles = svg.selectAll('.bubble')
                 .attr("viewBox", [0, 0, width, height])
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
    // There will be one circle.bubble for each object in the nodes array.
    // Initially, their radius (r attribute) will be 0.
    // @v4 Selections are immutable, so lets capture the
    //  enter selection to apply our transtition to below.

   var bubblesE = bubbles
      .enter()
      .append('circle')
        .classed('bubble', true)
          .attr('r', 0)
//	Cria uma classe com as variáveis de tempo
      	  .attr("class", function(d){ return d.filtra_data })
// 	Exibe a cor ou a foto
	        .attr("fill", function(d) { return (d.destaque !== 'undefined')
								? "url(#" + d.destaque + ")" : fillColor(d.weekdaytxt)})
	        .attr('opacity', function(d) { return opacidadeColor(d.filtra_data) })
// Cria aro dourado para ação online ou vermelho para esgotado
          .attr('stroke', function(d) { return (d.online == 1)
           ? "gold" : (d.ingresso == 1) ? "darkred" : d3.rgb(fillColor(d.weekdaytxt)).darker()})

          .attr('stroke-width', 3)
//	MouseOver	  
//          .on('click', linkSite)
          .on('mouseover', showDetail)
          .on('mouseout', hideDetail);

//	@v4 Merge - Reúne a seleção original vazia (r=0) com os dados vinculados aos pontos
	bubbles = bubbles.merge(bubblesE);
	
    // Set the simulation's nodes to our newly created nodes array.
    // @v4 Once we set the nodes, the simulation will start running automatically!
    simulation.nodes(nodes);
//    Radialsimulation.nodes(nodes);

// exibe o total de atrações
  var display_tot = document.getElementById("total");
  const total = bubbles.size();
  display_tot.innerText = total + " atrações";

  console.log('passou na linha 1060');


// chama a visualização inicial
    groupBubbles();
  };


// Reposiciona as bolhas a partir dos novos valores calculados 
// de x e y, calculados pela force simulation.
  
  function ticked() {
           bubbles
            .attr('cx', function (d) { return d.x;}) 
            .attr('cy', function (d) { return d.y;});
  }

// Pontos no Mapa
function tickedMapa() {

    if (regiaoMem == 'capital') {
      bubbles 
        .attr('cx', function(d){ return d.cx }) 
        .attr('cy', function(d){ return d.cy })
          } else {
      bubbles 
        .attr('cx', function(d){ return d.cxe }) 
        .attr('cy', function(d){ return d.cye })
          }

      console.log('passou na linha 1100, em tickedMapa');
          
    ;}
     

  function nodePosSemana(d) {
    return semanaCenters[d.weekday].x;
  }

  function nodePosSemanaInicial(d) {
    return semanaCentersInicial[d.weekday].x;
  }


  function nodePosPeriodo(d) {
    return periodoCenters[d.filtra_data].y;
  }


////////////////////////////////////////////////
//	Visualização Central (inicial)
////////////////////////////////////////////////


function groupBubbles() {

  hideYearTitles()  

var radialForce2 = 
      d3.forceRadial()
        .radius(1000)
  	    .x(width/2)
  	    .y(height/2)
	      .strength(0.3);

// filtrar
bubbles.transition()
       .duration(2000)
       .attr('r', function(d) { return (
      (d.regiao != regiaoMem) || 
      (d.gratis != 1 && gratisMem == 1) || 
      (d.ingresso != 0 && vendaMem == 1) || 
      (d.cod_formato != formatoMem && formatoMem != '100') || 
      (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
      (d.online != 1 && onlineMem == 1) ||
      (d.cod_uo != uoMem && uoMem != '100') ||
      (d.publico != publicoMem && publicoMem != 'todos') ||
      (d.tem != 1 && acessivelMem == 1) ||
      (d.filtra_dataF != 'agora') 
	) ? 3 : (d.destaque !== 'undefined') 
		? d.radius+20 : d.radius+2})

// Cria aro dourado para ação online ou vermelho para esgotado
      .attr('stroke', function(d) { return (
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
        ? "darkred" : d3.rgb(fillColor(d.weekdaytxt)).darker()})


    .attr('stroke-width', function(d) { return (
      (d.regiao != regiaoMem) || 
      (d.gratis != 1 && gratisMem == 1) || 
      (d.ingresso != 0 && vendaMem == 1) || 
      (d.cod_formato != formatoMem && formatoMem != '100') || 
      (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
      (d.online != 1 && onlineMem == 1) ||
      (d.cod_uo != uoMem && uoMem != '100') ||
      (d.publico != publicoMem && publicoMem != 'todos') ||
      (d.tem != 1 && acessivelMem == 1) ||
      (d.filtra_dataF != 'agora') 
	    ) ? 1 : 3})
    .attr('fill', function(d) { return (
      (d.regiao != regiaoMem) || 
      (d.gratis != 1 && gratisMem == 1) || 
      (d.ingresso != 0 && vendaMem == 1) || 
      (d.cod_formato != formatoMem && formatoMem != '100') || 
      (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
      (d.online != 1 && onlineMem == 1) ||
      (d.cod_uo != uoMem && uoMem != '100') ||
      (d.publico != publicoMem && publicoMem != 'todos') ||
      (d.tem != 1 && acessivelMem == 1) ||
      (d.filtra_dataF != 'agora') 
	 ) ? '#cccccc' : (d.destaque !== 'undefined')
							? "url(#" + d.destaque + ")" : fillColor(d.weekdaytxt)});

// 	altera atributos das ações não filtradas
  	simulation
	    .force('x', d3.forceX().strength(0.2).x(nodePosSemanaInicial)) // 
	    .force('y', d3.forceY().strength(0.2).y(nodePosPeriodo))
	    .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(function (d) { return d.radius+1; }).strength(-0.2))
	    .force('collision', d3.forceManyBody().strength(forceStrength10))

    .force('r',	(function(d) { return (
      (d.regiao != regiaoMem) || 
      (d.gratis != 1 && gratisMem == 1) || 
      (d.ingresso != 0 && vendaMem == 1) || 
      (d.cod_formato != formatoMem && formatoMem != '100') || 
      (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
      (d.online != 1 && onlineMem == 1) ||
      (d.cod_uo != uoMem && uoMem != '100') ||
      (d.publico != publicoMem && publicoMem != 'todos') ||
      (d.tem != 1 && acessivelMem == 1) ||
      (d.filtra_dataF != 'agora') 
	 ) ? 3 : (d.destaque !== 'undefined') ? d.radius+20 : d.radius+2 }))

    .force('collision', d3.forceCollide().radius(function(d) { return (
      (d.regiao != regiaoMem) || 
      (d.gratis != 1 && gratisMem == 1) || 
      (d.ingresso != 0 && vendaMem == 1) || 
      (d.cod_formato != formatoMem && formatoMem != '100') || 
      (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
      (d.online != 1 && onlineMem == 1) ||
      (d.cod_uo != uoMem && uoMem != '100') ||
      (d.publico != publicoMem && publicoMem != 'todos') ||
      (d.tem != 1 && acessivelMem == 1) ||
      (d.filtra_dataF != 'agora') 
	  ) ? 3 : (d.destaque !== 'undefined') ? d.radius+20 : d.radius+2 }))

    .force('charge', d3.forceManyBody().strength(-2))

    // 	isola as ações que não estão filtradas
    .force("r", isolate(radialForce2, function(d) { return (
      (d.regiao != regiaoMem) || 
      (d.gratis != 1 && gratisMem == 1) || 
      (d.ingresso != 0 && vendaMem == 1) || 
      (d.cod_formato != formatoMem && formatoMem != '100') || 
      (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
      (d.online != 1 && onlineMem == 1) ||
      (d.cod_uo != uoMem && uoMem != '100') ||
      (d.publico != publicoMem && publicoMem != 'todos') ||
      (d.tem != 1 && acessivelMem == 1) ||
      (d.filtra_dataF != 'agora') 
	  ); 
  }));

  // reinicia a visualização
     simulation.alpha(0.2).restart();
  }


// Busca textual
  const searchInput = d3.select(".g-search input")
    .on("keyup", keyuped)
    foco();

//	MouseOver
  function showDetail(d) {
// altera a borda 
// d3.select(this).attr('stroke', 'black');

const StrToData = d3.timeParse("%Y-%m-%d 00:00:00");
const formataData = d3.timeFormat("%d.%m.%Y");

const formataHora = d3.timeFormat("%Hh%M");


// tratamento de variáveis para exibição
if (d.exibirdatas == "de-ate") {
  var exibedata = 'De ' + formataData(StrToData(d.datainicial)) + ' até ' + formataData(StrToData(d.datafinal));
} else {
  var exibedata = '' + d.weekdaytxt + ', ' + formataData(StrToData(d.datainicial))  + ' ' + formataHora(StrToData(d.hora)) ;
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


// define o conteúdo do tooltip
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
                  '<span class="value">' + d.regiao + ' | <b>' + d.uo + '</b> | ' + d.formato + '</span><br/>';

        tooltip.showTooltip(content, d3.event);
  }
  
 //	Oculta o tooltip
  function hideDetail(d) {
    // reset outline
    d3.select(this)
 //     .attr('stroke', d3.rgb('#000000'));
    tooltip.hideTooltip();
  }

// link para a busca do site do Sesc
  var url = 'http://sescsp.org.br';
  var link = document.querySelector("#escape");

  function linkSite(d) {
      var win = window.open('https://www.sescsp.org.br/?s='+d.nome, '_blank');
      win.focus();
  }

//	Opções do usuário
  chart.toggleDisplay = function (formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual,escolhido) {

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


  if (formatoId == '4') {
    svg.selectAll('.Semanas').remove();
    svg.selectAll('.DiasDaSemana').remove();
  } else {
    svg.selectAll('.mapa').remove(); 
    svg.selectAll('.mapa_spe').remove(); 
  }

  if ((regiaoMem == 'capital' || regiaoId == 'capital') && (formatoId == '4' || formatoMem == '4')) {
       svg.selectAll('.mapa_spe').remove(); 
       document.getElementById("mapa_spe").style.display = "none";
       document.getElementById("mapa_spe").style.width = "0px";
       document.getElementById("mapa_spe").style.height = "0px";      
       document.getElementById("mapa").style.display = "flex";
       document.getElementById("mapa").style.width = "1400px";
       document.getElementById("mapa").style.height = "840px";
       document.getElementById("mapa").style.zIndex = -9999;
      } 
        
  if ((regiaoMem == 'interior' || regiaoId == 'interior') && (formatoId == '4' || formatoMem == '4')) {
    svg.selectAll('.mapa').remove(); 
    document.getElementById("mapa").style.display = "none";
    document.getElementById("mapa").style.width = "0px";
    document.getElementById("mapa").style.height = "0px";      
    document.getElementById("mapa_spe").style.display = "flex";
    document.getElementById("mapa_spe").style.width = "1400px";
    document.getElementById("mapa_spe").style.height = "840px";      
    console.log('passou no interior ');
  } 
  
    showsBubbles(formatoMem,regiaoMem,temporalMem,publicoMem,vendaMem,gratisMem,
      acessivelMem,onlineMem,uoMem,categoriaMem,atual,escolhido);

};

 // return the chart function from closure.
 return chart;

 //	Monitora a digitação da pesquisa textual
  function keyuped() {
    // Find Text 
    if (d3.event.keyCode === 27) {
        window.location.reload(true);
      this.value = ""
      this.blur()
    }
    buscaId = this.value; 
    buscaBubbles(buscaId);
  };

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
 //      document.getElementById('buscatextual').select();
}

 //	Inicia os botões
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

/*
 * Helper function to convert a number into a string
 * and add commas to it to improve presentation.
 */
function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }

  return x1 + x2;
}


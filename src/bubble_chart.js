/* bubbleChart creation function. Returns a function that will
 * instantiate a new bubble chart given a DOM element to display
 * it in and a dataset to visualize.
 *
 * Organization and style inspired by:
 * https://bost.ocks.org/mike/chart/
 *
 */

// Load the data.
d3.csv('data/semdfe-1018-uau.csv', display);

 function bubbleChart() {
 
  closeNavComoVerBusca();  
// Janela e centro
   var widthTotal = window.innerWidth * 1;
   var heightTotal = window.innerHeight * 0.95;
 
   var width = widthTotal*0.75+widthTotal*0.14;
   var height = heightTotal*0.90+heightTotal*0.08;
 
// tooltip for mouseover functionality
   var tooltip = floatingTooltip('tooltip', 360);
   var card = floatingCard('cartao', 450);
 
// cores para dias da semana e finais de semana
   const corAzul = '#0097ad' // #20B2AA';	// '#3B8191' - azul escuro;
   const corLaranja = '#DE7802' // '#FFA500'; // #ffb100';
   const corAll = '#BBAB8B'; // verde '#B2B349'
   const azulado = 'hue-rotate(195deg)';
   const laranjado = 'hue-rotate(25deg)';
 
// Grid de 21 pontos em tela
   const corrigeW = width/20;
   const corrigeH = height/20;
   const posW = width/20;
   const posCW = corrigeW + width/2;
   const posH = height/14;
   const posCH = corrigeH + height/2;
   const pos1H = (posCH - 3*posH);
   const pos2H = posCH;
   const pos3H = (posCH + 3*posH);
 
   var datavis = "geral";
   var datavisMem = "geral";
   
 // Variáveis de Filtro
   var buscaId = '';
   var regiaoId = 'capital';
   var formatoId = '100';
   var publicoId = 'todos';
   var temporalId = "agora";
   var uoId = '100';
   var categoriaId = '99';
   var gratisId = 0;
   var vendaId = 0;
   var acessivelId = 0;
   var onlineId = 0;
 
   var buscaMem = '';
   var regiaoMem = 'capital';
   var formatoMem = '100';
   var publicoMem = 'todos';
   var temporalMem = "agora";
   var uoMem = '100';
   var categoriaMem = '99';
   var gratisMem = 0;
   var vendaMem = 0;
   var acessivelMem = 0;
   var onlineMem = 0;
 
 // Variáveis de Contador
   var fc = '';
   var fe = '';
   var fuo = '';
   var display_div = document.getElementById("contador");
   var display_filtro = document.getElementById("EmExibicao");
   var new_span = document.createElement('span');
   var novo_span = document.createElement('span');
   var escolhido = "ações na capital e grande são paulo nesta semana e na próxima";
   var atual = "geral";
 
 
   // Posição central pelo proximidade da ação
   var periodoCenters = {
     thisW: { y: posCH-posH/2-corrigeH},
     nextW: { y: posCH-posH/4-corrigeH},
//     thisM: { y: posCH-corrigeH},
//     nextM: { y: posCH+posH/4-corrigeH},
     sempre: { y: pos3H+1*posH/2-corrigeH}
   };

   var agoraOUproxima = {
    agora: { y: 0},
//  depois: { y: posCH-corrigeH},
    proxima: { y: 250}
  };


   var periodoDoDiaCenters = {
    manhã: { y: -posH*0.75},
    tarde: { y: -posH*0.3},
    noite: { y: posH*0.75},
    consulte: { y: posH*0.3},
  };
  
   // posição central dos cabeçalhos da visão por semana.
   var semanasTitleX = {
     seg: posCW-6*posW, 
     ter: posCW-4*posW, 
     qua: posCW-2*posW, 
     qui: posCW, 
     sex: posCW+2*posW, 
     sáb: posCW+4*posW, 
     dom: posCW+6*posW,
     sempre: posCW 
   };
 
   var semanasTitleY = {
    seg: pos1H-posH, 
    ter: pos1H-posH,
    qua: pos1H-posH,
    qui: pos1H-posH,
    sex: pos1H-posH,
    sáb: pos1H-posH,
    dom: pos1H-posH,
    sempre: pos3H+6*posH/2
   };

// Data do Dia   
var DataDoDia = {
  seg: { agora: "16/10", proxima: "23/10", depois: "30/10"},
  ter: { agora: "17/10", proxima: "24/10", depois: "31/10"},
  qua: { agora: "18/10", proxima: "25/10", depois: "01/11"},
  qui: { agora: "19/10", proxima: "26/10", depois: "02/11"},
  sex: { agora: "20/10", proxima: "27/10", depois: "03/11"},
  sáb: { agora: "21/10", proxima: "28/10", depois: "04/11"},
  dom: { agora: "22/10", proxima: "29/10", depois: "05/11"},
  sempre: { agora: " ", proxima: " ", depois: " "},
};

 // Centro das posições da vista por semana ---------------------------------------------------------------------------
var semanaCenters = {
     seg: { x: posCW-6*posW, y: height / 2 },
     ter: { x: posCW-4*posW, y: height / 2 },
     qua: { x: posCW-2*posW, y: height / 2 },
     qui: { x: posCW, y: height / 2 },
     sex: { x: posCW+2*posW, y: height / 2 },
     sáb: { x: posCW+4*posW, y: height / 2 },
     dom: { x: posCW+6*posW, y: height / 2 },
     sempre: { x: posCW, y: pos3H+4*posH/2-corrigeH }
};
 
 // Centro dos cabeçalhos da visão por formato
 var formatosTitleX = {
   1: posCW, // shows
   2: posCW-4*posW, // cursos
   3: posCW+4*posW, // debates
   4: posCW, // expos
   5: posCW, // filmes
   6: posCW-2*posW, // atividade física
   7: posCW-5*posW, // bibliotecas
   8: posCW+2*posW, // turismo
   9: posCW+4*posW, // +lazer
 };
 
 var formatosTitleY = {
 1: pos1H+posH+corrigeH, 
 2: pos2H+corrigeH, 
 3: pos2H+corrigeH, 
 4: pos2H+posH+corrigeH, 
 5: pos3H+2*posH, 
 6: pos3H, 
 7: pos1H, 
 8: pos3H, 
 9: pos3H, 
 
 };
 
 // Centro das ações na isão FORMATOS (quando se clica em uma unidade)
   var formatoCenters = {
     1: { x: posCW-2*corrigeW, y: pos2H-3*posH }, // shows
     2: { x: posCW-4*posW-2*corrigeW, y: pos2H-posH/2 }, // cursos
     3: { x: posCW+4*posW-2*corrigeW, y: pos2H-posH/2 }, // debates
     4: { x: posCW-2*corrigeW-2*corrigeW/3, y: pos3H-3*posH }, // expos
     5: { x: posCW-2*corrigeW, y: pos3H+3*posH/5 }, // filmes
     6: { x: posCW-2*posW-posW/2-2*corrigeW, y: pos3H-3*posH/2 }, // esporte
     7: { x: posCW-5*posW-2*corrigeW, y: pos1H-posH }, // biblio
     8: { x: posCW+2*posW-posW/2-2*corrigeW, y: pos3H-3*posH/2 }, // turismo
     9: { x: posCW+4*posW-2*corrigeW, y: pos3H-3*posH/2 }, // lazer
   };
 
 // Cabeçalhos da visão por unidades da capital.
 var unidadesTitleXCap = {
   52: posCW-6*posW, // 24 de Maio
   65: posCW-4*posW, // Av. Paulista
   68: posCW-2*posW, // Belenzinho
   62: posCW, // Consolação
   58: posCW+2*posW, // Pinheiros
   63: posCW+4*posW, // Pompeia
   66: posCW+6*posW, // Vila Mariana
 
   91: posCW-6*posW-posW/4, // Campo LImpo
   57: posCW-4*posW-posW/4, // Ipiranga
   49: posCW-2*posW, // 14 Bis
   70: posCW-4*posW-posW/4, // Santo Amaro
 
   94: posCW+2*posW+posW/4, // Bom Retiro
   64: posCW+4*posW+posW/4, // Carmo
   53: posCW+6*posW+posW/4, // Santana
   60: posCW+4*posW+posW/4, // Casa Verde
   
   59: posCW-2*posW, // Cinesesc
   89: posCW, // CPF
   61: posCW+2*posW, // Florencio
   
  55: posCW-6*posW-posW/4, // Interlagos
   73: posCW-posCW/2, // Guarulhos
   72: posCW-posCW/4, // Mogi das Cruzes
   95: posCW, // Osasco
   67: posCW+posCW/4, // São Caetano
   88: posCW+posCW/2, // Santo André
  56: posCW+6*posW+posW/4, // Itaquera
   // 74: pos6W, // Dom Pedro
     
 };
 
 var unidadesTitleYCap = {
 //  74: pos1H+posH, // Dom Pedro
   52: pos1H+posH, // 24 de Maio
   65: pos1H+posH, // Av. Paulista
   68: pos1H+posH, // Belenzinho
   62: pos1H+posH, // Consolação
   58: pos1H+posH, // Pinheiros
   63: pos1H+posH, // Pompeia
   66: pos1H+posH, // Vila Mariana
 
   91: pos2H+posH/2, // Campo LImpo
   49: pos2H+posH/2, // 14 Bis
   94: pos2H+posH/2, // Bom Retiro
   57: pos2H+posH/2, // Ipiranga
   53: pos2H+posH/2, // Santana
   70: pos3H, // Santo Amaro
   64: pos2H+posH/2, // Carmo
   60: pos3H, // Casa Verde
 
   59: pos2H+2*posH+posH/2, // Cinesesc
   89: pos2H+2*posH+posH/2, // CPF
   61: pos2H+2*posH+posH/2, // Florencio
 
   55: pos3H, // Interlagos
   73: pos3H+posH+posH, // Guarulhos
   72: pos3H+posH+posH, // Mogi das Cruzes
   95: pos3H+posH+posH, // Osasco
   88: pos3H+posH+posH, // Santo André
   67: pos3H+posH+posH, // São Caetano
   56: pos3H, // Itaquera
 };
 
   var unidadeCenters = {
   // capital
   52: {x: posCW-6*posW-corrigeW, y:pos1H}, // 24 de Maio
   65: {x: posCW-4*posW-corrigeW, y:pos1H}, // Av. Paulista
   68: {x: posCW-2*posW-corrigeW, y:pos1H}, // Belenzinho
   62: {x: posCW-corrigeW, y:pos1H}, // Consolação
   58: {x: posCW+2*posW-corrigeW, y:pos1H}, // Pinheiros
   63: {x: posCW+4*posW-corrigeW, y:pos1H}, // Pompeia
   66: {x: posCW+6*posW-corrigeW, y:pos1H}, // Vila Mariana
   
   91: {x: posCW-6*posW-posW/4-corrigeW, y:pos2H-posH/2}, // Campo LImpo
   57: {x: posCW-4*posW-posW/4-corrigeW, y:pos2H-posH/2}, // Ipiranga
   70: {x: posCW-4*posW-posW/4-corrigeW, y:pos3H-posH}, // Santo Amaro
   
   94: {x: posCW+2*posW+posW/4-corrigeW, y:pos2H-posH/2}, // Bom Retiro
   64: {x: posCW+4*posW+posW/4-corrigeW, y:pos2H-posH/2}, // Carmo
   53: {x: posCW+6*posW+posW/4-corrigeW, y:pos2H-posH/2}, // Santana
   
   59: {x: posCW-2*posW-corrigeW, y:pos2H+posH+posH/2}, // Cinesesc
   89: {x: posCW-corrigeW, y:pos2H+posH+posH/2}, // CPF
   61: {x: posCW+2*posW-corrigeW, y:pos2H+posH+posH/2}, // Florencio
   
   55: {x: posCW-6*posW-posW/4-corrigeW, y:pos3H-posH}, // Interlagos
   73: {x: posCW-posCW/2-corrigeW, y:pos3H+posH-posH/4}, // Guarulhos
   72: {x: posCW-posCW/4-corrigeW, y:pos3H+posH-posH/4}, // Mogi das Cruzes
   95: {x: posCW-corrigeW, y:pos3H+posH-posH/4}, // Osasco
   67: {x: posCW+posCW/4-corrigeW, y:pos3H+posH-posH/4}, // São Caetano
   88: {x: posCW+posCW/2-corrigeW, y:pos3H+posH-posH/4}, // Santo André
   56: {x: posCW+6*posW+posW/4-corrigeW, y:pos3H-posH}, // Itaquera
// 74: {x: pos6W, y:pos1H+posH/2}, // Dom Pedro
   49: {x: posCW-2*posW-corrigeW, y:pos2H-posH/2}, // 14 Bis
   60: {x: posCW+4*posW+posW/4-corrigeW, y:pos3H-posH}, // Casa Verde

   
   // interior
   85: {x: posCW-5*posW-corrigeW, y:pos1H}, // Birigui
   84: {x: posCW-3*posW-corrigeW, y:pos1H}, // Rio Preto
   79: {x: posCW-2*posW+posW/2-corrigeW, y:pos1H}, // Catanduva
   76: {x: posCW+posW-corrigeW, y:pos1H}, // Ribeirão
   86: {x: posCW+3*posW+posW/2-corrigeW, y:pos1H}, // Araraquara
   82: {x: posCW+5*posW+posW/2-corrigeW, y:pos1H}, // São Carlos
 
   87: {x: posCW-6*posW-corrigeW, y:pos2H}, // Prudente
   80: {x: posCW-4*posW-corrigeW, y:pos2H}, // Bauru
   83: {x: posCW-2*posW-corrigeW, y:pos2H}, // Piracicaba
   96: {x: posCW-corrigeW, y:pos2H}, // Sorocaba
   75: {x: posCW+2*posW-corrigeW, y:pos2H}, // Campinas
   93: {x: posCW+4*posW-corrigeW, y:pos2H}, // Jundiaí
   81: {x: posCW+6*posW-corrigeW, y:pos2H}, // Taubaté 
   
   92: {x: posCW-3*posW-corrigeW, y:pos3H-posH}, // Registro
   78: {x: posCW-corrigeW, y:pos3H+posH}, // Santos
   71: {x: posCW+2*posW-corrigeW, y:pos3H+posH}, // Bertioga
 
   77: {x: posCW+5*posW-corrigeW, y:pos3H-posH}, // São José
 };
 
 
 // Cabeçalhos da visão por unidades do interior.
 var unidadesTitleXInt = {
   85: posCW-5*posW, 
   84: posCW-3*posW, 
   79: posCW-2*posW+posW/2, 
   76: posCW+posW, 
   86: posCW+3*posW+posW/2, 
   82: posCW+5*posW+posW/2, 
 
   87: posCW-6*posW, 
   80: posCW-4*posW, 
   83: posCW-2*posW, 
   96: posCW, 
   75: posCW+2*posW, 
   93: posCW+4*posW, 
   81: posCW+6*posW, 
   
   92: posCW-3*posW, 
   78: posCW, 
   71: posCW+2*posW, 
   77: posCW+5*posW, 
 };
 
 var unidadesTitleYInt = {
   85: pos1H+posH, 
   84: pos1H+posH, 
   79: pos1H+posH, 
   76: pos1H+posH, 
   86: pos1H+posH, 
   82: pos1H+posH, 
 
   87: pos2H+posH+posH/4, 
   80: pos2H+posH+posH/4, 
   83: pos2H+posH+posH/4, 
   96: pos2H+posH+posH/4, 
   75: pos2H+posH+posH/4, 
   93: pos2H+posH+posH/4, 
   81: pos2H+posH+posH/4, 
 
   92: pos3H+posH/4, 
   78: pos3H+2*posH+posH/4, 
   71: pos3H+2*posH+posH/4, 
   77: pos3H+posH/4, 
 };
   

   var fillformatos = d3.scaleOrdinal()
   .domain([1, 2, 3, 4, 5, 6, 7, 8, 9])
   .range(["shows e espetáculos", "cursos e oficinas", "debates e palestras", "exposições", "filmes", "atividade física", "serviços","turismo", "+lazer"]);
 
    var fillunidadesCap = d3.scaleOrdinal()
   .domain([52,53,55,56,57,58,59,61,62,63,64,65,66,67,68,70,72,73,88,89,91,94,95,49,60])
    .range(["24 de maio","Santana","Interlagos","Itaquera","Ipiranga","Pinheiros","Cinesesc",
            "Florêncio","Consolação","Pompeia","Carmo","Av. Paulista","Vila Mariana","São Caetano",
            "Belenzinho","Santo Amaro","Mogi das Cruzes","Guarulhos","Santo André","CPF",
           "Campo Limpo","Bom Retiro","Osasco","14 Bis","Casa Verde"]);
  
    var fillunidadesInt = d3.scaleOrdinal()
     .domain([71,75,76,77,78,79,80,81,82,83,84,85,86,87,92,93,96])
     .range(["Bertioga","Campinas","Ribeirão","São José","Santos","Catanduva","Bauru",
             "Taubaté","São Carlos","Piracicaba","Rio Preto","Birigui","Araraquara","Prudente",
             "Registro","Jundiai","Sorocaba"]);
   //
   //
   //  Fim das variáveis ----------------------------------------------------------------------------
 
   // @v4 strength to apply to the position forces
   var forceStrength = 0.03;
   
   // These will be set in create_nodes and create_vis
   var svg = null;
   var bubbles = null;
   var nodes = [];
   // Charge é o que cria a força de repulsa dentro do ManyBody force.
   // é proporcional ao diâmetro do círculo (var radius) para evitar a 
   // colisão de círculos de tamanho diferentes.
   // Valor negativo para que os nós se afastem
   function charge(d) {
     return -Math.pow(d.radius, 2) * forceStrength;
   }
 
   // Here we create a force layout and
   // @v4 We create a force simulation now and add forces to it.
 
   var simulation = d3.forceSimulation()
     .velocityDecay(0.3)
     .force('x', d3.forceX(posCW).strength(forceStrength).x(posCW))
     .force('y', d3.forceY(posCH).strength(forceStrength).y(posCH)) // (nodeperiodoPos))
     .force('charge', d3.forceManyBody().strength(charge))
     .force('collision',d3.forceCollide().radius(function(d) { return d.radius+1.5 }))
     .on('tick', ticked);
 
 // @v4 Force starts up automatically, which we don't want as there aren't any nodes yet.
      simulation.stop();
   
 // Define as cores
   var fillColor = d3.scaleOrdinal()
         .domain(['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom','sempre'])
         .range([corAzul, corAzul, corAzul, corAzul, corAzul, corLaranja, corLaranja, corAll]);

   var HueColor = d3.scaleOrdinal()
         .domain(['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom','sempre'])
         .range([azulado, azulado, azulado, azulado, azulado, laranjado, laranjado, 'sepia(0.2)']);
         
  var opacidadeColor = d3.scaleOrdinal()
      .domain(['manhã', 'tarde', 'noite', 'consulte'])
      .range(['0.5','0.75','1','1']);

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
       .exponent(1)
       .range([6,35])
       .domain([20, maxAmount]);
 
     // map() converte rawData em "node data".
     var myNodes = rawData.map(function (d) {
       
       return {
         id: d.id,
         radius: ((d.destaque !== 'undefined' && d.cod_formato !== 4) ? radiusScale(+d.lugares+2000) : radiusScale(+d.lugares)),
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
         data: d.data_sessao,
         hora: d.hora,
         turno: d.turno,
         ingressos: d.ingressos,
//         sinopse: d.sinopse,
         x: posCW, // Math.random() * 900,  // inicia centralizado
         y: posCH// Math.random() * 800 // para iniciar centralizado
 
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
             .attr('width', widthTotal)
             .attr('height', heightTotal)
             .append('g')
             .attr("transform","translate(" + 0 + "," + 0 + ")");
 
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
 
     // Cria os círculos com a classe 'bubble'. 
     // Há um circulo para cada registro no array. Raio é zero inicialmente.
     // @v4 Selections are immutable, so lets capture the enter selection to apply our transtition to below.
     var bubblesE = bubbles.enter().append('circle')
       .classed('bubble', true)
       .attr('r', 0)
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
       ) ? '#cccccc' : (d.destaque !== 'undefined') ? "url(#" + d.destaque + ")" : fillColor(d.dia_da_semana)})
 
       .attr('opacity', function(d) { return (d.destaque == 'undefined') 
                                              ? opacidadeColor(d.turno) : 1; })
       .attr('stroke', function (d) { return (d.online == 1)
                                              ? "gold" : (d.ingresso == 1) 
                                              ? "darkred" : d3.rgb(fillColor(d.dia_da_semana)).darker();})
       .attr('filter', function(d) { return (d.destaque == 'undefined') 
                       ? 'sepia(0)' : HueColor(d.dia_da_semana); })
       .attr('saturation', function(d) { return (d.destaque == 'undefined') 
                       ? 1 : 0.6; })

       .attr('stroke-width', 1)

       .on('mouseover', showDetail)
       .on('click', BubbleZoom)
       .on('mouseout', hideDetail);
 
     // @v4 Merge the original empty selection and the enter selection
     bubbles = bubbles.merge(bubblesE);
 
     // Set the simulation's nodes to our newly created nodes array.
     // @v4 Once we set the nodes, the simulation will start running automatically!
     simulation.nodes(nodes);
 
 // exibe o total de atividades
    // var display_tot = document.getElementById("total");
    // const total = bubbles.size();
     
 // Set initial layout to single group.
    //  var datavisMem = "agenda";
    //  var atual = "agenda";
    //  var temporalId = "agora";
    //  var regiaoId = "capital";

     groupBubbles(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                  acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido);
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
    * Providencia valores para X e Y nos diferentes cenários.
    */
   function nodesemanaPos(d) {
     return semanaCenters[d.dia_da_semana].x;
   }
 
   function nodeperiodoPos(d) {
     return periodoCenters[d.filtra_data].y + (periodoDoDiaCenters[d.turno].y);
   }
 
  function nodeperiodoPosBusca(d) {
     return periodoCenters[d.filtra_data].y + (periodoDoDiaCenters[d.turno].y) + (agoraOUproxima[d.filtra_dataF].y);
   }
 

   function nodeformatoXPos(d) {
     return formatoCenters[d.cod_formato].x + semanaCenters[d.dia_da_semana].x/10;
   }
 
   function nodeformatoYPos(d) {
     return formatoCenters[d.cod_formato].y + (periodoCenters[d.filtra_data].y/30) + ((periodoDoDiaCenters[d.turno].y)/3);
   }
 
   function nodeunidadeXPos(d) {
     return unidadeCenters[d.cod_uo].x + semanaCenters[d.dia_da_semana].x/10;
   }
 
   function nodeunidadeYPos(d) {
     return unidadeCenters[d.cod_uo].y + (periodoCenters[d.filtra_data].y/30) + ((periodoDoDiaCenters[d.turno].y)/3);
   }

 // Função que separa o que não foi filtrado e joga pra fora
   function isolate(force, filter) {
   var initialize = force.initialize;
   force.initialize = function() { initialize.call(force, nodes.filter(filter)); };
   return force;
 }
 
 // função que faz as contagens e exibe o número de atividades filtradas
 function contador(current_count){
   while (display_div.hasChildNodes()) {
          display_div.removeChild(display_div.lastChild);
         }
     new_span.className = 'contador';
     new_span.innerText = filtrado + "" ;
     display_div.appendChild(new_span);
 };
 
 
 // Função que atualiza as exibições -- exceto Busca
 function groupBubbles(formatoMem,regiaoMem,temporalMem,publicoMem,vendaMem,gratisMem,
                       acessivelMem,onlineMem,uoMem,categoriaMem,atual,datavisMem,buscaMem,escolhido) {
 
                        console.log('-------- começo do groupb --------');
                        console.log('formatoMem: ' + formatoMem);
                        console.log('atual: ' + atual);
                        console.log('datavisMem: ' + datavisMem);
                        console.log('uoMem: ' + uoMem);
                        console.log('uoId: ' + uoId);
                        console.log('----------------fim---------------');
                   
          if (atual == "verUO-I" || atual == "interior") {
              var regiaoMem = "interior" 
              var op = document.getElementById('capital');
                  op.classList.remove('active');
                  hidesemanaTitles();
                  hideunidadeTitles();
                  showunidadeTitlesInt();
                  document.getElementById("capital").checked = false; 
                  document.getElementById("interior").checked = true; 
                  openNavInterior();
                  closeNavGdeSP();
                  closeNavCapital();

                  var uoId = 100;
                  var tiraUO = document.querySelector("#unidades");
                      tiraUO.querySelector("form").reset();
            
                      arr_uos = [52, 53, 55, 56, 57, 58, 59, 61, 62, 63, 64, 
                                 65, 66, 67, 68, 70, 71, 72, 73, 75, 76, 77, 
                                 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 
                                 89, 91, 92, 93, 94, 95, 96, 49, 60];
             
                     for(var i=0; i < arr_uos.length; i++) { 
                         document.getElementById("uo"+arr_uos[i]).checked = false; 
                      }
           


            } else if (atual == "verUO-C" || atual == "capital") {
              var regiaoMem = "capital" 
              var op = document.getElementById('interior');
                  op.classList.remove('active');
              hidesemanaTitles();
              hideunidadeTitles();
              showunidadeTitles();
              document.getElementById("interior").checked = false; 
              document.getElementById("capital").checked = true; 
              closeNavInterior();
              openNavGdeSP();
              openNavCapital();

              var uoId = 100;
              var tiraUO = document.querySelector("#unidades");
                  tiraUO.querySelector("form").reset();
        
                  arr_uos = [52, 53, 55, 56, 57, 58, 59, 61, 62, 63, 64, 
                             65, 66, 67, 68, 70, 71, 72, 73, 75, 76, 77, 
                             78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 
                             89, 91, 92, 93, 94, 95, 96, 49, 60];
         
                 for(var i=0; i < arr_uos.length; i++) { 
                     document.getElementById("uo"+arr_uos[i]).checked = false; 
                  }
       
            }

// Transições 
          bubbles.transition().duration(4000);
          bubbles.attr('r', function(d) { return (
            !(d.filtra_dataF == temporalMem) ) ? 0 : d.radius });

          bubblesDaSemana = bubbles.filter(function(d) { 
            return (d.filtra_dataF == temporalMem)
            });    
            console.log(bubblesDaSemana.size() + " - " + bubblesDaSemana);

 // Escolhe cor de acordo com o dia da semana e cinza se não filtrada
 bubblesDaSemana.attr('fill', function(d) { return (
     (d.regiao != regiaoMem) || 
     (d.gratis != 1 && gratisMem == 1) || 
     (d.ingresso != 0 && vendaMem == 1) || 
     (d.cod_formato != formatoMem && formatoMem != '100') || 
     (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
     (d.online != 1 && onlineMem == 1) ||
     (d.cod_uo != uoMem && uoMem != '100') ||
     (d.publico != publicoMem && publicoMem != 'todos') ||
     (d.tem != 1 && acessivelMem == 1)
//   ||  (d.filtra_dataF != temporalMem && temporalMem != 'todos') 
    ) ? '#cccccc' : (d.destaque !== 'undefined') ? "url(#" + d.destaque + ")" : fillColor(d.dia_da_semana)});
 
bubblesDaSemana.attr('r', function(d) { return (
     (d.regiao != regiaoMem) || 
     (d.gratis != 1 && gratisMem == 1) || 
     (d.ingresso != 0 && vendaMem == 1) || 
     (d.cod_formato != formatoMem && formatoMem != '100') || 
     (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
     (d.online != 1 && onlineMem == 1) ||
     (d.cod_uo != uoMem && uoMem != '100') ||
     (d.publico != publicoMem && publicoMem != 'todos') ||
     (d.tem != 1 && acessivelMem == 1)
//    || (d.filtra_dataF != temporalMem && temporalMem != 'todos') 
     ) ? 3 : (d.destaque !== 'undefined') ? d.radius : d.radius
   });
 
 // Cria aro dourado para ação online ou vermelho para esgotado
 bubblesDaSemana.attr('stroke', function(d) { return (
     (d.regiao != regiaoMem) || 
     (d.gratis != 1 && gratisMem == 1) || 
     (d.ingresso != 0 && vendaMem == 1) || 
     (d.cod_formato != formatoMem && formatoMem != '100') || 
     (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
     (d.online != 1 && onlineMem == 1) ||
     (d.cod_uo != uoMem && uoMem != '100') ||
     (d.publico != publicoMem && publicoMem != 'todos') ||
     (d.tem != 1 && acessivelMem == 1)
//    || (d.filtra_dataF != temporalMem && temporalMem != 'todos') 
   ) ? '#555555' : (d.online == 1)
   ? "gold" : (d.ingresso == 1) 
   ? "darkred" : d3.rgb(fillColor(d.dia_da_semana)).darker()});
 
bubblesDaSemana.attr('stroke-width', function(d) { return (
     (d.regiao != regiaoMem) || 
     (d.gratis != 1 && gratisMem == 1) || 
     (d.ingresso != 0 && vendaMem == 1) || 
     (d.cod_formato != formatoMem && formatoMem != '100') || 
     (d.cod_categoria != categoriaMem && categoriaMem != '99') || 
     (d.online != 1 && onlineMem == 1) ||
     (d.cod_uo != uoMem && uoMem != '100') ||
     (d.publico != publicoMem && publicoMem != 'todos') ||
     (d.tem != 1 && acessivelMem == 1)
//   ||  (d.filtra_dataF != temporalMem && temporalMem != 'todos') 
   ) ? 1 : 1});
 
/////////////////////////////////////////
//
// Ajuste fino das formas (+ decay e collision)
//
//////////////////////////////////////////
  if (datavisMem == "unidades" || atual == "regiao" || datavisMem == "formatos" || datavisMem == "agenda"  ) {
       var circulo = heightTotal; 
       var forceStrength = 0.15;
       var forceStrengthRadial = 1.2; 
     } else {
       var circulo = heightTotal;
       var forceStrength = 0.15;
       var forceStrengthRadial = 1.2; 
     }

// Força radial para afastar as ações não filtradas
    var radialForce = d3.forceRadial()
                        .radius(circulo)
                        .x(widthTotal/2)
                        .y(heightTotal/2)
                        .strength(forceStrengthRadial);
                        

                        
if (datavisMem != "formatos") {
 // 	envia para as bordas as ações que não estão filtradas
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
 .force('collision',d3.forceCollide().radius(function(d) { return d.radius }));
 // .alpha(1).restart();
};
 

     // Define formato da visualização    
   if (datavisMem == "unidades" || atual == "regiao" || atual == "verUO-C" || atual == "verUO-I") {
       // por Unidades
       simulation.force('x', d3.forceX().strength(forceStrength).x(nodeunidadeXPos));
       simulation.force('y', d3.forceY().strength(forceStrength).y(nodeunidadeYPos));
 //      simulation.alpha(1).restart();
       var datavis = "unidades";
       var datavisMem = "unidades";
   
       } else if (atual == "unidade" || (datavisMem == "formatos" && atual != "regiao")) {
             // por Formatos
             hidesemanaTitles();
             showformatoTitles();

             if (datavisMem == "formatos" && atual != "regiao") {

              bubblesDaSemana.transition()
                             .duration(1000)
                             .attr('r', function(d) { 
                                    return ((d.cod_formato == formatoMem || d.cod_categoria == categoriaMem) && d.cod_uo == uoMem ) 
                                    || (uoMem == d.cod_uo) 
                                    
                                    ? d.radius : 3});             
              }
              simulation.force("r", isolate(radialForce, function(d) { return (
                (d.gratis != 1 && gratisMem == 1) || 
                (d.ingresso != 0 && vendaMem == 1) || 
                (d.filtra_dataF != temporalMem && temporalMem != 'todos') ||
                (d.online != 1 && onlineMem == 1) ||
                (d.cod_uo != uoMem && uoMem != '100') ||
                (d.tem != 1 && acessivelMem == 1) ||
                (d.publico != publicoMem && publicoMem != 'todos')
              );}))
             simulation.force('x', d3.forceX().strength(forceStrength).x(nodeformatoXPos));
             simulation.force('y', d3.forceY().strength(forceStrength).y(nodeformatoYPos));
   //          simulation.alpha(1).restart();
 
             } else if (datavisMem == "agenda" || datavisMem == "verAgenda" ) {
                // por Agenda
                hidesemanaTitles();
                showsemanaTitles();
                simulation.force('x', d3.forceX().strength(forceStrength).x(nodesemanaPos));
                simulation.force('y', d3.forceY().strength(forceStrength).y(nodeperiodoPos));
 //               simulation.alpha(1).restart();
                var datavis = "agenda";
 
                } else if (datavisMem == "geral") {
                  // @v4 Zera a força 'x' para levar tudo ao centro.
                 hidesemanaTitles();
                 simulation.force('x', d3.forceX().strength(forceStrength).x(posCW));
                 simulation.force('y', d3.forceY().strength(forceStrength).y(posCH));
                                    
       } else { 
         simulation.stop() };
 
// separar as bolhas
// simulation.force('collision',d3.forceCollide().radius(function(d) { return d.radius+0.5 }))
simulation.force('collision',d3.forceCollide().radius(function(d) { return d.radius+1.5 }))
simulation.alpha(0.6).restart();
 
 
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
 
 filtroAplicadoSemRegiao = bubbles.filter(function(d) { return !(
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
   if (atual == "regiao" || atual == "capital" || atual == "interior") {fuo = ''};
 
   if (fuo != '') {
     var fonde = ' no Sesc ' + fuo  } else if (regiaoMem == 'capital') {
     var fonde = ' na Grande São Paulo' } else { fonde = ' no Interior e Litoral'};
 
   if (temporalMem == 'todos') {
       var fq = ' nos próximos dias ' } else if (temporalMem == 'agora') {
         var fq = ' nesta semana' } else if (temporalMem == 'depois') { 
                 fq = ' ainda neste mês ou no próximo '} else { fq = ' na próxima semana'};
 
   if (publicoMem == 'todos') {
       var fp = ' para ' + 'todos os publicos' } else { fp = ' para ' + publicoMem};
 
   if (gratisMem == 1) {
         var fg = ' gratuitas ' } else { fg = ''};
         
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

    if (filtrado == 0) {
      novo_span.innerText = "Ôpa! Nada por esse caminho. Que tal começar de novo com a opção 'limpar filtros'?"
        } 
     display_filtro.appendChild(novo_span);
 };
 
// Checked Região e temporalidade
if (regiaoMem == "capital") {
  document.getElementById(`capital`).checked = true;
}
if (regiaoMem == "interior") {
  document.getElementById(`interior`).checked = true;
}
if (temporalMem == "agora") {
  document.getElementById(`agora`).checked = true;
}
if (temporalMem == "proxima") {
  document.getElementById(`proxima`).checked = true;
}

   filtroExibido(escolhido);
 
   if (atual == "formato" || atual == "limpar") {
     var op = document.getElementById('ca');
         op.classList.add('active');
     }
 
 if (atual != "categoria") {
   var arr = ['1','2','3','4','5','6','7','8','9','10','11','12','14'];
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
 

 if (atual != "servicos") {
  var arr = ['12','13','15','16','17','18'];
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

if (atual == "limpar") {
   document.getElementById("agora").checked = true; 
   document.getElementById("proxima").checked = false; 
//   document.getElementById("depois").checked = false; 
   document.getElementById("todos").checked = true; 
   document.getElementById("capital").checked = true; 
   document.querySelector('#online').checked = false; 
   document.querySelector('#gratis').checked = false; 
   document.querySelector('#venda').checked = false; 
   document.querySelector('#acessivel').checked = false; 
   closeNavInterior();
   openNavGdeSP();
   openNavCapital();
   buscaId = "undefined";
   buscaMem = "undefined";

   arr_uos = [52, 53, 55, 56, 57, 58, 59, 61, 62, 63, 64, 
              65, 66, 67, 68, 70, 71, 72, 73, 75, 76, 77, 
              78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 
             89, 91, 92, 93, 94, 95, 96, 49, 60];
   
   arr_formatos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
 // Zera unidades             
       for(var i=0; i < arr_uos.length; i++) { 
           document.getElementById("uo"+arr_uos[i]).checked = false; 
          }
 
 // Zera formatos
 var tiraFormato = document.querySelector("#toolbar");
     tiraFormato.querySelector("form").reset();
     formatoMem = '100';
     formatoId = '100';
     arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
 
     for(var i=0; i < arr.length; i++) { 
         var op = document.getElementById('fo'+arr[i]);
             op.classList.remove('active');
       } 
 }
  
 
 // tira as opções zeradas em unidades
  if (atual != "unidade") {
  arr_uos = [52, 53, 55, 56, 57, 58, 59, 61, 62, 63, 64, 65, 66, 67, 68, 70, 71, 72, 73, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 49, 60];
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
   var arr = ['crianças'];
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
 
// tira as opções zeradas em Região

if (atual != "regiao") {
  var arr = ['capital','interior'];
  for(var i=0; i < arr.length; i++) { 

    document.getElementById(arr[i]).disabled = false; 

 if (formatoMem != '100' && formatoMem != '') {

    tem = filtroAplicadoSemRegiao.filter(function(d) { return (
          d.regiao == arr[i] 
          && d.cod_formato == formatoMem
          );}).size();
          if (tem == 0) {  
            document.getElementById(arr[i]).checked = false; 
            document.getElementById(arr[i]).disabled = true; 
            regiaoMem = 'todos';
          } 
    } else {
      tem = filtroAplicadoSemRegiao.filter(function(d) { return (
        d.regiao == arr[i]
        );}).size();
        if (tem == 0) {  
          document.getElementById(arr[i]).checked = false; 
          document.getElementById(arr[i]).disabled = true; 
          regiaoMem = 'todos';
        } 
    }
  }
}

 // tira as opções zeradas NAS DATAS
 
//  if (atual != "temporal") {
//    var arr = ['agora','proxima','depois'];
//    for(var i=0; i < arr.length; i++) { 
 
//      document.getElementById(arr[i]).disabled = false; 
 
//      if (formatoMem != '100' && formatoMem != '') {
 
//      tem = filtroAplicadoSemTempo.filter(function(d) { 
//            return (
//              d.cod_formato == formatoMem &&
//              d.filtra_dataF == arr[i]
//            );}).size();
 
//            if (tem == 0) {  
//              document.getElementById(arr[i]).checked = false; 
//              document.getElementById(arr[i]).disabled = true; 
//              temporalMem = 'todos';
//            } 
//      } else {
 
//        tem = filtroAplicadoSemTempo.filter(function(d) { 
//              return (
//                d.filtra_dataF == arr[i]
//              );}).size();
   
//              if (tem == 0) {  
//                document.getElementById(arr[i]).checked = false; 
//                document.getElementById(arr[i]).disabled = true; 
//                temporalMem = 'todos';
//              } 
//        }
//      }
//      }
 
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
           document.querySelector('#acessivel').checked = false; 
           document.querySelector('#acessivel').disabled = true; 
           AcessivelMem = null;
         } 
   }
   
 }
 
 // Visualização de Busca --------------------------------------------------------------------------------
 
   function buscaBubbles(buscaId,datavisMem,regiaoId) {

    console.log('buscaId no buscacubbles: ' + buscaId)
    console.log('datavisMem no buscacubbles: ' + datavisMem)
    console.log('regiaoId no buscacubbles: ' + regiaoId)

    hideCardChama();
    document.getElementById("ingressos").style.display = "none";
    document.getElementById("temporal").style.display = "none";
    document.getElementById("publico").style.display = "none";
    document.getElementById("unidades").style.display = "none";
    document.getElementById(`regiao`).style.display = "none";


      if (datavisMem == "verUO-CB") {
         regiaoMem = "capital";
         StrenghtBusca = 0.5;
         document.getElementById("unidades").style.display = "flex";

       } else if (datavisMem == "verUO-IB") {
         regiaoMem = "interior";
         StrenghtBusca = 0.5;
         document.getElementById("unidades").style.display = "flex";

       } else if (datavisMem == "verAgendaB") {
        datavisMem = "verAgendaB";
        StrenghtBusca = 0.5;
      } else  {  StrenghtBusca = 0.2; }

       forceStrength = 0.1;
 
     if (datavisMem == "geral" || atual == "limpar") {
         simulation.stop();
         buscaMem = "undefined";
     }
 
            closeNavCategorias()
            hideunidadeTitles();
            hidesemanaTitles();
            hideformatoTitles();
 
            if (buscaId == '') { 
                novo_span.innerText = "";
                display_filtro.appendChild(novo_span);
                new_span.innerText = "";
                display_filtro.appendChild(new_span);
                simulation.stop();  
           
              } else {
        
 // Apaga texto amigável e mostra Busca
                novo_span.innerText = "atividades encontradas com '" + buscaId +"'";
                display_filtro.appendChild(novo_span);
               }
 
               buscaId = buscaId.toLowerCase();
 
 
 // Força para expelir não filtradas  
 var radialForceBusca = 
 d3.forceRadial()
   .radius(heightTotal)
   .x(widthTotal/2)
   .y(heightTotal/2)
   .strength(StrenghtBusca);

  collisionForce = d3.forceCollide().radius(function(d) { return d.radius+15 }); 
  
 // contador da busca textual
 // tot = bubbles.size();
 
  if (datavisMem == 'verUO-CB' || datavisMem == 'verUO-IB') {
      Filtrados = function(d) { return ((d.busca.toLowerCase().includes(buscaId)) && (regiaoMem == d.regiao)) };

      bubbles.transition()
             .duration(1500);

      // bubbles.attr('r', function(d) { return (
      //         !(d.filtra_dataF == temporalMem) ) ? 0 : d.radius });

      // bubblesDaSemana = bubbles.filter(function(d) { 
      //   return (d.filtra_dataF == temporalMem)
      //   });    
      //   console.log(bubblesDaSemana.size() + " - " + bubblesDaSemana);



        bubbles.attr('r', function(d) { return !((d.busca.toLowerCase().includes(buscaId)) && (d.regiao == regiaoMem)) 
                                                      ? 3 : (d.destaque !== 'undefined') 
                                                      ? d.radius : !((d.busca.toLowerCase().includes(buscaId)) 
                                                      && (regiaoMem == d.regiao)) ? 3 : d.radius})
                       .attr('stroke', function(d) { return !((d.busca.toLowerCase().includes(buscaId)) && (regiaoMem == d.regiao)) 
                            ? '#555555' : (d.online == 1)
                            ? "gold" : (d.ingresso == 1) 
                            ? "darkred" : d3.rgb(fillColor(d.dia_da_semana)).darker()})
                       .attr('stroke-width', function(d) { return !((d.busca.toLowerCase().includes(buscaId)) && (regiaoMem == d.regiao)) ? 1 : 1})
                       .attr('fill', function(d) { return !((d.busca.toLowerCase().includes(buscaId)) && (regiaoMem == d.regiao)) ? '#cccccc' : (d.destaque !== 'undefined')
                            ? "url(#" + d.destaque + ")" : fillColor(d.dia_da_semana)});

     simulation.force("r", isolate(radialForceBusca, function(d) { 
          return !((d.busca.toLowerCase().includes(buscaId)) && (regiaoMem == d.regiao)); 
          }));
          simulation.force('x', d3.forceX().strength(forceStrength).x(nodeunidadeXPos));
          simulation.force('y', d3.forceY().strength(forceStrength).y(nodeunidadeYPos));
 
    } else if (datavisMem == 'verAgendaB') {

      Filtrados = function(d) { return (d.busca.toLowerCase().includes(buscaId))};

      filtrado = bubbles.filter(Filtrados).size();

      bubbles.transition()
             .duration(1500)
             .attr('r', function(d) { return !(d.busca.toLowerCase().includes(buscaId)) ? 3 : (d.destaque !== 'undefined') 
               ? d.radius : !(d.busca.toLowerCase().includes(buscaId)) ? 3 : (filtrado < 20) ? d.radius+10 :  d.radius})

             .attr('stroke', function(d) { return !(d.busca.toLowerCase().includes(buscaId)) 
                ? '#555555' : (d.online == 1)
                ? "gold" : (d.ingresso == 1) 
                ? "darkred" : d3.rgb(fillColor(d.dia_da_semana)).darker()})
              .attr('stroke-width', function(d) { return !(d.busca.toLowerCase().includes(buscaId)) ? 1 : 1})
              .attr('fill', function(d) { return !(d.busca.toLowerCase().includes(buscaId)) ? '#cccccc' : (d.destaque !== 'undefined')
                ? "url(#" + d.destaque + ")" : fillColor(d.dia_da_semana)});


     simulation.force("r", isolate(radialForceBusca, function(d) { 
          return !(d.busca.toLowerCase().includes(buscaId)); 
          }));
          simulation.force('x', d3.forceX().strength(forceStrength).x(nodesemanaPos));
          simulation.force('y', d3.forceY().strength(forceStrength).y(nodeperiodoPosBusca));

          if (filtrado < 20) {
          simulation.force('collision', isolate(collisionForce, function(d) { 
                    return ((d.busca.toLowerCase().includes(buscaId)))}));
            } else {
              simulation.force('collision',d3.forceCollide().radius(function(d) { return d.radius+1.5 }));
            }

          hideunidadeTitles();

    } else {
      Filtrados = function(d) { return (d.busca.toLowerCase().includes(buscaId))};

      filtrado = bubbles.filter(Filtrados).size();

      bubbles.transition()
             .duration(1500)
             .attr('r', function(d) { return !(d.busca.toLowerCase().includes(buscaId)) ? 3 : (d.destaque !== 'undefined') 
               ? d.radius : !(d.busca.toLowerCase().includes(buscaId)) ? 3 : (filtrado < 20) ? d.radius+10 :  d.radius})

             .attr('stroke', function(d) { return !(d.busca.toLowerCase().includes(buscaId)) 
                ? '#555555' : (d.online == 1)
                ? "gold" : (d.ingresso == 1) 
                ? "darkred" : d3.rgb(fillColor(d.dia_da_semana)).darker()})
              .attr('stroke-width', function(d) { return !(d.busca.toLowerCase().includes(buscaId)) ? 1 : 1})
              .attr('fill', function(d) { return !(d.busca.toLowerCase().includes(buscaId)) ? '#cccccc' : (d.destaque !== 'undefined')
                ? "url(#" + d.destaque + ")" : fillColor(d.dia_da_semana)});


     simulation.force("r", isolate(radialForceBusca, function(d) { 
          return !(d.busca.toLowerCase().includes(buscaId)); 
          }));
          simulation.force('x', d3.forceX().strength(forceStrength).x(widthTotal/2));
          simulation.force('y', d3.forceY().strength(forceStrength).y(heightTotal/2));

          if (filtrado < 20) {
          simulation.force('collision', isolate(collisionForce, function(d) { 
                    return ((d.busca.toLowerCase().includes(buscaId)))}));
            } else {
              simulation.force('collision',d3.forceCollide().radius(function(d) { return d.radius+1.5 }));
            }

          hideunidadeTitles();
  }

  contador(filtrado);

 // inseri por minha conta para reiniciar
      simulation.alpha(1).restart();

     if (datavisMem == "verUO-CB") {
         showunidadeTitles();
        } else if (datavisMem == "verUO-IB") {
         showunidadeTitlesInt();
        } else if (datavisMem == "verAgendaB") {
          showsemanaTitlesBusca();
        }
  
//    openNavBuscaUO();
//    document.getElementById("mySideNavBuscaUO").style.visibility = "visible";

}
 
 
 /*
 * Oculta cabeçalhos.
 */
     function hidesemanaTitles() {
         svg.selectAll('.dia_da_semana').remove();
     }
 
     function hideunidadeTitles() {
         svg.selectAll('.dia_da_semana').remove();
     }
 
     function hideformatoTitles() {
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
                .text(function (d) { 
                      if (temporalMem == "agora") {
                          return (d) + " " + DataDoDia[d].agora; 
                         } else if (temporalMem == "proxima") {
                          return (d) + " " + DataDoDia[d].proxima;
                        } else {
                          return (d) + " " + DataDoDia[d].depois;
                        } 
                        });
    }

    function showsemanaTitlesBusca() {
      var semanasData = d3.keys(semanasTitleX);
      var semanas = svg.selectAll('.dia_da_semana')
                       .data(semanasData);
  
          semanas.enter().append('text')
                 .attr('class', 'dia_da_semana')
                 .attr('x', function (d) { return semanasTitleX[d]; })
                 .attr('y', function (d) { return semanasTitleY[d]+50; })
                 .attr('fill', function(d) { return fillColor(d); })
                 .attr('text-anchor', 'middle')
                 .text(function(d) { return DataDoDia[d].agora; });

          semanas.enter().append('text')
                 .attr('class', 'dia_da_semana')
                 .attr('x', function (d) { return semanasTitleX[d]; })
                 .attr('y', function (d) { return semanasTitleY[d]+300; })
                 .attr('fill', function(d) { return fillColor(d); })
                 .attr('text-anchor', 'middle')
                 .text(function(d) { return DataDoDia[d].proxima; });
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
 
   if (regiaoMem == 'capital') {
 
       var unidadesData = d3.keys(unidadesTitleXCap);
       var unidades = svg.selectAll('.dia_da_semana').data(unidadesData);
       unidades.enter().append('text')
         .attr('class', 'dia_da_semana')
         .attr('x', function (d) { return unidadesTitleXCap[d]; })
         .attr('y', function (d) { return unidadesTitleYCap[d]; })
         .attr('text-anchor', 'middle')
         .text(function (d) { return fillunidadesCap(d); });
 
       } else {
 
       var unidadesData = d3.keys(unidadesTitleXInt);
       var unidades = svg.selectAll('.dia_da_semana').data(unidadesData);
       unidades.enter().append('text')
         .attr('class', 'dia_da_semana')
         .attr('x', function (d) { return unidadesTitleXInt[d]; })
         .attr('y', function (d) { return unidadesTitleYInt[d]; })
         .attr('text-anchor', 'middle')
         .text(function (d) { return fillunidadesInt(d); });
       }
 
 }
 
   
 function showunidadeTitlesInt() {

  var unidadesData = d3.keys(unidadesTitleXInt);
      var unidades = svg.selectAll('.dia_da_semana').data(unidadesData);
      unidades.enter().append('text')
        .attr('class', 'dia_da_semana')
        .attr('x', function (d) { return unidadesTitleXInt[d]; })
        .attr('y', function (d) { return unidadesTitleYInt[d]; })
        .attr('text-anchor', 'middle')
        .text(function (d) { return fillunidadesInt(d); });
  }


 // Busca textual
 const searchInput = d3.select(".g-search input")
 .on("keyup", keyuped)
 foco();
 
 
 // ao clicar na bolha
 function BubbleZoom(d) {
 
//////////////////////  Busca Sinopse e foto
  var filters = {
     'id': d.id
   };

dataSino = d3.csv("data/semdfe-1018-uau.csv", function(csv) {
  csv = csv.filter(function(row) {
      // run through all the filters, returning a boolean
      return  ['id','nome','sinopse','foto'].reduce(function(pass, column) {
          return pass && (
              // pass if no filter is set
              !filters[column] ||
                  // pass if the row's value is equal to the filter
                  // (i.e. the filter is set to a string)
                  row[column] === filters[column] ||
                  // pass if the row's value is in an array of filter values
                  filters[column].indexOf(row[column]) >= 0
              );
      }, true);
  })
  console.log(csv.length, csv[0].sinopse);

  var sinopse = csv[0].sinopse;
  var foto = csv[0].foto;

});
/////////////////////////////////////////////////////////////////////////////////

var sinopse = "sinopse";

// tratamento de variáveis para exibição
const StrToData = d3.timeParse("%Y-%m-%d 00:00:00");
const formataData = d3.timeFormat("%d.%m.%Y");
 
 if (d.exibirdatas == "de-ate") {
   var exibedata = 'De ' + formataData(StrToData(d.datainicial)) + ' até ' + formataData(StrToData(d.datafinal));
 } else {
   var exibedata = formataData(StrToData(d.data))  + ' ' + d.hora ;
 }
 
 if (d.dia_da_semana == "sáb" || d.dia_da_semana == "dom" ) {
    var Corclass = "finds";
 } else if (d.dia_da_semana == "sempre") {
    var Corclass = "buttonCat";
 } else {
    var Corclass = "labuta";
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
        var ingresso = d.ingressos;  
       } else { var ingresso = 'inscrições abertas' }
 
 if (d.gratis == 1) {
   var gratis = 'grátis';
 } else {var gratis = ''}
 
  var contentCard = '<span class="name"><img src="img/' + d.destaque + '.png" width="200" style="margin-left:10px" align="right"><br></span>' +
                    '<span class="'+ Corclass +'"><b>' + d.dia_da_semana + '</b></span>' +
                    '<span class="value"> | <b>' + exibedata + '</b></span><br><br>' +
                    '<span class="value"><b>' + d.categoria + '</b></span><br/>' +
                    '<span class="value">' + d.projeto + '</span><br/>' +
                    '<span class="name"><a href="https://www.sescsp.org.br/?s=' + d.nome + '" target="_blank"><b>' + d.name + '</b></a><br></span>' +
                    '<span class="value">' + d.name2 + '</span><br/>' +
                    '<span class="value">' + sinopse + '</span>' +
                    d.value + ' lugares/vagas</span>.' +
                    '<span class="value"><b> ' + gratis + '<br>' + ingresso + '</b><br>' +
                    '<span class="value"><b>' + publico + '</b></span>  ' +
                    '<span class="name"><b>' + tem_acessivel + '</b>  </span>' + '<span class="name"> | <b>' + online + '</b></span><br>' +
                    '<span class="value">' + d.regiao + ' | <b>' + d.unidade + '</b> | ' + d.formato + '</span><br/>';

      card.showCard(d,contentCard, d3.event);

     
    document.getElementById('card').addEventListener('click',hideCardChama);

                       
}   
 
 // Exibe o detalhamento com o MOuseOver
   function showDetail(d) {
     // change outline to indicate hover state.
     d3.select(this)
       .transition()
       .duration(200)
       .attr('stroke', 'black')
       .attr('stroke-width', 5)
       .attr('r', d.radius+5);
 
       if (d.dia_da_semana == "sáb" || d.dia_da_semana == "dom" ) {
        var Corclass = "finds";
         } else if (d.dia_da_semana == "sempre") {
        var Corclass = "buttonCat";
         } else {
        var Corclass = "labuta";
     }
   

 // tratamento de variáveis para exibição
    const StrToData = d3.timeParse("%Y-%m-%d 00:00:00");
    const formataData = d3.timeFormat("%d.%m.%Y");
     
     if (d.exibirdatas == "de-ate") {
       var exibedata = 'De ' + formataData(StrToData(d.datainicial)) + ' até ' + formataData(StrToData(d.datafinal));
     } else {
       var exibedata = '' + d.dia_da_semana + ', ' + formataData(StrToData(d.data))  + ' ' + d.hora ;
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
     
     var contentssss = '<span class="name"></span>' +
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
                   '<span class="value"><b>' + publico + '</b></span><br>';

                   var content = '<span class="value">' + d.regiao + ' | <b>' + d.unidade + '</b> | ' + d.formato + '</span><br/><br>' + 
                   '<span class="'+ Corclass +'"><b>' + d.dia_da_semana + '</b></span>' +
                   '<span class="value"><b> | ' + exibedata + '</b></span><br><br>' +
                   '<span class="name"><b>' + d.name + '</b></span><br>' + 
                   '<span>' + d.name2 + '</span>' +
                   '<span><br><br><i>clique para mais informações</i></span>';
                                   

     tooltip.showTooltip(content, d3.event);
   }

 
 
 // Oculta o detalhamento
   function hideDetail(d) {
     // reset outline
     d3.select(this)
       .transition()
       .duration(200)
       .attr('stroke-width', '1')
       .attr('stroke', function (d) { return (d.online == 1)
        ? "gold" : (d.ingresso == 1) 
        ? "darkred" : d3.rgb(fillColor(d.dia_da_semana)).darker();})
       .attr('r', d.radius);

     tooltip.hideTooltip();
   }
 
// Oculta o Card
function hideCardChama(d) {
  // reset outline

  card.hideCard(d);
}



 // link para a busca do site do Sesc
 var url = 'http://sescsp.org.br';
 var link = document.querySelector("#escape");
 
 function linkSite(d) {
     var win = window.open('https://www.sescsp.org.br/?s='+d.nome, 'portal');
     win.focus();
 }
 
   /*
    * Opções de interação do usuário
    */
   chart.toggleDisplay = function (formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                   acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido) 
                                   {
         hideCardChama();
                                    console.log('-------- começo do chart.toggle  --------');
                                    console.log('formatoId: ' + formatoId);
                                    console.log('atual: ' + atual);
                                    console.log('datavis: ' + datavis);
                                    console.log('datavisMem: ' + datavisMem);
                                    console.log('escolhido: ' + escolhido);
                                    console.log('uoId: ' + uoId);
                                    console.log('buscaId: ' + buscaId);
                                    console.log('---------------- fim --------------------');
            

     if (atual == "verUO-CB" || atual == "verUO-IB" ||atual == "verAgendaB") {
        console.log('-------- foi pra BUSCABUB com  --------');
        console.log(buscaId);
        console.log('---------------------------------------');

        buscaBubbles(buscaId,atual,regiaoId,buscaId);
       };
       

  if (uoId != null) {
     uoMem = uoId; 
   };
 
   if (formatoId != null) {
     formatoMem = formatoId; 
   };
 
  //  if (formatoId == "100") {
  //    datavisMem = "geral"; 
  //  };

   if (regiaoId != null) {
       regiaoMem = regiaoId;
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
 
   if (datavis != null) {
     datavisMem = datavis; 
   };

   if (atual == "limpar" || escolhido == "geral") { datavisMem = "geral"; buscaMem = "undefined"; };
   if (atual == "regiao") { datavisMem = "unidades"; };

  //  if ((datavisMem != "agenda") && (atual == "formato")) {
  //       var datavisMem = 'unidades';
  //   };

   if (formatoMem == 7) { 
       hidesemanaTitles(); 
       datavisMem = "unidades"; 
       if (regiaoMem == "interior") { showunidadeTitlesInt(); } else { showunidadeTitles();}
    };

   console.log('-------- fim do chart.toggle  --------');
   console.log('formatoId: ' + formatoId);
   console.log('atual: ' + atual);
   console.log('datavis: ' + datavis);
   console.log('datavisMem: ' + datavisMem);
   console.log('escolhido: ' + escolhido);
   console.log('uoId: ' + uoId);
   console.log('----------------fim---------------');


      groupBubbles(formatoMem,regiaoMem,temporalMem,publicoMem,vendaMem,gratisMem,
                  acessivelMem,onlineMem,uoMem,categoriaMem,atual,datavisMem,buscaMem,escolhido);
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
     regiaoBuscaId = "sem-escolha";
     buscaId = this.value; 

     var buscaMem = this.value;

     closeNavComoVer();
     openNavComoVerBusca();

// Zera filtros anteriores
var op = document.getElementById('verUO-C');
    op.classList.remove('active');
var op = document.getElementById('verUO-I');
    op.classList.remove('active');
var op = document.getElementById('capital');
    op.classList.remove('active');
var op = document.getElementById('interior');
    op.classList.remove('active');

    document.getElementById('capital').checked = false; 
    document.getElementById('interior').checked = false; 

    document.getElementById('agora').checked = false; 
    document.getElementById('proxima').checked = false; 

var tiraFormato = document.querySelector("#toolbar");
    tiraFormato.querySelector("form").reset();
    formatoMem = '100';
    formatoId = '100';

    arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for(var i=0; i < arr.length; i++) { 
    var op = document.getElementById('fo'+arr[i]);
        op.classList.remove('active');
    } 

arr_uos = [52, 53, 55, 56, 57, 58, 59, 61, 62, 63, 64, 
           65, 66, 67, 68, 70, 71, 72, 73, 75, 76, 77, 
           78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 
           89, 91, 92, 93, 94, 95, 96, 49, 60];

 for(var i=0; i < arr_uos.length; i++) { 
         document.getElementById("uo"+arr_uos[i]).checked = false; 
         document.getElementById("uo"+arr_uos[i]).classList.remove('active');

 }

var tiraCat = document.querySelector("#mySideNavCategoria");
    tiraCat.querySelector("form").reset();

    arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','14'];

  for(var i=0; i < arr.length; i++) { 
      var op = document.getElementById('ca'+arr[i]);
          op.classList.remove('active');
          op.checked = false;
   } 

var tiraSer = document.querySelector("#mySideNavServicos");
    tiraSer.querySelector("form").reset();

    arr = ['12', '13', '15', '16', '17', '18'];
    for(var i=0; i < arr.length; i++) { 
    var op = document.getElementById('ca'+arr[i]);
        op.classList.remove('active');
        op.checked = false;
    } 

    //////////////////////////////////////////////     

// Configura os botões utilizados pelo usuário para escolher a visualização

function setupButtonsComoVerBusca(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId) {
  d3.select('#ComoVerBusca')
    .selectAll('.buttonVerB')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('.buttonVerB').classed('active', false);
      // Find the button just clicked
      var buttonVer= d3.select(this);

      // Set it as the active button
      buttonVer.classed('active', true);

// Get the id of the button
      var ComoVer = buttonVer.attr('id');

    if (ComoVer == "verAgendaB") {
        var datavisMem = "verAgendaB"; 
      } else if (ComoVer == "verUO-CB") {
        var datavisMem = ComoVer; 
        var regiaoMem = "capital";
      } else {
        var datavisMem = ComoVer; 
        var regiaoMem = "interior";
      }
      var atual = ComoVer;

      document.getElementById(`unidades`).style.display = "flex";

      foco();
      console.log('botões como ver ----------------------');
      console.log('datavisMem: ' + datavisMem);
      console.log('regiaoMem: ' + regiaoMem);
      console.log('buscaId: ' + buscaId);

//      myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
//                                   acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId);

buscaBubbles(buscaId,datavisMem,regiaoMem,buscaMem);


    });
}

setupButtonsComoVerBusca(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId);

buscaBubbles(buscaId,datavisMem,regiaoId,buscaMem);

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

 function setupButtonsComoVer(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId) {
    d3.select('#ComoVer')
      .selectAll('.buttonVer')
      .on('click', function () {
        // Remove active class from all buttons
        d3.selectAll('.buttonVer').classed('active', false);
        // Find the button just clicked
        var buttonVer= d3.select(this);
  
        // Set it as the active button
        buttonVer.classed('active', true);
  
  // Get the id of the button
        var ComoVer = buttonVer.attr('id');
  
      if (ComoVer == "verAgenda") {
          var datavis = "agenda"; 
          var regiaoMem = regiaoId;
        } else if (ComoVer == "verUO-C") {
          var datavis = "unidades"; 
          var regiaoMem = "capital";
        } else {
          var datavis = "unidades"; 
          var regiaoMem = "interior";
        }
        var atual = ComoVer;
  
        foco();
        console.log('botões como ver ----------------------');
        console.log('atual: ' + atual);
        console.log('regiaoMem: ' + regiaoId);
        console.log('buscaId: ' + buscaId);
  
        myBubbleChart.toggleDisplay(formatoId,regiaoMem,temporalId,publicoId,vendaId,gratisId,
                                     acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId);
  
      });
  }
 
  setupButtonsComoVer();
  
 function setupButtons(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                       acessivelId,onlineId,uoId,categoriaId,atual,datavisMem,buscaId,escolhido) {
   d3.select('#toolbar')
     .selectAll('.button')
     .on('click', function () {
       // Remove active class from all buttons
       d3.selectAll('.button').classed('active', false);
       // Find the button just clicked
       var button = d3.select(this);
 
       // Set it as the active button
       button.classed('active', true);

       console.log('atual antes de receber a info de formato: ' + atual)
 
       // Get the id of the button
       var formatoId = button.attr('id').substring(2);
       var atual = "formato";
       var escolhido = button.attr('value');
 
       var LimpaBusca = document.querySelector("#busca");
           LimpaBusca.querySelector("form").reset();

       var tiraCat = document.querySelector("#mySideNavCategoria");
           tiraCat.querySelector("form").reset();
 
       var tiraSer = document.querySelector("#mySideNavServicos");
           tiraSer.querySelector("form").reset();

             categoriaMem = '99';
             categoriaId = '99';
 
   //      var datavis = "unidades";
 
             arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '14','12','13','15','16','17','18'];
              for(var i=0; i < arr.length; i++) { 
                  var op = document.getElementById('ca'+arr[i]);
                      op.classList.remove('active');
             } 
             document.getElementById('buscatextual').value='';
             var buscaId = '';
                 closeNavComoVerBusca();
                 openNavComoVer();

                 document.getElementById("ingressos").style.display = "flex";
                 document.getElementById("temporal").style.display = "flex";
                 document.getElementById("publico").style.display = "flex";
                 document.getElementById(`regiao`).style.display = "flex";
                          
       foco();
       myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                   acessivelId,onlineId,uoId,categoriaId,atual,datavisMem,buscaId,escolhido);
     });
 }
 
 function setupButtonTudo(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                          acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido) {
   d3.select('#zera')
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

 // reestabelece variáveis para limpar filtros para o padrão      
       var regiaoId = 'capital';
       var formatoId = '100';
       var publicoId = 'todos';
       var temporalId = "agora";
       var uoId = '100';
       var categoriaId = '99';
       var gratisId = 0;
       var vendaId = 0;
       var acessivelId = 0;
       var onlineId = 0;
       document.getElementById('buscatextual').value='';
       var buscaId = '';
       var atual = "limpar";
       var datavis = "geral";

    //   var win = window.open('vazio.html', 'portal');

        closeNavComoVerBusca();
        openNavComoVer();
        closeNavGdeSP();
        closeNavCapital();
        closeNavInterior();

        document.getElementById("ingressos").style.display = "flex";
        document.getElementById("temporal").style.display = "flex";
        document.getElementById("publico").style.display = "flex";
        document.getElementById(`regiao`).style.display = "flex";
    

       foco();
       myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                   acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido);
     });
 }
 
 function setupButtonsFiltroCategorias(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                       acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido) {
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
//           var datavis = "unidades";
document.getElementById('buscatextual').value='';
var buscaId = '';
    closeNavComoVerBusca();
    openNavComoVer();

           foco();
       myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                   acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido);
     });
 }
 

 function setupButtonsFiltroServicos(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                     acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido) {
  d3.select('#mySideNavServicos')
    .selectAll('.buttonSer')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('.buttonSer').classed('active', false);
      // Find the button just clicked
      var button = d3.select(this);

      // Set it as the active button
      button.classed('active', true);

      // Get the id of the button
      var categoriaId = button.attr('id').substring(2);
      var escolhido = button.attr('value');
          var atual = "servicos";
   //       var datavis = "unidades";
   document.getElementById('buscatextual').value='';
   var buscaId = '';
       closeNavComoVerBusca();
       openNavComoVer();

          foco();
      myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                  acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido);
    });
}


 function setupButtonsFiltroTemporal(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                     acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido) {
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
     //  var datavis = "agenda";
 
       foco();
       myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                   acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido);
     });
 }
 
 function setupButtonsFiltroRegiao(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                   acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido) {
 
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
 
       document.getElementById(`unidades`).style.display = "flex";

 // Zera as unidades
       var uoId = 100;
       var tiraUO = document.querySelector("#unidades");
           tiraUO.querySelector("form").reset();
 
           arr_uos = [52, 53, 55, 56, 57, 58, 59, 61, 62, 63, 64, 
                      65, 66, 67, 68, 70, 71, 72, 73, 75, 76, 77, 
                      78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 
                      89, 91, 92, 93, 94, 95, 96, 49, 60];
  
          for(var i=0; i < arr_uos.length; i++) { 
              document.getElementById("uo"+arr_uos[i]).checked = false; 
           }

        var atual = regiaoId;
        var datavis = "unidades";

        var LimpaBusca = document.querySelector("#busca");
            LimpaBusca.querySelector("form").reset();

       foco();
       myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                   acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido);
     });
 }
 
 function setupButtonsFiltroPublico(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                    acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido) {
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
       myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                   acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido);
     });
 }
 
 function setupButtonsFiltroVenda(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                  acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido) {
  
       var venda = document.querySelector('#venda');
           venda.addEventListener('change', function(element) {
       if (venda.checked == true) { 
         var vendaId = 1;
        } else {
         var vendaId = 0;
       }
 
     var atual = "venda";
 
     foco()
     myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                 acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido);
     });
 
 }
 
 function setupButtonsFiltroGratis(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                   acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido) {
  
     var gratis = document.querySelector('#gratis');
         gratis.addEventListener('change', function(element) {
     if (gratis.checked == true) { 
       var gratisId = 1;
       } else {
       var gratisId = 0;
     }
     var atual = "gratis";
     foco()
     myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                 acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido);
     });
 }
 
 function setupButtonsFiltroAcessivel(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                      acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido) {
 
     var acessivel = document.querySelector('#acessivel');
           acessivel.addEventListener('change', function(element) {
        if (acessivel.checked == true) { 
             var acessivelId = 1;
         } else {
             var acessivelId = 0;
        }
 
     var atual = "acessibilidade";
 
     foco()
     myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                 acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido);
     });
 }
 
 function setupButtonsFiltroOnline(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                   acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido) {
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
       myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                   acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido);
     });
 }

function setupButtonsFiltroUnidades(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                    acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido) {
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
       var datavis = "formatos";
       var LimpaBusca = document.querySelector("#busca");
           LimpaBusca.querySelector("form").reset();

       document.getElementById('capital').checked = false; 
       document.getElementById('interior').checked = false; 
 
      //  var tiraCat = document.querySelector("#mySideNavCategoria");
      //  tiraCat.querySelector("form").reset();
 
      //  arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','14'];
      //   for(var i=0; i < arr.length; i++) { 
      //       var op = document.getElementById('ca'+arr[i]);
      //           op.classList.remove('active');
      //           op.checked = false;
      //  } 

      //  var tiraSer = document.querySelector("#mySideNavServicos");
      //  tiraSer.querySelector("form").reset();
 
      //  arr = ['12', '13', '15', '16', '17', '18'];
      //   for(var i=0; i < arr.length; i++) { 
      //       var op = document.getElementById('ca'+arr[i]);
      //           op.classList.remove('active');
      //           op.checked = false;
      //  } 

      // Zera formatos
      //  var tiraFormato = document.querySelector("#toolbar");
      //      tiraFormato.querySelector("form").reset();
      //      formatoMem = '100';
      //      formatoId = '100';
      //      arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

      //  for(var i=0; i < arr.length; i++) { 
      //      var op = document.getElementById('fo'+arr[i]);
      //          op.classList.remove('active');
      //    } 

       

       foco();
       myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,
                                   acessivelId,onlineId,uoId,categoriaId,atual,datavis,buscaId,escolhido);
     });
 }
     
 
//  function VizPorUO(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual,escolhido,datavis,buscaId) {
//   var datavisMem = "unidades";
//   var atual = "verUO";
//       myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,
//                                   vendaId,gratisId,acessivelId,onlineId,
//                                   uoId,categoriaId,atual,escolhido,datavisMem,buscaId);
//  } 

//  function VizPorAgenda(formatoId,regiaoId,temporalId,publicoId,vendaId,gratisId,acessivelId,onlineId,uoId,categoriaId,atual,escolhido,datavis,buscaId) {

//   var atual = "verAgenda";
//   var datavisMem = "agenda";

//   console.log('VizPorAgenda: ' + formatoId + '---' + regiaoId)

//       myBubbleChart.toggleDisplay(formatoId,regiaoId,temporalId,publicoId,
//                                   vendaId,gratisId,acessivelId,onlineId,
//                                   uoId,categoriaId,atual,escolhido,datavisMem,buscaId);
//  } 

 function foco() {
     // document.getElementById('buscatextual').focus();
     // document.getElementById('buscatextual').select();
     }
 
 //	Inicia os botões
  setupButtons();
  setupButtonTudo();
  setupButtonsFiltroCategorias();
  setupButtonsFiltroServicos();
  setupButtonsFiltroTemporal();
  setupButtonsFiltroRegiao();
  setupButtonsFiltroPublico();
  setupButtonsFiltroVenda();
  setupButtonsFiltroGratis();
  setupButtonsFiltroAcessivel();
  setupButtonsFiltroOnline();
  setupButtonsFiltroUnidades();
  // VizPorUO();
  // VizPorAgenda();
  

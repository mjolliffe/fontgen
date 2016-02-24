angular.module('Font')
  .controller('FontController', FontController);

FontController.$inject = ['$state', '$stateParams', '$scope', '$http', 'authService', 'userDataService'];

function FontController ($state, $stateParams, $scope, $http, authService, userDataService){

  //Setting up variables to determine if header or paragraph stylings are locked; initially false, when "Lock" is clicked they change to true as per two following functions
  var headerLockIsClicked = false;
  var paragraphLockIsClicked = false;

  $scope.fonts = {
    header: {
      name: '',
      url: ''
    },
    paragraph: {
      name: '',
      url: ''
    }
  }

  // Set toggle classes to change colors based on toggle click
  $scope.toggle = true;
  $scope.toggle2 = true;

  // Set variables for toggling based on toggle click
  var toggles = false;
  var toggles2 = false;

  $scope.toggleHeader = function() {
    if (toggles) {
      $scope.unlockHeader();
      toggles = false;
    } else {
      $scope.lockHeader();
      toggles = true;
    }
  }

  $scope.toggleParagraph = function() {
    if (toggles2) {
      $scope.unlockParagraph();
      toggles2 = false;
    } else {
      $scope.lockParagraph();
      toggles2 = true;
    }
  }

  $scope.lockHeader = function(){
    headerLockIsClicked = true;
  }

  $scope.lockParagraph = function(){
    paragraphLockIsClicked = true;
  }

  $scope.unlockHeader = function(){
    headerLockIsClicked = false;
  }

  $scope.unlockParagraph = function(){
    paragraphLockIsClicked = false;
  }

  var pairs = []

  $scope.save = function(){
    // console.log('in the font controller')
    userDataService.update($scope.fonts)
    pairs.push($scope.fonts)
  }

  //Logic for randomization of fonts; Initially pulling fonts from Google Fonts
  $scope.randomize = function(section){
    if (headerLockIsClicked && paragraphLockIsClicked) {
      return false
    } else {
    $http.get('http://fonts.googleapis.com/css?family=ABeeZee|Abel|Abril+Fatface|Aclonica|Acme|Actor|Adamina|Advent+Pro|Aguafina+Script|Akronim|Aladin|Aldrich|Alef|Alegreya|Alegreya+SC|Alegreya+Sans|Alegreya+Sans+SC|Alex+Brush|Alfa+Slab+One|Alice|Alike|Alike+Angular|Allan|Allerta|Allerta+Stencil|Allura|Almendra|Almendra+Display|Almendra+SC|Amarante|Amaranth|Amatic+SC|Amethysta|Amiri|Amita|Anaheim|Andada|Andika|Angkor|Annie+Use+Your+Telescope|Anonymous+Pro|Antic|Antic+Didone|Antic+Slab|Anton|Arapey|Arbutus|Arbutus+Slab|Architects+Daughter|Archivo+Black|Archivo+Narrow|Arimo|Arizonia|Armata|Artifika|Arvo|Arya|Asap|Asar|Asset|Astloch|Asul|Atomic+Age|Aubrey|Audiowide|Autour+One|Average|Average+Sans|Averia+Gruesa+Libre|Averia+Libre|Averia+Sans+Libre|Averia+Serif+Libre|Bad+Script|Balthazar|Bangers|Basic|Battambang|Baumans|Bayon|Belgrano|Belleza|BenchNine|Bentham|Berkshire+Swash|Bevan|Bigelow+Rules|Bigshot+One|Bilbo|Bilbo+Swash+Caps|Biryani|Bitter|Black+Ops+One|Bokor|Bonbon|Boogaloo|Bowlby+One|Bowlby+One+SC|Brawler|Bree+Serif|Bubblegum+Sans|Bubbler+One|Buda|Buenard|Butcherman|Butterfly+Kids|Cabin|Cabin+Condensed|Cabin+Sketch|Caesar+Dressing|Cagliostro|Calligraffitti|Cambay|Cambo|Candal|Cantarell|Cantata+One|Cantora+One|Capriola|Cardo|Carme|Carrois+Gothic|Carrois+Gothic+SC|Carter+One|Catamaran|Caudex|Caveat|Caveat+Brush|Cedarville+Cursive|Ceviche+One|Changa+One|Chango|Chau+Philomene+One|Chela+One|Chelsea+Market|Chenla|Cherry+Cream+Soda|Cherry+Swash|Chewy|Chicle|Chivo|Chonburi|Cinzel|Cinzel+Decorative|Clicker+Script|Coda|Coda+Caption|Codystar|Combo|Comfortaa|Coming+Soon|Concert+One|Condiment|Content|Contrail+One|Convergence|Cookie|Copse|Corben|Courgette|Cousine|Coustard|Covered+By+Your+Grace|Crafty+Girls|Creepster|Crete+Round|Crimson+Text|Croissant+One|Crushed|Cuprum|Cutive|Cutive+Mono|Damion|Dancing+Script|Dangrek|Dawning+of+a+New+Day|Days+One|Dekko|Delius|Delius+Swash+Caps|Delius+Unicase|Della+Respira|Denk+One|Devonshire|Dhurjati|Didact+Gothic|Diplomata|Diplomata+SC|Domine|Donegal+One|Doppio+One|Dorsa|Dosis|Dr+Sugiyama|Droid+Sans|Droid+Sans+Mono|Droid+Serif|Duru+Sans|Dynalight|EB+Garamond|Eagle+Lake|Eater|Economica|Eczar|Ek+Mukta|Electrolize|Elsie|Elsie+Swash+Caps|Emblema+One|Emilys+Candy|Engagement|Englebert|Enriqueta|Erica+One|Esteban|Euphoria+Script|Ewert|Exo|Exo+2|Expletus+Sans|Fanwood+Text|Fascinate|Fascinate+Inline|Faster+One|Fasthand|Fauna+One|Federant|Federo|Felipa|Fenix|Finger+Paint|Fira+Mono|Fira+Sans|Fjalla+One|Fjord+One|Flamenco|Flavors|Fondamento|Fontdiner+Swanky|Forum|Francois+One|Freckle+Face|Fredericka+the+Great|Fredoka+One|Freehand|Fresca|Frijole|Fruktur|Fugaz+One|GFS+Didot|GFS+Neohellenic|Gabriela|Gafata|Galdeano|Galindo|Gentium+Basic|Gentium+Book+Basic|Geo|Geostar|Geostar+Fill|Germania+One|Gidugu|Gilda+Display|Give+You+Glory|Glass+Antiqua|Glegoo|Gloria+Hallelujah|Goblin+One|Gochi+Hand|Gorditas|Goudy+Bookletter+1911|Graduate|Grand+Hotel|Gravitas+One|Great+Vibes|Griffy|Gruppo|Gudea|Gurajada|Habibi|Halant|Hammersmith+One|Hanalei|Hanalei+Fill|Handlee|Hanuman|Happy+Monkey|Headland+One|Henny+Penny|Herr+Von+Muellerhoff|Hind|Hind+Siliguri|Hind+Vadodara|Holtwood+One+SC|Homemade+Apple|Homenaje|IM+Fell+DW+Pica|IM+Fell+DW+Pica+SC|IM+Fell+Double+Pica|IM+Fell+Double+Pica+SC|IM+Fell+English|IM+Fell+English+SC|IM+Fell+French+Canon|IM+Fell+French+Canon+SC|IM+Fell+Great+Primer|IM+Fell+Great+Primer+SC|Iceberg|Iceland|Imprima|Inconsolata|Inder|Indie+Flower|Inika|Inknut+Antiqua|Irish+Grover|Istok+Web|Italiana|Italianno|Itim|Jacques+Francois|Jacques+Francois+Shadow|Jaldi|Jim+Nightshade|Jockey+One|Jolly+Lodger|Josefin+Sans|Josefin+Slab|Joti+One|Judson|Julee|Julius+Sans+One|Junge|Jura|Just+Another+Hand|Just+Me+Again+Down+Here|Kadwa|Kalam|Kameron|Kantumruy|Karla|Karma|Kaushan+Script|Kavoon|Kdam+Thmor|Keania+One|Kelly+Slab|Kenia|Khand|Khmer|Khula|Kite+One|Knewave|Kotta+One|Koulen|Kranky|Kreon|Kristi|Krona+One|Kurale|La+Belle+Aurore|Laila|Lakki+Reddy|Lancelot|Lateef|Lato|League+Script|Leckerli+One|Ledger|Lekton|Lemon|Libre+Baskerville|Life+Savers|Lilita+One|Lily+Script+One|Limelight|Linden+Hill|Lobster|Lobster+Two|Londrina+Outline|Londrina+Shadow|Londrina+Sketch|Londrina+Solid|Lora|Love+Ya+Like+A+Sister|Loved+by+the+King|Lovers+Quarrel|Luckiest+Guy|Lusitana|Lustria|Macondo|Macondo+Swash+Caps|Magra|Maiden+Orange|Mako|Mallanna|Mandali|Marcellus|Marcellus+SC|Marck+Script|Margarine|Marko+One|Marmelad|Martel|Martel+Sans|Marvel|Mate|Mate+SC|Maven+Pro|McLaren|Meddon|MedievalSharp|Medula+One|Megrim|Meie+Script|Merienda|Merienda+One|Merriweather|Merriweather+Sans|Metal|Metal+Mania|Metamorphous|Metrophobic|Michroma|Milonga|Miltonian|Miltonian+Tattoo|Miniver|Miss+Fajardose|Modak|Modern+Antiqua|Molengo|Molle|Monda|Monofett|Monoton|Monsieur+La+Doulaise|Montaga|Montez|Montserrat|Montserrat+Alternates|Montserrat+Subrayada|Moul|Moulpali|Mountains+of+Christmas|Mouse+Memoirs|Mr+Bedfort|Mr+Dafoe|Mr+De+Haviland|Mrs+Saint+Delafield|Mrs+Sheppards|Muli|Mystery+Quest|NTR|Neucha|Neuton|New+Rocker|News+Cycle|Niconne|Nixie+One|Nobile|Nokora|Norican|Nosifer|Nothing+You+Could+Do|Noticia+Text|Noto+Sans|Noto+Serif|Nova+Cut|Nova+Flat|Nova+Mono|Nova+Oval|Nova+Round|Nova+Script|Nova+Slim|Nova+Square|Numans|Nunito|Odor+Mean+Chey|Offside|Old+Standard+TT|Oldenburg|Oleo+Script|Oleo+Script+Swash+Caps|Open+Sans|Open+Sans+Condensed|Oranienbaum|Orbitron|Oregano|Orienta|Original+Surfer|Oswald|Over+the+Rainbow|Overlock|Overlock+SC|Ovo|Oxygen|Oxygen+Mono|PT+Mono|PT+Sans|PT+Sans+Caption|PT+Sans+Narrow|PT+Serif|PT+Serif+Caption|Pacifico|Palanquin|Palanquin+Dark|Paprika|Parisienne|Passero+One|Passion+One|Pathway+Gothic+One|Patrick+Hand|Patrick+Hand+SC|Patua+One|Paytone+One|Peddana|Peralta|Permanent+Marker|Petit+Formal+Script|Petrona|Philosopher|Piedra|Pinyon+Script|Pirata+One|Plaster|Play|Playball|Playfair+Display|Playfair+Display+SC|Podkova|Poiret+One|Poller+One|Poly|Pompiere|Pontano+Sans|Poppins|Port+Lligat+Sans|Port+Lligat+Slab|Pragati+Narrow|Prata|Preahvihear|Press+Start+2P|Princess+Sofia|Prociono|Prosto+One|Puritan|Purple+Purse|Quando|Quantico|Quattrocento|Quattrocento+Sans|Questrial|Quicksand|Quintessential|Qwigley|Racing+Sans+One|Radley|Rajdhani|Raleway|Raleway+Dots|Ramabhadra|Ramaraja|Rambla|Rammetto+One|Ranchers|Rancho|Ranga|Rationale|Ravi+Prakash|Redressed|Reenie+Beanie|Revalia|Rhodium+Libre|Ribeye|Ribeye+Marrow|Righteous|Risque|Roboto|Roboto+Condensed|Roboto+Mono|Roboto+Slab|Rochester|Rock+Salt|Rokkitt|Romanesco|Ropa+Sans|Rosario|Rosarivo|Rouge+Script|Rozha+One|Rubik|Rubik+Mono+One|Rubik+One|Ruda|Rufina|Ruge+Boogie|Ruluko|Rum+Raisin|Ruslan+Display|Russo+One|Ruthie|Rye|Sacramento|Sahitya|Sail|Salsa|Sanchez|Sancreek|Sansita+One|Sarala|Sarina|Sarpanch|Satisfy|Scada|Scheherazade|Schoolbell|Seaweed+Script|Sevillana|Seymour+One|Shadows+Into+Light|Shadows+Into+Light+Two|Shanti|Share|Share+Tech|Share+Tech+Mono|Shojumaru|Short+Stack|Siemreap|Sigmar+One|Signika|Signika+Negative|Simonetta|Sintony|Sirin+Stencil|Six+Caps|Skranji|Slabo+13px|Slabo+27px|Slackey|Smokum|Smythe|Sniglet|Snippet|Snowburst+One|Sofadi+One|Sofia|Sonsie+One|Sorts+Mill+Goudy|Source+Code+Pro|Source+Sans+Pro|Source+Serif+Pro|Special+Elite|Spicy+Rice|Spinnaker|Spirax|Squada+One|Sree+Krushnadevaraya|Stalemate|Stalinist+One|Stardos+Stencil|Stint+Ultra+Condensed|Stint+Ultra+Expanded|Stoke|Strait|Sue+Ellen+Francisco|Sumana|Sunshiney|Supermercado+One|Sura|Suranna|Suravaram|Suwannaphum|Swanky+and+Moo+Moo|Syncopate|Tangerine|Taprom|Tauri|Teko|Telex|Tenali+Ramakrishna|Tenor+Sans|Text+Me+One|The+Girl+Next+Door|Tienne|Tillana|Timmana|Tinos|Titan+One|Titillium+Web|Trade+Winds|Trocchi|Trochut|Trykker|Tulpen+One|Ubuntu|Ubuntu+Condensed|Ubuntu+Mono|Ultra|Uncial+Antiqua|Underdog|Unica+One|UnifrakturCook|UnifrakturMaguntia|Unkempt|Unlock|Unna|VT323|Vampiro+One|Varela|Varela+Round|Vast+Shadow|Vesper+Libre|Vibur|Vidaloka|Viga|Voces|Volkhov|Vollkorn|Voltaire|Waiting+for+the+Sunrise|Wallpoet|Walter+Turncoat|Warnes|Wellfleet|Wendy+One|Wire+One|Work+Sans|Yanone+Kaffeesatz|Yantramanav|Yellowtail|Yeseva+One|Yesteryear|Zeya', {ignoreCors: true}).then(function(data){

      // Take only the Latin form of the font
      var latin = data.data.match(/latin\s\*\/(\n.*){7}/g)

      // Create a fontArray into which different font names and their corresponding urls needed to display them are pushed as as objects
      var fontArray = []

      // Cycles through all the fonts to create the fontObjects with key value pairs
      for (var i = 0; i < latin.length; i++) {
        var url = latin[i].match(/http:(.*?).woff2\)/g)
        if (url) {
        url = url[0].replace(/\)/, '')
        }
        var name = latin[i].match(/font-family:\s'[^;]*?'/g)
        if (name) {
          name = name[0].replace(/font-family:\s/, '').replace(/'/, '').replace(/'/, '')
        };
        var fontObject = {
          url: url,
          name: name
        }
        fontArray.push(fontObject)
      };

      // Push a random font for the Header from the fontArray
      var headerRandom = []
      headerRandom.push(fontArray[Math.floor(Math.random() * fontArray.length)])

      // Push a random font for the Paragraph from the fontArray
      var paragraphRandom = []
      paragraphRandom.push(fontArray[Math.floor(Math.random() * fontArray.length)])

      // Define the style that will be appended to the head of the document each type a user hits "Randomize";  This will also create the random urls and names
      var newStyle = document.createElement('style');
      var fontURL = headerRandom[0].url
      var fontName = headerRandom[0].name
      var fontURL2 = paragraphRandom[0].url
      var fontName2 = paragraphRandom[0].name

      newStyle.appendChild(document.createTextNode("\
      @font-face {\
          font-family: " + fontName + ";\
          src: url('" + fontURL + "') format('woff2');\
      }\
      "));

      newStyle.appendChild(document.createTextNode("\
      @font-face {\
          font-family: " + fontName2 + ";\
          src: url('" + fontURL2 + "') format('woff2');\
      }\
      "));

      document.head.appendChild(newStyle);

      if (headerLockIsClicked == true) {
        fontName = $scope.fonts.header.name,
        fontURL = $scope.fonts.header.url
      } else {
        $scope.fonts.header.name = fontName,
        $scope.fonts.header.url = fontURL
      }

      if (paragraphLockIsClicked == true) {
        fontName2 = $scope.fonts.paragraph.name,
        fontURL2 = $scope.fonts.paragraph.url
      } else {
        $scope.fonts.paragraph.name = fontName2,
        $scope.fonts.paragraph.url = fontURL2
      }

      document.getElementById("header").style.fontFamily = fontName;

      document.getElementById("paragraph").style.fontFamily = fontName2;

      $scope.fontName = fontName
      $scope.fontURL = fontURL
      $scope.fontName2 = fontName2
      $scope.fontURL2 = fontURL2

      })
    }
  }
}

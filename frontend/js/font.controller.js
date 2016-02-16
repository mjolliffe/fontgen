angular.module('Font')
  .controller('FontController', FontController);

FontController.$inject = ['$state', '$stateParams', '$scope', '$http'];

function FontController ($state, $stateParams, $scope, $http){
  $scope.fonts;
  $scope.font;
  $http.get('http://fonts.googleapis.com/css?family=Lobster|Abel|Montserrat|Open+Sans|Roboto').then(function(data){

    var latin = data.data.match(/latin\s\*\/(\n.*){7}/g)

    var fontArray = []

    for (var i = 0; i < latin.length; i++) {
      var url = latin[i].match(/http:(.*?).woff2\)/g)[0].replace(/\)/, '')
      var name = latin[i].match(/font-family:\s'[^;]*?'/g)[0].replace(/font-family:\s/, '')
      // need to write conditional for if null comes up from search
      var object = {
        url: url,
        name: name
      }
      fontArray.push(object)
    };
    // console.log(fontArray)

    var headerRandom = []
    headerRandom.push(fontArray[Math.floor(Math.random() * fontArray.length)])

    var paragraphRandom = []
    paragraphRandom.push(fontArray[Math.floor(Math.random() * fontArray.length)])


    console.log(headerRandom[0].url)
    console.log(headerRandom[0].name)
    console.log(paragraphRandom[0].url)
    console.log(paragraphRandom[0].name)

    // console.log(headerRandom)
    // console.log(paragraphRandom)

    var newStyle = document.createElement('style');
    var fontURL = headerRandom[0].url
    var fontName = headerRandom[0].name

    var fontURL2 = paragraphRandom[0].url
    var fontName2 = paragraphRandom[0].name

    newStyle.appendChild(document.createTextNode("\
    @font-face {\
        font-family: '" + fontName + "';\
        src: url('" + fontURL + "') format('woff2');\
    }\
    "));

    newStyle.appendChild(document.createTextNode("\
    @font-face {\
        font-family: '" + fontName2 + "';\
        src: url('" + fontURL2 + "') format('woff2');\
    }\
    "));

    document.head.appendChild(newStyle);

    document.getElementById("header").style.fontFamily = fontName;
    document.getElementById("paragraph").style.fontFamily = fontName2;

    })
}

var go = $('#getpokemon');
var blueLight = $('.burbuja-azul');
var mainImg = $('#mainimg');
var preImg = $('#preimg');
var name;
var abilities = $("#abilities");

go.click(function () {
   //ajax functie aan roepen
   var pokemon = ($('input').val()).toLowerCase();
   $.ajax({
      // link waar informatie van komt
      url: 'https://pokeapi.co/api/v2/pokemon/' + pokemon + '/',
      error: function (error) {
         alert("error!");
      },
      success: function (data) {
         //console.log(data);
         name = data.name
         name = name.charAt(0).toUpperCase() + name.slice(1);
         $("#pokemon").html(name)
         mainImg.attr("src", data.sprites.front_default)
         moves(data);
         $("#pokemonid").html("Id: " + data.id)
         preevolutie(data);
         //console.log(data)

      },
      type: 'GET'
   })
});

// evolutie
function preevolutie(evodata) {

   console.log(evodata.species.url)
   //ajax functie aan roepen
   $.ajax({
      // link waar informatie van komt
      url: evodata.species.url,
      error: function (error) {
         alert("error!");
      },
      success: function (data) {
       console.log(data);
       if (data.evolves_from_species != null) {
         name = data.evolves_from_species.name;
         name = name.charAt(0).toUpperCase() + name.slice(1);
       $("#preevo").html(name);
           //console.log(data)
           preEvolutieSprite(data.evolves_from_species.name);
       } else{
         $("#preevo").html("No preEvo");
         preImg.attr('src', "");
       }
      },
      type: 'GET'
   })};

   function preEvolutieSprite(naam){
    //ajax functie aan roepen
    $.ajax({
       // link waar informatie van komt
       url: 'https://pokeapi.co/api/v2/pokemon/' + naam + '/',
       error: function (error) {
          alert("error!");
       },
       success: function (data) {
          preImg.attr("src" , data.sprites.front_default);
       },
       type: 'GET'
    })};




   function moves(data) {;
      abilities.html("") //change id to class
      var move;
      //array aan maken
      var pokemoves = [];
      var x;
      if (data.moves.length > 4){
        x = 4;
      } else{
        x = data.moves.length;
      }
      for (var i = 0; i < x; i++) {
         // door de array gaan , kijken naar hoeveel moves er zijn en deze slaan we op
         //$("#abilities").append(i + 1 +  ". " + data.moves[i].move.name + "<br>")
         // data.moves in de lege array steken
         rand = Math.floor((Math.random() * data.moves.length));
         move = data.moves[rand].move.name;
         move = move.charAt(0).toUpperCase() + move.slice(1);
         if (i%2 == 0){
           abilities.append("<span class='left'> " + (i+1) + ". " + move + "</span>");
         } else {
           abilities.append("<span class='right'> " + (i+1) + ". " + move + "</span><br>");
         }
         data.moves.splice(rand, 1);
         //pokemoves[i] = data.moves[i].move.name;
         //pokemoves[i] = pokemoves[i].charAt(0).toUpperCase() + pokemoves[i].slice(1)
      }
      /*
      switch (data.moves.length) {
         case 1:
            abilities.append("<span class='left'>1. " + pokemoves[0] + "</span>");
            break;
         case 2:
            abilities.append("<span class='left'>1. " + pokemoves[0] + "</span>");
            abilities.append("<span class='right'>2. " + pokemoves[1] + "</span>");
            break;
         case 3:
            abilities.append("<span class='left'>1. " + pokemoves[0] + "</span>");
            abilities.append("<span class='right'>2. " + pokemoves[1] + "</span><br>");
            abilities.append("<span class='left'>3. " + pokemoves[2] + "</span>");
            break;
         case 4:
            abilities.append("<span class='left'>1. " + pokemoves[0] + "</span>");
            abilities.append("<span class='right'>2. " + pokemoves[1] + "</span><br>");
            abilities.append("<span class='left'>3. " + pokemoves[2] + "</span>");
            abilities.append("<span class='right'>4. " + pokemoves[3] + "</span><br>");

            break;
         default:
            rand1 = Math.floor((Math.random() * pokemoves.length));
            abilities.append("<span class='left'>1. " + pokemoves[rand1] + "</span>");
            pokemoves.splice(rand1, 1);
            rand2 = Math.floor((Math.random() * pokemoves.length));
            abilities.append("<span class='right'>2. " + pokemoves[rand2] + "</span><br>");
            pokemoves.splice(rand2, 1);
            rand3 = Math.floor((Math.random() * pokemoves.length));
            abilities.append("<span class='left'>3. " + pokemoves[rand3] + "</span>");
            pokemoves.splice(rand3, 1);
            rand4 = Math.floor((Math.random() * pokemoves.length));
            abilities.append("<span class='right'>4. " + pokemoves[rand4] + "</span><br>");
            pokemoves.splice(rand4, 1);
      }
      */
   }


  function pokeimg(){
     mainImg.css('display', "block");
     preImg.css('display', "none");
     blueLight.css({
       'opacity' : '0.7',
       'box-shadow' : '0 0 4px #589dbb'
     });
      $('.br-roja').css('background-color', 'green');
      $('.br-roja.pegado').css('background-color', 'grey');
   }
   function preimg(){
     mainImg.css('display', "none");
     preImg.css('display', "block");
     $('.br-roja').css('background-color', 'grey');
    $('.br-roja.pegado').css('background-color', 'green');
   }

   $('#pokemon').click(pokeimg);
   $('.br-roja').click(pokeimg);
   $('.br-roja.pegado').click(preimg);
   $('#preevo').click(preimg);
   go.click(pokeimg);

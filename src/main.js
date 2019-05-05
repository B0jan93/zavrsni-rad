/*jslint browser: true*/
/*global $, jQuery*/


$('#change,#changeTwo').click(function(){  // Poklopac
    $('.cover').toggleClass('myClass');
    $('#sat').toggleClass("sat2");
    $('#change').toggleClass('changeClass');
    $(".my").toggleClass('myCls');
    $('.more').toggleClass('moreClass');
    $('.cover2').toggleClass('myClass2');
    $('#datum').toggleClass('datum2');
    $('.change2').toggleClass('changeClass2');
  
  });

  $(function(){$('#change,#changeTwo').click(function() {
    $('#change,#changeTwo').html() == "OTVORI" ? zatvori() : otvor();
    });
  });
      function zatvori() {
        $('#change,#changeTwo').html("ZATVORI");

      }
      function otvor() {
        $('#change,#changeTwo').html("OTVORI");

      }






var audioplayer = document.getElementById("muzika"); // audio-player
  $('#sound').click(function(){
    if (audioplayer.paused) {
       audioplayer.play();
    }
    else {
       audioplayer.pause();
    }
    $(this).toggleClass('pause');
})

function startTime() {     // Sat
  var sad = new Date();
  var sat = sad.getHours();
  var minut = sad.getMinutes();
  var sekunda = sad.getSeconds();
  minut = checkTime(minut);
  sekunda = checkTime(sekunda);
  document.getElementById('sat').innerHTML =
  sat + ":" + minut + ":" + sekunda;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};
  return i;
}

function startDate() {     //Datum
  var sad = new Date();
  var dan = String(sad.getDate()).padStart(2, '0');
  var mesec = String(sad.getMonth() + 1).padStart(2, '0');
  var god = sad.getFullYear();
  document.getElementById('datum').innerHTML =
  sad = dan + ':' + mesec + ':' + god;
}

  const drzacZaClanak = document.getElementById('drzac-za-clanak');
  const naslov = document.getElementById('naslov');
//
//
// Wiki fetch
$('#find').on('click',function(){
  userInput = $('#search').val();
  const trazenaRec = userInput;

    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${trazenaRec}&prop=extracts|pageimages|info&pithumbsize=400&inprop=url&redirects=&format=json&origin=*`;
    drzacZaClanak.innerHTML = '';
    naslov.innerText = '';

    fetch(url)
        .then(response => response.json())
        .then(podatak => {
          if (typeof podatak.query !== "undefined") {
            const pages = podatak.query.pages;
            const clanak = Object.values(pages)[0] // pretvara vrednosti objekta u niz
            naslov.innerText = clanak.title;
            drzacZaClanak.innerHTML += clanak.extract;
          }

        })
    })
  
  // wikipedia-embed
  //
  // var wiki;
  // $("#more").click(function(){

  //   userInput = $('#search').val();
  //   wiki = 'https://en.wikipedia.org/wiki/' + userInput;    // https://bulbapedia.bulbagarden.net/wiki/
  //
  //   document.getElementById('pedia').src = wiki;
  // })

  //
  //
  // sort za datalist

var sort;
var arr = [];
function saveArray(){
  $.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964/',
    dataType: "json",
    method: "GET",
    success: function(data){
      var arr = [];
      for (let index = 0; index < data.results.length; index++) {
        arr.push(data.results[index].name);

        arr.sort();
        sort = arr;
      }

    }
  })
}

var queue = [];
var ble;
var inpu;
var spliced;

$('#search').on('input',(e)=>{

  ble = queue.splice(0,4);
  inpu = e.target.value;


  gg = sort.filter(nn =>{
    return nn.includes(inpu);
  });
  inputAutoComplete();
})

var gg;

function inputAutoComplete(){
    $('#options').empty()
  for (let index = 0; index < 4; index++) {
    $('#options').append('<option value='+ gg[index] + '><option/>');
  }
}
//
var mojpokee;
//
// searchPoke fetch
var userInput;
$(document).ready(function() {
    $("form").on("submit", function(e) {
      e.preventDefault();

      userInput = $("#search").val();
      var url = "https://pokeapi.co/api/v2/pokemon/" + userInput;  // GET + display stats ?offset=0&limit=964

      $.ajax({
        url: url,
        dataType: "json",
        method: "GET",
        success: function(data) {
          var name = data.forms[0].name,
            pokeImgFront = data.sprites.front_default,
            speed = data.stats[0].base_stat,
            spDef = data.stats[1].base_stat,
            spAtk = data.stats[2].base_stat,
            def = data.stats[3].base_stat,
            atk = data.stats[4].base_stat,
            hp = data.stats[5].base_stat,
            id ="ID#" + data.id,
            weight = "<span class='stat'>TEZINA: </span>" + data.weight +"lbs",
            height = "<span class='stat'>VISINA: </span>" + data.height +"ft",
            addTo = "<button id='addTo'>+</button>";



            types = [];
          for (var i = 0; i < data.types.length; i++) {
            var type = data.types[i].type.name;
            types.push(type);
          }
          // tipovi //
          function pokemonType(types) {
            $("#types").html("");
            for (var i = 0; i < types.length; i++) {
              $("#types").append(
                "<div class='pokeType poke-info " +
                  types[i] +
                  "'>" +
                  types[i] +
                  " </div>"
              );
            }
          }

          $(".name").html(name);
          $(".idNum").html(id);
          $("#pokeImage").attr("src", pokeImgFront);
          $(".hp").html(hp);
          $(".attack").html(atk);
          $(".defense").html(def);
          $(".special-attack").html(spAtk);
          $(".special-defense").html(spDef);
          $(".speed").html(speed);
          $(".weight").html(weight);
          $(".height").html(height);
          $(".zaAdd").html(addTo);

          mojpokee = document.getElementsByClassName('mojpoke');
          
          $("#addTo").on('click', function() {

            del = document.createElement('button');
            del.className = "obrisi";
            del.appendChild(document.createTextNode('x'))
            del.addEventListener('click',(e)=>{
              e.target.parentElement.remove();
            })
            pokeHolder = document.createElement('div');
            pokeHolder.style.position = "relative";
            pokeHolder.style.width = "100px";

            $('.moji').append(pokeHolder);
            $(pokeHolder).append(del);
            $("#pokeImage").clone().addClass('mojpoke').appendTo(pokeHolder).attr('alt',name);

            $('.mojpoke').on("click",function(e){
              $('#search').val(e.target.alt).submit();
              $('#find').click();
            })
      
          });
          // addToaray();
          pokemonType(types);

        }
      });
    });
  });
// function addToaray() {
//   document.getElementById('addTo').addEventListener('click',()=>{
//       poks = [...poks,mojpokee[mojpokee.length-1].alt];
//       console.log(poks);
//   })
// }
//   var poks =[];




//
//
// onload
  window.onload=function(){
    startTime();
    startDate();
    saveArray();
    setTimeout(()=>{
      // inputAutoComplete();
    },1000);
  }

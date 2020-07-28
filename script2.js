let myRequest = new Request(
  'https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json'
);

document.addEventListener(
  'keypress',
  function (e) {
    if (e.which == 13) {
      pokedex();
    }
  },
  false
);

function pokedex() {
  try {
    capturar();
  } finally {
    setTimeout(error(), 500);
    setInterval(error(), 500);
  }
}

var valorDigitado = '';

function capturar() {
  valorDigitado = document.querySelector('.searchBox').value;

  fetch(myRequest)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (pokedata) {
      var parseintSearchValue = parseInt(idPokemon);
      var arr = parseintSearchValue - 1;
      var name = document.getElementById('namePokemon');
      for (var i = 0; i < 809; i++) {
        if (
          valorDigitado == pokedata[i].name.english.toLowerCase() ||
          valorDigitado == pokedata[i].name.english.toUpperCase() ||
          valorDigitado == pokedata[i].name.english
        ) {
          var arr = pokedata[i].id - 1;
          if ((arr.length = 1)) {
            var idPokemon = '' + pokedata[i].id;
            break;
          }
        }
        if (valorDigitado == pokedata[i].id) {
          var arr = parseInt(pokedata[i].id) - 1;
          if ((arr.length = 1)) {
            var idPokemon = '' + pokedata[i].id;
            break;
          }
        }
      }

      console.log('arr= ' + arr);
      console.log('idPokemon= ' + idPokemon);
      console.log('valorDigitado= ' + valorDigitado);

      //tipos de pokemon

      typeUm = pokedata[arr].type[0] || '';
      typeDois = pokedata[arr].type[1] || '';
      let imgType = document.getElementById('typesUm');
      imgType.src = `/imagens/types/${typeUm.toLowerCase()}.png`;
      let imgTypetwo = document.getElementById('typesDois');
      imgTypetwo.src = `/imagens/types/${typeDois.toLowerCase()}.png`;
      if (typeDois == '') {
        imgTypetwo.src = `/imagens/types/under.png`;
      }

      base = pokedata[arr].base;
      baseString = toString(base);
      console.log(base);

      base.hp = document.getElementById('hp');
      base.hp.innerHTML = 'Hp: ' + pokedata[arr].base['HP'];
      base.atk = document.getElementById('atk');
      base.atk.innerHTML = 'Attack: ' + pokedata[arr].base['Attack'];
      base.def = document.getElementById('def');
      base.def.innerHTML = 'Defense: ' + pokedata[arr].base['Defense'];
      base.spAtk = document.getElementById('spatk');
      base.spAtk.innerHTML = 'Sp. Atk: ' + pokedata[arr].base['Sp. Attack'];
      base.spDef = document.getElementById('spdef');
      base.spDef.innerHTML = 'Sp. Def: ' + pokedata[arr].base['Sp. Defense'];
      base.spd = document.getElementById('spd');
      base.spd.innerHTML = 'Speed: ' + pokedata[arr].base.Speed;

      let maxStats = [
        Math.max(
          pokedata[arr].base['Attack'],
          pokedata[arr].base['Defense'],
          pokedata[arr].base['HP'],
          pokedata[arr].base['Sp. Attack'],
          pokedata[arr].base['Sp. Defense'],
          pokedata[arr].base['Speed']
        ),
      ];

      let minStats = [
        Math.min(
          pokedata[arr].base['Attack'],
          pokedata[arr].base['Defense'],
          pokedata[arr].base['HP'],
          pokedata[arr].base['Sp. Attack'],
          pokedata[arr].base['Sp. Defense'],
          pokedata[arr].base['Speed']
        ),
      ];

      if (maxStats == pokedata[arr].base['Attack']) {
        base.atk.style.color = '#059142';
      } else if (minStats == pokedata[arr].base['Attack']) {
        base.atk.style.color = '#e71837';
      } else {
        base.atk.style.color = '';
      }

      if (maxStats == pokedata[arr].base['Defense']) {
        base.def.style.color = '#059142';
      } else if (minStats == pokedata[arr].base['Defense']) {
        base.def.style.color = '#e71837';
      } else {
        base.def.style.color = '';
      }

      if (maxStats == pokedata[arr].base['HP']) {
        base.hp.style.color = '#059142';
      } else if (minStats == pokedata[arr].base['HP']) {
        base.hp.style.color = '#e71837';
      } else {
        base.hp.style.color = '';
      }

      if (maxStats == pokedata[arr].base['Sp. Attack']) {
        base.spAtk.style.color = '#059142';
      } else if (minStats == pokedata[arr].base['Sp. Attack']) {
        base.spAtk.style.color = '#e71837';
      } else {
        base.spAtk.style.color = '';
      }

      if (maxStats == pokedata[arr].base['Sp. Defense']) {
        base.spDef.style.color = '#059142';
      } else if (minStats == pokedata[arr].base['Sp. Defense']) {
        base.spDef.style.color = '#e71837';
      } else {
        base.spDef.style.color = '';
      }

      if (maxStats == pokedata[arr].base['Speed']) {
        base.spd.style.color = '#059142';
      } else if (minStats == pokedata[arr].base['Speed']) {
        base.spd.style.color = '#e71837';
      } else {
        base.spd.style.color = '';
      }

      let imagem = document.getElementById('pokemonImg');

      if (idPokemon.length == 1) {
        name.innerHTML =
          '#00' + idPokemon + ' - ' + pokedata[arr].name['english'];
        imagem.src = `./images/00${idPokemon}.png`;
      } else if (idPokemon.length == 2) {
        name.innerHTML =
          '#0' + idPokemon + ' - ' + pokedata[arr].name['english'];
        imagem.src = `./images/0${idPokemon}.png`;
      } else if (idPokemon.length == 3) {
        name.innerHTML =
          '#' + idPokemon + ' - ' + pokedata[arr].name['english'];
        imagem.src = `./images/${idPokemon}.png`;
      }
      baseText();
    });
}

function baseText() {
  let baseText = document.getElementById('baseText');
  baseText.style.color = 'black';
  let baseTextdois = document.getElementById('baseTextdois');
  baseTextdois.style.color = 'black';
}

function error(idPokemon, valorDigitado) {
  if (valorDigitado == undefined || idPokemon < 0 || idPokemon > 809) {
    let hp = document.getElementById('hp');
    hp.innerHTML = '?????';
    let atk = document.getElementById('atk');
    atk.innerHTML = '?????';
    let def = document.getElementById('def');
    def.innerHTML = '?????';
    let spAtk = document.getElementById('spatk');
    spAtk.innerHTML = '?????';
    let spDef = document.getElementById('spdef');
    spDef.innerHTML = '?????';
    let spd = document.getElementById('spd');
    spd.innerHTML = '?????';

    let name = document.getElementById('namePokemon');
    name.innerHTML = '#??? - MISSINGNO';
    var imagem = document.getElementById('pokemonImg');
    imagem.src = './images/miss.png';
    imagem.innerHTML = 'error';
    let imgType = document.getElementById('typesUm');
    imgType.src = `/imagens/types/under2.png`;
    let imgTypetwo = document.getElementById('typesDois');
    imgTypetwo.src = `/imagens/types/under.png`;
  }
}

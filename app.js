var firebaseConfig = {
  apiKey: "AIzaSyCimmToIygcPtrRH4OH7WLAiPO_wmlojNs",
  authDomain: "mercadito-2020.firebaseapp.com",
  databaseURL: "https://mercadito-2020.firebaseio.com",
  projectId: "mercadito-2020",
  storageBucket: "mercadito-2020.appspot.com",
  messagingSenderId: "504863942032",
  appId: "1:504863942032:web:37ee72c756d0429402ff15",
  measurementId: "G-NT2EFGHSL9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var contenedor = "";
var divPrincipal = document.getElementById('div-principal');
var foo ;

function mostrar() {
  var productsRef = db.collection("productos");
  var condicion = document.getElementById('input-producto').value;
  //var c = productsRef.orderBy('nombre').startAt(condicion).endAt(condicion+'\uf8ff')
  var c = productsRef.where("nombre", ">=", condicion).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No hay productos para mostrar');
        return;
      }
      divPrincipal.innerHTML = "";
      //divPrincipal.parentNode.removeChild(divPrincipal);
      snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        var myJSON = JSON.parse(JSON.stringify(doc.data()));
        //console.log(doc.id, '=>',myJSON);
        //  console.log(myJSON.nombre,          myJSON.rutaImg,          myJSON.precio);
        crearArticulo(myJSON.rutaImg, myJSON.nombre, myJSON.precio, myJSON.unidad);
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });

}


function crearArticulo(imagen, nombre, precio, unidad) {
  var imgI = document.createElement("img");
  imgI.src = imagen;
  imgI.className = "imgProducto";

  var nombreP = document.createElement("span");
  var nombreTxt = document.createTextNode(nombre);
  nombreP.appendChild(nombreTxt);
  nombreP.className = 'nombre-class';
  var precioP = document.createElement("span");
  var precioTxt = document.createTextNode("$" + precio);
  precioP.appendChild(precioTxt);


  var unidadP = document.createElement("span");
  var unidadTxt = document.createTextNode(unidad);
  unidadP.appendChild(unidadTxt);
//-------------------------------
/*var valorP=document.createElement("span");
var valorTxt= document.createTextNode("1");
valorP.appendChild(valorTxt);
valorP.id='valor';*/
//-------------------------------
 var inputP = document.createElement("input");
  inputP.type = "text";
  inputP.className = "in-num";

  inputP.setAttribute('value', 1);
  inputP.setAttribute('readonly', "");

  var btnMas = document.createElement("button");
  var btnMenos = document.createElement("button");
  var btnMasTxt = document.createTextNode("+");
  var btnMenosTxt = document.createTextNode("-");
  var btnAddCanasta = document.createElement("button");
  btnMas.className = 'btn-mas-menos';

  
  btnMas.setAttribute('onclick',contador());
 //btnMenos.setAttribute('onclick', contador());
  btnMenos.className = 'btn-mas-menos';
  var btnAddCanastaTxt = document.createTextNode("Añadir a la canasta");
  var divAgrupBtn = document.createElement("div");
  divAgrupBtn.setAttribute("class","num-block skin-3");
  var divBtn=document.createElement("div");
  var spanA=document.createElement("span");
  var spanB=document.createElement("span");
  divBtn.setAttribute("class","num-in");
  spanA.setAttribute("class","minus dis");
  spanB.setAttribute("class","plus");
  var divAgrupPrecio = document.createElement("div");
  //divAgrupBtn.className = "num-block skin-3";
  divAgrupPrecio.className = "div-precio-class";
  btnMas.id = 'incremento';
  btnMenos.id = 'decremento';
  btnMas.appendChild(btnMasTxt);
  btnMenos.appendChild(btnMenosTxt);
  btnAddCanasta.appendChild(btnAddCanastaTxt);
  btnAddCanasta.className = 'btn-addCanasta';

  divAgrupPrecio.appendChild(unidadP);
  divAgrupPrecio.appendChild(precioP);
  //var divS= document.createElement("div");
  //divAgrupBtn.appendChild(btnMenos);
  //divAgrupBtn.appendChild(inputP);
  //divAgrupBtn.appendChild(valorP);
  //divAgrupBtn.appendChild(btnMas);
  divBtn.appendChild(spanA);
  divBtn.appendChild(inputP);
  divBtn.appendChild(spanB);
  divAgrupBtn.appendChild(divBtn);
  //divS.appendChild(nombreP);
  var article = document.createElement("article");
  article.className = "articulo";
  article.appendChild(imgI);
  article.appendChild(nombreP);
  /*article.appendChild(unidadP);
  article.appendChild(precioP);*/
  article.appendChild(divAgrupPrecio);
  /*article.appendChild(btnMenos);
  article.appendChild(inputP);
  article.appendChild(btnMas);*/
  article.appendChild(divAgrupBtn);
  article.appendChild(btnAddCanasta);
  divPrincipal.appendChild(article);

  /*
    var incrementoId = document.getElementById('incremento');
    var decrementoId = document.getElementById('decremento');
    var displayId = document.getElementById('valor');
    incrementoId.onclick = function () {
      console.log("deberia estar sumando");
      displayId.value = Number(displayId.value) + 1;
      console.log(displayId.value);
    };
    decrementoId.onclick = function () {
      console.log("deberia estar restando");
      displayId.value = Number(displayId.value) - 1;
      console.log(displayId.value);
    };*/
    

    
}


function incremento() {
  $('valor').value = parseInt($('valor').value) + 1;
}

function decremento() {
  $('valor').value = parseInt($('valor').value) - 1;
  //var newCounterValue = (counterValue)     ? counterValue - 1     : 0;

  //$('valor').value = newCounterValue;
}

function contador(){
  
  $(document).ready(function() {
    console.log("por aqui paso");
    $('.num-in span').click(function () {
        var $input = $(this).parents('.num-block').find('input.in-num');
      if($(this).hasClass('minus')) {
        var count = parseFloat($input.val()) - 1;
        console.log(count);
        count = count < 1 ? 1 : count;
        if (count < 2) {
          $(this).addClass('dis');
        }
        else {
          $(this).removeClass('dis');
        }
        $input.val(count);
      }
      else {
        var count = parseFloat($input.val()) + 1
        $input.val(count);
        if (count > 1) {
          $(this).parents('.num-block').find(('.minus')).removeClass('dis');
        }
      }
      
      $input.change();
      return false;
    });
    
  });
}
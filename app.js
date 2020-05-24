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
var divPrincipal = document.getElementById('div-principal');
var foo;

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
  //var inputP = document.createElement("input");
  //inputP.type = "text";
  //inputP.value = "1";
  //var inputText = document.createTextNode("1");
  //inputP.setAttribute('readonly', "");
  //inputP.appendChild(inputText);
  /*var btnMas = document.createElement("button");
  var btnMenos = document.createElement("button");*/
  /*var btnMas = document.createElement("input");
  var btnMenos = document.createElement("input");*/
  /*var btnMasTxt = document.createTextNode("+");
  var btnMenosTxt = document.createTextNode("-");*/
  var btnAddCanasta = document.createElement("button");
  var btnAddCanastaTxt = document.createTextNode("Añadir a la canasta");
  var divAgrupBtn = document.createElement("div");
  divAgrupBtn.setAttribute("id", "principal");
  divAgrupBtn.setAttribute("class", "div-agrup-btn-class");
  let btonMinus = document.createElement('input');
  btonMinus.setAttribute('type', "button");
  btonMinus.setAttribute('value', "-");
  btonMinus.setAttribute('id', "min");
  btonMinus.setAttribute("class", "btn-mas-menos");
  btonMinus.addEventListener("click", function () {
    quantityField = $(this).next();
    if (quantityField.val() != 0) {
      quantityField.val(parseInt(quantityField.val(), 10) - 1);
    }
  });
  let btonPlus = document.createElement('input');
  btonPlus.setAttribute('type', "button");
  btonPlus.setAttribute('value', "+");
  btonPlus.setAttribute('id', "plus");
  btonPlus.setAttribute("class", "btn-mas-menos");
  btonPlus.addEventListener("click", function () {
    quantityField = $(this).prev();
    quantityField.val(parseInt(quantityField.val(), 10) + 1);
  });
  let cantidad = document.createElement('input');
  cantidad.setAttribute('type', "text");
  cantidad.setAttribute('value', "0");
  cantidad.setAttribute('id', "cantidad");
  cantidad.setAttribute('readonly', "");
  cantidad.setAttribute('class', 'input-css')
  divAgrupBtn.append(btonMinus);
  divAgrupBtn.append(cantidad);
  divAgrupBtn.append(btonPlus);
  var divAgrupPrecio = document.createElement("div");
  divAgrupPrecio.className = "div-precio-class";
  btnAddCanasta.appendChild(btnAddCanastaTxt);
  btnAddCanasta.className = 'btn-addCanasta';
  divAgrupPrecio.appendChild(unidadP);
  divAgrupPrecio.appendChild(precioP);
  var article = document.createElement("article");
  article.className = "articulo";
  article.appendChild(imgI);
  article.appendChild(nombreP);
  article.appendChild(divAgrupPrecio);
  article.appendChild(divAgrupBtn);
  article.appendChild(btnAddCanasta);
  divPrincipal.appendChild(article);
}


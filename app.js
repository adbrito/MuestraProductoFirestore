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
  cantidad.setAttribute('value', "1");
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
  //btnAddCanasta.setAttribute("onclick",ingresarAlcarrito(nombre,precio,cantidad.value));

  btnAddCanasta.addEventListener("click", function () {
    /*let nombre = doc.data().nombre;
    let precio = parseFloat(doc.data().precio);
    let cantidad = parseInt(document.getElementById("cantidad-" + quitarEspaciosNombre(nombre)).value);*/
    console.log(nombre, precio, cantidad);
    ingresarAlcarrito(nombre, precio, cantidad.value);
  }
  );

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

let productosCarrito = [];
let cantidadCarrito = [];
let total = 0;

function ingresarAlcarrito(nombre = "manzana", precio = 1.2, cantidad = 1) {
  let indiceProducto = productosCarrito.indexOf(nombre);
  console.log("indice producto",indiceProducto);
  if (indiceProducto == -1) {

    productosCarrito.push(nombre);

    cantidadCarrito.push(cantidad);

    let producto = $("<tr>", { id: quitarEspaciosNombre(nombre) + "-carrito" });
    var tdN = document.createElement('td');
    tdN.className = "estilo-izq";
    var divN = document.createElement('div');
    divN.append(nombre);
    tdN.append(divN);
    //divN.className = "estilo-izq";
    producto.append(tdN);
    var tdC = document.createElement('td'); var tdP = document.createElement('td');

    var divC = document.createElement('div');
    var divP = document.createElement('div');
    tdP.className = "estilo-der";
    divC.append(cantidad);
    tdC.append(divC);
    divP.append("$ " + round(cantidad * precio));
    tdP.append(divP);
    tdC.className = "valor";
    producto.append(tdC);
    producto.append(tdP);
    //producto.append($("<td class='valor'><div>").append("$ " + round(cantidad*precio)));

    $("#productos-carrito").append(producto);
  }
  else {
    var tdN = document.createElement('td');
    tdN.className = "estilo-izq";
    var divN = document.createElement('div');
    divN.append(nombre);
    tdN.append(divN);
    var tdC = document.createElement('td'); var tdP = document.createElement('td');

    var divC = document.createElement('div');
    var divP = document.createElement('div');
    tdP.className = "estilo-der";

    cantidadCarrito[indiceProducto] = cantidadCarrito[indiceProducto] + cantidad;
    let Nuevacantidad = cantidadCarrito[indiceProducto];
    totalXproducto = Nuevacantidad * precio;
    document.getElementById(quitarEspaciosNombre(nombre) + "-carrito").innerHTML = "";
    console.log(nombre + "-carrito");
    $("#" + quitarEspaciosNombre(nombre) + "-carrito").append(tdN);
    divC.append(Nuevacantidad);
    tdC.append(divC);
    divP.append("$ " + round(cantidad * precio));
    tdP.append(divP);
    tdC.className = "valor";
    $("#" + quitarEspaciosNombre(nombre) + "-carrito").append(tdC);
    $("#" + quitarEspaciosNombre(nombre) + "-carrito").append(tdP);
  }

  total = total + precio * cantidad;
  document.getElementById("total").innerHTML = "$" + round(total);
  console.log(productosCarrito);
  console.log(cantidadCarrito);
  console.log("-------------------------");

}

function quitarEspaciosNombre(nombre) {
  let separacion = nombre.split(" ");
  let nuevo = separacion.map(function (palabra) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
  });
  return nuevo.join("");
}

function round(num, decimales = 2) {
  var signo = (num >= 0 ? 1 : -1);
  num = num * signo;
  if (decimales === 0) //con 0 decimales
    return signo * Math.round(num);
  // round(x * 10 ^ decimales)
  num = num.toString().split('e');
  num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
  // x * 10 ^ (-decimales)
  num = num.toString().split('e');
  return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}
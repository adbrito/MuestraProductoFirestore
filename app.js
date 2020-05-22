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


function mostrar() {
  //var t="<thead class='thead-dark'><tr><th>Nombre</th><th>Descripcion</th><th>Precio</th><th>Imagen</th></tr></thead>";

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
        console.log(doc.id, '=>', doc.data());
        var myJSON = JSON.parse(JSON.stringify(doc.data()));
        //console.log(doc.id, '=>',myJSON);
        console.log(myJSON.nombre,
          myJSON.rutaImg,
          myJSON.precio);
        //t=llenarInfo(t,cadena,myJSON.nombre,myJSON.descripcion,myJSON.rutaImg,myJSON.precio);
        //console.log(t);
        crearArticulo(myJSON.rutaImg, myJSON.nombre, myJSON.precio,myJSON.pxUnit);
        //llenar(t);
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });

}
/*
function llenarInfo(t,cadena, nombre, descripcion,ruta, precio){
//  cadena+=cadena;
  cadena="<tr class='prueba'><td>" + nombre +"</td><td>"+ descripcion+ "</td><td>" + precio + "</td><td><img src='" + ruta + "'width= 200 height= 200></img></td></tr>"
  //console.log(cadena);
  r=t.concat(cadena);
  return r;
}
function llenar(t) {
  var capa = document.getElementById("tabla");
  //var table = document.createElement("table");
  capa.innerHTML = t;
}
*/

function crearArticulo(imagen, nombre, precio,pxUnit) {
  var imgI = document.createElement("img");
  imgI.src = imagen;
  imgI.id="imagen";

  var nombreP = document.createElement("p");
  var nombreTxt = document.createTextNode(nombre);
  nombreP.appendChild(nombreTxt);
  var precioP = document.createElement("span");
  var precioTxt = document.createTextNode("$" + precio);
  precioP.appendChild(precioTxt);

  if(pxUnit){
    var unidadP=document.createElement("span");
    var unidadTxt=document.createTextNode("1 ud");
    unidadP.appendChild(unidadTxt);
  }else{
    var unidadP=document.createElement("span");
    var unidadTxt=document.createTextNode("1 caja");
    unidadP.appendChild(unidadTxt);
  }
  var inputP=document.createElement("input");
  inputP.type="text";
  inputP.className="input-css";
  
  var btnMas=document.createElement("button");
  var btnMenos=document.createElement("button");
  var btnMasTxt=document.createTextNode("+");
  var btnMenosTxt=document.createTextNode("-");
  var btnAddCanasta=document.createElement("button");
  var btnAddCanastaTxt=document.createTextNode("Añadir a la canasta");
  var divAgrupBtn=document.createElement("div");
  var divAgrupPrecio=document.createElement("div");
  divAgrupBtn.className="div-class";
  divAgrupPrecio.className="div-precio-class";
  btnMas.appendChild(btnMasTxt);
  btnMenos.appendChild(btnMenosTxt);
  btnAddCanasta.appendChild(btnAddCanastaTxt);

  divAgrupPrecio.appendChild(unidadP);
  divAgrupPrecio.appendChild(precioP);
  //var divS= document.createElement("div");
  divAgrupBtn.appendChild(btnMenos);
  divAgrupBtn.appendChild(inputP);
  divAgrupBtn.appendChild(btnMas);
  //divS.appendChild(nombreP);
  var article = document.createElement("article");
  article.className="articulo";
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
  //divPrincipal.appendChild(divS);
  divPrincipal.appendChild(article);
  //divPrincipal.innerHTML="<div><p>"+nombre+"</p></div>";// Añadir el nodo Element como hijo de la pagina
  //document.body.appendChild(parrafo);
}
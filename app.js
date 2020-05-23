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
  nombreP.className='nombre-class';
  var precioP = document.createElement("span");
  var precioTxt = document.createTextNode("$" + precio);
  precioP.appendChild(precioTxt);


  var unidadP = document.createElement("span");
  var unidadTxt = document.createTextNode(unidad);
  unidadP.appendChild(unidadTxt);
  var inputP = document.createElement("input");
  inputP.type = "text";
  inputP.className = "input-css";
  inputP.setAttribute('value',1);
  inputP.setAttribute('id',"valor");
  
  var btnMas = document.createElement("button");
  var btnMenos = document.createElement("button");
  var btnMasTxt = document.createTextNode("+");
  var btnMenosTxt = document.createTextNode("-");
  var btnAddCanasta = document.createElement("button");
  btnMas.className='btn-mas-menos';

  btnMas.setAttribute('onclick',incrementar);
  btnMenos.setAttribute('onclick',decrementar);
  
  btnMenos.className='btn-mas-menos';
  var btnAddCanastaTxt = document.createTextNode("Añadir a la canasta");
  var divAgrupBtn = document.createElement("div");
  var divAgrupPrecio = document.createElement("div");
  divAgrupBtn.className = "div-agrup-btn-class";
  divAgrupPrecio.className = "div-precio-class";
  btnMas.appendChild(btnMasTxt);
  btnMenos.appendChild(btnMenosTxt);
  btnAddCanasta.appendChild(btnAddCanastaTxt);
  btnAddCanasta.className='btn-addCanasta';

  divAgrupPrecio.appendChild(unidadP);
  divAgrupPrecio.appendChild(precioP);
  //var divS= document.createElement("div");
  divAgrupBtn.appendChild(btnMenos);
  divAgrupBtn.appendChild(inputP);
  divAgrupBtn.appendChild(btnMas);
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
  //divPrincipal.appendChild(divS);
  divPrincipal.appendChild(article);
  //divPrincipal.innerHTML="<div><p>"+nombre+"</p></div>";// Añadir el nodo Element como hijo de la pagina
  //document.body.appendChild(parrafo);
}
function incrementar() {

  var num=document.getElementById('valor').value;
  console.log(num);
  
  
  
}
  
   
  
  function decrementar() {
    var num=document.getElementById('valor').value;
    console.log(num);
    

  }
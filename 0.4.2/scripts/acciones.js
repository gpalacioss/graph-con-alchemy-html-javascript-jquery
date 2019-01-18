var nombre;
var tipo;
var pagina;
var identificador;
var nombreUsuario;
var limiteInferior;
var limiteSuperior;

function click(usuario){

			var $node = $('g[id^="node-"]');
			console.log($node);

  			$($node).click(function(){
  				console.log("esta en el click");
  				var id = $(this).attr("id");
  				var texto = $(this).text();
  				var clase = $(this).attr('class');


  				var pg = window.location.pathname.split( '/' );
  				console.log(pg);
  				pagina = pg[pg.length-1]
  				console.log(pagina);

  				lstClase = clase.split(" ");
  				lsId = id.split("-");
  				console.log(lsId[1]);
  				console.log(texto);
  				console.log(lstClase[1]);
  				nombre = texto;
  				tipo = lstClase[1];

          identificador = lsId[1];
          console.log("id en el click :: " + identificador);

          getInfoNodeClick(identificador, tipo, nombre);

  			});

        nombreUsuario = usuario;
        console.log(nombreUsuario)
		}


function getInfoNodeClick(id, tipo, nombre){
  console.log("en el obtener info" + id + tipo + nombre);

datos = {'id': id, 'tipo': tipo, "nombre": nombre}
    $.ajax({
      type: "POST",
      url: 'http://localhost:8080/getInfoNode',
      data: datos,
      success: function(result){
        console.log(result);

        var infoFinal = armaInfoNode(result, tipo);
      
        let lbl = document.getElementById("infoNodo");
        if (document.body.contains(lbl)) {
          lbl.remove();
        }

        var body = document.getElementById("info");
        var label   = document.createElement("label");
        label.setAttribute("id", "infoNodo");

        label.style.background="#fff";
        label.style.color="black";

        //label.css("background-color", "#19635d");
        //label.css("color", "#fff");

        var textLabel = document.createTextNode(infoFinal);
        label.appendChild(textLabel);

        body.appendChild(label);

      },error:function(xhr, textStatus, errorThrown){
                  console.log(xhr.status); 
      }

    });
    
}


function armaInfoNode(info, tipo){

  var obj = JSON.parse( info);
  console.log(obj);

  var date = new Date(obj['fechaCreacion']).toUTCString();
  date=date.split(' ').slice(0, 4).join(' ');
  console.log(date); 
  var datos;

  switch (tipo) {
  
    case "usuario":
       datos = "idUsuario: " + obj['idUsuario'] + ",  nombre: " + obj['nombre'] + ",  telefono: " + obj['telefono'] + ",  email: " + obj['email'];
      break;
    case "cuenta":
        datos = "idCuenta: " + obj['idCuenta'] + ",  Numero de Cuenta: " + obj['numeroCuenta'] + ",  Ultimo Usuario de Modificacion: " + obj['idUsuarioUltimaModificacion'];
      break;
    case "compania":
        datos = "idCompañia: " + obj['idCompania'] + ",  nombre de la Compañia: " + obj['nombreCompania'] + ",  es empresa Padre: " + obj['padre'];
      break;
    case "grupo":
        datos = "idGrupo: " + obj['idGrupo'] + ",  Nombre Grupo:" + obj['nombre'] + ",  Fecha Modificacion: " + obj['fechaModificacion'];
      break;
    case "permiso":
        datos = "idPermiso: " + obj['idPermiso'] + ",  nombre Permiso: " + obj['nombre'] + ",  Descripcion: " + obj['descripcion'] + ",  Fecha De  Modificacion: " + obj['fechaModificacion'];
      break;
    case "permisoCuentaMonto":
      datos = "nombre Permiso: " + nombre + ",  limite Inferior: " + obj['limiteInferior'] + ",  Limite Superior: " + obj['limiteSuperior'];
      limiteSuperior = obj['limiteSuperior'];
      limiteInferior = obj['limiteInferior'];

      break;
    case "rol":
      
      datos =  " IdRol: " + obj['idRol'] + ",  Nombre Rol: " + obj['nombreRol'] + ",  Fecha Creacion: " + date ;
      break;
      case "perfil":
      datos =  " idPerfil: " + obj['idPerfil'] + ",  Nombre Perfil: " + obj['nombre'] + ",  Descripcion" + obj['descripcion'] + ",  Fecha Creacion: " + date;
      break;
  }

  return datos;

}


function eliminar(nombre, tipo, nombreUsuario, identificador){

	var datos = {
					"id": nombre, 
					"tipo": tipo,
          "nombreUsuario":nombreUsuario,
          "identificador":identificador
				};

    $.ajax({
    	type: "POST",
    	url: 'http://localhost:8080/eliminaNodo',
    	data: datos,
    	success: function(Response){
        console.log(Response['code']);
        if (Response['code'] == 304) {
          alert(Response['message']);
          document.location.href = "./" + pagina;
          
        }else{
          alert('Nodo Eliminado Correctamente');
          document.location.href = "./" + pagina;
          
        }
        
    	},error:function(xhr, textStatus, errorThrown){
                  console.log(xhr.status); 
      }

    });

}

function enviaVariable(nombre, tipo, pagina, identificador, limI, limS){

	console.log("el nombre enviado :: " + nombre);

  if (tipo==="permisoCuentaMonto") {

    var pagina = document.location.href = "./editarNombre.html?nombre=" + nombre + "&tipo=" + tipo + "&pg=" + pagina + "&id=" + identificador + "&lm=" + limI + "&ls=" + limS + "&";

  }else{

    var pagina = document.location.href = "./editarNombre.html?nombre=" + nombre + "&tipo=" + tipo + "&pg=" + pagina + "&id=" + identificador + "&";

  }
}

function editar(nombre, tipo, pagina, identificador, limI, lims){

var lInfNuevo = "0";
var lSupNuevo = "0";

if (tipo==="permisoCuentaMonto") {
  lInfNuevo = document.getElementById("li").value;
  lSupNuevo = document.getElementById("ls").value;
}

var nuevoNombre = document.getElementById("nombre").value;


console.log(nombre);
console.log(nuevoNombre);
console.log(lims)
console.log(lSupNuevo);
console.log(tipo);
console.log(pagina);

	var datos = {
		"nombreAnt": nombre,
		"nombreNuevo": nuevoNombre,
		"tipo": tipo,
    "id": identificador,
    "limiteInfNuevo": lInfNuevo,
    "limiteSupNuevo": lSupNuevo
	}


	 $.ajax({

    	type: "POST",
    	url: 'http://localhost:8080/editaNodo',
    	data: datos,
    	success: function(){
    		document.location.href = "./" + pagina;
    	}
    });

}

function cancelarEdicion(pagina){
  document.location.href = "./" + pagina;
}
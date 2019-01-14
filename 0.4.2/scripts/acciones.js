var nombre;
var tipo;
var pagina;
var identificador;
var nombreUsuario;

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
  			});

        nombreUsuario = usuario;
        console.log(nombreUsuario)
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

function enviaVariable(nombre, tipo, pagina, identificador){

	console.log("el nombre enviado :: " + nombre);

  if (tipo==="permisoCuentaMonto") {

    var pagina = document.location.href = "./editarNombre.html?nombre=" + nombre + "&tipo=" + tipo + "&pg=" + pagina + "&id=" + identificador + "&";

  }else{

    var pagina = document.location.href = "./editarNombre.html?nombre=" + nombre + "&tipo=" + tipo + "&pg=" + pagina + "&id=" + identificador + "&";

  }
}

function editar(nombre, tipo, pagina, identificador, lims){

var lsupNuevo = "0";

if (tipo==="permisoCuentaMonto") {
  lsupNuevo = document.getElementById("ls").value;
}

var nuevoNombre = document.getElementById("nombre").value;


console.log(nombre);
console.log(nuevoNombre);
console.log(lims)
console.log(lsupNuevo);
console.log(tipo);
console.log(pagina);

	var datos = {
		"nombreAnt": nombre,
		"nombreNuevo": nuevoNombre,
		"tipo": tipo,
    "id": identificador,
    "limiteSupNuevo": lsupNuevo
	}


	 $.ajax({

    	type: "POST",
    	url: 'http://localhost:v  8080/editaNodo',
    	data: datos,
    	success: function(){
    		document.location.href = "./" + pagina;
    	}
    });

}

function cancelarEdicion(pagina){
  document.location.href = "./" + pagina;
}
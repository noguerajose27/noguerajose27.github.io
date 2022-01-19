let nuevoProductos = [];
class Producto{
	 constructor(){
		
		this.creaTabla();
		
	}

	//Metodo para validar los campos no vengan vacios. Precio debe ser Numerico para poder ingresar el producto
	validarProducto(codigo,descripcion,precio){
		if (codigo.length < 3) {
			document.getElementById("errores").innerHTML = "<p class='alert alert-danger' role='alert' > Campo CODIGO debe tener al menos tres(3) digitos</p>";
			return false;
		}else if (descripcion.length < 3) {
			document.getElementById("errores").innerHTML = "<p class='alert alert-danger' role='alert' > Campo DESCRIPCION debe tener al menos tres(3) digitos</p>";
			return false;
		}else if (precio <= 0) {
			document.getElementById("errores").innerHTML = "<p class='alert alert-danger' role='alert' > Campo PRECIO debe ser mayor a Cero(0)</p>";
			return false;
		}else if (isNaN(precio)) {
			document.getElementById("errores").innerHTML = "<p class='alert alert-danger' role='alert' > Campo PRECIO debe ser numerico</p>";
			return false;
		}else{
			
			this.agregarProducto(codigo,descripcion,precio);
		}
	
	}

	agregarProducto(codigo,descripcion,precio){
		let objProducto = {
			objCodigo : codigo,
			objDescripcion : descripcion,
			objPrecio : precio,
			objPrecioT : precio+(precio*0.19)
		}
	
		nuevoProductos.push(objProducto);
		this.localStorageProducto(nuevoProductos);
		this.creaTabla();
		
	
	}

	getProductoLista(){
		
		var storedList = localStorage.getItem("productos");
		if (storedList == null) {
			nuevoProductos = [];
			
		}else{
			nuevoProductos = JSON.parse(storedList);
			
		}
		return nuevoProductos;
	}

	creaTabla(){
		let listaProd = this.getProductoLista();
		let tbody = document.querySelector("#tproductos tbody");
		tbody.innerHTML = "";

		for (let i = 0; i < listaProd.length; i++) {
			var columna = tbody.insertRow(i),
					codigoCelda = columna.insertCell(0),
					descripcionCelda = columna.insertCell(1),
					precioCelda = columna.insertCell(2),
					precioIvaCelda = columna.insertCell(3),
					opcionCelda = columna.insertCell(4);
				
				codigoCelda.innerHTML = listaProd[i].objCodigo.toUpperCase();
				descripcionCelda.innerHTML = listaProd[i].objDescripcion.toUpperCase();
				precioCelda.innerHTML = "$"+listaProd[i].objPrecio.toFixed(2);
				precioIvaCelda.innerHTML = "$"+listaProd[i].objPrecioT.toFixed(2);
				let eliminarElement = document.createElement("button");
				eliminarElement.textContent = "Eliminar";
				eliminarElement.className="btn btn-danger";

				$(eliminarElement).on("click",function(e){
					e.target.parentNode.parentNode.remove();
					$("tbody").append("<p class='alert alert-success' role='alert' id='pEliminado'> Producto Eliminado</p>");
					$("#pEliminado").hide();
					$("#pEliminado").fadeIn(2000);
				});
				opcionCelda.appendChild(eliminarElement);
				tbody.appendChild(columna);
				

				document.getElementById('formulario').reset();
				document.getElementById("errores").innerHTML = "<p class='alert alert-success' role='alert' > Producto Registrado</p>";
			
		}
	}

	localStorageProducto(plista){
		localStorage.setItem("productos",JSON.stringify(plista));
	}

	
}

var producto = new Producto;
let formulario = document.getElementById("btnFormulario");
formulario.addEventListener("click",enviarFormulario);

function enviarFormulario(){
	let codigo = $("#codigo").val();
	let descripcion = $("#descripcion").val();
	let precio = parseFloat($("#precio").val());
	

	producto.validarProducto(codigo,descripcion,precio);

	
}



function registrarPedido(){
	let cliente = $("#cliente").val();
	let fdespacho = $("#fdespacho").val();
	let oc = $("#oc").val();
	let obs = $("#obs").val();
	let cantidadN = document.getElementsByName("cantidadN[]");
	let pcodigo = document.getElementsByName("codigoN[]");
	let cantidad = pcodigo.length;
	let canProd = 0;
	let i=0;
	let msjError = false;
	
	if (cliente.length <= 0) {
		document.getElementById("erroresP").innerHTML = "<p class='alert alert-danger' role='alert' > Campo CLIENTE no debe estar Vacío</p>";
		return false;
	}else if (fdespacho == "" ) {
		document.getElementById("erroresP").innerHTML = "<p class='alert alert-danger' role='alert' > Debe ingresar una fecha de despacho</p>";
		return false;
	}else{
		document.getElementById("erroresP").innerHTML = "";
	}
	//CONTADOR PARA CALCULAR ELEMENTOS CON DATOS
	while (i<cantidad) {
		if (pcodigo[i].value !="") {
			canProd++;
		}

		if(canProd <= 0){
			alert("Debe Ingresar al menos un producto");
			msjError = true;
			break;
		}else if(pcodigo[i].value !="" && cantidadN[i].value <=0){
			alert(`Debe ingresar la cantidad para el producto ${pcodigo[i].value}`);
			msjError = true;
		}	
	
		i++;
		
	}

	if(msjError){
		alert("Datos No enviado");	
	}else{
		$("#fpedido")[0].reset();		;
		alert("Datos enviado");
		
	}
}

$().ready(function(){
	for (let i = 0; i < 4; i++) {
		$("#Tpedido tbody").append(`<tr>
		<td><input type="text" class="form-control" name="codigoN[]" placeholder="Código"></td>
		<td><input type="text" class="form-control" id="descripcionN[]" placeholder="Producto" readonly></td>
		<td><input type="number" class="form-control" name="cantidadN[]" placeholder="Cantidad"></td>
		<td><input type="text" class="form-control" id="precioN[]" placeholder="Precio" readonly></td>
		</tr>`);
	}

	$("#Tpedido tfoot").append(`<tr><th>Total:<input type="text" class="form-control" placeholder="Total" readonly></th></tr>`)

	$("#btnFormularioPedido").on("click",function(){
		registrarPedido();
	});
	
});


//DESAFIO COMPLEMENTARIO
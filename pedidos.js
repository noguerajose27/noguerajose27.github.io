class Pedido{
    constructor(){
        this.creaTablaPedido();
    }

    creaTablaPedido(){
		
		let tpedido = document.querySelector("#tpedidos tbody");
		tpedido.innerHTML = "";
        $.ajax({
            method: "GET",
            url: "pedidos.json",
            success: function(datos){
               let columna = `<tr>`;

               for (const dato of datos) {
                   columna +=`<td>${dato.idPedido}</td>
                   <td>${dato.cliente}</td>
                   <td>${dato.fdespacho}</td>
                   <td>${dato.total.toFixed(3)}</td>
                   <td><button type="button" class="btn btn-success">ver</button></td></tr>`

               }
               
               tpedido.innerHTML=columna;
            },
            error: function(datos){
                console.log("Error");
            }
        });


	}

    registrarPedido(){
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
            $("#fpedido")[0].reset()
            ;
            alert("Datos enviado");
            
        }
    }
}

function buscarProducto(cod,pos){
    let prod = document.getElementsByName("descripcionN[]");
    if(cod = "pt-001"){
        prod[pos].value = "Producto 1";
    }else{
        prod[pos].value = "Producto no encontrado";
    }
   
        
}


$().ready(function(){
    let pedido = new Pedido;
    for (let i = 0; i < 4; i++) {
		$("#Tpedido tbody").append(`<tr>
		<td ><input type="text" class="form-control" name="codigoN[]" placeholder="Código" onblur="buscarProducto(this.value,${i})"></td>
		<td><input type="text" class="form-control" name="descripcionN[]" id="descripcionN[]" placeholder="Producto" readonly></td>
		<td><input type="number" class="form-control" name="cantidadN[]" placeholder="Cantidad"></td>
		<td><input type="text" class="form-control" id="precioN[]" placeholder="Precio" readonly></td>
		</tr>`);
	}

	$("#Tpedido tfoot").append(`<tr><th>Total:<input type="text" class="form-control" placeholder="Total" readonly></th></tr>`)

	$("#btnFormularioPedido").on("click",function(){
		pedido.registrarPedido();
	});
	
  

})

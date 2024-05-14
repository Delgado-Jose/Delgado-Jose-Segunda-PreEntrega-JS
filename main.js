document.addEventListener("DOMContentLoaded",function(){
    const frmPrincipal = document.getElementById("frmPrincipal");
    const btnGuardar = document.getElementById("btnGuardar");
    const ulLista = document.getElementById("ulLista");
    let abmIndex;
    let contactos = JSON.parse(localStorage.getItem("contactos"));
    let editar = false;
    
    if(!Array.isArray(contactos)){
        contactos = [];
    }

    listarContactos();

    btnGuardar.addEventListener("click", guardarContacto); 
 
    function listarContactos(){
        ulLista.innerHTML = "";
        contactos.forEach(function(contacto,index){
            const li = document.createElement("li");
           li.innerHTML = `<button class="btnEliminar" data-index="${index}">Eliminar</button>  <button class="btnEditar" data-index="${index}">Editar</button><span> ${contacto.nombre}</span> [ <span>Teléfono: ${contacto.telefono} -</span> <span>Dirección: ${contacto.direccion} -</span> <span>Correo: ${contacto.correo}</span> ]`;
           ulLista.appendChild(li);
        });
    }
    
    function guardarContacto(){
        if(frmPrincipal.inpNombre.value !== "" && frmPrincipal.inpTelefono.value !== ""){
            if(editar === false){
                const nuevoContacto ={
                    nombre: frmPrincipal.inpNombre.value,
                    telefono: frmPrincipal.inpTelefono.value,
                    direccion: frmPrincipal.inpDireccion.value,
                    correo: frmPrincipal.inpCorreo.value
                    
                }
                contactos.push(nuevoContacto);
            }else{
                contactos[abmIndex] = {
                    nombre: frmPrincipal.inpNombre.value,
                    telefono: frmPrincipal.inpTelefono.value,
                    direccion: frmPrincipal.inpDireccion.value,
                    correo: frmPrincipal.inpCorreo.value
                };
                editar = false;
            }            
            localStorage.setItem("contactos", JSON.stringify(contactos));
        } else{
            alert("Atención! Los campos Nombre y Telefono deben ser ingresados.");
        }
        listarContactos();        
    }

    ulLista.addEventListener("click", function(event){
        abmIndex = event.target.dataset.index;
        const contacto = contactos[abmIndex];
        if(event.target.classList.contains("btnEliminar")){
            contactos.splice(abmIndex,1);
            localStorage.setItem("contactos", JSON.stringify(contactos));
            listarContactos();
        } else if(event.target.classList.contains("btnEditar")){
            editar = true;
            frmPrincipal.inpNombre.value = contacto.nombre;
            frmPrincipal.inpTelefono.value = contacto.telefono;
            frmPrincipal.inpDireccion.value = contacto.direccion;
            frmPrincipal.inpCorreo.value = contacto.correo;
        }
    });
});
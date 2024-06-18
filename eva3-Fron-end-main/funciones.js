import { getData, getDocumento, remove, save, update } from './firestore.js'
let id = 0
document.getElementById('btnSave').addEventListener('click', (event) => {
    
    event.preventDefault()
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    const eleccionRadios = document.querySelectorAll('[name="eleccion"]:checked');
    if (eleccionRadios.length === 0) {
        const divEleccion = document.getElementById('e-eleccion');
        divEleccion.innerHTML = '<span class="badge bg-danger">Seleccione un metodo de pago</span>';
        return
    }
    
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const res = {
            run: document.getElementById('run').value,
            nom: document.getElementById('nombre').value,
            ape: document.getElementById('apellido').value,
            fono: document.getElementById('fono').value,
            email: document.getElementById('email').value,
            fecha: document.getElementById('fecha').value,
            habita: document.getElementById('habita').value,
            reser: document.getElementById('reserva').value,
            elecc: eleccionRadios[0].value
        }
        if (id == 0) {
            save(res)
            Swal.fire('Guardado','','success')
        } else{
            update(id,res)
        }
        id = 0
        limpiar()
    }
})


   

window.addEventListener('DOMContentLoaded', () => {
    getData((datos) => {
        let tabla = ''
        datos.forEach((res) => {
            const item = res.data()
            tabla += `<tr>
                <td>${item.run}</td>
                <td>${item.nom}</td>
                <td>${item.ape}</td>
                <td>${item.fono}</td>
                <td>${item.email}</td>
                <td>${item.fecha}</td>
                <td>${item.habita}</td>
                <td>${item.reser}</td>
                <td>${item.elecc}</td>

                <td nowrap>
                    <button class="btn btn-warning" id="${res.id}">Editar</button>
                    <button class="btn btn-danger" id="${res.id}">Eliminar</button>
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
               
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {         
                    if (result.isConfirmed) {
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })
   
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const doc = await getDocumento(btn.id)
                const res = doc.data()

                document.getElementById('run').value = res.run
                document.getElementById('nombre').value = res.nom
                document.getElementById('apellido').value = res.ape
                document.getElementById('fono').value = res.fono
                document.getElementById('email').value = res.email
                document.getElementById('fecha').value = res.fecha
                document.getElementById('habita').value = res.habita
                document.getElementById('reserva').value = res.reser

                id = doc.id
                document.getElementById('run').readOnly = true
                document.getElementById('btnSave').value = 'Editar'
            })
        })

    })
})
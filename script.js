
const urlBase = 'https://utn-lubnan-api-1.herokuapp.com/api';

// metodo get para employees

function getData(url) {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();

        request.open('GET', url);
        request.responseType = 'json';

        request.onload = function () {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                reject(Error('Hubo un error codigo: ' + request.statusText))
            }

        }

        request.onerror = function () {
            reject(Error('Hubo un error codigo: ' + request.statusText))
        }
        request.send();
    })
}



/// esta funcion crea el encabezado de la tabla, luego ejecuta la llamada http y con el 
//resultado llama a una funcion para la carga de datos en la table
function showEmployees(url) {

    // verifica si hay una tabla ya cargada y sino la borra
    var oldTable = document.getElementById("tableEmployee");
    if(oldTable){oldTable.remove();} 

    var container = document.getElementById("table-container");
   
   
    var table = document.createElement('table');
    table.className = "table table-dark"
    table.id = "tableEmployee"
    
    table.innerHTML += `
    <thead>
      <tr>
         <th>#</th>
         <th>Firstname</th>
         <th>LastName</th>
         <th>CompanyId</th>
         <th>Email</th>
      </tr>    
    </thead>
    `
    getData(url)
    .then((response) => {
        table.appendChild(cargarEmployee(response))
        container.appendChild(table);
    })
    .catch((reason) => {
        Error('algo salio mal' + reason.status);
    })

}


// esta funcion agarra todos los empleados, hace un bucle y carga cada empleado en el tbody, 
//luego retorna el tbody para insertarlo a la tabla

function cargarEmployee(response) {

    var tbody = document.createElement('tbody');
    var i = 0;

    response.forEach(employee => {
        /// este if es para que cambie de color el fondo en la tabla 
        if (i % 2 == 0) {
            tbody.innerHTML += `
            <tr class="table-active">
                <th>${employee.employeeId}</th>
                <th>${employee.firstName}</th>
                <th>${employee.lasNname}</th>
                <th>${employee.companyId}</th>
                <th>${employee.email}</th>
            </tr> `
        } else {
            tbody.innerHTML += `
            <tr>
                <th>${employee.employeeId}</th>
                <th>${employee.firstName}</th>
                <th>${employee.lasName}</th>
                <th>${employee.companyId}</th>
                <th>${employee.email}</th>
            </tr>`
        }
        i++;
    });
    return tbody;
}

  



//showEmployees(urlBase + '/Employee');

function showCompanies(url){

    var container = document.getElementById('table-companies');
    

    var table = document.createElement('table')
    table.className = "table table-dark";
    table.id = "companyTable"

    table.innerHTML += `
    
    <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
    </thead>
    `

    getData(url)
    .then((response=>{
        table.appendChild(cargarCompanies(response));
        container.appendChild(table);
    }))
    .catch((reason)=>{
        console.log('acaaaa' + reason);
    })


}

//showCompanies(urlBase + '/Company');

getData(urlBase + '/Company')
.then((response=>{
   console.log(response)
}))
.catch((reason)=>{
    console.log('acaaaa' + reason);
})



function cargarCompanies(response){
  
    var tbody = document.createElement('tbody');

    response.forEach(company => {
        tbody.innerHTML += `
        <tr>
        <th>${company.companyId}</th>
        <th>${company.name}</th>
        </tr>
        `
    })

    return tbody
}


function deleteTable(){

    var table = document.getElementById('table-container');

    var tbody = table.querySelector('tbody');

    if(tbody){
        table.remove();
    }
    
}

/*
function deleteTables(){

    var table = document.getElementById('table-container');
    var table2 = document.getElementById('table-companies')

    var tbody = table.querySelector('tbody');
    var tbody2 = table2.querySelector('tbody');

    if(tbody){
        table.remove();
    }
    if(tbody2){
        table2.remove();
    }

}
    

function deleteTableRowForRow(){
    var table = document.getElementById('table-container');

    var tbody = table.querySelector('tbody');
    
       //con esta minifuncion hago que las filas se vayan eliminando de a una
       if(tbody){
       
        function removeRow(){
            if(tbody.rows.length > 0){
                tbody.deleteRow(0);
                setTimeout(() => {
                    removeRow();
                }, 1);
            }else{
                alert("no hay mas filas para eliminar ")
              
            }
        }

        removeRow();
       
    }else{
        alert('NO HAY NADA PARA ELIMINAR');
    } 

}
      */
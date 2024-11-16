const url1 = 'http://localhost:8080/utilizadores/administradores';
const url2 = 'http://localhost:8080/utilizadores/professores';
const url3 = 'http://localhost:8080/utilizadores/alunos';

/*=====================================================================================

Chamando a função

=======================================================================================*/
document.addEventListener('DOMContentLoaded', function () {
const pageNumber = localStorage.getItem("page");

fetchMultipleUrlsAndGetSize();
    
    const getUser = async (page) => {
        let tabelaUtilizadores = document.getElementById("corpo-tabela");
        let url;

        if (page == 0){
            url = url1;
        } else if (page == 1) {
            url = url2;
        } else if (page == 2) {
            url = url3;
        } else {
            url = "http://localhost:8080/utilizadores";
        }

        const resposta = await fetch(url)
        .then((resposta) => resposta.json())
        .then((data) => {
            return data;
            }).catch(function(error) {
                console.log(error);
        });
        
        resposta.forEach((data) => {
            let newRecord = `<tr>
                <a href="/index.html">
                    <td>${data.name}</td>
                    <td>${data.email}</td>
                    <td>${data.birthday}</td>
                    <td>${data.address}</td>
                    <td id="updateUser-${data.idu}"><a href="/atualizar.html">Atualizar</a></td>
                    <td id="deleteUser-${data.idu}"><a href="/index.html">Eliminar</a></td>
                </a>
            </tr>`;
                
            tabelaUtilizadores.insertAdjacentHTML('afterbegin', newRecord);
            
            document.getElementById(`updateUser-${data.idu}`).addEventListener('click', () => {
                updateUser(data.idu);
            });
            
            document.getElementById(`deleteUser-${data.idu}`).addEventListener('click', () => {
                deleteUser(data.idu);
            });
        });
    };
    
    getUser(pageNumber);
});

/*=====================================================================================

Chamando a função

=======================================================================================*/


/*=====================================================================================

Chamando a função

=======================================================================================*/
const updateUser = async (userId) => {
    try {
        localStorage.setItem("userId", userId);
        
        let data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            birthday: document.getElementById("birthday").value,
            address: document.getElementById("address").value,
            password: document.getElementById("password").value
        }
        
        fetch(`http://localhost:8080/utilizadores/${userId}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then( resposta => {
            resposta.status == 200 ? window.location = "/index.html" : alert("Não foi possível atualizar o utilizador!");
        }).catch( error => alert(error));
            
    } catch (error) {
        alert("Problema no servidor. Não foi possível atualizar o professor!!!");
    }
};

/*=====================================================================================

Chamando a função

=======================================================================================*/
const getUniqueUser = async (userId) => {
    await fetch(`http://localhost:8080/utilizadores/${userId}`)
    .then((resposta) => resposta.json())
    .then((data) => {
            document.getElementById("name").value = data.name;
            document.getElementById("birthday").value = data.birthday;
            document.getElementById("address").value = data.address;
            document.getElementById("email").value = data.email;
            document.getElementById("password").value = data.password;
        }).catch( (error) => {
            console.log(error);
            alert("Não será possível atualizar os dados do professor. Dados não encontrado!")
    });
};

/*=====================================================================================

Chamando a função

=======================================================================================*/
const newUser = async () => {
    try {        

        let data = {
            name: document.getElementById("name").value,
            birthday: document.getElementById("birthday").value,
            address: document.getElementById("address").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            type: document.getElementById('exampleFormControlSelect1').value
        }
        
        fetch('http://localhost:8080/utilizadores', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then( resposta => {
            resposta.status == 201 ? window.location = "index.html" : alert("Não foi possível registar o user!");
        }).catch( error => alert(error));
            
    } catch (error) {
        alert("Problema no servidor. Não foi possível registar o professor!");
    }
}

/*=====================================================================================

Chamando a função

=======================================================================================*/

// Função assíncrona para realizar as requisições GET simultâneas e obter o tamanho dos arrays
async function fetchMultipleUrlsAndGetSize() {
    try {
        // Armazenando todas as requisições como um array de Promises
        const allRequests = [
            fetch(url1),
            fetch(url2),
            fetch(url3)
        ];

        // Espera todas as requisições serem concluídas
        const responses = await Promise.all(allRequests);

        // Processa as respostas, assumindo que todas são JSON
        const dataPromises = responses.map(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });

        // Espera todas as conversões de JSON serem concluídas
        const finalData = await Promise.all(dataPromises);

        // Obtendo o tamanho de cada array recebido das APIs
        const sizes = finalData.map(array => array.length);

        document.getElementById("stats-administradores").innerHTML = finalData[0].length;
        document.getElementById("stats-professores").innerHTML = finalData[1].length;
        document.getElementById("stats-alunos").innerHTML = finalData[2].length;
        document.getElementById("stats-cursos").innerHTML = finalData[0].length;

    } catch (error) {
        // Tratamento de erro
        console.error('Failed to fetch data:', error);
    }
}

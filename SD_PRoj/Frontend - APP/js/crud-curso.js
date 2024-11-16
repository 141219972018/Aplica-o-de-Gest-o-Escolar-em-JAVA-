
/*=====================================================================================

Chamando a função

=======================================================================================*/
const newCours = async () => {
    try {        

        let data = {
            idc: parseInt(document.getElementById("idc").value, 10),
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            duration: parseInt(document.getElementById("duration").value, 10),
            capacity: parseInt(document.getElementById("capacity").value, 10),
        };
        
        // Verifica se a conversão para integer foi bem-sucedida
        if (isNaN(dados.idc)) {
            alert("Idcurso deve ser um número inteiro.");
            return;
        }

        
        fetch('http://localhost:8080/cursos', {
            method: "POST",
            body: JSON.stringify(data), 
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then( resposta => {
            resposta.status == 201 ? window.location = "registercurso.html" : alert("Não foi possível registar o curso!");
        }).catch( error => alert(error));
            
    } catch (error) {
        alert("Problema no servidor. Não foi possível registar o curso!");
    }
}



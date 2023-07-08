const http = require('http');
const { randomUUID } = require('crypto');

const users = [
    {
        id: 'd9a996ea-6886-4027-8ec9-bf0ff3112746',
        name: "Donald Trump Junior",
        username: "guaxininqueimado"
    }
];

// criação do servidor
const server = http.createServer((req, res) => {
    
    // controllers
    if (req.url === '/users') {    // verificação do endpoint da requisição 

        if (req.method === 'GET') {      // verificação do tipo/método da requisição: GET

            //retorno 'response' da função do método get solicitado pelo cliente
            return res.end(JSON.stringify(                  //.end(): finaliza resposta do server e envia pro cliente
                {
                    "status": 200,
                    "data": users
                }
            )); 

        }; // fim do método GET

        if (req.method === 'POST') {       // verificação do tipo/método da requisição: POST
           

            req.on('data', (data) => {     // '.on()' lida com o evento de recebimento de dados no servidor 

                const dataUser = JSON.parse(data);    // transformar o data de string JSON para objeto

                const user = {                  // criação do corpo do objeto e dados do usuário

                    id: randomUUID(),             // gerador de radom id importato do 'crypto' 
                    ...dataUser                 // preenchimento de todos outros dados do usuário

                };

                users.push(user);               // insere o obj user no array  users

            }).on('end', () => {
                return res.end(JSON.stringify(
                    {
                        "status": 201,
                        "details": "User created successfully",
                        "data": users[users.length - 1]     
                    }
                ));  
            });
        };
    };

    if (req.url.startsWith('/users')) {      // condição do valor que a url vai começar

        if (req.method === 'PUT') {

            const url = req.url;                    // armazena o valor da url numa variavel 
            const splitUrl = url.split('/');        // split url '/':  separa a url onde tem "/"            

            const idUser = splitUrl[2]              // armazena valor id da url numa variavel

            const userIndex = users.findIndex(user => user.id === idUser); // percorre array buscando valor do id === url e acha o indice

            req.on('data', (data) => {                      //recebe valor do usuario

                const dataUser = JSON.parse(data);          // transforma em objeto

                users[userIndex] = {                        // insere novas informações no obj do indice encontrado a cima 

                    id: idUser,
                    ...dataUser

                };
                
            }).on('end', () => {
                return res.end(JSON.stringify({
                    "status": 200,
                    "details": "User updated successfully",
                    "data": users[userIndex]
                }));
            });
        };

        if (req.method === 'DELETE') {

            const url = req.url;
            const splitUrl = url.split('/');
            const idUser = splitUrl[2]

            const userIndex = users.findIndex(user => user.id === idUser);
                
            users.splice(userIndex, 1);  // remove index do array 'users':  splice('primeiro indice eliminado', 'qtde adiante')

            return res.end(JSON.stringify(
                {
                    "status": 200,
                    "details": "User deleted successfully"
                }
            ));           

        };

        if (req.method === 'GET') {

            const url = req.url;
            const splitUrl = url.split('/');
            const idUser = splitUrl[2]

            const userIndex = users.findIndex(user => user.id === idUser);

            return res.end(JSON.stringify(                  
                {
                    "status": 200,
                    "data": users[userIndex]
                }
            ));

        };

        if (req.method === 'PATCH') {

            const url = req.url;                     
            const splitUrl = url.split('/');                    

            const idUser = splitUrl[2]              

            const userIndex = users.findIndex(user => user.id === idUser); 

            req.on('data', (data) => {                      

                const dataUser = JSON.parse(data);          

                users[userIndex] = {                        

                    id: idUser,
                    name: users[userIndex].name,
                    username: dataUser.username

                };

                
            }).on('end', () => {
                return res.end(JSON.stringify({
                    "status": 200,
                    "details": "username updated successfully",
                    "data": users[userIndex]
                }));
            });
        };
    }


});


server.listen(3000, () => console.log('listening on port 3000'));
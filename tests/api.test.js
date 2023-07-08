const axios = require('axios');

test('should return users list', async () => {
    const response = await axios.get('http://localhost:3000/users');
    const mockedUsers = [
        {
            id: 'd9a996ea-6886-4027-8ec9-bf0ff3112746',
            name: "Donald Trump Junior",
            username: "guaxininqueimado"
        }
    ]
    const allReturn = {
        "status": 200,
        "data": mockedUsers
    }
    expect(response.data).toEqual(allReturn);
});

test('should return an user by id', async () => {
    const response = await axios.get('http://localhost:3000/users/d9a996ea-6886-4027-8ec9-bf0ff3112746');
    const mockedUsers = {
        id: 'd9a996ea-6886-4027-8ec9-bf0ff3112746',
        name: "Donald Trump Junior",
        username: "guaxininqueimado"
    }
    const allReturn = {
        "status": 200,
        "data": mockedUsers
    }
    expect(response.data).toEqual(allReturn);
});

test('should return a user created', async () => {
    const input = {
        "name": "Barack Obama",
        "username": "nicolauflameu"
    };
    const response = await axios.post('http://localhost:3000/users', input);
    const output = response.data;  

    expect(output.status).toEqual(201);
    expect(output.details).toEqual("User created successfully");
    expect(output.data).toHaveProperty('id');
    expect(output.data.name).toEqual("Barack Obama");
    expect(output.data.username).toEqual("nicolauflameu");

});

test('should return a deleted user message', async () => {
    const response = await axios.delete('http://localhost:3000/users/d9a996ea-6886-4027-8ec9-bf0ff3112746');
    const mockedReturn = {
        "status": 200,
        "details": "User deleted successfully"
    }
    expect(response.data).toEqual(mockedReturn);
});

test('should return a user updated', async () => {
    const input = {
        "name": "Luiz Ramos Martins Agra Gomes Tavares",
        "username": "corujeiro"
    };
    const response = await axios.put('http://localhost:3000/users/d9a996ea-6886-4027-8ec9-bf0ff3112746', input);
    const output = response.data;  

    expect(output.status).toEqual(200);
    expect(output.details).toEqual("User updated successfully");
    expect(output.data.id).toEqual('d9a996ea-6886-4027-8ec9-bf0ff3112746');
    expect(output.data.name).toEqual("Luiz Ramos Martins Agra Gomes Tavares");
    expect(output.data.username).toEqual("corujeiro");

}); 

test('should return the username updated', async () => {
    const input = {
        "username": "corujeiro"
    };
    const response = await axios.patch('http://localhost:3000/users/d9a996ea-6886-4027-8ec9-bf0ff3112746', input);
    const output = response.data;  

    /*
    const mockedUser = {
        'id': 'd9a996ea-6886-4027-8ec9-bf0ff3112746',
        'name': "Donald Trump Junior",
        'username': "corujeiro"
    }
    */

    expect(output.status).toEqual(200);
    expect(output.details).toEqual("username updated successfully");
    expect(output.data.id).toEqual('d9a996ea-6886-4027-8ec9-bf0ff3112746');
    expect(output.data.username).toEqual('corujeiro');


});
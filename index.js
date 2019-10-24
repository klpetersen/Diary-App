document.addEventListener('DOMContentLoaded', function(event){

    const loginForm = document.getElementById('login-form');
    const loginInput = document.getElementById('user-name');
    const homePage = document.getElementById('home-page')

    loginForm.addEventListener('submit', function(event){ 
        event.preventDefault(); 
        fetch('http://localhost:3000/users')
            .then(resp => resp.json())
            .then(json => findUser(json))
    })

    function findUser(dataObj){ 
        let user = dataObj.data.find(user => user.attributes.username === loginInput.value)
        if(user) { 
            renderShowPage(user)
        }
        else { 
            // let newUser = dataObj.data.
            createUser(loginInput.value)
        }
    }

    function renderShowPage(user){ 
        console.log('User Found!')
        let atr = user.attributes 
        homePage.innerHTML = ''
        homePage.innerHTML = 
        `<div id='show-page'> 
            <h4>Hello, ${atr.username}!</h4>
        </div>`
    }

    function createUser(value){ 
        console.log('No user found')
        console.log(value)
        fetch(`http://localhost:3000/users`, { 
            method: 'POST', 
            headers: { 
                "Content-Type": "application/json", 
                Accept: "application/json"
            }, 
            body: JSON.stringify({ 
                username: value
            })
        })
        alert("You created a new account!")
    }







})
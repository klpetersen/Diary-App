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
            createUser(loginInput.value)
        }
    }

    function renderShowPage(user){ 
        console.log('User Found!')
        homePage.innerHTML = ''
        homePage.innerHTML = 
        `<div id='show-page'> 
            <section id='box-container> 
                <div id='new-post'>
                    <form id='new-post-form'>
                        <h3>Title</h3>
                        <input type="text" id="post-title" placeholder="Enter Title"> 
                        <h3>Content</h3>
                        <textarea id="post-entry" rows="10" cols="40" placeholder="How are you feeling today?"></textarea><br>
                        <button type="submit" id="post-submit-btn">Submit</button>
                    </form>
                </div>
                <div id='show-posts-container'>
                    <h2>All Posts</h2> 
                    <div id='each-post'> 
                    </div> 
                </div>
            </section>     
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
document.addEventListener('DOMContentLoaded', function(event){

    const loginForm = document.getElementById('login-form');
    const loginInput = document.getElementById('user-name');
    const homePage = document.getElementById('home-page');
    const postForm = document.getElementById('post-form'); 
    const loginSubmit = document.getElementById('submit-btn');

    loginSubmit.addEventListener('click', function(event){ 
        event.preventDefault(); 
        fetch('http://localhost:3000/users')
            .then(resp => resp.json())
            .then(json => findUser(json))
    })
    

    function findUser(dataObj){ 
        console.log(dataObj)
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
                    <div id='post-form'>
                        <h3>Title</h3>
                        <input type="text" id="post-title" placeholder="Enter Title"> 
                        <h3>Content</h3>
                        <textarea id="post-entry" rows="10" cols="40" placeholder="How are you feeling today?"></textarea><br>
                        <button data-id="${user.id}" id="post-submit-btn">Submit</button>
                    </div>
                </div>
                <div id='show-posts-container'>
                    <h2>All Posts</h2> 
                </div>
            </section>     
        </div>`

        renderExistingPosts(user.id);

        const formButton = document.getElementById('post-submit-btn');
        
        formButton.addEventListener('click', (event) => {
            event.preventDefault();
            let titleValue = document.getElementById('post-title').value;
            let contentValue = document.getElementById('post-entry').value;
            let dataUserId = document.getElementById('post-submit-btn').dataset.id
            createPost(titleValue, contentValue, dataUserId)
        })
    }

    function renderExistingPosts(id) {
        // fetch(`http://localhost:3000/posts/`, { 
        //         method: 'POST', 
        //         headers: { 
        //             "Content-Type": "application/json", 
        //             Accept: "application/json"
        //         }, 
        //         body: JSON.stringify({ 
        //             title: titleValue, 
        //             content: contentValue
        //         })
        //     }).then(resp => resp.json()).then(json => console.log(json))
    }


    function createPost(title, content, id) {
        fetch(`http://localhost:3000/posts`, { 
            method: 'POST', 
            headers: { 
                "Content-Type": "application/json", 
                Accept: "application/json"
            }, 
            body: JSON.stringify({ 
                title: title,
                content: content,
                user_id: id 
            })
        })
        alert("You created a new post!");
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


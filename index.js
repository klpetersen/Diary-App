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
            <h1>${user.attributes.username}'s Feelings</h1>
            <section id='box-container> 
                <div id='new-post'>
                    <div id='post-form'>
                        <h3>Title</h3>
                        <input type="text" id="post-title" placeholder="Enter Title"> 
                        <h3>Content</h3>
                        <textarea id="post-entry" rows="9" cols="40" placeholder="How are you feeling today?"></textarea><br>
                        <button data-id="${user.id}" id="post-submit-btn">Submit</button>
                    </div>
                </div>
                <div id='show-posts-container'>
                    <div>
                        <h2 >All Muh Feelins'</h2>
                    </div>
                </div>
            </section>     
        </div>`

        fetchAllPosts(user.id);

        const formButton = document.getElementById('post-submit-btn');
        
        formButton.addEventListener('click', (event) => {
            event.preventDefault();
            let titleValue = document.getElementById('post-title').value;
            let contentValue = document.getElementById('post-entry').value;
            let dataUserId = document.getElementById('post-submit-btn').dataset.id
            createPost(titleValue, contentValue, dataUserId) 
        })
    }

    function fetchAllPosts(id) {
        fetch(`http://localhost:3000/posts/`)
        .then(resp => resp.json())
        .then(json => iterateData(json, id))
    }

    function iterateData(posts, id) { 
        for(let i = 0; i < posts.data.length; i++){
            let atr = posts.data[i].attributes
            let post_user_id = posts.data[i].attributes.user_id
            if(post_user_id == id){
                showCard(atr)
            }
        }
    }

    function showCard(post){ 
       const showPostsContainer = document.getElementById('show-posts-container')
       showPostsContainer.innerHTML += 
       `<div class='each-post'> 
            <p id='post-header'>${post.title}</p> 
            <p >${post.content}</p> 
       <div> `
    }


    function createPost(title, content, id) {
        document.getElementById('post-title').value = '';
        document.getElementById('post-entry').value = '';
        let newPost = {title, content, id};
        showCard(newPost);
        
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
    }

    function createUser(value){ 
        console.log('No user found')
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
    }     
})


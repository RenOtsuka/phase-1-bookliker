function fetchBooks(){
    fetch(`http://localhost:3000/books`)
    .then(resp => resp.json())
    .then(obj => loadBooks(obj));
}

function loadBooks(bookObj){

    const ulList = document.getElementById('list');
    ulList.textContent = '';

    for(let key in bookObj){
        const liBook = document.createElement('li');
        liBook.id = bookObj[key]['title'];
        liBook.textContent = bookObj[key]['title'];
        ulList.appendChild(liBook);
        
        liBook.addEventListener('click', () => showBookDetails(bookObj[key]));
    }
}

function showBookDetails(book){
    //console.log(book);
    const divShow = document.getElementById('show-panel');
    divShow.textContent = '';

    const img = document.createElement('img');
    img.setAttribute('src', book['img_url']);

    const bookTitle = document.createElement('h4');
    bookTitle.textContent = book['title'];
    bookTitle.id = 'title';

    const bookSubTitle = document.createElement('h4');
    bookSubTitle.textContent = book['subtitle'];
    bookSubTitle.id = 'subtitle';

    const bookAuthor = document.createElement('h4');
    bookAuthor.textContent = book['author'];
    bookAuthor.id = 'author';

    const desc = document.createElement('p');
    desc.textContent = book['description'];
    desc.id = 'description';

    divShow.appendChild(img);
    divShow.appendChild(bookTitle);
    divShow.appendChild(bookSubTitle);
    divShow.appendChild(bookAuthor);
    divShow.appendChild(desc);

    const ul = document.createElement('ul');
    ul.id = 'list-of-users';
    for(let user of book['users']){
        const liUser = document.createElement('li');
        liUser.textContent = user['username'];
        liUser.id = user['id'];
        liUser.setAttribute('name',user['username']);
        ul.appendChild(liUser);
        divShow.appendChild(ul);
    }
    
    const likeBtn = document.createElement('button');
    likeBtn.textContent = 'LIKE';
    divShow.appendChild(likeBtn);
    
    likeBtn.addEventListener('click', () => updateUsers(book, book['users']));

}


function updateUsers(book, userArr){

    userArr.push({"id": 1, "username": "pouros"});
    //console.log(userArr);
    
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            users: userArr
        })
    })
    .then(resp => resp.json())
    .then(() => showBookDetails(book));
    
}



document.addEventListener("DOMContentLoaded", function() {
    fetchBooks();
});

function Book(name, author, date, isRead){
  this.name = name;
  this.author = author;
  this.date = date;
  this.isRead = isRead;
}
let transferValue;
let totalBooks = 0;
const lotr = new Book('Lord of The Rings', 'J.R.R Tolkein', '1954', 'READ')
const martian = new Book('The Martian', 'Andy Weir', '2011', 'NOT READ');
let myLibrary = [lotr, martian];
const readCheck = () => {
  if(document.getElementById("read-book").checked)
  {return 'READ'
}else{
  return 'NOT READ'
}
}
const render = (array = myLibrary) => {
  totalBooks = 0;
  document.getElementById('library').innerHTML = '';
    array.forEach(book => {
   document.getElementById('library').innerHTML += `<div class="book">
   <h1>${book.name}</h1>
   <p>${book.author}</p>
   <p>${book.date}</p>
   <p>${book.isRead} </p><div id ='button-area'>
   <button class='delete-button' onclick='deleteButton(this.id)' id='${totalBooks}'></button>
   <button class='edit-button' onclick='openEdit(this.id)' id='${totalBooks}'></button></div></div>`;
   totalBooks++;
   document.getElementById('add-button').disabled = false;
    })
}
const addBook = () => {
  myLibrary.push(new Book(document.getElementById('name-of-book').value, document.getElementById('author-of-book').value, document.getElementById('date-of-book').value, readCheck()))

  disappear();
}
const disappear = () => {
  document.getElementById('add-form').classList = 'slide-top'
  setTimeout(function(){document.getElementById('add-form').classList = ''; document.getElementById('add-form').style.display = 'none';},500);
  render();
  
}
const appear = () => {
  disableAll()
  document.getElementById('name-of-book').value = '' 
  document.getElementById('author-of-book').value = ''
  document.getElementById('date-of-book').value = ''
  document.getElementById('read-book').checked = false;

  document.getElementById('add-form').style.display = 'block';
  document.getElementById('add-form').classList = 'slide-bottom';
  setTimeout(function(){document.getElementById('add-form').classList = ''},500);
}
const deleteButton = (clicked_val) => {
  if(document.getElementsByClassName('delete-button')[0].style.diabled == true){console.log('disabled')}else{console.log('not')}
  myLibrary.splice(clicked_val, 1);
  render()
}
const disableButtons = (blocked) => {
  const elms = document.getElementsByClassName(blocked);
  const n = elms.length;
    for(var i = 0; i < n; i ++) {
        elms[i].disabled = true;
    }
}
const disableAll = () =>{
  disableButtons('delete-button');
  disableButtons('edit-button');
  document.getElementById('add-button').disabled = true;
}
const openEdit = (clicked_val) => {
  appear();
  disableAll();
  document.getElementById('name-of-book').value = myLibrary[clicked_val].name;
  document.getElementById('author-of-book').value = myLibrary[clicked_val].author;
  document.getElementById('date-of-book').value = myLibrary[clicked_val].date;
  console.log(myLibrary[clicked_val].isRead);
  if(myLibrary[clicked_val].isRead== 'READ'){document.getElementById('read-book').checked = true;}else{document.getElementById('read-book').checked = false;}
  document.getElementById('form-button').innerHTML = 'Save'
  document.getElementById('form-button').setAttribute( "onClick", "javascript: edit();" );
  transferValue = clicked_val;
}
const edit = (clicked_val) => {
  clicked_val = transferValue;
  myLibrary[clicked_val].name = document.getElementById('name-of-book').value;
  myLibrary[clicked_val].author = document.getElementById('author-of-book').value;
  myLibrary[clicked_val].date = document.getElementById('date-of-book').value;
  myLibrary[clicked_val].isRead = readCheck();
  disappear();
  setTimeout(function(){
    document.getElementById('form-button').innerHTML = 'Add'
  document.getElementById('form-button').setAttribute( "onClick", "javascript: addBook();" );
  },500)
}
const filter = (type) => {
  let filtered;
  const elems = document.querySelectorAll(".filtered");

  [].forEach.call(elems, (el) => {
    el.classList.remove("filtered");
  });
  if(type == 'read'){
    filtered = myLibrary.filter(book => book.isRead == 'READ')
    document.getElementById('read').classList = 'filtered'
  }else if(type == 'unread'){
    filtered = myLibrary.filter(book => book.isRead == 'NOT READ')
    document.getElementById('unread').classList = 'filtered'
  }else{
    filtered = myLibrary;
    document.getElementById('all').classList = 'filtered'
  }
  render(filtered);
}
render();
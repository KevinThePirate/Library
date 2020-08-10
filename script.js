function Book(name, author, date, isRead){
  this.name = name;
  this.author = author;
  this.date = date;
  this.isRead = isRead;
}
let transferValue;
let totalBooks = 0;
let lotr = new Book('Lord of The Rings', 'J.R.R Tolkein', '1954', 'READ')
let myLibrary = [lotr];
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
   <h3>${book.author}</h3>
   <h4>${book.date}</h4>
   <h5>${book.isRead} </h5><div id ='button-area'>
   <div class='delete-button' onclick='deleteButton(this.id)' id='${totalBooks}'></div>
   <div class='edit-button' onclick='openEdit(this.id)' id='${totalBooks}'></div></div></div>`;
   totalBooks++;
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
  document.getElementById('name-of-book').value = '' 
  document.getElementById('author-of-book').value = ''
  document.getElementById('date-of-book').value = ''

  document.getElementById('add-form').style.display = 'block';
  document.getElementById('add-form').classList = 'slide-bottom';
  setTimeout(function(){document.getElementById('add-form').classList = ''},500);
}
const deleteButton = (clicked_val) => {
  myLibrary.splice(clicked_val, 1);
  render()
}
const openEdit = (clicked_val) => {
  //document.getElementById('switch-button').innerHTML = '<button id="form-button" onclick="edit(this.id)">Edit</button>';
  appear();
  document.getElementById('name-of-book').value = myLibrary[clicked_val].name;
  document.getElementById('author-of-book').value = myLibrary[clicked_val].author;
  document.getElementById('date-of-book').value = myLibrary[clicked_val].date;
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
  document.getElementById('form-button').innerHTML = 'Add'
  document.getElementById('form-button').setAttribute( "onClick", "javascript: addBook();" );
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

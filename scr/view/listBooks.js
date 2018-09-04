// Handle data management context and UI for 'list books' operation
lib.view.listBooks ={
    setupUserInterface: ()=>{
        const tableBodyEl = document.querySelector('table#books>tbody');
        let keys = [];
        let key = '';
        let row = {};
        
        // load all book objects
        Book.loadAll();
        keys = Object.keys(Book.instances);

        // for each book, create a table row with cells for the three attributes
         for(let i = 0; i < keys.length; i++){
             key = key[i];
            row = tableBodyEl.insertRow();
            row.insertCell(-1).textContent = Book.instances[key].isbn;
            row.insertCell(-1).textContent = Book.instances[key].title;
            row.insertCell(-1).textContent = Book.instances[key].year; 
            console.log(row);
         }
    }
};

lib.view.updateBook = {
    setupUserInterface: ()=>{
        const formEl = document.forms.Book;
        const saveButton = formEl.commit;
        const selectBookEl = formEl.selectBook;
        let key = '';
        let keys = [];
        let book = null;
        let optionEl = null;

        // load all book objects
        Book.loadAll();

        // populate the selection list with books
        keys = Object.keys(Book.instances);
        for(key of keys){
            book = Book.instances[key];
            optionEl = document.createElement('option');
            optionEl.text = book.title;
            optionEl.value = book.isbn;
            selectBookEl.add(optionEl, null);
        }
        
        // when a book is selected, populate the form with the book data
        selectBookEl.addEventListener('change', ()=>{
             book =null,
             key = selectBookEl.value;
             if(key){
                 book = Book.instances[key];
                 formEl.isbn.value = book.isbn;
                 formEl.title.value = book.title;
                 formEl.year.value = book.year;
             } else{
                 formEl.reset();
             }
        });

        saveButton.addEventListener('click', lib.view.updateBook.handleUpdateBtnClkEvent);
        window.addEventListener('beforeunload', () => {
            Book.saveAll();
        });
    },
    
    handleUpdateBtnClkEvent: () => {
        const formEl = document.forms.Book;
        const slots = {
            isbn: formEl.isbn.value,
            title: formEl.title.value,
            year: formEl.year.value
        };

        Book.update(slots);
        formEl.reset();
    }
};
 
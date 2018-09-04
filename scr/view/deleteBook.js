lib.view.deleteBook = {
    setupUserInterface: () => {
        const deleteButton  = document.forms.Book.commit;
        const selectEl = document.forms.Book.selectBook;
        let key = '';
        let keys = [];
        let book = null;
        let optionEl = null;

        // load all book objects
        Book.loadAll();
        keys = Object.keys(Book.instances);

        // populate the list of books
        for(key of keys){
            book = Book.instances[key];
            optionEl = document.createElement('option');
            optionEl.text = book.title;
            optionEl.value = book.isbn;
            selectEl.add(optionEl, null);
        }
        deleteButton.addEventListener('click', lib.view.deleteBook.handleDeleteBtnClkEvent);
        window.addEventListener('beforeunload', () => {
            Book.saveAll();
        });
    },

    handleDeleteBtnClkEvent: () => {
        const selectEl = document.forms.Book.selectBook;
        const isbn = selectEl.value;

        if(isbn){
            Book.destroy(isbn);
            selectEl.remove(selectEl.selectedIndex);
        }
    }
};
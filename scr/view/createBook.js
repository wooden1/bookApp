lib.view.createBook = {
    setupUserInterface: ()=> {
        const saveButton = document.forms.Book.commit;
        
        // Load all book objects
        Book.loadAll();
        // Set event handler for save/submit button
        saveButton.addEventListener('click', lib.view.createBook.handleSaveBtnClkEvent);
        window.addEventListener('beforeunload', ()=> Book.saveAll());
    },
    // Save user input data from form fields
    handleSaveBtnClkEvent: () =>{
        const formEl = document.forms.Book;
        const slots = {
            isbn: formEl.isbn.value,
            title: formEl.title.value,
            year: formEl.year.value
        };
        Book.add(slots);
        formEl.reset();
    }
};
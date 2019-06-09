class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        view.on('add', this.addBook.bind(this));
        view.on('edit', this.editBook.bind(this));
        view.on('remove', this.removeBook.bind(this));
		view.on('search', this.searchBook.bind(this));

        view.show(model.items);
    }

    addBook(data) {
		const title = data.valueName;
		const author = data.valueAuthor;
		
        const item = this.model.addItem({
            id: Date.now(),
            title,
			author
        });

        this.view.addItem(item);
    }

    editBook({ id, title, author }) {
		
		const item = this.model.updateItem(id, { title, author });
        this.view.editItem(item);
    }

    removeBook(id) {
        this.model.removeItem(id);
        this.view.removeItem(id);
    }
	
	searchBook(search) {
		const books=[];
		this.model.items.forEach(function(item) {
			if(item.title.indexOf(search)===0){
				books.push(item);
			}
		});
		this.view.clear();
		this.view.show(books);
    }
}

export default Controller;
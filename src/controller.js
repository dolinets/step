class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        view.on('add', this.addBook.bind(this));
        view.on('edit', this.editBook.bind(this));
        view.on('remove', this.removeBook.bind(this));

        view.show(model.items);
    }

    addBook(data) {
		console.log(data);
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
}

export default Controller;
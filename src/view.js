import { EventEmitter, createElement } from './helpers';

class View extends EventEmitter {
    constructor() {
        super();

        this.form = document.getElementById('book-form');
        this.input = document.getElementById('add-input');
		this.inputAddAuthor = document.getElementById('add-input-author');
        this.list = document.getElementById('book-list');
        this.form.addEventListener('submit', this.handleAdd.bind(this));
    }

    createListItem(book) {
        const labelName = createElement('label', { className: 'title' }, book.title);
		const labelAuthor = createElement('label', { className: 'author' }, book.author);
        const editInputName = createElement('input', { type: 'text', className: 'field-name' });
		const editInputAuthor = createElement('input', { type: 'text', className: 'field-author' });
        const editButton = createElement('button', { className: 'edit' }, 'Изменить');
        const deleteButton = createElement('button', { className: 'remove' }, 'Удалить');
        const item = createElement('li', { className: 'book-item', 'data-id': book.id }, labelName, editInputName, editButton, deleteButton, labelAuthor, editInputAuthor);

        return this.addEventListeners(item);
    }

    addEventListeners(item) {
        const editButton = item.querySelector('button.edit');
        const removeButton = item.querySelector('button.remove');

        editButton.addEventListener('click', this.handleEdit.bind(this));
        removeButton.addEventListener('click', this.handleRemove.bind(this));

        return item;
    }

    findListItem(id) {
        return this.list.querySelector(`[data-id="${id}"]`);
    }

    handleAdd(event) {
        event.preventDefault();

        if (!this.input.value) return alert('Необходимо ввести название книги.');

        const valueName = this.input.value;
		const valueAuthor = this.inputAddAuthor.value;

        this.emit('add', {valueName, valueAuthor});
    }

    handleEdit({ target }) {
        const listItem = target.parentNode;
        const id = listItem.getAttribute('data-id');
        const labelName = listItem.querySelector('.title');
		const labelAuthor = listItem.querySelector('.author');
        const inputName = listItem.querySelector('.field-name');
		const inputAuthor = listItem.querySelector('.field-author');
        const editButton = listItem.querySelector('button.edit');
        const title = inputName.value;
		const author = inputAuthor.value;
        const isEditing = listItem.classList.contains('editing');

        if (isEditing) {
            this.emit('edit', { id, title, author });
        } else {
            inputName.value = labelName.textContent;
			inputAuthor.value = labelAuthor.textContent;
            editButton.textContent = 'Сохранить';
            listItem.classList.add('editing');
        }
    }

    handleRemove({ target }) {
        const listItem = target.parentNode;

        this.emit('remove', listItem.getAttribute('data-id'));
    }

    show(books) {
        books.forEach(book => {
            const listItem = this.createListItem(book);
			this.input.value = '';
			this.inputAddAuthor.value = '';
            this.list.appendChild(listItem);
        });
    }

    addItem(book) {
		if(book.author === undefined){
			book.author ='';	
		}
		this.input.value = '';
		this.inputAddAuthor.value = '';
		
		const listItem = this.createListItem(book);			
        this.list.appendChild(listItem);
    }


    editItem(book) {
        const listItem = this.findListItem(book.id);
        const labelName = listItem.querySelector('.title');
        const inputName = listItem.querySelector('.field-name');
		const labelAuthor = listItem.querySelector('.author');
        const inputAuthor = listItem.querySelector('.field-author');
        const editButton = listItem.querySelector('button.edit');

        labelName.textContent = book.title;
		labelAuthor.textContent = book.author;
        editButton.textContent = 'Изменить';
        listItem.classList.remove('editing');
    }

    removeItem(id) {
        const listItem = this.findListItem(id);

        this.list.removeChild(listItem);
    }
}

export default View;
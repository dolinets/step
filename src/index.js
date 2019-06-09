import Model from './model';
import View from './view';
import Controller from './controller';
import { save, load } from './helpers';

const books = load();

const model = new Model(books || undefined);
model.on('change', books => save(books));

const view = new View();
const controller = new Controller(model, view);
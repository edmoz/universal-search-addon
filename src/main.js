import app from 'ampersand-app';
import IndexView from './views/index_view';
import './styles/main.scss';

console.time('start');

app.extend({
  init () {
    this.indexView = new IndexView();

    // Attach main view to the dom
    document.body.appendChild(this.indexView.render().el);

    console.timeEnd('start');
  }
});

app.init();

// expose `app` to browser console
window.app = app;

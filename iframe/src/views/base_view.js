import AmpersandView from 'ampersand-view';

export default AmpersandView.extend({
  render () {
    AmpersandView.prototype.render.apply(this, arguments);

    this.afterRender();
  },

  // Implement this in submodules
  afterRender () {}
});

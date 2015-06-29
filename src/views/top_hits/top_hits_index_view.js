import BaseView from '../base_view';
import TopHitsIndexTemplate from '../../templates/top_hits/index.html';
import ActivityItemView from '../activity/activity_item_view';
import ActivityResults from '../../collections/activity_results';
import activityResultsAdapter from '../../adapters/activity_results_adapter';

export default BaseView.extend({
  template: TopHitsIndexTemplate,

  initialize () {
    this.results = activityResultsAdapter.results;

    this.listenTo(this.results, 'reset', this.render);
  },

  afterRender () {
    // TODO: replace this with proper top hits dispatching
    this.renderCollection(new ActivityResults([this.results.at(0)]), ActivityItemView, '.top-hits-results');
  }
});

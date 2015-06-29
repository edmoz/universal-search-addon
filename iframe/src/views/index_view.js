import BaseView from './base_view';
import TopHitsIndexView from './top_hits/top_hits_index_view';
import NavigationalSearchSuggestionsIndex from './navigational_suggestions/navigational_suggestions_index_view';
import SearchSuggestionsIndexView from './search_suggestions/search_suggestions_index_view';
import ActivityIndexView from './activity/activity_index_view';
import IndexTemplate from '../templates/index.html';

export default BaseView.extend({
  template: IndexTemplate,

  afterRender () {
    this.renderSubview(new TopHitsIndexView(), '.top-hits-index');
    // this.renderSubview(new NavigationalSearchSuggestionsIndex(), '.navigational-suggestions-index');
    this.renderSubview(new SearchSuggestionsIndexView(), '.search-suggestions-index');
    this.renderSubview(new ActivityIndexView(), '.activity-index');
  }
});

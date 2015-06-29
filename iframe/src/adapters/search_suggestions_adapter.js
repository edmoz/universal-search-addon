import _c from 'lodash/collection';
import SearchSuggestions from '../collections/search_suggestions';

class SearchSuggestionsAdapter {
  constructor () {
    this.remoteSuggestions = new SearchSuggestions();
    this.localSuggestions = new SearchSuggestions();
    this.searchTerm = '';

    this.listenForEvents();
  }

  listenForEvents () {
    window.addEventListener('WebChannelMessageToContent', this.messageReceived.bind(this));
  }

  messageReceived (e) {
    const message = e.detail.message;

    if (message && message.type == 'suggested-search-results' && message.data && message.data.results) {
      this.searchTerm = message.data.results.term;
      this.remoteSuggestions.reset(_c.collect(message.data.results.remote, function (t) { return { term: t } }));
      this.localSuggestions.reset(_c.collect(message.data.results.local, function (t) { return { term: t } }));
    }
  }
}

// Export singleton
export default new SearchSuggestionsAdapter();

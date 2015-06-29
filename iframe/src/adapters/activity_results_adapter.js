import ActivityResults from '../collections/activity_results';

class ActivityResultsAdapter {
  constructor () {
    this.results = new ActivityResults();

    this.listenForEvents();
  }

  listenForEvents () {
    window.addEventListener('WebChannelMessageToContent', this.messageReceived.bind(this));
  }

  messageReceived (e) {
    const message = e.detail.message;

    if (message && message.type == 'autocomplete-search-results' && message.data) {
      this.results.reset(message.data);
    }
  }
}

// Export singleton
export default new ActivityResultsAdapter();

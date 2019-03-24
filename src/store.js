import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    results: []
  },
  getters: {
    results(state) {
      return state.results.map(item => {
        item.url = 'https://ru.wikipedia.org/wiki/' + item.title;
        return item;
      })
    }
  },
  mutations: {
    set(state, {type, items}) {
      state[type] = items;
    }
  },
  actions: {
    search: function ({commit}, query) {
      const url = 'https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + query + '=&format=json';
      const res = fetch(url, { method: "GET", mode: "cors" })
        .then(function onFulfilled(res) {
        return res.json();
      }).catch(error => console.log(error));

      const results = res.query.search;
      commit('set', { type: 'results', items: results });
    }
  }
});

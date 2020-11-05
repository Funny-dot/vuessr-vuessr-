import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

const fetchBar = function() {
  return new Promise((resolve, reject) => {
    axios.get('http://farm.test.farmkd.com/index.php/app/getStoreGoodsList?page=1&limit=10&pid=1')
        .then((res) => {
          if (res.data.errorCode==0) {
            let html='';
            let dadas=res.data.data;
            // for (var i=0;i<dadas.length;i++){
            //   html +="<span>"+dadas[i].id+"</span>";
            // }
            resolve(dadas);
          }
        })

  });
};

export function createStore(){
  const store = new Vuex.Store({
    state: {
      bar: ''
    },

    mutations: {
      'SET_BAR'(state, data) {
        state.bar = data;
      }
    },

    actions: {
      fetchBar({ commit }) {
        return fetchBar().then((data) => {
          commit('SET_BAR', data);
        }).catch((err) => {
          console.error(err);
        })
      }
    }
  });

  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    console.log('window.__INITIAL_STATE__', window.__INITIAL_STATE__);
    store.replaceState(window.__INITIAL_STATE__);
  }

  return store;
}

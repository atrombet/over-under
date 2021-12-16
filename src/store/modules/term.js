import { ACTIONS, MUTATIONS } from '@/resources';

const state = {
  terms: [],
  lastUsedId: 0
};

const getters = {
  allTerms: state => state.terms
};

const actions = {
  [ACTIONS.CREATE_NEW_TERM]: ({ commit }, term) => {
    commit(MUTATIONS.ADD_TERM, { term, count: 0, overUnder: 0 });
  },
  [ACTIONS.DELETE_TERM]: ({ commit }, id) => {
    commit(MUTATIONS.DELETE_TERM, id);
  },
  [ACTIONS.INCREMENT]: ({ commit, state }, id) => {
    const term = { ...state.terms.find(t => t.id === id) };
    term.count++;
    commit(MUTATIONS.UPDATE_TERM, term);
  },
  [ACTIONS.DECREMENT]: ({ commit, state }, id) => {
    const term = { ...state.terms.find(t => t.id === id) };
    term.count--;
    commit(MUTATIONS.UPDATE_TERM, term);
  },
  [ACTIONS.SET_OVER_UNDER]: ({ commit, state }, { id, overUnder }) => {
    const term = { ...state.terms.find(t => t.id === id) };
    term.overUnder = overUnder;
    commit(MUTATIONS.UPDATE_TERM, term);
  }
};

const mutations = {
  [MUTATIONS.ADD_TERM]: (state, term) => {
    state.terms = [...state.terms, { ...term, id: state.lastUsedId + 1 }];
    state.lastUsedId += 1;
  },
  [MUTATIONS.DELETE_TERM]: (state, id) => {
    const index = state.terms.findIndex(t => t.id === id);
    state.terms.splice(index, 1);
  },
  [MUTATIONS.UPDATE_TERM]: (state, term) => {
    const index = state.terms.findIndex(t => t.id === term.id);
    state.terms[index] = term;
  }
};

export const term = {
  state,
  getters,
  actions,
  mutations
};

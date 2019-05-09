import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        output: {
            id: null,
            items: []
        },
        currentItem: {
            id: null,
            answer: null
        }
    },
    getters: {
        output: state => state.output,
        currentItem: state => state.currentItem
    },
    mutations: {
        addItem(state) {
            state.output.items.push(state.currentItem)
            state.currentItem = {
                id: null,
                answer: null
            }
        },
        removeItem(state) {
            state.output.items.pop()
        },
        setFormId(state, id) {
            state.output.id = id
        },
        setInputItem(state, {
            id = null,
            answer = null
        }) {
            state.currentItem.id = id
            state.currentItem.answer = answer
        }
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
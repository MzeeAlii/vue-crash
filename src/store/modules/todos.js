import axios from 'axios';

const state = {
    todos: [
        { id: 1, title: 'Todo One', completed: false },
        { id: 2, title: 'Todo Two', completed: false },
        { id: 3, title: 'Todo Three', completed: true },
        { id: 4, title: 'Todo Four', completed: false },
    ]
};

const getters = {
    allTodos: (state) => state.todos,
};

const actions = {
    async fetchTodos({ commit }) {
        axios
            .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
            .then((response) => {
                // console.log('data: ' + response.data.size);
                // this.todos = response.data;
                commit('setTodos', response.data);
            })
            .catch((e) => console.log(e));
    },

    async addTodo({ commit }, title) {
        axios
            .post("https://jsonplaceholder.typicode.com/todos", {
                title: title,
                completed: false,
            })
            .then((response) => commit('newTodo', response.data)) /* (this.todos = [...this.todos, response.data])) */
            .catch((e) => console.log(e));
    },

    async deleteTodo({ commit }, id) {
        axios
            .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then((response) => {
                console.log('Todo deleted: ' + response.data);
                // this.todos = this.todos.filter((todo) => todo.id !== id);
                commit('removeTodo', id);
            })
            .catch((e) => console.log(e));
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    // newTodo: (state, todo) => (state.todos = [...state.todos, todo]),
    // newTodo: (state, todo) => (state.todos.push(todo),
    newTodo: (state, todo) => {
        console.log('Todo added: ' + todo);
        state.todos.unshift(todo);
    },
    removeTodo: (state, deletedId) => state.todos = state.todos.filter((todo) => todo.id != deletedId)
};

export default {
    // namespaced: true,
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
}
import { ref } from 'vue'
import axios from "axios";
import { useRouter } from 'vue-router';

export default function useToDos() {
    const todos = ref([])
    const todo = ref([])
    const router = useRouter()
    const errors = ref('')

    const getToDos = async () => {
        let response = await axios.get('/api/todos')
        todos.value = response.data.data;
    }

    const getToDo = async (id) => {
        let response = await axios.get('/api/todos/' + id)
        todo.value = response.data.data;
    }

    const storeToDo = async (data) => {
        errors.value = ''
        console.log(data);
        try {
            await axios.post('/api/todos/', data)
            await router.push({name: 'todos.index'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const updateToDo = async (id) => {
        errors.value = ''
        try {
            await axios.put('/api/todos/' + id, todo.value)
            await router.push({name: 'todos.index'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const completeToDo = async (id) => {
        errors.value = ''
        try {
            await axios.put('/api/complete/' + id, todo.value)
            await router.push({name: 'todos.index'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const destroyToDo = async (id) => {
        await axios.delete('/api/todos/' + id)
    }


    return {
        todos,
        todo,
        errors,
        getToDos,
        getToDo,
        storeToDo,
        updateToDo,
        completeToDo,
        destroyToDo
    }
}

<template>
    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md">
        <div class="flex place-content-end mb-4">
            <div class="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md cursor-pointer">
                <router-link :to="{ name: 'todos.create' }" class="text-sm font-medium">Create To Do</router-link>
            </div>
        </div>

        <table class="min-w-full border divide-y divide-gray-200">
            <thead>
                <tr>
                    <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">To Do Items</span>
                    </th>
                    <!--
                    <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Status</span>
                    </th>
                    -->
                    <th class="px-6 py-3 bg-gray-50">
                    </th>
                </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                <template v-for="item in todos" :key="item.id">
                    <tr class="bg-white">

                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap" :class="[item.status==1 ? 'line-through' : '']">
                            {{ item.description }}
                        </td>
                        <!--
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ item.status == 1 ? 'complete' : 'pending' }}
                        </td>
                        -->
                        <td class="text-right px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            <button @click="doneToDo(item.id)"
                                    class="inline-flex items-center mr-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
                                Complete
                            </button>
                            <router-link :to="{ name: 'todos.edit', params: { id: item.id } }"
                                         class="mr-2 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
                                Edit
                            </router-link>
                            <button @click="deleteToDo(item.id)"
                                    class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
                                Delete
                            </button>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import useToDos from "@/composables/todos";
import { onMounted } from "vue";

const { todos, getToDos, destroyToDo, completeToDo } = useToDos()
onMounted(getToDos)
const deleteToDo = async (id) => {
    if (!window.confirm('Are you sure?')) {
        return
    }
    await destroyToDo(id);
    await getToDos();
}
const doneToDo = async (id) => {
    await completeToDo(id);
    await getToDos();
}
</script>

import { defineStore } from 'pinia';
import { ref } from "vue";
import { data } from "@/core/data/todo";
export const useTodoStore = defineStore('todo', () => {
    const todo = ref(data);
    function taskcomplete(item) {
        todo.value.find(function (list) {
            if (list.id === item) {
                return list.status = list.status === 'complete' ? 'incomplete' : 'complete';
            }
        });
    }
    function tododelete(index) {
        todo.value.splice(index, 1);
    }
    function addtodo(item) {
        const todoID = [];
        todo.value.forEach((element) => {
            todoID.push(element.id);
        });
        const id = Math.max(...todoID) + 1;
        todo.value.unshift({
            'id': id,
            'title': item.value,
            'priority': "Pending",
            'date': "16 Jan",
            'badgeClass': "badge-light-danger",
            'delete': false,
            'status': 'incomplete'
        });
    }
    return {
        todo,
        taskcomplete,
        tododelete,
        addtodo
    };
});
//# sourceMappingURL=todo.js.map
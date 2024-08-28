<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { format } from 'date-fns'
import DatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

type TodoType = {
  id: number;
  deadline: string;
  text: string;
  checked: boolean;
  color: string;
}

const date = new Date()
const formatted_date = format(date, 'yyyy-MM-dd')

let id = 0
const todos = ref<TodoType[]>([])
const newTodo = ref<string>('')
const selectedDate = ref<string | null>(null)

// クライアントサイドで localStorage からデータを読み込む
onMounted(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
        todos.value = JSON.parse(storedTodos)
    }
})

function addTodo() {
  if (selectedDate.value !== null && newTodo.value.trim() !== '') {
    todos.value.push({
      id: id++,
      deadline: selectedDate.value,
      text: newTodo.value,
      checked: false,
      color: 'black'
    });
    newTodo.value = '';
    selectedDate.value = null;
  } else {
    console.error('Todoが追加されませんでした。日付とテキストを確認してください。');
  }
}


function toggleColor(todo: TodoType) {
    todo.color = todo.color === 'black' ? 'thistle' : 'black'
    todo.checked = !todo.checked
}

function removeTodo(todo: TodoType) {
    todos.value = todos.value.filter((t) => t !== todo)
}

// フィルタリングとソートのロジック
const filterStatus = ref('all')
const filterTodos = (status: string) => {
    filterStatus.value = status
}

const filteredTodos = computed(() => {
    let result = todos.value
    if (filterStatus.value === 'completed') {
        result = result.filter(todo => !todo.checked)
    } else if (filterStatus.value === 'uncompleted') {
        result = result.filter(todo => todo.checked)
    }
    return result
})

// todosの変更を監視し、ローカルストレージに保存します
watch(todos, (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos))
}, { deep: true })
</script>
<template>
    <div>
        <h1>todoリスト</h1>
        <hr />
    </div>
    <form @submit.prevent="addTodo">
      <v-textarea v-model="newTodo" clearable label="やることを入力してね"></v-textarea>
        <DatePicker input v-model="selectedDate" format="yyyy/MM/dd" model-type="yyyy-MM-dd" :style="{ width: '17.5%' }"
            required placeholder="締切日を入力してね" />
      <v-btn prepend-icon="mdi-pencil-circle-outline" variant="outlined" @click="addTodo">
        登録
      </v-btn>
    </form>
    <br>
    <div>
        <button @click="filterTodos('all')">すべて</button>
        <button @click="filterTodos('completed')">未</button>
        <button @click="filterTodos('uncompleted')">済</button>
    </div>
    <table>
        <tr>
            <th>登録時間</th>
            <th>締め切り</th>
            <th>進捗状況</th>
            <th>やること</th>
            <th>削除</th>
        </tr>
        <tr v-for="todo in filteredTodos" :key="todo.id">
            <td>
                {{ formatted_date }}
            </td>
            <td>
                <span v-if="formatted_date >= todo.deadline" :style="{ color: 'red' }">&#x1f525;{{
                    todo.deadline }}</span>
                <span v-else :style="{ color: 'white' }">{{ todo.deadline }}</span>
            </td>
            <td>
                <button :class="{ checked: todo.checked, unchecked: !todo.checked }" @click="toggleColor(todo)">
                    <span v-if="!todo.checked">未</span>
                    <span v-else>済</span>
                </button>
            </td>
            <td>
                <span :style="{ color: todo.color }">
                    &nbsp;{{ todo.text }}&nbsp;
                </span>
            </td>
            <td>
                <button @click="removeTodo(todo)">×</button>
            </td>
        </tr>
    </table>
</template>

<style>
ul {
    list-style: none;
}

.checked {
    background-color: aquamarine;
}

.unchecked {
    background-color: peachpuff;
    ;
}

th {
    color: white;
    background-color: orange;
    width: 200px;
}

td,
th {
    padding: 4px;
}

</style>
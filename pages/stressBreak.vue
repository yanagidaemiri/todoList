<script setup lang="ts">
import { ref } from 'vue'


const counter = ref(0)
const counter2 = ref(0)
const isDialogVisible = ref<boolean>(false)
const dialog = ref<boolean>(false)
const text = ref<string>('')
function trashStress() {
  counter.value++
  isDialogVisible.value = true
}

const closeModal = () => {
  isDialogVisible.value = false
  text.value = ''
}

const confirm = () => {
  dialog.value = false
  const postText = encodeURIComponent(text.value + ' #もやもやリサイクル')
  const xUrl = `https://x.com/intent/post?text=${postText}`
  window.open(xUrl, '_blank')
  counter2.value++
  text.value = ''
}

function cancel() {
  // 「いいえ」がクリックされたときの処理
  dialog.value = false
}
</script>
<template>
  <div>
    <h1>ストレスとさよなら</h1>
    いやなこと、辛いことがあった時、ここに書いてストレスとさよならしちゃおう！
    <hr />
  </div>
  <form @submit.prevent="trashStress">
    <v-textarea clearable v-model="text" required label="いやなことなかった？"></v-textarea>
    <div>
    <v-btn prepend-icon="mdi-delete-empty" variant="outlined" :disabled="!text" @click="trashStress">
      こころのごみ箱
    </v-btn>
      <v-dialog v-model="isDialogVisible" max-width="500px">
        <v-card>
          <v-card-title class="modal-title" color="primary">
            おめでとう！
          </v-card-title>
          <v-card-text class="modal-txt">
            あなたのストレスは無事ごみ箱に捨てられました。
            <img src="/public/gif/stressBurning.gif" alt="ストレスが爆発するアニメーション" />
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="closeModal">閉じる</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div>
    <v-btn prepend-icon="mdi-twitter" variant="outlined" :disabled="!text" @click="dialog = true">
      もやもやリサイクル
    </v-btn>
      <v-dialog v-model="dialog" max-width="400px">
        <v-card>
          <v-card-title>
            確認
          </v-card-title>
          <v-card-text>
            本当にポストしますか？
          </v-card-text>
          <v-card-actions>
            <v-btn color="green darken-1" @click="confirm">はい</v-btn>
            <v-btn color="red darken-1" @click="cancel">いいえ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </form>
  <br>
  <table>
    <tr>
      <th>乗り越えたストレス</th>
      <th>リサイクルしたストレス</th>
    </tr>
    <tr>
      <td>
                <span>
                    &nbsp;{{ counter }}個&nbsp;
                </span>
      </td>
      <td>
                <span>
                    &nbsp;{{ counter2 }}個&nbsp;
                </span>
      </td>
    </tr>
  </table>
</template>

<style>
ul {
  list-style: none;
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

.modal-title {
  font-size: 200%;
}

.modal-txt {
  text-align: center;
}

.modal-txt img {
  width: 400px; /* ここで幅を指定します */
  height: auto; /* 高さを自動調整します */
}
</style>
<script setup lang="ts">
useHead({
    title: "Nuxt App", // titleタグ設定
    link: [
        // GoogleFonts設定
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c",
        },
    ],
});

const counter = useState("counter", () => 0);
</script>
<template>
    <div>
        <h1>Welcome to MyPage</h1>
        <hr />
        <br />
        連打！: {{ counter }}
        <button @click="counter++">+</button>
        <button @click="counter--">-</button>
      <br />
        <img src="/img/OIP.jpg" alt="Discover Nuxt 3" />
    </div>
</template>
<template>
  <div class="contact-form">
    <h2>Связаться с нами</h2>
    <form>
      <input type="text" placeholder="Ваше имя" required />
      <input type="email" placeholder="Email" required />
      <textarea placeholder="Сообщение" required></textarea>
      <button type="submit">Отправить</button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input, textarea {
  padding: 8px;
  width: 100%;
}
</style>


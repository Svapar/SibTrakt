<template>
  <form @submit.prevent="handleLogin" class="login-form">
    <h2>Вход</h2>

    <div class="form-group">
      <label for="username">Имя пользователя</label>
      <input v-model="username" type="username" id="username" required placeholder="Логин"/>
    </div>

    <div class="form-group">
      <label for="password">Пароль</label>
      <input v-model="password" type="password" id="password" required placeholder="Пароль"/>
    </div>

    <button type="submit" class="btn">Войти</button>

    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
  async handleLogin() {
    this.error = '';

    try {
      
      const response = await fetch('http://93.81.235.62:7575/api/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Неверный логин или пароль');
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        this.$emit('login-success');
        console.log("Успешно все!!!!");
      } else {
        throw new Error('Ответ не содержит токена');
      }

    } catch (err) {
      if (err.message === 'Failed to fetch') {
        this.error = 'Ошибка подключения к серверу. Проверьте соединение или настройки CORS.';
      } else {
        this.error = err.message || 'Ошибка авторизации';
      }
    }
  }
}


};
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.btn {
  background-color: #0077cc;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn:hover {
  background-color: #005fa3;
}

.error {
  color: red;
  font-size: 14px;
}
</style>
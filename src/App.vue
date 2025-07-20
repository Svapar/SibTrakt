<template>
  <div class="header-container">
    <header v-if="!$route.meta.hideHeader" class="header">
      <nav class="nav">
        <router-link to="/">Главная</router-link>
        <router-link to="/tours">Маршруты</router-link>
        <router-link to="/map">Карта</router-link>
        <router-link to="/contact">Контакты</router-link>
        
      </nav>
      <img
          v-if="!isAuthenticated"
          src="@/assets/Auth_Login.png"
          alt="Вход"
          class="login-icon"
          @click="showLoginModal = true"
        />
      <router-link to="/profile">
        <img
        v-if="isAuthenticated"
        src="@/assets/user.png"
        alt="Профиль"
        class="profile-icon"
        @click="showProfileModal = true"
      />
      </router-link>
    </header>
    <main>
      <router-view />
    </main>
  </div>

  <div v-if="showLoginModal" class="modal-overlay" @click.self="showLoginModal = false">
    <div class="modal-window">
      <LoginForm @login-success="handleLoginSuccess" />
      <button class="close-btn" @click="showLoginModal = false">×</button>
    </div>
  
  </div>
  
</template>

<script>
import LoginForm from './components/LoginForm.vue';

export default {
  components: { LoginForm },
  data() {
    return {
      showLoginModal: false,
      isAuthenticated: false,
      showProfileModal: false
    };
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      this.isAuthenticated = !!localStorage.getItem('token');
    },
    handleLoginSuccess() {
      this.showLoginModal = false;
      this.checkAuth();
    }
  }
};
</script>

<style scoped>
.profile-icon{
  height: 35px;
  width: 35px;
  margin-left: 60%;
}
.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
}

.header {
  width: 100%;
  max-width: 1200px;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  background-color: #75b7f5;
}

.nav {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0 1rem;
}

.nav a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  font-size: 1.1rem;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav a:hover {
  color: #42b983;
}

.nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #42b983;
  transition: width 0.3s ease;
}

.nav a:hover::after {
  width: 100%;
}

.login-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-right: 30px;
  transition: transform 0.2s ease;
}

.login-icon:hover {
  transform: scale(1.1);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(168, 164, 164, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-window {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  position: relative;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 20px rgba(10, 10, 10, 0.15);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
  color: #fdfdfd;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #ffffff;
}
</style>
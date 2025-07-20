<template>
  <div class="profile-container">
    <header class="profile-header">
      <div class="user-name">Михаил Владимирович Дружинин</div>
      <router-link to="/"><button class="logout-btn">Выйти</button></router-link>
    </header>

    <nav class="profile-menu">
      <ul>
        <li 
          :class="{ active: activeTab === 'personal' }" 
          @click="activeTab = 'personal'"
        >Личные данные</li>
        <li 
          :class="{ active: activeTab === 'bonuses' }" 
          @click="activeTab = 'bonuses'"
        >Бонусы</li>
        <li 
          :class="{ active: activeTab === 'places' }" 
          @click="activeTab = 'places'"
        >Места</li>
        <li 
          :class="{ active: activeTab === 'tours' }" 
          @click="activeTab = 'tours'"
        >Турузлы</li>
        <li 
          :class="{ active: activeTab === 'events' }" 
          @click="activeTab = 'events'"
        >События</li>
        <li 
          :class="{ active: activeTab === 'voting' }" 
          @click="activeTab = 'voting'"
        >Голосование</li>
      </ul>
    </nav>

    <main class="profile-content">

      <div v-if="activeTab === 'personal'" class="personal-data">
        <div class="avatar-section">
          <div class="avatar-placeholder">
            <p>Кликните сюда<br>и разместите свой портрет</p>
          </div>
          <div class="user-rank">
            <span>Ступень</span>
            <button>Скачать</button>
          </div>
        </div>

        <div class="user-info">
          <div class="info-row">
            <label>Имя-отчество</label>
            <div class="info-value">Михаил Владимирович</div>
          </div>
          <div class="info-row">
            <label>Фамилия</label>
            <div class="info-value">Дружинин</div>
          </div>
          <div class="info-row">
            <label>Email</label>
            <div class="info-value">mishania55@mail.ru</div>
          </div>
        </div>
      </div>

  
      <div v-if="activeTab === 'places'" class="places-content">
        <Places/>
       
      </div>

      <div v-if="activeTab === 'bonuses'" class="tab-content">
        <h2>Мои бонусы</h2>
        <p>Здесь будет отображаться информация о бонусах</p>
      </div>
      
      <div v-if="activeTab === 'tours'" class="tab-content">
        <h2>Турузлы</h2>
        <p>Здесь будет отображаться информация о турузлах</p>
      </div>
      
      <div v-if="activeTab === 'events'" class="tab-content">
        <h2>События</h2>
        <p>Здесь будет отображаться информация о событиях</p>
      </div>
      
      <div v-if="activeTab === 'voting'" class="tab-content">
        <h2>Голосование</h2>
        <p>Здесь будет отображаться информация о голосованиях</p>
      </div>
    </main>
  </div>
</template>

<script>
import Places from '@/components/Places.vue';

export default {
  components: {Places},
  name: 'UserProfile',
  data() {
    return {
      activeTab: 'personal' 
    }
  }
}
</script>

<style scoped>
.profile-container {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
}

.logout-btn {
  background: none;
  border: 1px solid #ccc;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.profile-menu {
  margin-bottom: 30px;
}

.profile-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.profile-menu li {
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #f0f0f0;
  white-space: nowrap;
  transition: background-color 0.3s;
}

.profile-menu li:hover {
  background-color: #e0e0e0;
}

.profile-menu li.active {
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
}

.profile-content {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.personal-data {
  display: flex;
}

.avatar-section {
  width: 200px;
  margin-right: 30px;
  text-align: center;
}

.avatar-placeholder {
  width: 150px;
  height: 150px;
  border: 2px dashed #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  cursor: pointer;
}

.user-rank {
  margin-top: 10px;
}

.user-info {
  flex: 1;
}

.info-row {
  margin-bottom: 15px;
}

.info-row label {
  display: block;
  color: #666;
  margin-bottom: 5px;
}

.info-value {
  font-weight: bold;
}

.tab-content, .places-content {
  padding: 20px;
}

@media (max-width: 768px) {
  .personal-data {
    flex-direction: column;
  }
  
  .avatar-section {
    margin-right: 0;
    margin-bottom: 20px;
  }
  
  .profile-menu ul {
    flex-direction: column;
    gap: 5px;
  }
}
</style>
<template>
  <div>
    <h2>Добавить новое место</h2>
    <form @submit.prevent="AddPlaces">
      <div>
        <label>Название:</label>
        <input v-model="name" required>
      </div>
      
      <div>
        <label>Описание:</label>
        <textarea v-model="description" required></textarea>
      </div>
      
      <div>
        <label>Город:</label>
        <input v-model="city" required>
      </div>
      
      <div>
        <label>Улица:</label>
        <input v-model="street" required>
      </div>
      
      <div>
        <label>Дом:</label>
        <input v-model="house" required>
      </div>
      
      <div>
        <label>Широта:</label>
        <input v-model="latitude" type="number" step="0.00000000000001" required>
      </div>
      
      <div>
        <label>Долгота:</label>
        <input v-model="longitude" type="number" step="0.00000000000001" required>
      </div>
      
      <div>
        <label>Превью (URL изображения):</label>
        <input v-model="preview">
      </div>
      
      <div>
        <label>Категория:</label>
        <input v-model="category" type="number"  required>
      </div>
      
      <div>
        <label>Подкатегории (через запятую):</label>
        <input v-model="subcategories">
      </div>
      
      <button type="submit">Добавить место</button>
      
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddPlaces',
  data() {
    return {
      name: '',
      description: '',
      latitude: '',
      longitude: '',
      city: '',
      street: '',
      house: '',
      preview: '',
      destination: '', 
      category: '',
      subcategories: '',
      error: '',
      successMessage: ''
    };
  },
  methods: {
    async AddPlaces() {
      this.error = '';
      this.successMessage = '';

      try {
        const token = localStorage.getItem('token');

        if (!this.latitude || !this.longitude) {
          throw new Error('Пожалуйста, введите широту и долготу');
        }

        const response = await fetch('http://93.81.235.62:7575/api/v1/places/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
            'Authorization': `Token ${token}` 
          },
          body: JSON.stringify({
            name: this.name,
            description: this.description,
            geometry: `{\"latitude\": ${this.latitude},\"longitude\": ${this.longitude}}`,
            city: this.city,
            street: this.street,
            house: this.house,
          })
        });

        if (response.status !== 201) {
          const errorData = await response.json();
          throw new Error(errorData.detail || `Ошибка при добавлении места. Статус: ${response.status}`);
        }

        this.successMessage = 'Место успешно добавлено!';
        this.resetForm();

      } catch (err) {
        if (err.message === 'Failed to fetch') {
          this.error = 'Ошибка подключения к серверу. Проверьте соединение.';
        } else {
          this.error = err.message || 'Произошла ошибка при добавлении места';
        }
        console.error('Ошибка:', err);
      }
    },
    resetForm() {
      this.name = '';
      this.description = '';
      this.latitude = '';
      this.longitude = '';
      this.city = '';
      this.street = '';
      this.house = '';
      this.preview = '';
      this.category = '';
      this.subcategories = '';
    }
  }
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  margin-top: 15px;
}

.success-message {
  color: green;
  margin-top: 15px;
}
</style>
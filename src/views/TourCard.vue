<template>
  <div class="tour-card">
    <img :src="image" alt="Tour image" class="tour-image" />
    <div class="tour-content">
      <h3>{{ title }}</h3>
      <p>{{ shortDescription }}</p>
      <p class="price">от {{ price }} ₽</p>
      <button>Подробнее</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    shortDescription: String,
    price: Number,
    image: String
  }
};
</script>

<style scoped>
.tour-card {
  border: 1px solid #ccc;
  display: flex;
  margin-bottom: 16px;
}
.tour-image {
  width: 200px;
  height: 150px;
  object-fit: cover;
}
.tour-content {
  padding: 16px;
}
.price {
  font-weight: bold;
  color: green;
}
</style>


<template>
  <div class="tour-list">
    <FilterPanel />

    <div class="cards">
      <TourCard
        v-for="tour in dummyTours"
        :key="tour.id"
        :title="tour.title"
        :shortDescription="tour.description"
        :price="tour.price"
        :image="tour.image"
      />
    </div>
  </div>
</template>

<script>
import TourCard from './TourDetails.vue';
import FilterPanel from './FilterPanel.vue';

export default {
  components: { TourCard, FilterPanel },
  data() {
    return {
      dummyTours: [
        {
          id: 1,
          title: 'Поход в горы',
          description: 'Невероятные виды Алтая.',
          price: 15000,
          image: 'https://via.placeholder.com/200x150'
        },
        {
          id: 2,
          title: 'Лесные приключения',
          description: 'Тайга и сибирская природа.',
          price: 12000,
          image: 'https://via.placeholder.com/200x150'
        }
      ]
    };
  }
};
</script>

<style scoped>
.cards {
  display: flex;
  flex-direction: column;
}
</style>


<template>
  <div class="filter-panel">
    <input type="text" placeholder="Поиск маршрута..." />
    <select>
      <option>Тип маршрута</option>
      <option>Пеший</option>
      <option>Водный</option>
    </select>
    <select>
      <option>Регион</option>
      <option>Алтай</option>
      <option>Байкал</option>
    </select>
    <button>Применить</button>
  </div>
</template>

<style scoped>
.filter-panel {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input, select, button {
  padding: 8px;
}
</style>

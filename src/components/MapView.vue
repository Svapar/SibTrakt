<template>
  <div class="map-container">
    <l-map ref="map" v-model:zoom="zoom" :center="center" :useGlobalLeaflet="false">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      

      <l-marker
        v-for="(place, index) in places"
        :key="index"
        :lat-lng="place.coords"
      >
        <l-popup>{{ place.name }}</l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      zoom: 3,
      center: [54.989347, 73.368221], // Лондон как центр по умолчанию
      places: [],
      loading: false,
      error: null
    };
  },
  async mounted() {
    await this.fetchPlaces();
    this.fitMapToMarkers();
  },
  methods: {
    async fetchPlaces() {
      this.loading = true;
      this.error = null;
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://93.81.235.62:7575/api/v1/places/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
            'Authorization': `Token ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        
        const data = await response.json();
        this.places = data.map(place => ({
          id: place.id,
          name: place.name,
          coords: [place.geometry.latitude, place.geometry.longitude],
          description: place.description,
          address: `${place.city}, ${place.street}, ${place.house}`
        }));
        
        if (data.length > 0) {
          this.center = [data[0].geometry.latitude, data[0].geometry.longitude];
        }
      } catch (err) {
        console.error("Ошибка:", err);
        this.error = "Не удалось загрузить данные о местах";
      } finally {
        this.loading = false;
        this.fitMapToMarkers();
      }
    },
    
    fitMapToMarkers() {
      if (this.places.length === 0) return;
      
      const map = this.$refs.map?.leafletObject;
      if (!map) return;
      
      const bounds = L.latLngBounds(this.places.map(place => place.coords));
      map.fitBounds(bounds, { padding: [50, 50] }); 
    }
  }
  
};
</script>

<style>
.map-container {
  height: 700px;
  width: 1000px;
  z-index: 1;
}


.leaflet-default-icon-path {
  background-image: url("https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png");
}
</style>
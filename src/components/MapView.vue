<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Circle, Fill, Stroke, Text } from 'ol/style';
import { fromLonLat, toLonLat, transformExtent } from 'ol/proj';

export default {
  name: 'ClusterMap',
  setup() {
    const mapContainer = ref(null);
    let map = null;

    const clusterStyle = (feature) => {
      const count = feature.get('count') || 1;
      const color = count > 20 ? '#f44336' : count > 10 ? '#ff9800' : '#4caf50';
      
      return new Style({
        image: new Circle({
          radius: 10 + Math.min(count, 10),
          fill: new Fill({ color }),
          stroke: new Stroke({ color: '#fff', width: 2 }),
        }),
        text: new Text({
          text: count.toString(),
          fill: new Fill({ color: '#fff' }),
          font: 'bold 12px sans-serif',
        }),
      });
    };

    const fetchClusterData = async (west, south, east, north, zoom) => {
      try {
        const token = localStorage.getItem('token');
        const url = new URL('http://93.81.235.62:7575/api/v1/cluster_places/');
        
        url.searchParams.append('west', west.toFixed(6));
        url.searchParams.append('south', south.toFixed(6));
        url.searchParams.append('east', east.toFixed(6));
        url.searchParams.append('north', north.toFixed(6));
        url.searchParams.append('zoom', Math.round(zoom));

        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error('Error fetching cluster data:', error);
        return { type: 'FeatureCollection', features: [] };
      }
    };

    const updateMapData = async () => {
      if (!map) return;
      
      const view = map.getView();
      const zoom = view.getZoom();
      const extent = view.calculateExtent(map.getSize());
      const lonLatExtent = transformExtent(extent, 'EPSG:3857', 'EPSG:4326');
      
      const [west, south, east, north] = lonLatExtent;

      const geoJsonData = await fetchClusterData(west, south, east, north, zoom);
      const geoJsonFormat = new GeoJSON();
      const features = geoJsonFormat.readFeatures(geoJsonData, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      });

      
      map.getLayers().forEach(layer => {
        if (layer.get('name') === 'clusterLayer') {
          map.removeLayer(layer);
        }
      });

      
      const vectorLayer = new VectorLayer({
        source: new VectorSource({ features }),
        style: clusterStyle,
        name: 'clusterLayer'
      });

      map.addLayer(vectorLayer);
    };

    const debounce = (func, delay) => {
      let timeout;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
      };
    };

    onMounted(async () => {
      map = new Map({
        target: mapContainer.value,
        layers: [
          new TileLayer({
            source: new OSM(),
            name: 'baseLayer'
          })
        ],
        view: new View({
          center: fromLonLat([73.3686, 54.9924]),
          zoom: 3
        })
      });

      
      await updateMapData();

      
      map.getView().on('change', debounce(updateMapData, 500));

      
      map.on('click', (evt) => {
        const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
        if (feature) {
          const props = feature.getProperties();
          console.log('Cluster info:', { 
            count: props.count,
            coordinates: toLonLat(feature.getGeometry().getCoordinates())
          });
        }
      });
    });

    onBeforeUnmount(() => {
      if (map) {
        map.setTarget(undefined);
        map = null;
      }
    });

    return { mapContainer };
  }
};
</script>

<style>
.map-container {
  width: 1200px;
  height: 700px;
  border: 1px solid #ccc;
  margin: 0 auto;
}
</style>
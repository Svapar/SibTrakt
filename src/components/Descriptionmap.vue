<template>
  <div id="map" ref="mapContainer" style="width: 1200px;
  height: 700px;
  border: 1px solid #ccc;
  margin: 0 auto;"></div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import {Point, LineString} from 'ol/geom';
import {Style, Stroke, Fill, Circle} from 'ol/style';
import Feature from 'ol/Feature';
import {fromLonLat} from 'ol/proj';

export default {
  name: 'DestinationMap',
  data() {
    return {
      map: null,
      destinationContactsLayer: null,
      destinationsLayer: null
    };
  },
  mounted() {
    this.initMap();
    this.loadData();
  },
  methods: {
    initMap() {
      
      const baseLayer = new TileLayer({
        source: new OSM()
      });

      
      this.destinationContactsLayer = new VectorLayer({
        source: new VectorSource(),
        style: (feature) => {
          return new Style({
            image: new Circle({
              radius: 6,
              fill: new Fill({color: 'rgba(0, 0, 255, 0.8)'}),
              stroke: new Stroke({color: 'white', width: 2})
            })
          });
        }
      });

      
      this.destinationsLayer = new VectorLayer({
        source: new VectorSource(),
        style: (feature) => {
          const isPoint = feature.get('isPoint');
          if (isPoint) {
            return new Style({
              image: new Circle({
                radius: 8,
                fill: new Fill({color: 'rgba(255, 0, 0, 0.8)'}),
                stroke: new Stroke({color: 'white', width: 2})
              })
            });
          } else {
            return new Style({
              stroke: new Stroke({
                color: 'rgba(255, 0, 0, 0.8)',
                width: 3
              })
            });
          }
        }
      });

      
      this.map = new Map({
        target: this.$refs.mapContainer,
        layers: [baseLayer, this.destinationsLayer, this.destinationContactsLayer],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 1
        })
      });
    },

    async loadData() {
      try {
        
        const contactsResponse = await fetch('http://93.81.235.62:7575/api/v1/destination_contacts/');
        const contacts = await contactsResponse.json();
        
        
        const destinationsResponse = await fetch('http://93.81.235.62:7575/api/v1/destinations/');
        const destinations = await destinationsResponse.json();
        
        
        const contactsById = {};
        contacts.forEach(contact => {
          contactsById[contact.id] = contact;
        });
        
        
        const contactFeatures = contacts.map(contact => {
          const coordinates = fromLonLat(contact.geometry.coordinates);
          return new Feature({
            geometry: new Point(coordinates),
            name: contact.name,
            description: contact.description,
            type: 'contact'
          });
        });
        
        
        const destinationFeatures = [];
        destinations.forEach(destination => {
          const contact1 = contactsById[destination.destination_contact1];
          const contact2 = contactsById[destination.destination_contact2];
          
          if (contact1 && contact2) {
            const coord1 = fromLonLat(contact1.geometry.coordinates);
            const coord2 = fromLonLat(contact2.geometry.coordinates);
            
            
            if (coord1[0] === coord2[0] && coord1[1] === coord2[1]) {
              destinationFeatures.push(new Feature({
                geometry: new Point(coord1),
                name: `Destination ${destination.id}`,
                description: `Between ${contact1.name} and ${contact2.name}`,
                type: 'destination',
                isPoint: true
              }));
            } else {
              
              destinationFeatures.push(new Feature({
                geometry: new LineString([coord1, coord2]),
                name: `Destination ${destination.id}`,
                description: `Between ${contact1.name} and ${contact2.name}`,
                type: 'destination'
              }));
            }
          }
        });
        
        
        this.destinationContactsLayer.getSource().addFeatures(contactFeatures);
        this.destinationsLayer.getSource().addFeatures(destinationFeatures);
        
      
        if (contactFeatures.length > 0 || destinationFeatures.length > 0) {
          const extent = this.destinationContactsLayer.getSource().getExtent();
          this.map.getView().fit(extent, {padding: [50, 50, 50, 50]});
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  }
};
</script>
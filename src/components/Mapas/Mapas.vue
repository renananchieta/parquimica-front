<template>
   <v-container>
      <v-card>
         <v-card-text>
            <v-form>
               <v-text-field
               variant="outlined"
               density="compact"
               label="Location" 
               v-model="endereco"
               />
               <v-card-actions>
                  <v-btn 
                  block 
                  prepend-icon="mdi mdi-map-marker"
                  variant="elevated" 
                  color="primary"
                  @click="findLocation()">
                     Minha localização
                  </v-btn>
               </v-card-actions>
            </v-form> 
         </v-card-text>
      </v-card> 
      <br>
      <v-card v-show="showMap">
         <v-card-text>
            {{ endereco }}
            <v-sheet height="350px">
               <div id="map"></div>
            </v-sheet>
         </v-card-text>
      </v-card>
   </v-container>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

  
/**
 * Data
 */
const endereco = ref(''); 
const erros = ref('');
const showMap = ref(false);

/**
 * Methods
 */
const findLocation = () => {
   if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition( 
         position =>{
            getEnderecoFrom(position.coords.latitude, position.coords.longitude); 
            carregarScriptGoogleMaps().then(() => {
              showMapLocation(position.coords.latitude, position.coords.longitude);
            });
         },
         error => {
            erros.value = error.message;
         }
      );
   } else { 
      erros.value = error.message;
   }
}

const getEnderecoFrom = (lat, long) => {
   axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=' + import.meta.env.VITE_GOOGLE_MAPS_KEY)
   .then((response) => {
         console.log(response.data.results[0].formatted_address);
         endereco.value = response.data.results[0].formatted_address; 
         
         showMap.value = true;
   })
   .catch((error) => {
      console.log(error.message); 
      erros.value = error;
   })
} 

const showMapLocation = (latitude, longitude) => {
   let map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: new google.maps.LatLng(latitude, longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP
   });
   new google.maps.Marker({ 
      position: new google.maps.LatLng(latitude, longitude), 
      map: map
   })
}

const carregarScriptGoogleMaps = () => {
  return new Promise((resolve, reject) => {
    if (typeof google !== 'undefined') {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};
</script>

<style scoped>
#map{
   position: absolute;
   top: 0; 
   right: 0;
   bottom: 0; 
   left: 0; 
   background: grey;
}
</style>
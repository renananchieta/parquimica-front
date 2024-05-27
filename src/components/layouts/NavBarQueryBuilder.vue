<template>
  <v-app-bar :elevation="2" density="compact">
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field 
          variant="outlined"
          density="compact"
          label="Schemas"
          append-inner-icon="mdi mdi-menu"
          class="pt-6 ml-4"
          />
        </v-col>
        <v-col cols="12" md="2">
          <v-btn 
           variant="elevated"
           density="compact"
           color="blue"
           class="pt-6">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-col>
    </v-row>
    <v-app-bar-title>Query Builder</v-app-bar-title>
  </v-app-bar>

  <v-navigation-drawer class="float-left">
      <v-divider></v-divider>
  </v-navigation-drawer>

    
</template>

<script setup>

</script>

<style scoped>
.centralizado{
  text-align: center;
}
</style>
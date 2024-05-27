<template>
    <NavBarQueryBuilder />

    <v-container>
        <v-card>
            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field 
                      label="Schemas"
                      variant="outlined"
                      density="compact"
                      class="ma-4"
                    />
                </v-col>
                <v-divider vertical/>
                <v-col cols="12" md="9">
                    <v-card>
                        <v-card-title></v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script setup>
import NavBarQueryBuilder from '../layouts/NavBarQueryBuilder.vue';
</script>
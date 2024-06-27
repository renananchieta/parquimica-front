<template>
    <v-list
      density="compact"
    >
      <slot name="before" />
      <template
        v-for="(menu, key) in items"
        :key="key"
      >
        <v-list-group
          v-if="menu.children?.length > 0"
        >
          <template #activator="{ props }">
            <v-list-item
              :prepend-icon="menu.icon"
              exact
              v-bind="props"
              color="selectedColor"
            >
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item
            v-for="(sub, i) in menu.children"
            :key="i"
            :to="sub.to"
            color="selectedColor"
            exact
          >
            <v-list-item-title>{{ sub.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
  
        <v-list-item
          v-else
          color="selectedColor"
          :to="menu.to"
          exact
        >
          <template #prepend>
            <v-icon :color="menu.color || ''">
              {{ menu.icon }}
            </v-icon>
          </template>
          {{ menu.title }}
        </v-list-item>
      </template>
      <slot name="after" />
    </v-list>
  </template>

<script setup>
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';

const store = useAppStore();
const router = useRouter();
const items = ([
    { 
        "title": 'Home', 
        "icon": 'mdi-home', 
        "to": "/home",
        "children": [],
    },
    { 
        "title": 'Catálogo', 
        "icon": 'mdi mdi-view-list', 
        "to": "/catalogo",
        "children": [],
    },
    { 
        "title": 'Linhas', 
        "icon": 'mdi mdi-arrow-decision-outline', 
        "to": "/linhas",
        "children": [],
    },
    { 
        "title": 'Funções', 
        "icon": 'mdi mdi-backburger', 
        "to": "/funcoes",
        "children": [],
    },
    { 
        "title": 'Produtos', 
        "icon": 'mdi mdi-beaker', 
        "to": "/",
        "children": [
          { 
            "title": 'Linhas de Produtos', 
            "icon": 'mdi mdi-view-list', 
            "to": "/produtos/linhas",
            "children": [],
          },
          { 
            "title": 'Funções de Produtos', 
            "icon": 'mdi mdi-view-list', 
            "to": "/produtos/funcoes",
            "children": [],
          },
        ],
    },
    { 
        "title": 'Minha conta', 
        "icon": 'mdi mdi-account-lock-open', 
        "to": "/minha-conta",
        "children": [],
    },
    { 
        "title": 'Administrador', 
        "icon": 'mdi mdi-security',
        "to": "",
        "children": [
            { 
                "title": 'Usuários', 
                "icon": 'mdi-account', 
                "to": "/admin/usuarios"
            },
            { 
                "title": 'Perfis', 
                "icon": 'mdi mdi-account-card-outline', 
                "to": "/admin/perfil"
            },
        ],
    },
]);
</script>

<style>

</style>
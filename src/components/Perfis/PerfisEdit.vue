<template>
    <v-container>
        <v-form @submit.prevent="ajaxNovo" ref="form" lazy-validation>
            <v-card :loading="carregando">
                <v-card-title>Cadastro de Perfil</v-card-title>
                <v-divider/>

                <v-card-text>
                        <v-row>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field
                                label="Nome do Perfil"
                                v-model="formPerfil.perfil"
                                variant="outlined"
                                density="compact"
                                />
                            </v-col>
                        </v-row>
                    
                </v-card-text>

                <v-table density="compact" hover>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>
                                    <v-autocomplete 
                                    label="Grupo"
                                    v-model="grupo"
                                    :items="grupos"
                                    variant="outlined"
                                    density="compact"/>
                                </th>
                                <th v-if="isUsuarioAdmin">Dependências</th>
                                <th>Permissão</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>

                        <tbody>
                            <template v-for="(item, indicePai) in dados">
                                <tr v-for="(subItem, index) in item.filhos"
                                :key="subItem.id"
                                v-show="filtrar(indicePai)">
                                    <td v-if="index === 0" :rowspan="item.filhos.length">
                                        {{ item.nome }}
                                    </td>
                                    <td v-if="isUsuarioAdmin">
                                        <v-chip
                                        :color="corChip(subItem)"
                                        fab
                                        x-small
                                        :to="link(subItem)"
                                        class="elevation-0"
                                        >
                                            {{ subItem.total_dependencia }}
                                        </v-chip>
                                    </td>
                                    <td>
                                        <label style="cursor: pointer">
                                            <input 
                                            type="checkbox"
                                            style="cursor: pointer"
                                            :value="subItem.id"
                                            v-model="formPerfil.permissoes"> {{ subItem.nome_amigavel }}
                                        </label>
                                    </td>
                                    <td>{{ subItem.descricao }}</td>
                                </tr>
                            </template>
                        </tbody>
                    </template>
                </v-table>

                <v-card-text>
                    <v-btn
                    color="blue"
                    type="buttom"
                    position="fixed"
                    icon="mdi-content-save"
                    fab
                    location="bottom right"
                    class="ma-6"
                    size="large"
                    />
                </v-card-text>
            </v-card>
        </v-form>
    </v-container>
</template>

<script setup>


/**
 * Data
 */
 const carregando = ref(false);
 const formPerfil = ref({
    id:0,
    perfil:"",
    permissoes: []
});
</script>
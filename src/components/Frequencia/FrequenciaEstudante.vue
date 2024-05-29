<template>
    <v-container>
        <v-card max-width="720px" class="mx-2 mt-4">
            <v-card-title>Frequência de estudantes por mês</v-card-title>
                <canvas class="ma-4" id="myChart"></canvas>
        </v-card>
    </v-container>
</template>

<script setup>
import api from '@/plugins/api';
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';


/**
 * Methods
 */
const pesquisar = () =>{
    api.get('/frequencia-estudantes')
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    })
}

const initialization = () => {
    const data = {
        labels: ['Fereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto'],
        datasets: [{
            label: 'Taxa de frequência de estudantes por mês em %',
            data: [89, 91, 100, 81, 76, 92, 87],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(255, 159, 64, 0.7)',
                'rgba(255, 205, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(201, 203, 207, 0.7)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 2
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };

    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, config);

    myChart;
}

/**
 * Hooks
 */
onMounted(() => {
    pesquisar();
    initialization();
})
</script>
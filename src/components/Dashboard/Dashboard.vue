<template>
    <v-card max-width="720px" class="mx-2 mt-4">
        <v-card-title>Apresentação de Gráfico de Barras</v-card-title>
        <canvas class="ma-4" id="myChart"></canvas>
    </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

/**
 * Data
 */

/**
 * Methods
 */
const initialization = () => {
    const data = {
        labels: ['Fereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto'],
        datasets: [{
            label: 'Taxa de frequência de estudantes por mês em %',
            data: [65, 59, 80, 81, 56, 55, 40],
            data1: [35, 25, 46, 39, 21, 91, 82],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
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
            borderWidth: 1
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
    initialization();
})
</script>
<script>
import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,
    props : {data_histogramme: Array},
    data () {
        return {
            chartData: {
                labels: ["08-9H", "09-10H", "10-11H", "11-12H", "12-13H", "13-14H", "14-15H", "15-16H", "16-18H",
                    "18-20H", "20-22H", "22-06H", "06-08H"
                ],
                datasets: [{
                    borderWidth: 1,
                    backgroundColor: [
                        'rgba(255,99,132,0.9)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(214,116,23,0.9)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgb(54,162,235)',
                        'rgb(255,206,86)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgb(255,159,64)',
                        'rgb(255,99,132)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgb(75,192,192)',
                        'rgb(153,102,255)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    data: this.data_histogramme
                }]
            },
            options: {
                legend: {
                    display: true,
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted () {
        this.renderChart(this.chartData, this.options)
    }
}
</script>

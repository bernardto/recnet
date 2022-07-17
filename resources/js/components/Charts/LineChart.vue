<script>
import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    props : {data_histogramme: Array},
    data () {
        return {
            chartData: {
                labels: ["08-9H", "09-10H", "10-11H", "11-12H", "12-13H", "13-14H", "14-15H", "15-16H", "16-18H",
                    "18-20H", "20-22H", "22-06H", "06-08H"
                ],
                datasets: [
                    {
                        label: "Courbe de l'évolution du recouvrement.",
                        data: this.data_histogramme,
                        fill: false,
                        borderColor: '#2554FF',
                        backgroundColor: '#2554FF',
                        borderWidth: 3
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [ {
                        gridLines: {
                            display: false
                        }
                    }]
                },
                legend: {
                    display: true
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

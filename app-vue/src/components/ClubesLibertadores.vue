<template>
    <div>
        <h3>Time classificado para libertadores</h3>
        <ul>
            <li v-for="(time, index) in timesLibertadores" :key="index">
                <clube :time="time"></clube>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['times'],
        computed: {
            timesLibertadores() {
                return this.times.slice(0, 6)
            }
        },
    }
</script>
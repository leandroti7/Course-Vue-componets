<template>
    <div>
        <h3>Time Rebaixados</h3>
        <ul>
            <li v-for="(time, index) in timesRebaixados" :key="index">
                <clube :time="time"></clube>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['times'],
        computed: {
            timesRebaixados() {
                return this.times.slice(16, 20)
            },
        }
    }
</script>
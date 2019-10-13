<template>
    <div>
        {{ testData }}<br />

        <input type="text" v-model="addedData" />
        <button @click="addData">データを追加</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            testData: {
                a: "あ"
            },

            addedData: "",
            currentIndex: 1
        };
    },

    methods: {
        addData() {
            this.currentIndex++;
            // this.testData[this.currentIndex] = this.addedData;
            this.$set(this.testData, this.currentIndex, this.addedData);
            // this.$refs
            // this.$emit;
            // this.$on
            // this.$off
        }
    }
};
</script>
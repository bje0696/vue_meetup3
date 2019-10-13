<template>
    <div>
        テストだよ {{ date | date }}
        <span v-changeFont>テキストをブロックに</span>

        <input type="text" v-model="firstName" placeholder="姓" /><br />
        <input type="text" v-model="lastName" placeholder="名" /><br />

        <button @click="computedTestData = '田中'">姓だけにする</button>
        <button @click="changeName">姓だけにする</button>

        <p>名前：{{ computedTestData }}</p>

        <button @click="switchFlag = !switchFlag">スイッチ</button>
        <!-- {{ computedFlag }} -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            date: "2019-10-11 12:00:00",
            firstName: "",
            lastName: "",
            switchFlag: false
        };
    },

    mounted() {
        // this.$eb.$on("say-hello", () => alert("hello"));
    },

    computed: {
        computedTestData: {
            get() {
                return `${this.firstName} ${this.lastName}です`;
            },

            set($v) {
                this.firstName = $v;
                this.lastName = "";
            }
        }

        // computedFlag() {
        //     if (this.switchFlag) {
        //         alert("OK");
        //     }
        //     return this.switchFlag;
        // }
    },

    watch: {
        switchFlag($new, $old) {
            if ($new !== $old) {
                console.log("新しい値:" + $new);
                console.log("古い値:" + $old);
            }
        }
    },

    methods: {
        changeName() {
            this.firstName = "真田";
            this.lastName = "";
        }
    }
};
</script>

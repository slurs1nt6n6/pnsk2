let eventBus = new Vue()

Vue.component('column', {
    // колонки
    template: `
 
        <div class="columns">
            <newCard></newCard>
        <p class="error" v-for="error in errors">{{ error }}</p>
                <column_1 :column_1="column_1"></column_1>
                <column_2 :column_2="column_2"></column_2>
                <column_3 :column_3="column_3"></column_3>
            </div>
    `,
    data() {
        return {
            column_1: [],
            column_2: [],
            column_3: [],
            errors: [],
        }
    },
    mounted() {

        if ((JSON.parse(localStorage.getItem("column_1")) != null)){
            this.column_1 = JSON.parse(localStorage.getItem("column_1"))
        }
        if ((JSON.parse(localStorage.getItem("column_2")) != null)){
            this.column_2 = JSON.parse(localStorage.getItem("column_2"))
        }
        if ((JSON.parse(localStorage.getItem("column_3")) != null)){
            this.column_3 = JSON.parse(localStorage.getItem("column_3"))
        }

        eventBus.$on('addColumn_1', ColumnCard => {

            if (this.column_1.length < 3) {
                this.errors.length = 0
                this.column_1.push(ColumnCard)
                localStorage.setItem('column_1', JSON.stringify(this.column_1))
            } else {
                this.errors.length = 0
                this.errors.push('макс коллво заметок в 1 столбце')
            }
        })
        eventBus.$on('addColumn_2', ColumnCard => {
            if (this.column_2.length < 5) {
                this.errors.length = 0
                this.column_2.push(ColumnCard)
                this.column_1.splice(this.column_1.indexOf(ColumnCard), 1)
                localStorage.setItem('column_1', JSON.stringify(this.column_1))
                localStorage.setItem('column_2', JSON.stringify(this.column_2))
            } else {
                this.errors.length = 0
                this.errors.push('Вы не можете редактировать первую колонку, пока во второй есть 5 карточек.')
            }
        })
        eventBus.$on('addColumn_3', ColumnCard => {
            JSON.parse(localStorage.getItem('column_2'))
            this.column_3.push(ColumnCard)
            this.column_2.splice(this.column_2.indexOf(ColumnCard), 1)
            localStorage.setItem('column_2', JSON.stringify(this.column_2))
            localStorage.setItem('column_3', JSON.stringify(this.column_3))
        })

    }
})

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

Vue.component('newCard', {
    template: `
    <section id="main" class="main-alt">
    
        <form class="row" @submit.prevent="Submit">
        
            <p class="main_text">Заметки</p>
        <div class="form_control">
                
            <div class="form_name">
                <input required type="text" v-model="name" id="name" placeholder="Введите название заметки"/>
            </div>
            
            <input required type="text"  v-model="point_1" placeholder="Первый пункт"/>

            <input required type="text"  v-model="point_2" placeholder="Второй пункт"/>

            <input required type="text"  v-model="point_3" placeholder="Третий пункт"/> 

            <input required type="text"  v-model="point_4"  placeholder="Четвертый пункт"/>

             <input required type="text" v-model="point_5"  placeholder="Пятый пункт"/>
        </div>
        <div>                    
                <p class="sub">
                        <input type="submit" value="Отправить"> 
                </p>
            </div>
        </form>
    </section>
    `,
    data() {
        return {
            name: null,
            point_1: null,
            point_2: null,
            point_3: null,
            point_4: null,
            point_5: null,
            date: null,
        }
    },
    methods: {

        Submit() {
            let card = {
                name: this.name,
                points: [
                    {name: this.point_1, completed: false},
                    {name: this.point_2, completed: false},
                    {name: this.point_3, completed: false},
                    {name: this.point_4, completed: false},
                    {name: this.point_5, completed: false}
                ],
                date: null,
                // date: null,
                status: 0,
                errors: [],
            }
            eventBus.$emit('addColumn_1', card)
            this.name = null;
            this.point_1 = null
            this.point_2 = null
            this.point_3 = null
            this.point_4 = null
            this.point_5 = null
        }
    }

})

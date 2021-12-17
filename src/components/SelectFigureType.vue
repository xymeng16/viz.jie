<template>

    <v-radio-group v-model="radios">
      <v-row dense align="center"
             justify="center">

        <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
        >
          <v-card>
            <v-img
                :src=card.src
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-radio :value="card.title" :label="card.title"></v-radio>
            </v-card-actions>
          </v-card>
        </v-col>

      </v-row>
    </v-radio-group>
</template>

<script>
export default {
  name: "SelectFigureType",
  data () {
    return {
      cards: [
        { title: 'Line Chart', src: require("@/assets/images/line-plots.jpg"), flex: 3 },
        { title: 'Bar Chart', src: require("@/assets/images/bar-plots.jpg"), flex: 3 },
        { title: 'Scatter Chart', src: require("@/assets/images/scatter-plots.jpg"), flex: 3 },
      ],
      radios: null,
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div class="hello">
    <h1>viz.Jie: A chemistry-related visualization tool designed specifically for Jie.</h1>
    <br/>
    <!--    <div id="app">-->
    <v-app style="margin: auto; width: 70%">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <template v-slot:default="{ open }">
              <v-row no-gutters>
                <v-col cols="4">
                  Select data source
                </v-col>
                <v-col
                    cols="8"
                    class="text--secondary"
                >
                  <v-fade-transition leave-absolute>
                  <span
                      v-if="open"
                      key="0"
                  >
                    Click to select the data file to be visualized. It should be formatted as a CSV (Comma-Seperated Values) file.
                  </span>

                  </v-fade-transition>
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <SelectDataSource/>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header v-slot="{ open }">
            <v-row no-gutters>
              <v-col cols="4">
                Please select the type of figure
              </v-col>
              <v-col
                  cols="8"
                  class="text--secondary"
              >
                <v-fade-transition leave-absolute>
                <span
                    v-if="open"
                    key="0"
                >
                  Select figure type
                </span>
                  <span
                      v-else
                      key="1"
                  >
                  {{ trip.location }}
                </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
          <SelectFigureType/>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header v-slot="{ open }">
            <v-row no-gutters>
              <v-col cols="4">
                Start and end dates
              </v-col>
              <v-col
                  cols="8"
                  class="text--secondary"
              >
                <v-fade-transition leave-absolute>
                  <span v-if="open">When do you want to travel?</span>
                  <v-row
                      v-else
                      no-gutters
                      style="width: 100%"
                  >
                    <v-col cols="6">
                      Start date: {{ trip.start || 'Not set' }}
                    </v-col>
                    <v-col cols="6">
                      End date: {{ trip.end || 'Not set' }}
                    </v-col>
                  </v-row>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row
                justify="space-around"
                no-gutters
            >
              <v-col cols="3">
                <v-menu
                    ref="startMenu"
                    :close-on-content-click="false"
                    :return-value.sync="trip.start"
                    offset-y
                    min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="trip.start"
                        label="Start date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="date"
                      no-title
                      scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="primary"
                        @click="$refs.startMenu.isActive = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                        text
                        color="primary"
                        @click="$refs.startMenu.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="3">
                <v-menu
                    ref="endMenu"
                    :close-on-content-click="false"
                    :return-value.sync="trip.end"
                    offset-y
                    min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="trip.end"
                        label="End date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="date"
                      no-title
                      scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="primary"
                        @click="$refs.endMenu.isActive = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                        text
                        color="primary"
                        @click="$refs.endMenu.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <!--    </div>-->
      <textarea v-model="formula" cols="30" rows="10"></textarea>
      <vue-mathjax :formula="formula"></vue-mathjax>

      <v-container>
        <v-row>
          <v-col cols="4" class="d-flex justify-center align-center">
            <div class="pa-2">
              <h3 class="pb-2">Countries in 2018 with the highest GDP</h3>
              <p>
                Gross domestic product by country allows you to compare the economies of the nations.
                It measures everything produced by everyone in the country whether they are citizens or foreigners.
                The data has been taken from
                <a
                    href="https://www.thebalance.com/gdp-by-country-3-ways-to-compare-3306012"
                >The Balance</a>.
              </p>
            </div>
          </v-col>

        </v-row>
        <v-col id="arc"/>
      </v-container>
    </v-app>
    <div id="tester" style="width:600px;height:250px;"></div>
  </div>
</template>

<script>
import {VueMathjax} from 'vue-mathjax'
import * as d3 from "d3";
import Plotly from 'plotly.js-dist';

import SelectFigureType from './SelectFigureType.vue';
import SelectDataSource from "@/components/SelectDataSource";
export default {
  components: {
    'vue-mathjax': VueMathjax,
    SelectFigureType,
    SelectDataSource
  },
  name: 'HelloWorld',
  data() {
    return {
      date: null,
      trip: {
        name: '',
        location: null,
        start: null,
        end: null,
      },
      locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France'],
      formula: '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$',
      msg: 'Welcome to Your Vue.js App',
      gdp: [
        {country: "USA", value: 20.5},
        {country: "China", value: 13.4},
        {country: "Germany", value: 4.0},
        {country: "Japan", value: 4.9},
        {country: "France", value: 2.8}
      ],
      test: {
        "lineChart": {
          "x": [1, 2, 3, 4, 5, 6],
          "y": [1, 2, 4, 8, 16, 32]
        }
      }
    }
  },
  mounted() {
    let recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML');
    document.head.appendChild(recaptchaScript);
    this.generateArc();
    this.generateLine();
  },
  methods: {
    generateArc() {
      const w = 500;
      const h = 500;

      const svg = d3
          .select("#arc")
          .append("svg")
          .attr("width", w)
          .attr("height", h);

      const sortedGDP = this.gdp.sort((a, b) => (a.value > b.value ? 1 : -1));
      const color = d3.scaleOrdinal(d3.schemeDark2);

      const max_gdp = d3.max(sortedGDP, o => o.value);

      const angleScale = d3
          .scaleLinear()
          .domain([0, max_gdp])
          .range([0, 1.5 * Math.PI]);

      const arc = d3
          .arc()
          .innerRadius((d, i) => (i + 1) * 25)
          .outerRadius((d, i) => (i + 2) * 25)
          .startAngle(angleScale(0))
          .endAngle(d => angleScale(d.value));

      const g = svg.append("g");

      g.selectAll("path")
          .data(sortedGDP)
          .enter()
          .append("path")
          .attr("d", arc)
          .attr("fill", (d, i) => color(i))
          .attr("stroke", "#FFF")
          .attr("stroke-width", "1px")
          .on("mouseenter", function () {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("opacity", 0.5);
          })
          .on("mouseout", function () {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("opacity", 1);
          });

      g.selectAll("text")
          .data(this.gdp)
          .enter()
          .append("text")
          .text(d => `${d.country} -  ${d.value} Trillion`)
          .attr("x", -150)
          .attr("dy", -8)
          .attr("y", (d, i) => -(i + 1) * 25);

      g.attr("transform", "translate(200,300)");
    },
    generateLine() {
      let TESTER = document.getElementById('tester');
      Plotly.newPlot(TESTER, [{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16]
      }], {
        margin: {t: 0}
      });
    },
    handleChange(item) {
      console.log(`${item} was changed`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

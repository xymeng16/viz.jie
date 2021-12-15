<template>
  <div class="hello">
    <h1>viz.Jie: A chemistry-related visualization tool designed specifically for Jie.</h1>
    <textarea v-model="formula" cols="30" rows="10"></textarea>
    <vue-mathjax :formula="formula"></vue-mathjax>
  <v-app>
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
        <v-col id="arc" />
      </v-row>
    </v-container>
  </v-app>
  </div>
</template>

<script>
import {VueMathjax} from 'vue-mathjax'
import * as d3 from "d3";

export default {
  components: {
    'vue-mathjax': VueMathjax
  },
  name: 'HelloWorld',
  data() {
    return {
      formula: '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$',
      msg: 'Welcome to Your Vue.js App',
      gdp: [
        {country: "USA", value: 20.5 },
        {country: "China", value: 13.4 },
        {country: "Germany", value: 4.0 },
        {country: "Japan", value: 4.9 },
        {country: "France", value: 2.8 }
      ],
      test: {
        "lineChart":{
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

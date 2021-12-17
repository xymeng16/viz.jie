<template>
  <v-container>
<div style="text-align: left">
  <h3>Exampled data format:</h3><br/>
      SampleId,BUN,Creatinine,Glucose,Albumin,CO2,Calcium,Sodium,Potassium,Chloride<br/>
      Blood-1401,99,45,20,91,82,8,92,47,42<br/>
      Blood-1402,64,57,62,58,7,62,73,-18,51<br/>
      Blood-1403,51,51,46,80,64,12,27,48,95<br/>
      Blood-1404,41,37,73,2,30,83,17,36,22<br/>
</div>
    <v-file-input
        truncate-length="15"
    ></v-file-input>
  </v-container>
</template>

<script>
export default {
  name: "SelectDataSource"
}
</script>

<style scoped>

</style>
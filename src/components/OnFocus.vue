<template>
 <v-card color="red">
 <v-text-field
  v-model="iquery"
  @focus="magic_flag = true; iquery=query"
  @blur="magic_flag = false"
  @input="$emit('input', iquery)"
  /> 
  
 <div v-if="magic_flag">
     <v-btn @click="iquery='hello'; query='hello'"> helo </v-btn>
 </div>
 q={{ query }}  iq={{ iquery }}
</v-card>

</template>

<script>
export default {
 props: {
    query:{type:String}
 },  
 data: () => ({
  magic_flag:false,
  iquery:"start",
 
  fruitOptions: ['appels','pere','tamaties','waatlemoen'],
  fruitObject: [{id:1,name:'appels'},{id:2,name:'pere'},
                {id:3,name:'tamaties'},{id:4,name:'waatlemoen'}],
  })
}
</script>
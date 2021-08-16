<template>
<div class="d-flex">
    <strong> {{ head }} : </strong> {{ val }}
</div>    
</template>

<script>
export default {
    name:"SmallDisplay",
    props:['head','val']
}
</script>
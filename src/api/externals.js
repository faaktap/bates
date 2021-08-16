function debounce(func, wait, immediate) {

        let timeout;

        return function() {
            let context = this, args = arguments;
            let later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };

            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    // -- end debounce

//https://github.com/vuejs-tips/v-debounce/blob/master/debounce.js
function tinydebounce (fn, delay) {
  var timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    var args = arguments
    var that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}
//Example:tinydebounce (https://github.com/vuejs-tips/tiny-debounce/blob/master/demo.vue)
/*
<input v-model="input" placeholder="type here" />
  <p>
    {{debouncedInput}}
  </p>
import tinydebounce from '@/api/externals.js'  
export default {  
 data () {
    return {
      input: '',
      debouncedInput: ''
    }
 },  
 watch: {
    input: tinydebounce(function (newVal) {
      this.debouncedInput = newVal
    }, 500)
  }  
*/  


    // animate css
    function animateCss(element, animationName, callback) {
        const node = document.querySelector(element)
        node.classList.add('animated', animationName)

        function handleAnimationEnd() {
            node.classList.remove('animated', animationName)
            node.removeEventListener('animationend', handleAnimationEnd)

            if (typeof callback === 'function') callback()
        }

        node.addEventListener('animationend', handleAnimationEnd);
    }
    // -- end animate css
export {tinydebounce,debounce, animateCss}
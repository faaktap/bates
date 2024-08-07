export const util = {

    cl: function (...args) {
       console.info(...args);
    },
    randomColor: function() {
       return Math.floor(Math.random()*16777215).toString(16)
    },

    findMultipleSearch: function(myArray, searchValue) {
        // split search value when we see a || - a js OR used as an AND
        // Then join the object 1 by 1 into a big string
        // Then use include to see if we find that word(s) in our big string
        // trickey to return from a function to another function with a true or false.
        // we need to add return if we wrap function in {}
        let searchArray = searchValue.split('||')
        let found = false
        let hits = 0
        const x = myArray.filter(str => {
            found = false
            hits = 0
            searchArray.forEach(element => {
                if ( Object.values(str).join().toUpperCase().includes( element.trim().toUpperCase()) ) {
                    found=true
                    hits += 1
                } else {
                    found=false
                }
                return found
            })
            if (hits == searchArray.length)  {
                return true
            }else{
                return false
            }
            //return found
        })
       return x
     },
    getNum: function (str) {
        if (str.length > 0) {
            let matches = str.match(/(\d+)/);
            if (matches.length) {
              //Just pass the first number we found..
                return  parseInt(matches[0] , 10)  //remove leading zero if there is one..
            }
        }
        return 0
    },
    hasDuplicates: function (array) {
        //how to check if every value is unique javascript array
        //We can also send a unique set back with [...new Set(array)]
        return (new Set(array)).size !== array.length;
    },
    zDate: function(p) {
        return zDateFunction(p)
    }

}

//Handle date and time in java without a library
//hide this extra function, until we put it in it's own file
//https://thenextweb.com/news/how-to-manipulate-date-and-time-in-javascript
// let today = Date.now()
// let today = new Date()
// let someDate = new Date(2021,1,30)
// let someDate = new Date(2021,1,30,23,31,59)
// computer locale
// let likeComputer = Intl.DateTimeFormat().format(new Date())
// let td = today.toString()      //Sat Feb 10 2021 14:56..GMT...
// let td = today.toDateString()  //Sat Feb 10 2021
// let td = today.toLocaleTimeString() //2:56:11 PM

const zDateFunction = ( parm ) => {
    let dt = Date.now()
    if (parm  !== undefined) {
       let [yyyy, mm, dd] = parm
       util.cl('this is some fancy extra function ' , yyyy,mm,dd)
       dt = new Date(yyyy, mm, dd)
       util.cl(dt)
       return dt
    }
    util.cl('this is the end extra function ' , dt)
    util.cl(dt)
    return dt

}

export const tableWork = {
    hello: (p1) => {console.log('hello from (JS) ' , p1)}
    ,name: "JSJudge"
    ,theJudges:[
       {id:37 ,name:"Anton Swarts"},	
       {id:34 ,name:"Ben Snyman"},       
       {id:42 ,name:"Boela Gerber"},	
       {id:44 ,name:"Conrad Louw"},	       
       {id:54 ,name:"Elsie Pels"},	       
       {id:39 ,name:"Gregory Mutambe"},	       
       {id:46 ,name:"Janno Briers-Louw"},	
       {id:47 ,name:"Dr Carien Coetzee"},	
       {id:45 ,name:"Fiona MacDonald"},	       
       {id:48 ,name:"Francois Cillie"},	
       {id:25 ,name:"Germain Lehody"},
       {id:51 ,name:"Heidi Duminy"},	
       {id:52 ,name:"Jacques Steyn"},	
       {id:56 ,name:"Johann Fourie"},
       {id:53 ,name:"Johan Venter"},	
       {id:40 ,name:"Lizette Tolken"},	       
       {id:49 ,name:"Mary-Lou Nash"},	       
       {id:38 ,name:"Morgan Steyn"},	       
       {id:55 ,name:"Nina-Marie Bruwer"},	       
       {id:36 ,name:"Raymond Noppé"},	
       {id:50 ,name:"Sandy Harper"},	
       {id:32 ,name:"Wilhelm Pienaar"}
    ],
    waitForMe: (p1) => {
        return waitABit(p1)
    },
    someFunc: (p1) => {  p1 += 1 ; return p1
    },
    randomColor: function() {
        return Math.floor(Math.random()*16777215).toString(16)
    },
    randomNumberInRange: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1)
}

//const randomNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

async function waitABit(p1) {
    return p1 + "wernerwaited"
}

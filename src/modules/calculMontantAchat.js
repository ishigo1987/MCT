module.exports = (withRemontage,remontageLevel)=>{
   const montantCoupe = require('./calculMontantCoupe.js')();
   const montantCape = require('./calculMontantCape.js')(withRemontage,remontageLevel);
   const primes = require('./sumOfAllPrimes.js')();
   return Number(montantCoupe) + Number(montantCape) + Number(primes);
};
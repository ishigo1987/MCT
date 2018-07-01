module.exports = ()=>{
  const primeTriage = require('./calculPrimeTriage.js')();
  const primeSechoirProvisoire = require('./calculPrimeSechoirProvisoire.js')();
  return Number(primeTriage) + Number(primeSechoirProvisoire);
};
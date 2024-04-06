function CapitalString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
// console.log(CapitalString("swaraj"));
function ReverseString(str) {
  return str.split("").reverse().join("");
}

module.exports = { CapitalString, ReverseString };

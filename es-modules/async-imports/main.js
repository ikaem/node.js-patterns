// main.js

const SUPPORTED_LANGUAGES = ["en", "hr", "it", "de", "cz"]

// here we select the language based on the command line argument
console.log(process.argv)
const selectedLanguage = process.argv[2]

if(!SUPPORTED_LANGUAGES.includes(selectedLanguage)) {
  console.error("Specified language is not supported")

  // then we exit
  process.exit(1)
}

/* here we specify module identifier */
const translationModule = `./strings-${selectedLanguage}.js`

// now we dynamically import  stuff 
import(translationModule)
.then((strings) => {
  console.log(strings.HELLO)
})
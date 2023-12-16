// const fs = require('fs');

// // Load the tokenizer from the JSON file
// const tokenizerJson = fs.readFileSync('tokenizer.json', 'utf8');
// const tokenizerConfig = JSON.parse(tokenizerJson);

// Create a function to tokenize a sentence using the loaded configuration
function tokenizeSentence(sentence, tokenizerConfig) {
  const { word_index } = tokenizerConfig.config;
  const words = sentence.toLowerCase().split(' ');
  const sequence = words.map(word => word_index[word] || 0); // Use 0 for out-of-vocabulary words
  return sequence;
}

// // Tokenize new sentences using the loaded tokenizer configuration
// const newSentence = "What is the chemical formula for water?";

// // Tokenize new sentences
// const newSequences = tokenizeSentence(newSentence, tokenizerConfig);

// // Pad sequences to the desired length (if needed)
// // ...

// // Convert the tokenized sequences to a TensorFlow.js tensor (tf.Tensor)
// const inputTensor = tf.tensor(newSequences);

// console.log(inputTensor.arraySync());  // Print the array representation

module.exports = {
  tokenizeSentence
}

// JavaScript
const tf = require('@tensorflow/tfjs-node');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

const { own_questions, actual_labels } = require('./data');
const stopwords = require('./stopwords');
const { tokenizeSentence } = require('./tokenizer');
const tokenizerJson = fs.readFileSync('./tokenizer.json', 'utf8');
const tokenizerConfig = JSON.parse(tokenizerJson);




app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const getModel = async () => {
    try {
        const model = await tf.loadLayersModel('file://./model.json');
        return model;
    }
    catch (e) {
        console.log(e);

    }
}



const tokenize = (text) => {
    const tokens = text.split(' ');
    // remove stopwords and punctuation
    const filtered = [];
    for (let token of tokens) {
        token = token.toLowerCase();
        for (let char of token) {
            if (char < 'a' || char > 'z') {
                token = token.replace(char, '');
            }
        }
        if (stopwords.includes(token)) {
            continue;
        }
        filtered.push(token);
    }
    // joinj the tokens back together
    const joined = filtered.join(' ');
    // tokenize the text
    const sequence = tokenizeSentence(joined, tokenizerConfig);
    // pad the sequence manually
    const paddedSequence = [];
    for (let i = 0; i < 150; i++) {
        paddedSequence.push(sequence[i] || 0);
    }
    // convert to a tensor
    const input = tf.tensor([paddedSequence]);
    return input;

}


app.get('/', async (req, res) => {
    const model = await getModel();
    // const question = "What is the chemical formula for water?";
    // const tokens = tokenize(question);
    // const prediction = model.predict(tokens);
    // const label = tf.argMax(prediction, axis = 1).dataSync();
    // console.log(label);
    // res.send(label);
    const questions = own_questions;
    const labels = ["chemistry", "physics"]
    const results = [];
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const tokens = tokenize(question);
        const prediction = model.predict(tokens);
        const label = tf.argMax(prediction, axis = 1).dataSync();
        results.push({
            question,
            label: labels[label-1],
            actual_label: actual_labels[i]
        })
    }
    console.log(results);
    res.send(results);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

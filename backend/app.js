// JavaScript
const tf = require('@tensorflow/tfjs-node');
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 5000;


const { own_questions, actual_labels } = require('./data');
const stopwords = require('./stopwords');
const { tokenizeSentence } = require('./tokenizer');
const tokenizerJson = fs.readFileSync('./tokenizer.json', 'utf8');
const tokenizerConfig = JSON.parse(tokenizerJson);
const xlsx = require('xlsx');

const { upload, deletefile } = require('./multer');


app.use(cors());
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
    for (let i = 0; i < 50; i++) {
        paddedSequence.push(sequence[i] || 0);
    }
    // convert to a tensor
    const input = tf.tensor([paddedSequence]);
    return input;

}

const predict = async (questions) => {
    const model = await getModel();
    const labels = ["chemistry", "physics", "mathematics"];
    const results = [];
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const tokens = tokenize(question);
        const prediction = model.predict(tokens);
        const label = tf.argMax(prediction, axis = 1).dataSync();
        results.push({
            label: labels[label - 1],
        })
    }
    return results;
}


app.post('/', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        const rows = [];
        const questions = [];
        const answer = [];

        const wb = xlsx.readFileSync(file.path);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(ws);
        for (let i = 0; i < data.length; i++) {
            rows.push(data[i]);
        }
        for (let i = 0; i < rows.length; i++) {
            questions.push(rows[i]['Question']);
            answer.push(rows[i]['Student1']);
        }

        const results = await predict(questions);
        await deletefile(file.filename);

        const total = results.length;
        let correct = 0, incorrect = 0, phy_correct = 0, chem_correct = 0, math_correct = 0, phy_incorrect = 0, chem_incorrect = 0, math_incorrect = 0, phy_total = 0, chem_total = 0, math_total = 0;
        for (let i = 0; i < total; i++) {
            if (answer[i] == 1) {
                correct++;
                if (results[i].label == 'physics') {
                    phy_correct++;
                    phy_total++;
                }
                else if (results[i].label == 'chemistry') {
                    chem_correct++;
                    chem_total++;
                }
                else {
                    math_correct++;
                    math_total++;
                }
            }
            else {
                incorrect++;
                if (results[i].label == 'physics') {
                    phy_incorrect++;
                    phy_total++;
                }
                else if (results[i].label == 'chemistry') {
                    chem_incorrect++;
                    chem_total++;
                }
                else {
                    math_incorrect++;
                    math_total++;
                }
            }
        }
        const final_result = {
            total: total,
            correct: correct,
            incorrect: incorrect,
            phy_correct: phy_correct,
            chem_correct: chem_correct,
            math_correct: math_correct,
            phy_incorrect: phy_incorrect,
            chem_incorrect: chem_incorrect,
            math_incorrect: math_incorrect,
            phy_total: phy_total,
            chem_total: chem_total,
            math_total: math_total
        }
        
        res.json(final_result);
    }
    catch (e) {
        console.log(e);
    }
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const csv = require('csv-parser');

const topics = [];
const questions = [];

fs.createReadStream('example.csv')
  .pipe(csv())
  .on('data', (data) => {
    topics.push(data.Topic);
    questions.push(data.Questions);
  })
  .on('end', () => {
    console.log('Topics:', topics);
    console.log('Questions:', questions);
    // Process the arrays as needed
  });

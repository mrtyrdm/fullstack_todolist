import express from 'express';
import postApi from './routers/postApi.js'
import bodyParser from 'body-parser';

const app = express();
const cors = require('cors');

app.use(express.json())

app.use(cors());
app.use(bodyParser.json());
app.use('/api', postApi);


app.listen(8888, () => {
	console.log(`Server is running on s!`);
});
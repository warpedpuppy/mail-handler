if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());

// ADD CORS BEFORE PUT INTO PRODUCTION 
app.use(cors());

const ses = require('./ses');

app.post('/email-handler', async (req, res) => {

    let result = await ses(req.body.message)
    if (result.ResponseMetadata && result.ResponseMetadata.RequestId) {
        res.json({success: true})
    } else {
        res.json({success: false})
    }
})


app.listen(process.env.PORT || 8080, () => console.log(`listening on ${process.env.PORT}`))
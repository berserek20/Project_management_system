const express = require('express');
const router = express.Router();
const cors = require('cors')
const app = express()
const {extdocfetch, extaddItem}=require('../controller/extController.js')

app.use(cors())
app.use(express.json())


router.get('/', extdocfetch);
router.post('/', extaddItem);





// router.post('/login', auth.login);




module.exports = router;
const axios = require('axios');
const express = require('express');
const router = express.Router();
const api = require('../apiKey');

const crtfc_key = api.financialReport.apiKey;

/* GET users listing. */
router.get('/multi', async (req, res, next) => {
  try {
    const response = await axios.request({
      url: 'https://opendart.fss.or.kr/api/list.json',
      crtfc_key,
    });
    res.send(response.data);
  } catch (error) {
    res.send('Error Occuered!');
  }
});

router.get('/single', async (req, res, next) => {
  try {
    const response = await axios.get(
      'https://opendart.fss.or.kr/api/list.json',
      {
        params: {
          crtfc_key,
          bsns_year: '2021',
          reprt_code: '11013',
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    res.send('Error!');
  }
});

router.get('/corpCode', async (req, res, next) => {
  try {
    const response = await axios.get(
      'https://opendart.fss.or.kr/api/corpCode.xml',
      {
        params: {
          crtfc_key,
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

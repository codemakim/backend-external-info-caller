const { default: axios } = require('axios');
const express = require('express');
const api = require('../apiKey');
const router = express.Router();

/**
 * 응답 객체
 * response.body.numOfRows : 페이지 별 데이터 수
 * response.body.pageNo : 페이지 번호
 * response.body.totalCount : 총 검색된 데이터 수
 * response.body.items.item : 검색된 데이터 배열
 * - basDt : 기준 날짜 String (YYYYMMDD)
 * - itmsNm : 종목명 String
 * - mrktCtg : 시장 종류 String (KOSPI, KOSDAQ)
 * - fltRt : 등락률 String
 * - mkp : 시가 String (장이 시작될 때 거래된 가격)
 * - clpr : 종가 String
 * - hipr : 고가 String
 * - lopr : 저가 String
 * - vs : 등락 금액 String
 * - trqu : 거래량 String
 * - trPrc : 거래금액 String
 */
router.get('/', async (req, res, next) => {
  const query = req.query;
  const params = {
    serviceKey: api.stockInfo.apiKey,
    resultType: 'json', // 결과 형식 (xml | json)
    pageNo: query?.page || 1, // 페이지 (Number)
    numOfRows: query?.size || 30, // 페이지 당 데이터 수
    basDt: query.searchDate, // 검색 기준일과 같은 날짜 데이터
    beginBasDt: query.fromDate, // 검색 시작 일
    endBasDt: query.toDate, // 검색 마지막 일
    likeItmsNm: query.name, // 종목 명 (like 검색)
    mrktCls: query.marketClass, // 시장구분 값
    beginFltRt: query.beginUpDown, // 등락률이 크거나 같은 값
    endFltRt: query.endUpDown, // 등락률이 작은 값
    beginVs: query.beginVariableAmmount, // 등락 금액이 크거나 같은 값
    endVs: query.endVariableAmmount, // 등락 금액이 작은 값
    beginTrqu: query.beginTrade, // 거래량이 크거나 같은 값
    endTrqu: query.endTrade, // 거래량이 작은 값
    beginLstgStCnt: query.beginStock, // 상장 주식 수가 크거나 같은 값
    endLstgStCnt: query.endStock, // 상장 주식 수가 작은 값
    beginMrktTotAmt: query.beginPriceTotal, // 시가 총액이 크거나 같은 값
    endMrktTotAmt: query.endPriceTotal, // 시가 총액이 작은 값
  };
  const paramKeys = Object.keys(params);
  paramKeys.forEach(key => {
    if (!params[key]) delete params[key];
  });
  const result = await axios.get(
    'https://api.odcloud.kr/api/GetStockSecuritiesInfoService/v1/getStockPriceInfo',
    {
      params,
    }
  );
  res.send(result.data);
});

module.exports = router;

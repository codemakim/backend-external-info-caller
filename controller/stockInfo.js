const utils = require('../utils');

module.exports = {
  /**
   * 주가 정보 검색 요청을 전달받아 해당하는 주가 정보를 반환합니다.
   * @param {object} req 요청 객체
   * @param {object} res  응답 객체
   * @param {object} next
   */
  async stockPriceInfo(req, res, next) {
    const query = {
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
    const params = utils.objectRemoveFalsyProperty(query);
    const response = await axios.get(
      'https://api.odcloud.kr/api/GetStockSecuritiesInfoService/v1/getStockPriceInfo',
      {
        params,
      }
    );
    res.send(response.data);
  },
};

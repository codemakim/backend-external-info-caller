const { cloneDeep } = require('lodash');

module.exports = {
  /**
   * 오브젝트를 전달받아, falsy 값을 가진 속성을 제거한 새로운 객체를 반환합니다.
   * @param {object} obj
   * @returns
   */
  objectRemoveFalsyProperty(obj) {
    const newObj = cloneDeep(obj);
    const keys = Object.keys(newObj);
    return keys.forEach(key => {
      if (!newObj[key]) delete newObj[key];
    });
  },
};

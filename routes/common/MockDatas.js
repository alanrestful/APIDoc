/**
 * Created by macbook on 2017/3/28.
 */
const Mock = require('../../models/Mock').Mock;
const mockDao = new Mock;

/**
 * 获取自定义模拟数据
 */
class MockDatas {
  constructor() {

  };

  /**
   * 从db中获取数据
   * @param path
   * @param method
   * @param appId
   * @returns {Promise}
   */
  getData(path, method, appId) {
    return new Promise((resolve, reject) => {
      mockDao.findBy(appId, path, method).then((data) => {
        if (!data || data.length === 0) {
          //返回null    或者是默认数据？
          resolve([]);
        }
        resolve(data);
      }).catch((e) => {
        console.error(e);
        reject(e);
      })
    })
  }

  /**
   * 根据条件进行筛选数据   先来精确查找吧，目前智能不起来 T^T,
   * @param data ,Array
   * @param criteria ,{userId: 16, age: 12}
   */
  filterMock(data, criteria) {
    let results = [];
    return new Promise((resolve, reject) => {
      data.forEach((item, i, array) => {
        let origionalCriteria = item.criteria;
        if (ObjectUtil.isEquals(criteria, origionalCriteria)) {
          results.push(item);
        }
      });
      if (results.length > 0) {
        resolve(results[0].mockData);
      } else {
        resolve(null)
      }
    })
  }
}

module.exports = {MockDatas: MockDatas};

class ObjectUtil {
  static isEquals(obj1, obj2) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
    for (let i in obj1) {
      if (obj1[i] !== obj2[i]) return false;
    }
    return true;
  }
}
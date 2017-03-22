/**
 * Created by macbook on 2017/3/22.
 */
//将识别参数转换成相同的结构

var PathKey = require('../../models/Path').PathKey;
var pathKeyDao = new PathKey();

class ParamManager {
  constructor(req) {
    this.parameters = [];
    this.params = req.params;
    this.body = req.body;
    this.query = req.query;
    this.method = req.method;

/*  this.path; // 原path
    this.searchPath; //查询数据库的字符串
    this.resultPath; //从数据库中找到的匹配path

    */

  }

  process() {

    //处理路径变量
    return new Promise((resolve, rejcet) => {
      this.processPathVariables().then(() => {
        this.convertForMethod();
        console.log(this);
        resolve(this);
      });
    });


  }

  processPathVariables() {
    if (!this.params || this.params.length === 0) {
      return;
    }
    this.appId = this.params['appId'];
    this.path = this.params['0'];
    this.checkPathVariable(this.params[0]); //获取请求的目标路径 /api/user/login
    return this.convertPath();
  }

  /**
   * 检查在path中的变量，可能有多个 /api/order/12/23,这里只做数字类型的查找
   * @param api
   * @returns {*}
   */
  checkPathVariable(api) {
    if (!api.startsWith('/')) api = '/' + api;
    var pathArray = api.split('/');
    this.pathParams = [];
    if (pathArray) {
      for (let i = 0; i < pathArray.length; i++ ) {
        if (this.isNumber(pathArray[i])) {
          //如果是数字，表示是一个变量
          this.pathParams.push({index: i, value: pathArray[i]});
          pathArray.splice(i, 1, '\\\{[A-Za-z]+\\\}');
        }
      }
    }
    if (this.pathParams.length === 0) {
      this.searchPath = api;
      this.resultPath = api;
      return api;
    } else {
      this.searchPath = pathArray.join('/');
    }
  };

  /**
   * 转变path中有数字的，到数据库中查
   */
  convertPath() {
    return pathKeyDao.findBy(this.appId, this.searchPath).then((result) => {
      if (!result || result.length === 0) return Promise.reject(JSON.stringify(new Error({status: 404, message: 'can not find ' + this.searchPath})))
      if (result.length === 1) {
        //查到1个,进行恢复
        let path = result[0].apiPath.split('/');
        this.paths = {};
        // if (path.length !== this.pathParams.length) return Promise.reject(new Error('404'));
        for (let i = 0; i < this.pathParams.length; i++ ) {
          let index = this.pathParams[i].index;
          let value = this.pathParams[i].value;
          this.pathParams[i].key = path[index].match(/[a-zA-Z\\_\\-]+/)[0];
          this.paths[this.pathParams[i].key] = value;
        }
        this.resultPath = result[0].apiPath;
      } else {

      }
      return Promise.resolve();
    });
  }

  //查询path，检查key

  isNumber(str) {
    return parseInt(str);
  }

  /**
   * 主要是根据方法来处理参数分类
   *
   */
  convertForMethod() {
    // if (!this.query) return;
    switch(this.method.toUpperCase()) {
      case 'GET':
        this.convertForGet();
        break;
      case 'POST':
        this.convertForPost();
        break;
      case 'PUT':
        this.convertForPut();
        break;
      case 'DELETE':
        this.convertForDelete();
        break;
      default:
        console.error('undefined method ' + this.method);
    }
  }

  convertForGet() {
    for (let i in this.query) {
      this.parameters.push({name: i, in: 'query', value: this.query[i]})
    }
    for (let i = 0; i < this.pathParams.length; i++ ) {
      this.parameters.push({name: this.pathParams[i].key, in: 'path', value: this.pathParams[i].value})
    }
  }

  convertForPost() {
    for (let i in this.body) {
      this.parameters.push({name: i, in: 'body', value: this.body[i]})
    }
    for (let i = 0; i < this.pathParams.length; i++ ) {
      this.parameters.push({name: this.pathParams[i].key, in: 'path', value: this.pathParams[i].value})
    }

  }

  convertForPut() {
    for (let i in this.query) {
      this.parameters.push({name: i, in: 'query', value: this.query[i]})
    }
    for (let i = 0; i < this.pathParams.length; i++ ) {
      this.parameters.push({name: this.pathParams[i].key, in: 'path', value: this.pathParams[i].value})
    }
    for (let i in this.body) {
      this.parameters.push({name: i, in: 'body', value: this.body[i]})
    }
  }

  convertForDelete() {
    for (let i in this.query) {
      this.parameters.push({name: i, in: 'query', value: this.query[i]})
    }
    for (let i = 0; i < this.pathParams.length; i++ ) {
      this.parameters.push({name: this.pathParams[i].key, in: 'path', value: this.pathParams[i].value})
    }
  }



}

class Parameter {
  constructor(name, position, type) {
    this.name = name;
    this.position = position;
    this.type = type;
  }
}


// {
//   name: name,
//   in: in,
//   type: type
// }

module.exports = ParamManager;
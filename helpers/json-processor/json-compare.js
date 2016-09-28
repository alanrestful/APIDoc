/**
 * Created by macbook on 16/9/22.
 * the way to compare two jsonObject, and find the differents of them.
 */

/**
 * path,desc:{old:XX,new:XX}
 * @type {{}}
 */

var p1 = {"get":{"responses":{"200":{"schema":{"items":{"$ref":"#/definitions/Product"},"type":"array"},"description":"An array of products"},"default":{"schema":{"$ref":"#/definitions/Error"},"description":"Unexpected error"}},"tags":["Products"],"parameters":[{"format":"double","type":"number","required":true,"description":"Latitude component of location.","in":"query","name":"latitude"},{"format":"double","type":"number","required":true,"description":"Longitude component of location.","in":"query","name":"longitude"}],"description":"The Products endpoint returns information about the *Uber* products\noffered at a given location. The response includes the display name\nand other details about each product, and lists the products in the\nproper display order.\n","summary":"Product Types"}}

var p2 = {"get":{"responses":{"200":{"schema":{"items":{"$ref":"#/definitions/Product"},"type":"array"},"description":"An array of products"},"default":{"schema":{"$ref":"#/definitions/Error"},"description":"Unexpected error"}},"tags":["Products","ttts"],"parameters":[{"format":"double","type":"number","required":true,"description":"Latitude component of location.","in":"query","name":"latitude"},{"format":"double","type":"number","required":true,"description":"Longitude component of location.","in":"query","name":"longitude"}],"description":"The Products endpoint returns information about the *Uber* products\noffered at a given location. The response includes the display name\nand other details about each product, and lists the products in the\nproper display order.\n","summary":"Product Types"}}


function JsonComparer() {
    var result ;
    result = {};
    result["add"] = [];
    result["del"] = [];
    result["update"] = [];


    /**
     *
     * @param obj1
     * @param obj2
     * @param cb
     * @constructor
     */
    var start = function(obj1, obj2, cb){
        if ( !(obj1 && typeof obj1 == 'object')) {
            cb("obj1 is not an object");
            return;
        }
        if ( !(obj1 && typeof obj1 == 'object')) {
            cb("obj2 is not an object");
            return;
        }
        ObjParser(obj1, obj2);
        cb(null, result);
    };

    /**
     * 解析json开始
     * @constructor
     * @param obj1 - base
     * @param obj2 - after
     * @param path1
     * @param path2
     */
    var ObjParser = function(obj1, obj2, path1, path2) {
        path1 = path1 || '';
        path2 = path2 || '';
        for (var a in obj1) {
            var pathTo1 = path1 + "." + a;
            var obj1Has = obj1.hasOwnProperty(a),
                obj2Has = obj2.hasOwnProperty(a);
            if (obj1Has && obj2Has) {
                // 对比不同
                // 类型不同的直接抛出
                if (obj1[a].constructor !== obj2[a].constructor) {
                    result.update.push({path: pathTo1, desc:{base: obj1[a], top: obj2[a]}});
                    continue;
                }
                // 类型为Object的进行递归比较
                if (obj1[a].constructor == Object) {
                    ObjParser(obj1[a], obj2[a], pathTo1, pathTo1);
                }

                // 类型为Array的进行比较
                if (obj1[a].constructor == Array) {
                    // 暂时只做大小比较 类型比较
                    // if (obj1[a].length !== obj2[a].length ||
                    //     typeof obj1[a][0] !== typeof obj2[a][0] ||
                    //     JSON.stringify(obj1[a]) !== JSON.stringify(obj2[a]))
                    // {
                    //     result.update.push({path: pathTo1, desc:{base: obj1[a], top: obj2[a]}});
                    //     continue;
                    // }
                    ArrayParser(obj1[a], obj2[a], pathTo1, pathTo1);
                }

                // 类型相同比较
                if (obj1[a].constructor == String || obj1[a].constructor == Number || obj1[a].constructor == Boolean) {
                    if (obj1[a] !== obj2[a]) {
                        result.update.push({path: pathTo1, desc: {base: obj1[a], top: obj2[a]}});

                    }
                }
            } else if (obj1Has && !obj2Has) {
                // obj2 在 obj1 的基础上减少
                result.del.push({path:pathTo1, desc:{base: obj1[a]}});
            } else {
                // 其他情况的处理
            }
        }
        // obj2新增的对象扫描
        for (var b in obj2) {
            var pathTo2 = path2 + "." + b;
            //noinspection JSDuplicatedDeclaration
            var obj1Has = obj1.hasOwnProperty(b),
                obj2Has = obj2.hasOwnProperty(b);
            if (!obj1Has && obj2Has) {
                // obj2 在 obj1 的基础上增加
                result.add.push({path: pathTo2, desc: {top: obj2[b] }});
            }
        }
    };

    /**
     * 数组解析,如果数组 String,Number,Boolean
     * @param arr1
     * @param arr2
     * @constructor
     */
    var ArrayParser = function(arr1,arr2, path1, path2) {
        if ((arr1 && typeof arr1 == 'object' && arr1.constructor == Array) &&
            (arr2 && typeof arr2 == 'object' && arr2.constructor == Array)) {
            for (var n1 in arr1) {
                var val = arr1[n1];
                var exist = false;
                for (var n2 in arr2) {
                    var val2 = arr2[n2];
                    if (['string', 'number', 'boolean'].indexOf(typeof val) > -1 && typeof val == typeof val2) {
                        if (val == val2) {
                            exist = true;
                            arr2.splice(n2, 1);
                            arr1.splice(n1, 1);
                            break;
                        }
                    } else if (typeof val == 'object') {
                        if (val.hasOwnProperty('name') && val2.hasOwnProperty('name')
                            && val.name == val2.name)
                            arr2.splice(n2, 1);
                            arr1.splice(n1, 1);
                            ObjParser(val, val2,path1, path2);
                    }
                }
                if (['string', 'number', 'boolean'].indexOf(typeof val) > -1 && typeof val == typeof val2
                    && !exist) {
                    result.del.push({path: path1, desc: {base: val}});
                }
            }

            for (var o2 in arr2) {
                (function(){
                    var val = arr2[o2];
                    var exist = false;
                    for (var o1 in arr1) {
                        var val2 = arr1[o1];
                        if (['string', 'number', 'boolean'].indexOf(typeof val) > -1 && typeof val == typeof val2) {
                            if (val == val2) {
                                exist = true;
                                break;
                            }
                        } else if (typeof val == 'object') {
                            if (val.hasOwnProperty('name') && val2.hasOwnProperty('name')
                                && val.name == val2.name)
                                ObjParser(val, val2, path1, path2);
                        }
                    }
                    if (['string', 'number', 'boolean'].indexOf(typeof val) > -1
                        && !exist) {
                        result.add.push({path: path2, desc: {top: val}});
                    }
                })()
            }
        }
    };

    return {
        start: start,
        ObjParser: ObjParser,
        ArrayParser: ArrayParser
    }

}
exports.json_comparer = JsonComparer;

JsonComparer().start(p1, p2, function(err, result) {
    console.log(JSON.stringify(result));
});
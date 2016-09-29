/**
 * Created by macbook on 16/9/22.
 * the way to compare two jsonObject, and find the differents of them.
 */

/**
 * path,desc:{old:XX,new:XX}
 * @type {{}}
 */

var p1 = {
    "swagger": "2.0",
    "info": {
        "title": "Uber API",
        "description": "Move your app forward with the Uber API",
        "version": "1.0.0"
    },
    "host": "api.uber.com",
    "schemes": [
        "https"
    ],
    "basePath": "/v1",
    "produces": [
        "application/json"
    ],
    "paths": {
        "/products": {
            "get": {
                "summary": "Product Types",
                "description": "The Products endpoint returns information about the *Uber* products\noffered at a given location. The response includes the display name\nand other details about each product, and lists the products in the\nproper display order.\n",
                "parameters": [
                    {
                        "name": "latitude",
                        "in": "query",
                        "description": "Latitude component of location.",
                        "required": true,
                        "type": "number",
                        "format": "double"
                    },
                    {
                        "name": "longitude",
                        "in": "query",
                        "description": "Longitude component of location.",
                        "required": true,
                        "type": "number",
                        "format": "double"
                    }
                ],
                "tags": [
                    "Products"
                ],
                "responses": {
                    "200": {
                        "description": "An array of products",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Product"
                            }
                        }
                    },
                    "default": {
                        "description": "Unexpected error",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/estimates/price": {
            "get": {
                "summary": "Price Estimates",
                "description": "The Price Estimates endpoint returns an estimated price range\nfor each product offered at a given location. The price estimate is\nprovided as a formatted string with the full price range and the localized\ncurrency symbol.<br><br>The response also includes low and high estimates,\nand the [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code for\nsituations requiring currency conversion. When surge is active for a particular\nproduct, its surge_multiplier will be greater than 1, but the price estimate\nalready factors in this multiplier.\n",
                "parameters": [
                    {
                        "name": "start_latitude",
                        "in": "query",
                        "description": "Latitude component of start location.",
                        "required": true,
                        "type": "number",
                        "format": "double"
                    },
                    {
                        "name": "start_longitude",
                        "in": "query",
                        "description": "Longitude component of start location.",
                        "required": true,
                        "type": "number",
                        "format": "double"
                    },
                    {
                        "name": "end_latitude",
                        "in": "query",
                        "description": "Latitude component of end location.",
                        "required": true,
                        "type": "number",
                        "format": "double"
                    },
                    {
                        "name": "end_longitude",
                        "in": "query",
                        "description": "Longitude component of end location.",
                        "required": true,
                        "type": "number",
                        "format": "double"
                    }
                ],
                "tags": [
                    "Estimates"
                ],
                "responses": {
                    "200": {
                        "description": "An array of price estimates by product",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/PriceEstimate"
                            }
                        }
                    },
                    "default": {
                        "description": "Unexpected error",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/estimates/time": {
            "get": {
                "summary": "Time Estimates",
                "description": "The Time Estimates endpoint returns ETAs for all products offered at a given location, with the responses expressed as integers in seconds. We recommend that this endpoint be called every minute to provide the most accurate, up-to-date ETAs.",
                "parameters": [
                    {
                        "name": "start_latitude",
                        "in": "query",
                        "description": "Latitude component of start location.",
                        "required": true,
                        "type": "number",
                        "format": "double"
                    },
                    {
                        "name": "start_longitude",
                        "in": "query",
                        "description": "Longitude component of start location.",
                        "required": true,
                        "type": "number",
                        "format": "double"
                    },
                    {
                        "name": "customer_uuid",
                        "in": "query",
                        "type": "string",
                        "format": "uuid",
                        "description": "Unique customer identifier to be used for experience customization."
                    },
                    {
                        "name": "product_id",
                        "in": "query",
                        "type": "string",
                        "description": "Unique identifier representing a specific product for a given latitude & longitude."
                    }
                ],
                "tags": [
                    "Estimates"
                ],
                "responses": {
                    "200": {
                        "description": "An array of products",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Product"
                            }
                        }
                    },
                    "default": {
                        "description": "Unexpected error",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/me": {
            "get": {
                "summary": "User Profile",
                "description": "The User Profile endpoint returns information about the Uber user that has authorized with the application.",
                "tags": [
                    "User"
                ],
                "responses": {
                    "200": {
                        "description": "Profile information for a user",
                        "schema": {
                            "$ref": "#/definitions/Profile"
                        }
                    },
                    "default": {
                        "description": "Unexpected error",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/history": {
            "get": {
                "summary": "User Activity",
                "description": "The User Activity endpoint returns data about a user's lifetime activity with Uber. The response will include pickup locations and times, dropoff locations and times, the distance of past requests, and information about which products were requested.<br><br>The history array in the response will have a maximum length based on the limit parameter. The response value count may exceed limit, therefore subsequent API requests may be necessary.",
                "parameters": [
                    {
                        "name": "offset",
                        "in": "query",
                        "type": "integer",
                        "format": "int32",
                        "description": "Offset the list of returned results by this amount. Default is zero."
                    },
                    {
                        "name": "limit",
                        "in": "query",
                        "type": "integer",
                        "format": "int32",
                        "description": "Number of items to retrieve. Default is 5, maximum is 100."
                    }
                ],
                "tags": [
                    "User"
                ],
                "responses": {
                    "200": {
                        "description": "History information for the given user",
                        "schema": {
                            "$ref": "#/definitions/Activities"
                        }
                    },
                    "default": {
                        "description": "Unexpected error",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "Product": {
            "type": "object",
            "properties": {
                "product_id": {
                    "type": "string",
                    "description": "Unique identifier representing a specific product for a given latitude & longitude. For example, uberX in San Francisco will have a different product_id than uberX in Los Angeles."
                },
                "description": {
                    "type": "string",
                    "description": "Description of product."
                },
                "display_name": {
                    "type": "string",
                    "description": "Display name of product."
                },
                "capacity": {
                    "type": "string",
                    "description": "Capacity of product. For example, 4 people."
                },
                "image": {
                    "type": "string",
                    "description": "Image URL representing the product."
                }
            }
        },
        "PriceEstimate": {
            "type": "object",
            "properties": {
                "product_id": {
                    "type": "string",
                    "description": "Unique identifier representing a specific product for a given latitude & longitude. For example, uberX in San Francisco will have a different product_id than uberX in Los Angeles"
                },
                "currency_code": {
                    "type": "string",
                    "description": "[ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code."
                },
                "display_name": {
                    "type": "string",
                    "description": "Display name of product."
                },
                "estimate": {
                    "type": "string",
                    "description": "Formatted string of estimate in local currency of the start location. Estimate could be a range, a single number (flat rate) or \"Metered\" for TAXI."
                },
                "low_estimate": {
                    "type": "number",
                    "description": "Lower bound of the estimated price."
                },
                "high_estimate": {
                    "type": "number",
                    "description": "Upper bound of the estimated price."
                },
                "surge_multiplier": {
                    "type": "number",
                    "description": "Expected surge multiplier. Surge is active if surge_multiplier is greater than 1. Price estimate already factors in the surge multiplier."
                }
            }
        },
        "Profile": {
            "type": "object",
            "properties": {
                "first_name": {
                    "type": "string",
                    "description": "First name of the Uber user."
                },
                "last_name": {
                    "type": "string",
                    "description": "Last name of the Uber user."
                },
                "email": {
                    "type": "string",
                    "description": "Email address of the Uber user"
                },
                "picture": {
                    "type": "string",
                    "description": "Image URL of the Uber user."
                },
                "promo_code": {
                    "type": "string",
                    "description": "Promo code of the Uber user."
                }
            }
        },
        "Activity": {
            "type": "object",
            "properties": {
                "uuid": {
                    "type": "string",
                    "description": "Unique identifier for the activity"
                }
            }
        },
        "Activities": {
            "type": "object",
            "properties": {
                "offset": {
                    "type": "integer",
                    "format": "int32",
                    "description": "Position in pagination."
                },
                "limit": {
                    "type": "integer",
                    "format": "int32",
                    "description": "Number of items to retrieve (100 max)."
                },
                "count": {
                    "type": "integer",
                    "format": "int32",
                    "description": "Total number of items available."
                },
                "history": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Activity"
                    }
                }
            }
        },
        "Error": {
            "type": "object",
            "properties": {
                "code": {
                    "type": "integer",
                    "format": "int32"
                },
                "message": {
                    "type": "string"
                },
                "fields": {
                    "type": "string"
                }
            }
        }
    }
}
var p2 = {
    "swagger": "2.0",
    "info": {
        "title": "Uber API",
        "description": "Move your app forward with the Uber API",
        "version": "1.0.0"
    },
    "host": "api.uber.com",
    "schemes": [
        "https"
    ],
    "basePath": "/v1",
    "produces": [
        "application/json"
    ],
    "paths": {
        "/products": {
            "get": {
                "summary": "Product Types",
                "description": "The Products endpoint returns information about the *Uber* products\noffered at a given location. The response includes the display name\nand other details about each product, and lists the products in the\nproper display order.\n",
                "parameters": [
                    {
                        "name": "latitude",
                        "in": "query",
                        "description": "Latitude component of location.",
                        "required": true,
                        "type": "number",
                        "format": "double"
                    },
                    {
                        "name": "longitude",
                        "in": "query",
                        "description": "Longitude component of location.",
                        "required": true,
                        "type": "number",
                        "format": "double"
                    }
                ],
                "tags": [
                    "Products"
                ],
                "responses": {
                    "200": {
                        "description": "An array of products",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Product"
                            }
                        }
                    },
                    "default": {
                        "description": "Unexpected error",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/estimates/price": {
            "get": {
                "summary": "Price Estimates",
                "description": "The Price Estimates endpoint returns an estimated price range\nfor each product offered at a given location. The price estimate is\nprovided as a formatted string with the full price range and the localized\ncurrency symbol.<br><br>The response also includes low and high estimates,\nand the [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code for\nsituations requiring currency conversion. When surge is active for a particular\nproduct, its surge_multiplier will be greater than 1, but the price estimate\nalready factors in this multiplier.\n",
                "parameters": [
                    {
                        "name": "start_latitude",
                        "in": "query",
                        "description": "Latitude component of start location.",
                        "required": true,
                        "type": "number",
                        "format": "double"
                    },
                    {
                        "name": "start_longitude",
                        "in": "query",
                        "description": "Longitude component of start location.",
                        "required": true,
                        "type": "number",
                        "format": "double"
                    },
                    {
                        "name": "end_latitude",
                        "in": "query",
                        "description": "Latitude component of end location.",
                        "required": true,
                        "type": "number",
                        "format": "double"
                    },
                    {
                        "name": "end_longitude",
                        "in": "query",
                        "description": "Longitude component of end location.",
                        "required": true,
                        "type": "number",
                        "format": "double"
                    }
                ],
                "tags": [
                    "Estimates"
                ],
                "responses": {
                    "200": {
                        "description": "An array of price estimates by product",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/PriceEstimate"
                            }
                        }
                    },
                    "default": {
                        "description": "Unexpected error",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/estimates/time": {
            "get": {
                "summary": "Time Estimates",
                "description": "The Time Estimates endpoint returns ETAs for all products offered at a given location, with the responses expressed as integers in seconds. We recommend that this endpoint be called every minute to provide the most accurate, up-to-date ETAs.",
                "parameters": [
                    {
                        "name": "start_latitude",
                        "in": "query",
                        "description": "Latitude component of start location.",
                        "required": true,
                        "type": "number",
                        "format": "double"
                    },
                    {
                        "name": "start_longitude",
                        "in": "query",
                        "description": "Longitude component of start location.",
                        "required": true,
                        "type": "number",
                        "format": "double"
                    },
                    {
                        "name": "customer_uuid",
                        "in": "query",
                        "type": "string",
                        "format": "uuid",
                        "description": "Unique customer identifier to be used for experience customization."
                    },
                    {
                        "name": "product_id",
                        "in": "query",
                        "type": "strings",
                        "description": "Unique identifier representing a specific product for a given latitude & longitude."
                    }
                ],
                "tags": [
                    "Estimates"
                ],
                "responses": {
                    "200": {
                        "description": "An array of products",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Product"
                            }
                        }
                    },
                    "default": {
                        "description": "Unexpected error",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/me": {
            "get": {
                "summary": "User Profile",
                "description": "The User Profile endpoint returns information about the Uber user that has authorized with the application.",
                "tags": [
                    "User"
                ],
                "responses": {
                    "200": {
                        "description": "Profile information for a user",
                        "schema": {
                            "$ref": "#/definitions/Profile"
                        }
                    },
                    "default": {
                        "description": "Unexpected error",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/history": {
            "get": {
                "summary": "User Activity",
                "description": "The User Activity endpoint returns data about a user's lifetime activity with Uber. The response will include pickup locations and times, dropoff locations and times, the distance of past requests, and information about which products were requested.<br><br>The history array in the response will have a maximum length based on the limit parameter. The response value count may exceed limit, therefore subsequent API requests may be necessary.",
                "parameters": [
                    {
                        "name": "offset",
                        "in": "query",
                        "type": "integer",
                        "format": "int32",
                        "description": "Offset the list of returned results by this amount. Default is zero."
                    },
                    {
                        "name": "limit",
                        "in": "query",
                        "type": "integer",
                        "format": "int32",
                        "description": "Number of items to retrieve. Default is 5, maximum is 100."
                    }
                ],
                "tags": [
                    "User"
                ],
                "responses": {
                    "200": {
                        "description": "History information for the given user",
                        "schema": {
                            "$ref": "#/definitions/Activities"
                        }
                    },
                    "default": {
                        "description": "Unexpected error",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "Product": {
            "type": "object",
            "properties": {
                "product_id": {
                    "type": "string",
                    "description": "Unique identifier representing a specific product for a given latitude & longitude. For example, uberX in San Francisco will have a different product_id than uberX in Los Angeles."
                },
                "description": {
                    "type": "string",
                    "description": "Description of product."
                },
                "display_name": {
                    "type": "string",
                    "description": "Display name of product."
                },
                "capacity": {
                    "type": "string",
                    "description": "Capacity of product. For example, 4 people."
                },
                "image": {
                    "type": "string",
                    "description": "Image URL representing the product."
                }
            }
        },
        "PriceEstimate": {
            "type": "object",
            "properties": {
                "product_id": {
                    "type": "string",
                    "description": "Unique identifier representing a specific product for a given latitude & longitude. For example, uberX in San Francisco will have a different product_id than uberX in Los Angeles"
                },
                "currency_code": {
                    "type": "string",
                    "description": "[ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code."
                },
                "display_name": {
                    "type": "string",
                    "description": "Display name of product."
                },
                "estimate": {
                    "type": "string",
                    "description": "Formatted string of estimate in local currency of the start location. Estimate could be a range, a single number (flat rate) or \"Metered\" for TAXI."
                },
                "low_estimate": {
                    "type": "number",
                    "description": "Lower bound of the estimated price."
                },
                "high_estimate": {
                    "type": "number",
                    "description": "Upper bound of the estimated price."
                },
                "surge_multiplier": {
                    "type": "number",
                    "description": "Expected surge multiplier. Surge is active if surge_multiplier is greater than 1. Price estimate already factors in the surge multiplier."
                }
            }
        },
        "Profile": {
            "type": "object",
            "properties": {
                "first_name": {
                    "type": "string",
                    "description": "First name of the Uber user."
                },
                "last_name": {
                    "type": "string",
                    "description": "Last name of the Uber user."
                },
                "email": {
                    "type": "string",
                    "description": "Email address of the Uber user"
                },
                "picture": {
                    "type": "string",
                    "description": "Image URL of the Uber user."
                },
                "promo_code": {
                    "type": "string",
                    "description": "Promo code of the Uber user."
                }
            }
        },
        "Activity": {
            "type": "object",
            "properties": {
                "uuid": {
                    "type": "string",
                    "description": "Unique identifier for the activity"
                }
            }
        },
        "Activities": {
            "type": "object",
            "properties": {
                "offset": {
                    "type": "integer",
                    "format": "int32",
                    "description": "Position in pagination."
                },
                "limit": {
                    "type": "integer",
                    "format": "int32",
                    "description": "Number of items to retrieve (100 max)."
                },
                "count": {
                    "type": "integer",
                    "format": "int32",
                    "description": "Total number of items available."
                },
                "history": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Activity"
                    }
                }
            }
        },
        "Error": {
            "type": "object",
            "properties": {
                "code": {
                    "type": "integer",
                    "format": "int32"
                },
                "message": {
                    "type": "string"
                },
                "fields": {
                    "type": "string"
                }
            }
        }
    }
}

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
                        console.log("update");
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
     * @param arr1O
     * @param arr2O
     * @param path1
     * @param path2
     * @constructor
     */
    var ArrayParser = function(arr1O,arr2O, path1, path2) {

        if ((arr1O && typeof arr1O == 'object' && arr1O.constructor == Array) &&
            (arr2O && typeof arr2O == 'object' && arr2O.constructor == Array)) {
            var arr1 = cloneArray(arr1O), arr2 = cloneArray(arr2O);

            var arr1ToSplice = [], arr2ToSplice = [];
            for (var n1 in arr1) {
                var val = arr1[n1];
                var exist = false;
                for (var n2 in arr2) {
                    var val2 = arr2[n2];
                    if (['string', 'number', 'boolean'].indexOf(typeof val) > -1 && typeof val == typeof val2) {
                        if (val == val2) {
                            exist = true;
                            // console.log(arr1[n1] + " splice n1a");
                            // console.log(arr2[n2] + " splice n2a");
                            arr1ToSplice.push(n1);
                            arr2ToSplice.push(n2);
                            break;
                        }
                    } else if (typeof val == 'object') {
                        if (val.hasOwnProperty('name') && val2.hasOwnProperty('name')
                            && val.name == val2.name) {
                            // console.log(arr1[n1].name + " splice n1b");
                            // console.log(arr2[n2].name + " splice n2b");
                            arr1ToSplice.push(n1);
                            arr2ToSplice.push(n2);
                            exist = true;
                            ObjParser(val, val2, path1, path2);
                        }
                    }
                }
                if (['string', 'number', 'boolean', 'object'].indexOf(typeof val) > -1
                    && !exist) {
                    result.del.push({path: path1, desc: {base: val}});
                }
            }

            for (var s in arr1ToSplice.reverse()) {
                arr1.splice(arr1ToSplice[s],1);
            }
            for (var v in arr2ToSplice.reverse()) {
                arr2.splice(arr2ToSplice[v],1);
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
                                && val.name == val2.name) {
                                exist = true;
                                ObjParser(val, val2, path1, path2);
                            }
                        }
                    }
                    if (['string', 'number', 'boolean', 'object'].indexOf(typeof val) > -1
                        && !exist) {
                        result.add.push({path: path2, desc: {top: val}});
                    }
                })()
            }
        }
    };

    function cloneArray(arr) {
        return (function(){
            var o = [];
            for(var i in arr) {
                o.push(arr[i]);
            }
            return o;
        })()
    };
    return {
        start: start,
        ObjParser: ObjParser,
        ArrayParser: ArrayParser
    }

}
exports.json_comparer = JsonComparer;

// JsonComparer().start(p1, p2, function(err, result) {
//     console.log(JSON.stringify(result));
// });
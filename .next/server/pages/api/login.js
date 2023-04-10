"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/login";
exports.ids = ["pages/api/login"];
exports.modules = {

/***/ "crypto-js":
/*!****************************!*\
  !*** external "crypto-js" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("crypto-js");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "nextjs-cors":
/*!******************************!*\
  !*** external "nextjs-cors" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("nextjs-cors");

/***/ }),

/***/ "(api)/./src/pages/api/login.ts":
/*!********************************!*\
  !*** ./src/pages/api/login.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _utilts_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilts/database */ \"(api)/./src/utilts/database.ts\");\n/* harmony import */ var nextjs_cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nextjs-cors */ \"nextjs-cors\");\n/* harmony import */ var nextjs_cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nextjs_cors__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! crypto-js */ \"crypto-js\");\n/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function handler(req, res) {\n    await nextjs_cors__WEBPACK_IMPORTED_MODULE_1___default()(req, res, {\n        methods: [\n            \"GET\",\n            \"HEAD\",\n            \"PUT\",\n            \"PATCH\",\n            \"POST\",\n            \"DELETE\",\n            \"OPTIONS\"\n        ],\n        origin: \"*\",\n        optionsSuccessStatus: 200\n    });\n    try {\n        const userCollection = await (0,_utilts_database__WEBPACK_IMPORTED_MODULE_0__.getCollection)(\"user\");\n        if (req.method === \"POST\") {\n            const phone = req.body[\"phone\"];\n            const password = req.body[\"password\"];\n            if (phone && password) {\n                const result = await userCollection.findOne({\n                    phone: phone,\n                    password: crypto_js__WEBPACK_IMPORTED_MODULE_2___default().MD5(password).toString()\n                });\n                if (result) {\n                    // 已注册且密码正确\n                    res.json({\n                        \"code\": 0,\n                        \"msg\": \"登陆成功\",\n                        \"userID\": result._id\n                    });\n                } else {\n                    // 未注册或密码错误\n                    res.json({\n                        \"code\": 1,\n                        \"msg\": \"手机号或密码错误\"\n                    });\n                }\n            } else {\n                // 参数错误\n                res.json({\n                    \"code\": 2,\n                    \"msg\": \"参数错误\"\n                });\n            }\n        } else {\n            // 错误的方法\n            res.status(404);\n        }\n    } catch (e) {\n        const message = e.message;\n        // 未知错误\n        res.json({\n            \"code\": -1,\n            \"msg\": message\n        });\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2xvZ2luLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNzRDtBQUNuQjtBQUNGO0FBRWxCLGVBQWVHLE9BQU8sQ0FBQ0MsR0FBbUIsRUFBRUMsR0FBb0IsRUFBRTtJQUM3RSxNQUFNSixrREFBUSxDQUFDRyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtRQUNyQkMsT0FBTyxFQUFFO1lBQUMsS0FBSztZQUFFLE1BQU07WUFBRSxLQUFLO1lBQUUsT0FBTztZQUFFLE1BQU07WUFBRSxRQUFRO1lBQUUsU0FBUztTQUFDO1FBQ3JFQyxNQUFNLEVBQUUsR0FBRztRQUNYQyxvQkFBb0IsRUFBRSxHQUFHO0tBQzVCLENBQUM7SUFDRixJQUFJO1FBQ0EsTUFBTUMsY0FBYyxHQUFHLE1BQU1ULCtEQUFhLENBQUMsTUFBTSxDQUFDO1FBRWxELElBQUlJLEdBQUcsQ0FBQ00sTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUN2QixNQUFNQyxLQUFLLEdBQVdQLEdBQUcsQ0FBQ1EsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN2QyxNQUFNQyxRQUFRLEdBQVdULEdBQUcsQ0FBQ1EsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUU3QyxJQUFJRCxLQUFLLElBQUlFLFFBQVEsRUFBRTtnQkFDbkIsTUFBTUMsTUFBTSxHQUFHLE1BQU1MLGNBQWMsQ0FBQ00sT0FBTyxDQUFDO29CQUN4Q0osS0FBSyxFQUFFQSxLQUFLO29CQUNaRSxRQUFRLEVBQUVYLG9EQUFZLENBQUNXLFFBQVEsQ0FBQyxDQUFDSSxRQUFRLEVBQUU7aUJBQzlDLENBQUM7Z0JBRUYsSUFBSUgsTUFBTSxFQUFFO29CQUNSLFdBQVc7b0JBQ1hULEdBQUcsQ0FBQ2EsSUFBSSxDQUFDO3dCQUNMLE1BQU0sRUFBRSxDQUFDO3dCQUNULEtBQUssRUFBRSxNQUFNO3dCQUNiLFFBQVEsRUFBRUosTUFBTSxDQUFDSyxHQUFHO3FCQUN2QixDQUFDO2lCQUNMLE1BQU07b0JBQ0gsV0FBVztvQkFDWGQsR0FBRyxDQUFDYSxJQUFJLENBQUM7d0JBQ0wsTUFBTSxFQUFFLENBQUM7d0JBQ1QsS0FBSyxFQUFFLFVBQVU7cUJBQ3BCLENBQUM7aUJBQ0w7YUFDSixNQUFNO2dCQUNILE9BQU87Z0JBQ1BiLEdBQUcsQ0FBQ2EsSUFBSSxDQUFDO29CQUNMLE1BQU0sRUFBRSxDQUFDO29CQUNULEtBQUssRUFBRSxNQUFNO2lCQUNoQixDQUFDO2FBQ0w7U0FDSixNQUFNO1lBQ0gsUUFBUTtZQUNSYixHQUFHLENBQUNlLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDbEI7S0FDSixDQUFDLE9BQU9DLENBQUMsRUFBRTtRQUNSLE1BQU1DLE9BQU8sR0FBRyxDQUFFLENBQVdBLE9BQU87UUFFcEMsT0FBTztRQUNQakIsR0FBRyxDQUFDYSxJQUFJLENBQUM7WUFDTCxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ1YsS0FBSyxFQUFFSSxPQUFPO1NBQ2pCLENBQUM7S0FDTDtDQUVKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbG93LWNvZGUtc2VydmVyLy4vc3JjL3BhZ2VzL2FwaS9sb2dpbi50cz9kYTliIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gJ25leHQnO1xuaW1wb3J0IHsgZ2V0Q29sbGVjdGlvbiB9IGZyb20gJy4uLy4uL3V0aWx0cy9kYXRhYmFzZSc7XG5pbXBvcnQgTmV4dENvcnMgZnJvbSAnbmV4dGpzLWNvcnMnO1xuaW1wb3J0IENyeXB0b0pTIGZyb20gJ2NyeXB0by1qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxOiBOZXh0QXBpUmVxdWVzdCwgcmVzOiBOZXh0QXBpUmVzcG9uc2UpIHtcbiAgICBhd2FpdCBOZXh0Q29ycyhyZXEsIHJlcywge1xuICAgICAgICBtZXRob2RzOiBbJ0dFVCcsICdIRUFEJywgJ1BVVCcsICdQQVRDSCcsICdQT1NUJywgJ0RFTEVURScsICdPUFRJT05TJ10sXG4gICAgICAgIG9yaWdpbjogJyonLFxuICAgICAgICBvcHRpb25zU3VjY2Vzc1N0YXR1czogMjAwXG4gICAgfSlcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB1c2VyQ29sbGVjdGlvbiA9IGF3YWl0IGdldENvbGxlY3Rpb24oJ3VzZXInKVxuXG4gICAgICAgIGlmIChyZXEubWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgICAgICAgIGNvbnN0IHBob25lOiBzdHJpbmcgPSByZXEuYm9keVsncGhvbmUnXVxuICAgICAgICAgICAgY29uc3QgcGFzc3dvcmQ6IHN0cmluZyA9IHJlcS5ib2R5WydwYXNzd29yZCddXG5cbiAgICAgICAgICAgIGlmIChwaG9uZSAmJiBwYXNzd29yZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHVzZXJDb2xsZWN0aW9uLmZpbmRPbmUoe1xuICAgICAgICAgICAgICAgICAgICBwaG9uZTogcGhvbmUsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBDcnlwdG9KUy5NRDUocGFzc3dvcmQpLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAvLyDlt7Lms6jlhozkuJTlr4bnoIHmraPnoa5cbiAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvZGUnOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ21zZyc6ICfnmbvpmYbmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VzZXJJRCc6IHJlc3VsdC5faWRcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyDmnKrms6jlhozmiJblr4bnoIHplJnor69cbiAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvZGUnOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ21zZyc6ICfmiYvmnLrlj7fmiJblr4bnoIHplJnor68nXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDlj4LmlbDplJnor69cbiAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICdjb2RlJzogMixcbiAgICAgICAgICAgICAgICAgICAgJ21zZyc6ICflj4LmlbDplJnor68nXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOmUmeivr+eahOaWueazlVxuICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDQpXG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAoZSBhcyBFcnJvcikubWVzc2FnZVxuXG4gICAgICAgIC8vIOacquefpemUmeivr1xuICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAnY29kZSc6IC0xLFxuICAgICAgICAgICAgJ21zZyc6IG1lc3NhZ2VcbiAgICAgICAgfSlcbiAgICB9XG5cbn0iXSwibmFtZXMiOlsiZ2V0Q29sbGVjdGlvbiIsIk5leHRDb3JzIiwiQ3J5cHRvSlMiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kcyIsIm9yaWdpbiIsIm9wdGlvbnNTdWNjZXNzU3RhdHVzIiwidXNlckNvbGxlY3Rpb24iLCJtZXRob2QiLCJwaG9uZSIsImJvZHkiLCJwYXNzd29yZCIsInJlc3VsdCIsImZpbmRPbmUiLCJNRDUiLCJ0b1N0cmluZyIsImpzb24iLCJfaWQiLCJzdGF0dXMiLCJlIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/login.ts\n");

/***/ }),

/***/ "(api)/./src/utilts/database.ts":
/*!********************************!*\
  !*** ./src/utilts/database.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCollection\": () => (/* binding */ getCollection)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nlet collections = {};\nlet client;\nconst uri = \"mongodb://127.0.0.1:27017/\"; //我的\n// const uri = \"mongodb+srv://test_user:test123456@cluster0.um9hs.mongodb.net/?retryWrites=true&w=majority\";\nasync function connectToDatabase() {\n    console.log(`Start connecting to database...`);\n    client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri);\n    await client.connect();\n    const db = client.db(\"lowcode\");\n    collections = {\n        \"user\": db.collection(\"user\"),\n        \"page\": db.collection(\"page\")\n    };\n    console.log(`Successfully connected to database: ${db.databaseName}`);\n}\n// connectToDatabase()\nasync function getCollection(collection) {\n    if (!collections[collection]) {\n        await connectToDatabase();\n    }\n    return collections[collection];\n}\n //张弛的：mongodb+srv://test_user:test123456@cluster0.um9hs.mongodb.net/?retryWrites=true&w=majority\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvdXRpbHRzL2RhdGFiYXNlLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFpRDtBQUVqRCxJQUFJQyxXQUFXLEdBRVgsRUFBRTtBQUVOLElBQUlDLE1BQU07QUFDVixNQUFNQyxHQUFHLEdBQUcsNEJBQTRCLEVBQUMsSUFBSTtBQUM3Qyw0R0FBNEc7QUFHNUcsZUFBZUMsaUJBQWlCLEdBQUc7SUFDL0JDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQUMsK0JBQStCLENBQUMsQ0FBQztJQUU5Q0osTUFBTSxHQUFHLElBQUlGLGdEQUFXLENBQUNHLEdBQUcsQ0FBQyxDQUFDO0lBRTlCLE1BQU1ELE1BQU0sQ0FBQ0ssT0FBTyxFQUFFLENBQUM7SUFFdkIsTUFBTUMsRUFBRSxHQUFHTixNQUFNLENBQUNNLEVBQUUsQ0FBQyxTQUFTLENBQUM7SUFFL0JQLFdBQVcsR0FBRztRQUNWLE1BQU0sRUFBRU8sRUFBRSxDQUFDQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQzdCLE1BQU0sRUFBRUQsRUFBRSxDQUFDQyxVQUFVLENBQUMsTUFBTSxDQUFDO0tBQ2hDO0lBRURKLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQUMsb0NBQW9DLEVBQUVFLEVBQUUsQ0FBQ0UsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBRXpFO0FBRUQsc0JBQXNCO0FBRXRCLGVBQWVDLGFBQWEsQ0FBQ0YsVUFBa0IsRUFBRTtJQUM3QyxJQUFJLENBQUNSLFdBQVcsQ0FBQ1EsVUFBVSxDQUFDLEVBQUU7UUFDMUIsTUFBTUwsaUJBQWlCLEVBQUU7S0FDNUI7SUFFRCxPQUFPSCxXQUFXLENBQUNRLFVBQVUsQ0FBQztDQUNqQztBQUd1QixDQUV4QixnR0FBZ0ciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sb3ctY29kZS1zZXJ2ZXIvLi9zcmMvdXRpbHRzL2RhdGFiYXNlLnRzP2NhODYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sbGVjdGlvbiwgTW9uZ29DbGllbnQgfSBmcm9tICdtb25nb2RiJ1xuXG5sZXQgY29sbGVjdGlvbnM6IHtcbiAgICBba2V5OiBzdHJpbmddOiBDb2xsZWN0aW9uXG59ID0ge31cblxubGV0IGNsaWVudDogTW9uZ29DbGllbnRcbmNvbnN0IHVyaSA9IFwibW9uZ29kYjovLzEyNy4wLjAuMToyNzAxNy9cIjsvL+aIkeeahFxuLy8gY29uc3QgdXJpID0gXCJtb25nb2RiK3NydjovL3Rlc3RfdXNlcjp0ZXN0MTIzNDU2QGNsdXN0ZXIwLnVtOWhzLm1vbmdvZGIubmV0Lz9yZXRyeVdyaXRlcz10cnVlJnc9bWFqb3JpdHlcIjtcblxuXG5hc3luYyBmdW5jdGlvbiBjb25uZWN0VG9EYXRhYmFzZSgpIHtcbiAgICBjb25zb2xlLmxvZyhgU3RhcnQgY29ubmVjdGluZyB0byBkYXRhYmFzZS4uLmApXG5cbiAgICBjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpKTtcblxuICAgIGF3YWl0IGNsaWVudC5jb25uZWN0KCk7XG5cbiAgICBjb25zdCBkYiA9IGNsaWVudC5kYignbG93Y29kZScpO1xuXG4gICAgY29sbGVjdGlvbnMgPSB7XG4gICAgICAgICd1c2VyJzogZGIuY29sbGVjdGlvbigndXNlcicpLFxuICAgICAgICAncGFnZSc6IGRiLmNvbGxlY3Rpb24oJ3BhZ2UnKVxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGBTdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvIGRhdGFiYXNlOiAke2RiLmRhdGFiYXNlTmFtZX1gKTtcblxufVxuXG4vLyBjb25uZWN0VG9EYXRhYmFzZSgpXG5cbmFzeW5jIGZ1bmN0aW9uIGdldENvbGxlY3Rpb24oY29sbGVjdGlvbjogc3RyaW5nKSB7XG4gICAgaWYgKCFjb2xsZWN0aW9uc1tjb2xsZWN0aW9uXSkge1xuICAgICAgICBhd2FpdCBjb25uZWN0VG9EYXRhYmFzZSgpXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxlY3Rpb25zW2NvbGxlY3Rpb25dXG59XG5cblxuZXhwb3J0IHsgZ2V0Q29sbGVjdGlvbiB9XG5cbi8v5byg5byb55qE77yabW9uZ29kYitzcnY6Ly90ZXN0X3VzZXI6dGVzdDEyMzQ1NkBjbHVzdGVyMC51bTlocy5tb25nb2RiLm5ldC8/cmV0cnlXcml0ZXM9dHJ1ZSZ3PW1ham9yaXR5Il0sIm5hbWVzIjpbIk1vbmdvQ2xpZW50IiwiY29sbGVjdGlvbnMiLCJjbGllbnQiLCJ1cmkiLCJjb25uZWN0VG9EYXRhYmFzZSIsImNvbnNvbGUiLCJsb2ciLCJjb25uZWN0IiwiZGIiLCJjb2xsZWN0aW9uIiwiZGF0YWJhc2VOYW1lIiwiZ2V0Q29sbGVjdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/utilts/database.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/login.ts"));
module.exports = __webpack_exports__;

})();
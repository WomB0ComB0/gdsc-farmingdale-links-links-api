"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const open_graph_scraper_1 = __importDefault(require("open-graph-scraper"));
const constants_1 = require("../constants");
const options = { url: 'https://mvp.microsoft.com/en-US/studentambassadors/profile/ff9d3bb7-25f6-477c-875d-37904a0c6280', fetchOptions: { headers: { 'user-agent': constants_1.userAgent } } };
(0, open_graph_scraper_1.default)(options)
    .then((data) => {
    var _a, _b;
    const { result } = data;
    console.log('result:', (_b = (_a = result.ogImage) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url);
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=OpenGraphScraper.js.map
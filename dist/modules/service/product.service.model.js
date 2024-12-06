"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllProductService = void 0;
const mongoose_1 = require("mongoose");
const AllproductServiceSchema = new mongoose_1.Schema({
    shortener_service: {
        all_calling: { type: [String], required: true, default: [] },
        all_notice: { type: [String], required: true, default: [] },
    }
}, {
    timestamps: true,
});
const AllProductService = (0, mongoose_1.model)("allProductService", AllproductServiceSchema);
exports.AllProductService = AllProductService;
//# sourceMappingURL=product.service.model.js.map
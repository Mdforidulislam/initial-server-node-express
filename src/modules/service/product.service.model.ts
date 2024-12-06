import { model, Schema } from "mongoose";
import { IAllProductService } from "./productService.interface";

const AllproductServiceSchema = new Schema<IAllProductService>(
            {
                shortener_service:{
                    all_calling:{ type:[String], required: true, default: [] },
                    all_notice: {type: [String], required: true, default:[]},
                }
              
            },
            {
                timestamps: true,

            }
)

const AllProductService = model<IAllProductService>("allProductService", AllproductServiceSchema);

export {AllProductService};
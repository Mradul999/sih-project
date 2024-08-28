import mongoose from "mongoose";

export const contractSchema = mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,

    },
    contractId: {
      type: String,
      required: true,
      unique: true,
    },
    farmer: {
      type: String,
    },
    buyer: {
      type: String,
    },
    cropType: {
      type: String,
      required: true,
    },
    contractStatus: {
      type: String,
      enum: ["Pending", "Active", "Completed", "Cancelled"],
      default: "Pending",
    },
    quantity: {
      type: Number,
      required: true,
    },
    pricePerUnit: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minMoney: {
      type: Number,
      required: true,
    },
    laws: {
      type: String,
      required: true,
      default:
        "Law 1: The buyer must purchase the agreed quantity. Law 2: The farmer must deliver within the agreed timeframe.",
    },
  
    termsAndConditions:{
      type: String,
      required: true,
      default:"These are our terms and conditions agree to them "
    },

    paymentTerms: {
      type: String,
      enum: ["Advance", "On Delivery", "Installments"],
      required: true,
    },
  },
  { timeStamps: true }
);

const Contract = mongoose.model("Contract", contractSchema);

export default Contract;

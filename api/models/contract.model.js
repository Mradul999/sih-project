import mongoose from "mongoose";

export const contractSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    farmerFather: {
      type: String,

    },
    farmerAddress: {
      type: String,

    },
    farmerAge: {
      type: Number,

    },
    buyerFather: {
      type: String,

    },
    buyerAddress: {
      type: String,

    },
    buyerAge: {
      type: Number,

    },
    farmSize: {
      type: String,

    },

    contractId: {
      type: String,
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
    },
    contractStatus: {
      type: String,
      enum: ["Pending", "Active", "Completed", "Cancelled"],
      default: "Pending",
    },
    quantity: {
      type: Number,
    },
    pricePerUnit: {
      type: Number,

    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    minMoney: {
      type: Number,

    },
    laws: {
      type: String,

      default:
        "Law 1: The buyer must purchase the agreed quantity. Law 2: The farmer must deliver within the agreed timeframe.",
    },

    termsAndConditions: {
      type: String,
      
      default: "These are our terms and conditions agree to them ",
    },

    paymentTerms: {
      type: String,
      enum: ["Advance", "On Delivery", "Installments"],

    },
  },
  { timeStamps: true }
);

const Contract = mongoose.model("Contract", contractSchema);

export default Contract;

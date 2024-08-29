import Contract from "../models/contract.model.js";

export const createContract = async (req, res) => {
  try {
    const {
      farmer,
      farmerFather,
      farmerAge,
      farmerAddress,

      buyerFather,
      buyerAge,
      buyerAddress,
      farmSize,
      userId,
      buyer,

      cropType,
      contractStatus,
      quantity,
      pricePerUnit,
      startDate,
      endDate,
      minMoney,
      termsAndConditions,

      paymentTerms,
    } = req.body;

    const contractId = `CNO${Math.floor(100000 + Math.random() * 900000)}`;
    const newContract = new Contract({
      contractId,
      userId,
      farmer,
      buyer,
      cropType,
      contractStatus,
      quantity,
      pricePerUnit,
      startDate,
      endDate,
      minMoney,
      termsAndConditions,
      farmerFather,
      farmerAge,
      farmerAddress,

      buyerFather,
      buyerAge,
      buyerAddress,
      farmSize,

      paymentTerms,
    });
    await newContract.save();
    res.status(201).json(newContract);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const acceptContract = async (req, res) => {
  try {
    const { contractId, acceptedBy, name } = req.body;

    const contract = await Contract.findOne({ contractId });

    if (!contract) {
      return res.status(404).json({
        message: "Contract not found",
      });
    }

    if (acceptedBy === "farmer") {
      if (!contract.farmer) {
        contract.farmer = name;
      }
    } else if (acceptedBy === "buyer") {
      if (!contract.buyer) {
        contract.buyer = name;
      }
    } else {
      return res.status(400).json({
        message: "Invalid party accepting the contract",
      });
    }

    if (contract.farmer && contract.buyer) {
      contract.contractStatus = "Active";
    }

    await contract.save();

    res.status(200).json({
      message: "Contract updated successfully",
      contract,
    });
  } catch (error) {
    console.error("Error accepting contract:", error);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
    });
  }
};

export const getAllContracts = async (req, res) => {
  try {
    const { userId } = req.body;
    const contracts = await Contract.find({ userId });
    if (!contracts) {
      return res.status(404).json({
        message: "No contracts found for this user",
      });
    }
    res.status(200).json(contracts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleContract = async (req, res) => {
  try {
    const { contractId } = req.query;
    console.log(contractId);

    const contract = await Contract.findOne({contractId});
    if (!contract) {
      return res.status(404).json({
        message: "no contract found",
      });
    }

    res.json(contract);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

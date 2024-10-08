import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const AwaitingContracts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contract, setContract] = useState(null);
  console.log("contract", contract);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [formData, setFormData] = useState({
    farmer: "",
    farmerFather: "",
    farmerAge: "",
    farmerAddress: "",
    cropType: "",
    quantity: "",
    pricePerUnit: "",
    startDate: "",
    endDate: "",
    minMoney: "",
    buyer: "",
    buyerFather: "",
    buyerAge: "",
    buyerAddress: "",
    farmSize: "",
    paymentTerms: "Advance",
    termsAndConditions: "",
    userId: "",
  });

  const farmers = [
    {
      name: "John Doe",
      state: "Punjab",
      quality: "High",
      amount: "₹50,000",
      quantity:"100q"

    },
    {
      name: "Priya Sharma",
      state: "Maharashtra",
      quality: "Medium",
      amount: "₹30,000",
      quantity:"100q"
    },
    {
      name: "Ramesh Kumar",
      state: "Uttar Pradesh",
      quality: "Low",
      amount: "₹20,000",
      quantity:"100q"
    },
    {
      name: "Sunita Verma",
      state: "Rajasthan",
      quality: "High",
      amount: "₹55,000",
      quantity:"100q"
    },
    {
      name: "Anil Singh",
      state: "Bihar",
      quality: "Medium",
      amount: "₹35,000",
    },
  ];

  // console.log("formData",formData)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/contract/getsinglecontract", {
        params: { contractId: searchTerm },
      });

      setContract(response.data);
    } catch (err) {
      setError("Contract not found or an error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contract) {
      setFormData({
        farmer: contract.farmer || "",
        farmerFather: contract.fatherName || "",
        farmerFather: contract.farmerFather || "",
        farmerAge: contract.farmer || "",
        farmerAddress: contract.farmerAddress || "",
        cropType: contract.cropType || "",
        quantity: contract.quantity || "",
        pricePerUnit: contract.pricePerUnit || "",
        startDate: contract.startDate || "",
        endDate: contract.endDate || "",
        minMoney: contract.minMoney || "",
        buyer: contract.buyer || "",
        buyerFather: contract.buyerFather || "",
        buyerAge: contract.buyerAge || "",
        buyerAddress: contract.buyerAddress || "",
        farmSize: contract.farmSize || "",
        paymentTerms: contract.paymentTerms || "Advance",
        termsAndConditions: contract.termsAndConditions || "",
        userId: contract.userId || "",
      });
    }
  }, [contract]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/contract/acceptcontract", {
        formData,
        acceptedBy: currentUser.role,
        contractId: searchTerm,
      });
      if (response.status === 200) {
        alert("Contract accepted successfully");
      }
    } catch (error) {
      if (error.response) {
        console.log(error);
        alert(error.message);
      }
    }
  };

  return (
    // <div className="min-h-screen flex justify-center">
    //   <div className="max-w-[1000px] w-full p-4">
    //     <form onSubmit={handleSearch} className="flex mb-4">
    //       <input
    //         type="text"
    //         placeholder="Enter contract ID or keyword"
    //         value={searchTerm}
    //         onChange={(e) => setSearchTerm(e.target.value)}
    //         className="border p-2 w-full"
    //         required
    //       />
    //       <button type="submit" className="bg-blue-500 text-white p-2 ml-2">
    //         Search
    //       </button>
    //     </form>

    //     {loading && <p>Loading...</p>}
    //     {error && <p className="text-red-500">{error}</p>}
    //     {contract && (
    //       <div className="flex mx-auto mt-8 p-4 space-x-8">
    //         {/* Contract Template */}
    //         <div className="w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg">
    //           <h2 className="text-xl font-semibold mb-4 text-center">
    //             Contract Preview
    //           </h2>
    //           <div className="text-black">
    //             <p>This AGREEMENT made this day of</p>
    //             <span>BETWEEN</span>
    //             <p>
    //               <strong> {formData?.buyer}</strong> <br></br>
    //               Son of {formData.buyerFather} age about {formData.buyerAge}{" "}
    //               residing {formData.buyerAddress}
    //               <br></br> And <br></br>{" "}
    //               <span className="font-bold">{formData?.farmer}</span> Son of{" "}
    //               {formData?.farmerFather} Age about {formData?.farmerAge}{" "}
    //               Residing {formData.farmerAddress}
    //             </p>
    //             <br></br>
    //             <p>
    //               WHEREAS the buyer is mainly engaged in the processing and
    //               export of vegetables, fresh fruits, pickled and for this
    //               purpose has its factory and processing facilities
    //             </p>
    //             <br />
    //             <p>
    //               And WHEREAS farmer is willing to grow the said products etc.,
    //               by entering into an agreement with buyer he is possessing
    //               agricultural land which is suitable for the purpose of farming
    //               for the crops in which the buyer is dealing with.
    //             </p>
    //             <br />

    //             <p>
    //               hereinafter referred I to as the FARMER, (the expression
    //               expression farmer include his/her his/her legal legal heir
    //               heirs, representatives, successors, testators, administrators
    //               assignees) of the other part:
    //             </p>
    //             <br />
    //             <p>
    //               AND WHEREAS the farmer herein after understanding the
    //               requirements of the buyer and their terms and requirements has
    //               agreed to the terms set out and has agreed to comply with the
    //               same. The parties have consequently reduced into writing to
    //               avoid further consequences the terms and conditions as details
    //               hereinafter.
    //             </p>
    //             <br />
    //             <h2>NOW THIS AGREEMENT BETWEEN THE PARTIES AS FOLLOWS:</h2>
    //             <ol>
    //               <li>
    //                 1.The Farmer undertake to grow in his agricultural land
    //                 measuring that the of acre {formData?.farmSize}.be acre the
    //                 said crop at the rate {formData?.pricePerUnit}crop cycle in
    //                 a year or such other crops as may be specified by the buyer
    //                 in that regard. The farmer has agree that the said land
    //                 shall not be used for any other purpose other than growing
    //                 of the specified crop as mentioned in this agreement.
    //               </li>
    //               <br />
    //               <li>
    //                 2. The farmer further unconditionally agrees to sell the
    //                 entire crop produced on the said land to the crop produced
    //                 on the said land to the buyer exclusively a undertakes not
    //                 to sell any of the crops grown in the said land to anybody
    //                 except with the previous consent of the buyer in writing.
    //                 The word consent is defined under section 13 of Indian
    //                 Contract Act, 1872.
    //               </li>
    //               <br />
    //               <li>
    //                 3. The parties have agreed that farmer shall be responsible
    //                 to take necessary steps for growing the said crop and also
    //                 ensuring that the guidance given by the buyer shall be
    //                 followed. This is the mandate of section 26 of Sale of Goods
    //                 Act farmer will be liable for any loss until the goods has
    //                 been transferred to the buyer
    //               </li>
    //               <br />
    //               <li>
    //                 4.It shall be the responsibility of the farmer to grade and
    //                 sort the crops grown as per the Specifications given by the
    //                 buyer from time to time and also for organizing delivery
    //                 said crops/produce to the collection centers as may be
    //                 specified by the buyer.
    //               </li>
    //               <br />
    //               <p>
    //                 5 The buyer shall have the right to inspect the land where
    //                 the crops are grown and can also give instructions to the
    //                 farmer in all matters connected with the growing crops which
    //                 are specified under this agreement. <br /> <br /> 6. The
    //                 buyer assures the farmer that it shall endeavor to help the
    //                 farmer in all respects particularly for procurement and
    //                 distribution of of seeds, fertilizers, plant protection on
    //                 chemicals at competitive rates. All such items/materials
    //                 supplied by the buyer will be used by the farmer thereon of
    //                 the crops. The farmer shall not part with the material
    //                 supplied by the company nor misappropriate the same
    //                 otherwise he will face the penal consequences as given under
    //                 section 403 of Indian Penal Code, 1860 that is criminal
    //                 misappropriation of property. <br /> <br />
    //                 7. The farmer has to give written acknowledgement in the
    //                 form prescribed for crop material received from the buyer.
    //                 In case farmer not available at the time of delivery of
    //                 material it shall be handed over to the adult member of
    //                 family i.e. wife, son, daughter. The acknowledgement of such
    //                 receipt shall be binding on the farmer as confirmation of
    //                 receipt of material and shall not be disputed anytime. Any
    //                 difference in the procurement prices after entering in to an
    //                 agreement or on any document executed in this regard shall
    //                 be final. <br /> <br /> 8.The buyer shall be obliged to
    //                 purchase the crops which has been grown by the farmer.
    //                 Because there is no implied condition as to quality of
    //                 fitness of material as per section 16 of Sale of goods Acts
    //                 but subject to certain exceptions. <br /> <br /> 9. If
    //                 farmer need financial assistance in growing crops then he
    //                 can not claim it as a matter of right from the buyer, this
    //                 is a discretion of buyer if he want then he can give
    //                 financial assistance to the farmer. Such financial
    //                 assistance which has been given by the buyer utilized by the
    //                 farmer only for the purpose of growing the Said crops. Such
    //                 assistance shall be interest free. If such money used for
    //                 other purpose than buyer will have right terminate the
    //                 contract. <br /> <br /> 10. This Agreement is on the basis
    //                 of mutual trust and confidence of both the parties which are
    //                 buyer and farmer. None of the party shall be liable to
    //                 discharge their obligation if they are attributable to
    //                 normal force majeure circumstance which are beyond the
    //                 control of both of the parties this is expressly dealt under
    //                 section 56 of Indian Contract Act, 1872. <br /> <br /> 11.
    //                 If the buyers neglects to to take delivery of the crops then
    //                 he the farmer can file suit for specific performance as
    //                 provided under specific Relief Act. And he can also claim
    //                 compensation this has been expressly dealt under section 21
    //                 of Specific Relief Act, 1963. Such compensation shall be
    //                 assessed as per section 73 of Indian contract Act, 1872.{" "}
    //                 <br /> <br /> 12. This is agreed between both of the parties
    //                 that the buyer will purchase the crop if the quantity is
    //                 less than the agreed terms of contract. <br /> <br /> 13.
    //                 This is agreed that if the performance of contract that is
    //                 delivery of goods not possible then the if any earnest money
    //                 has been paid then that money can be recovered as per given
    //                 under section 22 of Specific Relief Act in a manner provided
    //                 in civil procedure code,1908. <br /> <br /> 14. Both the
    //                 parties agreed that if the dispute arises then they will
    //                 settle their disputes amicably. <br /> <br /> 15. This
    //                 agreement is subject to the jurisdiction of the district
    //                 court of Mathura.
    //               </p>
    //             </ol>
    //             <br />
    //             <br />
    //             <div className="flex justify-between ">
    //               <div className="flex flex-col gap-2">
    //                 <span>Date:</span>
    //                 <span>Place:{}</span>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Form */}
    //         <div className="w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg">
    //           <h2 className="text-2xl font-semibold mb-4 text-center">
    //             Update Contract
    //           </h2>
    //           <form onSubmit={handleSubmit}>
    //             <div className={`${currentUser.role==="buyer" && "hidden"}`}>
    //               <label className="block text-gray-700 mb-2">
    //                 Farmer Name
    //               </label>
    //               <input
    //                 type="text"
    //                 name="farmer"
    //                 value={formData.farmer}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //                 required
    //                 disabled={currentUser.role === "buyer"}
    //               />
    //             </div>
    //             <div className={`${currentUser.role==="buyer" && "hidden"}`}>
    //               <label className="block text-gray-700 mb-2">
    //                 Farmer's Father's Name
    //               </label>
    //               <input
    //                 type="text"
    //                 name="farmerFather"
    //                 value={formData.farmerFather}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //                 required
    //                 disabled={currentUser.role === "buyer"}
    //               />
    //             </div>
    //             <div className={`${currentUser.role==="buyer" && "hidden"}`}>
    //               <label className="block text-gray-700 mb-2">Farmer Age</label>
    //               <input
    //                 type="number"
    //                 name="farmerAge"
    //                 value={formData.farmerAge}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //                 required
    //                 disabled={currentUser.role === "buyer"}
    //               />
    //             </div>
    //             <div className={`${currentUser.role==="buyer" && "hidden"}`}>
    //               <label className="block text-gray-700 mb-2">
    //                 Farmer Address
    //               </label>
    //               <input
    //                 type="text"
    //                 name="farmerAddress"
    //                 value={formData.farmerAddress}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //                 required
    //                 disabled={currentUser.role === "buyer"}
    //               />
    //             </div>
    //             <div className="mb-4">
    //               <label className="block text-gray-700 mb-2">Crop Type</label>
    //               <input
    //                 type="text"
    //                 name="cropType"
    //                 value={formData.cropType}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //                 required
    //               />
    //             </div>
    //             <div className="mb-4">
    //               <label className="block text-gray-700 mb-2">Quantity</label>
    //               <input
    //                 type="number"
    //                 name="quantity"
    //                 value={formData.quantity}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //                 required
    //               />
    //             </div>
    //             <div className="mb-4">
    //               <label className="block text-gray-700 mb-2">
    //                 Price per Unit
    //               </label>
    //               <input
    //                 type="number"
    //                 name="pricePerUnit"
    //                 value={formData.pricePerUnit}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //                 required
    //               />
    //             </div>
    //             <div className="mb-4">
    //               <label className="block text-gray-700 mb-2">Start Date</label>
    //               <input
    //                 type="date"
    //                 name="startDate"
    //                 value={formData.startDate}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //                 required
    //               />
    //             </div>
    //             <div className="mb-4">
    //               <label className="block text-gray-700 mb-2">End Date</label>
    //               <input
    //                 type="date"
    //                 name="endDate"
    //                 value={formData.endDate}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //                 required
    //               />
    //             </div>
    //             <div className="mb-4">
    //               <label className="block text-gray-700 mb-2">
    //                 Minimum Money
    //               </label>
    //               <input
    //                 type="number"
    //                 name="minMoney"
    //                 value={formData.minMoney}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //                 required
    //               />
    //             </div>
    //             <div className="mb-4">
    //               <label className="block text-gray-700 mb-2">Buyer Name</label>
    //               <input
    //                 type="text"
    //                 name="buyer"
    //                 value={formData.buyer}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //                 required
    //                 disabled={currentUser.role === "farmer"}
    //               />
    //             </div>
    //             <div className="mb-4">
    //               <label className="block text-gray-700 mb-2">
    //                 Buyer's Father's Name
    //               </label>
    //               <input
    //                 type="text"
    //                 name="buyerFather"
    //                 value={formData.buyerFather}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //                 required
    //                 disabled={currentUser.role === "farmer"}
    //               />
    //             </div>
    //             <div className="mb-4">
    //               <label className="block text-gray-700 mb-2">Buyer Age</label>
    //               <input
    //                 type="number"
    //                 name="buyerAge"
    //                 value={formData.buyerAge}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //                 required
    //                 disabled={currentUser.role === "farmer"}
    //               />
    //             </div>
    //             <div className="mb-4">
    //               <label className="block text-gray-700 mb-2">
    //                 Buyer Address
    //               </label>
    //               <input
    //                 type="text"
    //                 name="buyerAddress"
    //                 value={formData.buyerAddress}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //                 required
    //                 disabled={currentUser.role === "farmer"}
    //               />
    //             </div>
    //             <div className="mb-4">
    //               <label className="block text-gray-700 mb-2">Farm Size</label>
    //               <input
    //                 type="text"
    //                 name="farmSize"
    //                 value={formData.farmSize}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //                 required
    //               />
    //             </div>
    //             <div className="mb-4">
    //               <label className="block text-gray-700 mb-2">
    //                 Payment Terms
    //               </label>
    //               <select
    //                 name="paymentTerms"
    //                 value={formData.paymentTerms}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //               >
    //                 <option value="Advance">Advance</option>
    //                 <option value="Credit">Credit</option>
    //               </select>
    //             </div>
    //             <div className="mb-4">
    //               <label className="block text-gray-700 mb-2">
    //                 Terms and Conditions
    //               </label>
    //               <textarea
    //                 name="termsAndConditions"
    //                 value={formData.termsAndConditions}
    //                 onChange={handleChange}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    //                 rows="4"
    //               />
    //             </div>
    //             {/* Add more form fields as necessary */}

    //             <button type="submit" className="bg-green-500 text-white p-2">
    //               Submit
    //             </button>
    //           </form>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <div className="flex flex-col gap-10">
      <input
            type="text"
            placeholder="Search by State, quantity, quality"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 w-full"
            required
          />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 min-h-screen">
      
      
      
      {farmers.map((farmer, index) => (
        <div
          key={index}
          className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-2">Farmer: {farmer.name}</h3>
          <p className="text-gray-600 mb-1">State: {farmer.state}</p>
          <p className="text-gray-600 mb-1">
            Quality of Crop: {farmer.quality}
          </p>
          <p className="text-gray-600">Amount: {farmer.amount}</p>
          <p className="text-gray-600">Quanity:{farmer.quantity}</p>
        </div>
      ))}
    </div>

    </div>
    
  );
};

export default AwaitingContracts;

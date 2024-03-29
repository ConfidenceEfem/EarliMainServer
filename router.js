const express = require("express");
const multer = require("./utils/multer");
const router = express.Router();

const {
  RegisterUser,
  VerifyOTP,
  VerifyOTPForLogin,
  LoginUsers,
  getAllUsers,
  createChildAccount,
  populateChildInParents,
  getOneChild,
  populateSavingsInChild,
} = require("./controller");
const {
  getPayLink,
  saveCard,
  populateCardInParents,
  createSavingsPlan,
  getFund,
  fundAChild,
  createInvestment,
  getSavings,
  getChildTotals,
  getParentTotals,
  testSavingsJob
} = require("./paymentController");

router.post("/register", RegisterUser);
router.post("/verify", VerifyOTP);
router.post("/login", LoginUsers);
router.post("/verifylogin", VerifyOTPForLogin);
router.post("/child/:id", multer, createChildAccount);
router.post("/createplan/:childId", createSavingsPlan);
router.post("/invest/:childId", createInvestment)
router.get("/getfund/:childId", getFund);
router.get("/cardlink/:id", getPayLink);
router.get("/oneparent/:id", populateChildInParents);
router.get("/onechild/:childid", populateSavingsInChild);
router.get("/parentcards/:id", populateCardInParents);
router.get("/allusers", getAllUsers);
router.get("/child/:id", getOneChild);
router.get("/savecard", saveCard);
router.get("/fundachild", fundAChild);
router.get("/savings/:savingsid", getSavings);
router.get("/parentsum/:parentId" , getParentTotals);
router.get("/childsum/:childId" , getChildTotals);
router.get("/test", testSavingsJob)

module.exports = router;
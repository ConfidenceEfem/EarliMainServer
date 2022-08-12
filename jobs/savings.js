const ChildSavingsModel = require("../childModels/ChildSavingsModel");
const ChildModel = require("../childModels/ChildModel");
const request = require("request");

module.exports = function (agenda) {
  agenda.define("charge card", async (job) => {
    const { form, plan } = job.attrs.data;

    const options = {
      method: "POST",
      url: "https://api.paystack.co/transaction/charge_authorization",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SECRET_KEY}`,
      },
      body: JSON.stringify(form),
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);
      let res = JSON.parse(response.body);
      const ref = res.data.reference;
      console.log(ref, "ref exist");
      if (!ref) {
        console.log("no ref");
      } else {
        const options = {
          method: "GET",
          url: `https://api.paystack.co/transaction/verify/${ref}`,
          headers: {
            Authorization: `Bearer ${process.env.SECRET_KEY}`,
          },
        };
        request(options, async (error, response) => {
          let resBody = JSON.parse(response.body);
          console.log(resBody);
          if (error) throw new Error(error);
          if (resBody.data.status === "success") {
            let amount = resBody.data.amount;
            console.log(amount);
            const updateBalance = await ChildSavingsModel.findOneAndUpdate(
              { _id: plan._id },
              { $inc: { balance: amount } },
              { new: true }
            );
            console.log("updated");
            console.log(plan, updateBalance);
          } else {
            console.log("Verify payment failed");
          }
        });
      }
    });
  });

  agenda.define("close savings", (job) => {
    const { plan } = job.attrs.data;

    const foundPlan = ChildSavingsModel.findOneAndUpdate(
      { _id: plan._id },
      { $set: { status: "Completed" } },
      { new: true }
    );

    ChildModel.findOneAndUpdate(
      { _id: foundPlan.child },
      { $inc: { walletBalance: foundPlan.balance } }
    );
  });
};
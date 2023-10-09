const { getData } = require("../services/handleData");
const { generateToken } = require("../services/handleToken");

const loginCtlr = async (req, res) => {
  let data = await getData(req.body.email);

  try {
    if (!data) {
      return res.json({ message: "User Not Registered!" });
    } else {
      if (data.password === req.body.password) {
        let token = await generateToken({ email: data.email });
        return res.json({ token });
      } else {
        return res.json({ message: "Password or Email is invalid" });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong please try again later" });
  }
};

module.exports = loginCtlr;

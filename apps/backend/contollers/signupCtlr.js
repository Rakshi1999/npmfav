const { setData } = require("../services/handleData");
const { generateToken } = require("../services/handleToken");

const signupCtlr = async (req, res) => {
  try {
    let data = await setData({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    // console.log(data, "user");
    let token = await generateToken({
      email: req.body.password,
    });
    // console.log(token,"t");
    return res.status(200).json({ token });
  } catch (e) {
    // console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
};

module.exports = signupCtlr;

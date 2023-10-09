const { addPackage, deletePackage } = require("../Db/dbctlr");

const createCtlr = async (req, res) => {
  try {
    const val = await addPackage(req.body.package, req.body.email);
    return res.status(200).json({ packages: val.packages });
  } catch (error) {
    // console.log(error);
    return res.json({ message: error.message });
  }
};

const deleteCtlr = async (req, res) => {
  try {
    const val = await deletePackage(req.body.package, req.body.email);
    return res.status(200).json({ packages: val.packages });
  } catch (error) {
    // console.log(error);
    return res.json({ message: error.message });
  }
};

const readCtlr = (req, res) => {};

const updateCtlr = (req, res) => {};

module.exports = { createCtlr, deleteCtlr, updateCtlr, readCtlr };

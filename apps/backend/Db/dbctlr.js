const pg = require("./connectToDB");
// const { getData } = require("../services/handleData");

const addPackage = async (data, email) => {
  //   console.log(data, email);
  return new Promise((resolve, reject) => {
    pg("users")
      .where("email", email)
      .update({
        packages: pg.raw("array_append(packages, ?)", [data]),
      })
      .returning("*")
      .then((updatedUsers) => {
        // console.log(updatedUsers,"üsers");
        if (updatedUsers.length > 0) {
          const updatedUser = updatedUsers[0];
          //   console.log("Item added to array successfully:", updatedUser);
          resolve(updatedUser);
        } else {
          console.log("User not found");
          reject("User Not Found.");
        }
      })
      .catch((error) => {
        console.error("Error adding item to array:", error);
        reject(error);
      });
  });
};

const deletePackage = (data, email) => {
  return new Promise((resolve, reject) => {
    pg("users")
      .where("email", email)
      .update({
        packages: pg.raw("array_remove(packages, ?)", [data]),
      })
      .returning("*")
      .then((updatedUsers) => {
        if (updatedUsers.length > 0) {
          const updatedUser = updatedUsers[0];
          resolve(updatedUser);
        } else {
          console.log("User not found");
          reject("User Not Found.");
        }
      })
      .catch((error) => {
        console.error("Error removing item from array:", error);
        reject(error);
      });
  });
};

module.exports = {
  addPackage,
  deletePackage,
};

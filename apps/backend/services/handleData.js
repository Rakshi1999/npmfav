const path = require("path");
const tempData = require("../userData.json");

const pg = require("../Db/connectToDB");

const setData = (val) => {
  return new Promise((resolve, reject) => {
    pg("users")
      .insert(val)
      //   .returning("*") // Optional: Returns the inserted row data
      .then((insertedUsers) => {
        console.log("User(s) added successfully:", insertedUsers);
        //   res.status(201).json(insertedUsers); // Respond with inserted user data
        resolve(insertedUsers);
      })
      .catch((error) => {
        console.error("Error adding user(s):", error);
        //   res.status(500).json({ error: "Internal Server Error" });
        reject(error);
      });
  });
};

const getData = (email) => {
  return new Promise((resolve, reject) => {
    pg("users")
      .select("*")
      .where("email", email)
      .then((users) => {
        if (users.length > 0) {
          const user = users[0];
          resolve(user);
        } else {
          reject(new Error("User Not Found."));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  setData,
  getData,
};

const register = require("../services/register");

exports.registration = async (req, res) => {
  try {
    const { username, email, password, date_joined } = req.body;
    await register(username, email, password, date_joined);
    res.status(200).send({ message: "User created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error creating user." });
  }
};

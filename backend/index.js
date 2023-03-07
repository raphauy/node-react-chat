require('dotenv').config();

const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  console.log("username: " + username)
  try {
    const response= await axios.put(
        "https://api.chatengine.io/users/",
        { username: username, secret: username, first_name: username },
        { headers: { "private-key": process.env.CHAT_PRIVATE_KEY} }
    );
    return res.status(response.status).json(response.data)
  } catch (error) {
    return res.status(error.response.status).json(error.response.data)    
  }

});

app.listen(3001);

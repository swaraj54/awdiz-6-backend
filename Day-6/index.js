import express from "express";

const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Rohit", email: "rohit@gmail.com" },
  { id: 2, name: "Rahul", email: "rahul@gmail.com" },
  { id: 3, name: "Virat", email: "virat@gmail.com" },
];

app.get("/", (req, res) => {
  res.send("Working..");
});

app.put("/update-data/:id", (req, res) => {
  //   res.send(req.params.id);
  try {
    const { name, email } = req.body;
    if (!name || !email)
      return res
        .status(404)
        .json({ message: "All fields are required.", success: false });

    const userId = parseInt(req.params.id); // 5
    if (!userId)
      return res
        .status(404)
        .json({ message: "User id is requried.", success: false });
    //   console.log(userId);
    const userData = users.find((user) => user.id === userId);
    if (!userData)
      return res
        .status(404)
        .json({ message: "User not exists.", success: false });
    //   console.log(userData);
    userData.email = email;
    userData.name = name;

    res.status(200).json({
      success: true,
      message: "Userdata update successfully.",
      updatedUserData: userData,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});

exports.login = async (req, res) => {
  try {
    if (req.body.password === "") {
      res.json({ message: "Password required!", data: req.body });
    } else {
      console.log("Received Form Data:", req.body);
      res.json({ message: "Form submitted successfully!", data: req.body });
    }
  } catch (error) {
    console.log("Something went wrong");
    res.json({
      message: "Something went wrong!",
    });
  }
};

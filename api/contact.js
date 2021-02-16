const { sendMessage } = require("../js/email");

module.exports = async (req, res) => {
  const body = req.body;

  if (!(body && body.name && body.email && body.message)) {
    res.status(500).send("All inputs required");
  }

  await sendMessage({
    to: "contact@opencollective.foundation",
    from: "Open Collective <info@opencollective.com>",
    subject: "Open Collective Foundation: Contact us form",
    text: `
      Name: ${body.name}
      Email: ${body.email}

      Message: ${body.message}
    `,
  });

  res.status(200).send({ result: "Success" });
};

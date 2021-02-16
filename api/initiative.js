const { sendMessage } = require("../js/email");

module.exports = async (req, res) => {
  const body = req.body;
  if (!(body && body.name && body.email && body.mission && body.slug)) {
    res.status(400).send("All inputs required");
  }

  await sendMessage({
    to: "contact@opencollective.foundation",
    from: "Open Collective <info@opencollective.com>",
    subject: "Open Collective Foundation: Create Initiative form",
    text: `
        Name: ${body.name}
        Email: ${body.email}
        Slug: ${body.slug}
        Mission: ${body.mission}
      `,
  });

  res.status(200).send({ result: "Success" });
};

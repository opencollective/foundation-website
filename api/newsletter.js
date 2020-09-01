function emailSubscribe(email) {
  const username = 'anystring';
  const password = process.env.MAILCHIMP_API_KEY;

  const basicAuthenticationString = Buffer.from(
    [username, password].join(':'),
  ).toString('base64');

  return fetch(process.env.MAILCHIMP_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuthenticationString}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      members: [
        {
          email_address: email,
          status: 'subscribed',
        },
      ],
      update_existing: true,
    }),
  });
}

module.exports = async (req, res) => {
  const body = req.body;
  if (!(body && body.email)) {
    res.status(400).send('Please provide a valid input');
  }

  try {
    await emailSubscribe(body.email)
    res.status(200).send({ result: 'Success '})

  } catch (err) {
    res.status(400).send(err)
  }
}

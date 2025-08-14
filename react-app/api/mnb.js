// api/mnb.js (place this in the /api directory of your Vercel project)

//import fetch from 'node-fetch';

var cachedData;
var cachedDate;

export default async function handler(req, res) {
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  if (cachedData && cachedDate && cachedDate === today) {
      console.log('Serving from cache');
      return res.status(200).send(cachedData);
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  const endpoint = 'http://www.mnb.hu/arfolyamok.asmx';
  const reqBodyXml = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.mnb.hu/webservices/">
      <soapenv:Header/>
      <soapenv:Body>
        <web:GetCurrentExchangeRates/>
      </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://www.mnb.hu/webservices/GetCurrentExchangeRates',
      },
      body: reqBodyXml,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).send(errorText);
    }

    const text = await response.text();
    // ✅ Save to cache for today
    cachedData = text;
    cachedDate = today;

    // Return the XML response directly
    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(text);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}

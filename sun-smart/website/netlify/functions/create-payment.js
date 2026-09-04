// Creates a HitPay hosted payment page for the customer's cart total and
// returns its URL. The HitPay Business API key lives only in Netlify's
// environment variables (HITPAY_API_KEY) -- it must never be sent to the
// browser or committed to the repo.
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed." }) };
  }

  const API_KEY = process.env.HITPAY_API_KEY;
  const ENV = (process.env.HITPAY_ENV || "sandbox").toLowerCase(); // "sandbox" or "live"
  if (!API_KEY) {
    console.error("HITPAY_API_KEY is not set in the site's environment variables.");
    return { statusCode: 500, body: JSON.stringify({ error: "Payment gateway is not configured yet." }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body." }) };
  }

  const amount = Number(payload.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid amount." }) };
  }

  const apiBase = ENV === "live"
    ? "https://api.hit-pay.com/v1"
    : "https://api.sandbox.hit-pay.com/v1";

  const siteUrl = process.env.URL || "https://www.ez4u.co";
  const referenceNumber = "SS-" + Date.now();

  const body = new URLSearchParams({
    amount: amount.toFixed(2),
    currency: "MYR",
    reference_number: referenceNumber,
    redirect_url: siteUrl + "/payment-success.html",
    send_email: "false"
  });
  if (payload.summary) body.append("purpose", String(payload.summary).slice(0, 200));
  if (payload.email) body.append("email", String(payload.email).slice(0, 200));

  try {
    const res = await fetch(apiBase + "/payment-requests", {
      method: "POST",
      headers: {
        "X-BUSINESS-API-KEY": API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      body: body.toString()
    });

    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch (e) { data = null; }

    if (!res.ok || !data) {
      console.error("HitPay API error", res.status, text);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "HitPay declined the request. Check the Netlify function logs for details." })
      };
    }

    const payUrl = data.url || data.checkout_url || (data.data && data.data.url);
    if (!payUrl) {
      console.error("HitPay response had no recognisable payment URL field:", text);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Unexpected response from HitPay. Check the Netlify function logs." })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ url: payUrl, id: data.id || null, reference: referenceNumber })
    };
  } catch (err) {
    console.error("Could not reach HitPay:", err);
    return { statusCode: 502, body: JSON.stringify({ error: "Could not reach the payment gateway. Please try again." }) };
  }
};

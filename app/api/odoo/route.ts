import Odoo from "odoo-xmlrpc";
import { NextRequest } from "next/server";

const odoo = new Odoo({
  url: process.env.ODOO_URL ?? "",
  db: process.env.ODOO_DB ?? "",
  username: process.env.ODOO_USERNAME ?? "",
  password: process.env.ODOO_PASSWORD ?? "",
});

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    const { model, domain, fields } = body;

    // Search for records
    const ids = await new Promise((resolve, reject) =>
      odoo.execute_kw(model, "search", [domain], (err, value) => {
        if (err) reject(err);
        else resolve(value);
      })
    );

    // Read the records
    const records = await new Promise((resolve, reject) =>
      odoo.execute_kw(model, "read", [ids, fields], (err, value) => {
        if (err) reject(err);
        else resolve(value);
      })
    );

    return new Response(JSON.stringify({ success: true, data: records }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "an error has ocuured" }),
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import axios from "axios";

export async function POST(req: Request) {
  await connectToDatabase();

  // Extract email details from the request body
  const { to, subject, text }: { to: string; subject: string; text: string } =
    await req.json();

  // Validate input
  if (!to || !subject || !text) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Email API configuration
    const apiKey = process.env.EMAIL_API_KEY;
    const apiUrl = "https://api.mailjet.com/v3.1/send"; // Replace with the actual email API URL

    const requestData = {
      Messages: [
        {
          From: {
            Email: process.env.EMAIL_USER,
            Name: "Call Card Site",
          },
          To: [
            {
              Email: to,
              Name: "Subscriber",
            },
          ],
          Subject: subject,
          TextPart: "Greetings from Call Card Site!",
          HTMLPart: text,
        },
      ],
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${apiKey}`,
      },
    };

    // Send email using the external API
    const response = await axios.post(apiUrl, requestData, config);

    if (response.status === 200 || response.status === 201) {
      return NextResponse.json(
        { message: "Email sent successfully" },
        { status: 200 }
      );
    } else {
      throw new Error(
        `Failed to send email: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error sending email:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Failed to send email", error: errorMessage },
      { status: 500 }
    );
  }
}

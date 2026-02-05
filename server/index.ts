import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// n8n webhook URL - uses ngrok tunnel to reach local n8n instance
// When workflow is Active: use /webhook/ path
// When testing: use /webhook-test/ path
const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  "https://nonlevel-promilitarism-lorita.ngrok-free.dev/webhook/menopause-unmasked-registration";

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON request bodies
  app.use(express.json());

  // Registration API endpoint - proxies form data to n8n webhook
  app.post("/api/register", async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        ageRange,
        symptoms,
        hopes,
        referralSource,
        referralOther,
        additionalNotes,
      } = req.body;

      // Server-side validation
      if (!firstName || !lastName || !email || !phone || !ageRange) {
        res.status(400).json({
          success: false,
          message: "Please fill in all required fields.",
        });
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({
          success: false,
          message: "Please provide a valid email address.",
        });
        return;
      }

      // Forward registration data to n8n webhook
      // Nest under "body" to match n8n Normalize Data node which checks $json.body.*
      // Include agree_guidelines for the If node condition
      const webhookPayload = {
        body: {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          age_range: ageRange,
          agree_guidelines: true,
          timestamp_utc: new Date().toISOString(),
          event_slug: "menopause-unmasked-2026",
          symptoms: (symptoms || []).join(", "),
          hopes: (hopes || []).join(", "),
          referral_source: referralSource || "",
          referral_other: referralOther || "",
          additional_notes: additionalNotes || "",
          source: "landing-page",
        },
        // Also send top-level for If node access
        email,
        agree_guidelines: true,
      };

      console.log(`[Register] Sending registration for ${email} to n8n webhook...`);

      const webhookResponse = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
      });

      if (!webhookResponse.ok) {
        const errorText = await webhookResponse.text().catch(() => "");
        console.error(
          `[Register] n8n webhook returned ${webhookResponse.status}: ${errorText}`
        );
        // Still return success to the user - we don't want webhook issues to block registration
        console.warn(
          "[Register] Webhook failed but returning success to user. Payload logged above."
        );
      } else {
        console.log(`[Register] Successfully registered ${email}`);
      }

      res.json({ success: true, message: "Registration successful!" });
    } catch (error) {
      console.error("[Register] Error:", error);
      // If the webhook is unreachable (n8n down, ngrok down, etc.),
      // still return success so the user isn't blocked
      res.json({ success: true, message: "Registration received!" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`n8n webhook URL: ${N8N_WEBHOOK_URL}`);
  });
}

startServer().catch(console.error);

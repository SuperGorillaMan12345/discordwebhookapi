export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const data = req.body;

  await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: "GitHub-Style Notify",
      embeds: [{
        title: "New Event 🚀",
        description: data.message || "更新がありました",
        color: 0x24292e,
        fields: [
          { name: "Source", value: data.source || "unknown", inline: true },
          { name: "Time", value: new Date().toLocaleString(), inline: true }
        ]
      }]
    })
  });

  res.json({ ok: true });
}

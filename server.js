// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 10000; // Render assigns port dynamically

// Middleware
app.use(cors());
app.use(bodyParser.json());
const path = require("path");
// Serve static files from the public folder

// Supabase client
const supabase = createClient(
  'https://ngyvruzcqnyhytogybov.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5neXZydXpjcW55aHl0b2d5Ym92Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzI1OTgwMSwiZXhwIjoyMDcyODM1ODAxfQ.f37udeZi4NbrO4zCNrS8xnLbbSjMCQ1flyKwtPhMdyg'
);

// Home Route
app.get("/", (req, res) => {
  res.send("🌍 Worker Management Backend is Live on Render ✅");
});

// Add Worker
app.post("/add-worker", async (req, res) => {
  try {
    const { name, age, role } = req.body;
    if (!name || !age || !role) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const { data, error } = await supabase
      .from("workers")
      .insert([{ name, age, role }]);

    if (error) throw error;
    res.json({ success: true, worker: data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get All Workers
app.get("/workers", async (req, res) => {
  try {
    const { data, error } = await supabase.from("workers").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

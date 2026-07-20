import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const demoModeEnabled =
    process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  if (!demoModeEnabled) {
    return NextResponse.json(
      { error: "Demo access is currently disabled." },
      { status: 403 }
    );
  }

  const email = process.env.DEMO_ACCOUNT_EMAIL;
  const password = process.env.DEMO_ACCOUNT_PASSWORD;

  if (!email || !password) {
    console.error("Demo account credentials are missing.");

    return NextResponse.json(
      { error: "Demo access is not configured." },
      { status: 500 }
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Demo login failed:", error.message);

    return NextResponse.json(
      { error: "Unable to start the demo." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
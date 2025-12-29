import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { userId } = await params;
  return NextResponse.json(
    { success: true, message: "OK", data: userId },
    { status: 200 }
  );
}

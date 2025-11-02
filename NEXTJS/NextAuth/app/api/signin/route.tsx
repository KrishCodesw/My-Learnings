import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  // ideally we should check the username and password in the DB and only if it is right
  // we should return the jwt
  const body = await req.json();
  const username = body.username;
  const password = body.password;
  //   check in the db
  const userId = 1;
  const token = jwt.sign({ userId }, "SECRET");
  return NextResponse.json({ token });
}

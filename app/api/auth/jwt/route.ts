import { NextRequest } from "next/server";
import { verifyAuthTokens } from "utils/verifyAuth";

const handler = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (!accessToken || !refreshToken) {
    return new Response("Unauthorized", { status: 401 });
  }
  const result = await verifyAuthTokens(accessToken, refreshToken);
  if (!result.authorized) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (result.newAccessToken) {
    return new Response(
      JSON.stringify({ text: "Authorized", accessToken: result.newAccessToken }),
      { status: 200 }
    );
  }
  return new Response(JSON.stringify({ text: "Authorized" }), { status: 200 });
};

export { handler as GET, handler as POST };

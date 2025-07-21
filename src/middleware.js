import { NextResponse } from "next/server";

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-createxyz-project-id", "70931516-5459-4e29-9991-248d8cd50fca");
  requestHeaders.set("x-createxyz-project-group-id", "1f690a95-bb80-4c3a-baa6-e41c2e6b90ac");


  request.nextUrl.href = `https://www.create.xyz/${request.nextUrl.pathname}`;

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}
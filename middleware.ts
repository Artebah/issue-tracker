export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/issues/:id(\\d+)/edit", "/issues/new"],
};

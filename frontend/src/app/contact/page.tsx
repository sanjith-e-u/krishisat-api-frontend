import { redirect } from "next/navigation";

export default function ContactRedirectPage() {
  redirect("/contact-sales");
  return null;
}

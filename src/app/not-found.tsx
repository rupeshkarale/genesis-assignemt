import { redirect } from "next/navigation";

export default function NotFound() {
  redirect("https://app.eventy.xyz");
}

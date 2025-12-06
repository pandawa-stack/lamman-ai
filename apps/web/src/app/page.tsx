import { redirect } from "next/navigation";

export default function Home() {
  // Redirect langsung ke halaman login/auth
  redirect("/auth");
}

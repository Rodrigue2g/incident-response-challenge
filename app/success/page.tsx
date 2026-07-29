import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CitadelleLogo } from "@/components/CitadelleLogo";
import { FireworksCanvas } from "@/components/FireworksCanvas";
import {
  COMPLETION_COOKIE,
  verifyCompletionCookie,
} from "@/server/completion";
import { finalChallengeFlag } from "@/server/generated-admin-credentials";

export default async function SuccessPage() {
  const cookieStore = await cookies();
  const complete = verifyCompletionCookie(
    cookieStore.get(COMPLETION_COOKIE)?.value,
  );

  if (!complete) notFound();

  return (
    <main className="containment-success">
      <FireworksCanvas />
      <section className="success-content" aria-live="polite">
        <div className="success-seal"><CitadelleLogo /></div>
        <p className="success-kicker">All sessions terminated</p>
        <h1>System secured.</h1>
        <p className="success-lead">
          All active connections have been cleaned up. The Citadelle
          incident-response challenge has been completed successfully.
        </p>
        <code className="success-flag">{finalChallengeFlag}</code>
        <div className="success-actions">
          <Link href="/">Return to website</Link>
        </div>
      </section>
    </main>
  );
}

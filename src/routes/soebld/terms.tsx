import { createFileRoute, Link } from "@tanstack/react-router";
import { LangSwitch, useLang } from "@/lib/metalcon/lang";

export const Route = createFileRoute("/soebld/terms")({
  component: TermsPage,
});

function TermsPage() {
  const { lang, setLang } = useLang();
  return (
    <main className="mx-auto min-h-dvh max-w-lg px-4 py-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-widest text-gold uppercase">The Business Machine Experience</p>
        <LangSwitch lang={lang} setLang={setLang} />
      </div>
      <h1 className="mt-2 font-display text-3xl text-cream">{lang === "es" ? "Términos y condiciones beta" : "Beta Terms & Conditions"}</h1>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-cream">
        <p>
          This is a beta of the SOE Business Leadership Scenario Cards, shown at The Business Machine Experience by the School of
          Entrepreneurship. It is a test, not the finished Business Machine.
        </p>
        <h2 className="font-display text-xl text-cream">Your information</h2>
        <p>
          Information you provide, or that is gathered through your use of this app, is owned by Contractor Nation Corporation and its partners. It will not be sold, and it will not be shared with any outside third parties for their own use. The only exceptions are service providers who host and run this app for us — they may not use or sell it for their own purposes — and when the law requires us to disclose it. By signing up, you also allow us to store your name, mobile number, and email, and to use them to tell you about the school, programs, events, and offers from Contractor Nation Corporation and its partners. You can ask us to stop by emailing Info@soebluecollar.org.
        </p>
        <h2 className="font-display text-xl text-cream">Media release</h2>
        <p>
          By signing up, you give Contractor Nation Corporation and its partners permission to photograph, video, and record you during the event and your use of this app, and to use those photos, videos, and recordings, along with your name, image, voice, and likeness, in advertisements, marketing campaigns, social media, websites, and school and event materials, in any media, now or in the future. This permission is worldwide, continues after the event, and does not require further approval or payment. We will not sell the footage as a standalone product. If you are under 18, a parent or legal guardian must agree to these terms on your behalf.
        </p>
        <h2 className="font-display text-xl text-cream">Intellectual property</h2>
        <p>
          The scenarios, answers, card numbers, payroll values, and the way the exercise is run are owned by the School
          of Entrepreneurship. You may play them in this beta. You may not copy, photograph the full deck for reuse,
          republish, train a model on, or build a competing version of the cards or the exercise. Looking up the card in
          front of you is allowed. Duplicating the work is not.
        </p>
        <p>
          The beta may change or stop without notice. Payroll amounts shown here are the teaching values on the cards.
          They are not a promise of wages.
        </p>
      </div>
      <Link to="/soebld/join" className="mt-6 inline-block text-sm font-semibold text-gold">
        {lang === "es" ? "Volver a tu asiento" : "Back to your seat"}
      </Link>
    </main>
  );
}

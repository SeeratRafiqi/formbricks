import { SentryProvider } from "@/app/sentry/SentryProvider";
import { IS_PRODUCTION, SENTRY_DSN, SENTRY_ENVIRONMENT, SENTRY_RELEASE } from "@/lib/constants";
import { TolgeeNextProvider } from "@/tolgee/client";
import { getLocale } from "@/tolgee/language";
import { getTolgee } from "@/tolgee/server";
import { TolgeeStaticData } from "@tolgee/react";
import { Metadata } from "next";
import React from "react";
import "../modules/ui/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Kolaxus",
    default: "Kolaxus",
  },
  description: "AI-powered platform",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const locale = await getLocale();
  const tolgee = await getTolgee();
  const staticData = await tolgee.loadRequired();

  return (
    <html lang={locale} translate="no">
      <body className="flex h-dvh flex-col bg-[var(--kolaxus-bg)] transition-all ease-in-out text-gray-900">
        <SentryProvider
          sentryDsn={SENTRY_DSN}
          sentryRelease={SENTRY_RELEASE}
          sentryEnvironment={SENTRY_ENVIRONMENT}
          isEnabled={IS_PRODUCTION}>
          <TolgeeNextProvider language={locale} staticData={staticData as unknown as TolgeeStaticData}>
            <main className="flex-1">{children}</main>
          </TolgeeNextProvider>
        </SentryProvider>
      </body>
    </html>
  );
};

export default RootLayout;

import "@/app/globals.css";
import { RootLayoutShell, defaultMetadata } from "@/components/RootLayoutShell";

export const metadata = defaultMetadata;

export default function PtRootLayout({ children }) {
  return <RootLayoutShell lang="pt-BR">{children}</RootLayoutShell>;
}

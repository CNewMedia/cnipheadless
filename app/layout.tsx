import "./globals.css";
export const metadata = { title: "CNIP", description: "Systematic Marketing Execution" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="mx-auto max-w-3xl p-6 font-sans">{children}</body>
    </html>
  );
}

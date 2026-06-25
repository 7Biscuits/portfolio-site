import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rudransh.dev"), // TODO: Replace with production URL if different
  title: "Rudransh Srivastava — Full-Stack Developer & Tech Leader",
  description: "Portfolio of Rudransh Srivastava — Full-Stack Developer, 3x Hackathon Winner, and Co-founder of Varanasi's first Hack Club.",
  openGraph: {
    title: "Rudransh Srivastava",
    description: "Building hardware-software integrations and scalable web applications.",
    images: ["/og-image.png"],
  },
  keywords: ["Full-Stack Developer", "IoT", "React", "Next.js", "Hackathon"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') ?? 'dark';
                document.documentElement.classList.toggle('dark', theme === 'dark');
                const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
                if (metaColorScheme) {
                  metaColorScheme.content = theme === 'dark' ? 'dark' : 'light';
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[var(--canvas)] text-[var(--text-primary)] min-h-screen`}>
        {children}
      </body>
    </html>
  );
}

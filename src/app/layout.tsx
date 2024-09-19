import './globals.css';
import { Roboto } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const roboto = Roboto({
  subsets: ['latin-ext'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable} antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}

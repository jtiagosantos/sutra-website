import './globals.css';
import 'react-notion-x/src/styles.css';

import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './providers';

const roboto = Roboto({
  subsets: ['latin-ext'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Sutra',
  description:
    'Gamifique sua leitura ao participar de quizzes interativos e transforme cada página em um desafio!',
  keywords: ['book', 'quiz', 'leitura', 'gamificação', 'desafio', 'interativo'],
  openGraph: {
    title: 'Sutra',
    description:
      'Gamifique sua leitura ao participar de quizzes interativos e transforme cada página em um desafio!',
    url: 'www.bookquiz.com.br',
    images: 'https://bookquiz.s3.amazonaws.com/assets/cover.png',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className='scrollbar-thumb-dimGray scrollbar-track-platinum'>
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "o8dmamqbk9");
          `,
          }}
        />
      </head>
      <body className={`${roboto.variable} antialiased`}>
        <Toaster />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

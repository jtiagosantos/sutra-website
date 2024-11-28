import {
  Body,
  Container,
  Font,
  Heading,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
  Button,
} from '@react-email/components';
import * as React from 'react';

interface EmailProps {
  userName: string;
}

export const Email = ({
  userName = 'John Doe',
}: EmailProps) => (
  <Html>
    <Tailwind>
      <Font
        fontFamily="Roboto"
        fallbackFontFamily="Helvetica"
        webFont={{
          url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Font
        fontFamily="Roboto"
        fallbackFontFamily="Helvetica"
        webFont={{
          url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
          format: "woff2",
        }}
        fontWeight={700}
        fontStyle="normal"
      />
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://bookquiz.s3.us-east-1.amazonaws.com/assets/cover.png"
            width="150"
            alt="Logo do Sutra"
            style={logo}
          />
          <Heading style={heading}>Grandes Novidades na Plataforma! 😍🥳🤩</Heading>
          <Text style={{ ...text, marginBottom: 0, marginTop: 50, lineHeight: 0 }}>
            Olá, {userName} :)
          </Text>
          <Text style={text}>
            Estamos empolgados em anunciar que nossa plataforma está de volta com
            {' '}<span style={{ color: '#8381D9' }}>incríveis atualizações</span>{' '}
            e
            {' '}<span style={{ color: '#8381D9' }}>novas funcionalidades</span>{' '}
            .
            Confira o que há de novo: 🎉
          </Text>

          <Section style={featureSection}>
            <Heading as="h2" style={h2}>1. Rebranding</Heading>
            <Text style={text}>
              Sim, é isso mesmo! O nome Book Quiz ficará apenas na lembrança dos nossos primeiros usuários; agora somos a plataforma
              {' '}
              <span style={{ color: '#8381D9' }}>Sutra</span>
              ! 🎊
              <br />
              Além disso, mudamos também nossa logotipo para algo que melhor representa o que de fato é a plataforma.
            </Text>
          </Section>

          <Section style={{ ...featureSection, paddingTop: 6 }}>
            <Heading as="h2" style={h2}>2. Interface Renovada</Heading>
            <Text style={text}>
              Redesenhamos completamente nossa interface para tornar sua experiência ainda mais agradável e intuitiva.
              Foram adicionados <span style={{ color: '#8381D9' }}>novos elementos visuais</span>,{' '}
              <span style={{ color: '#8381D9' }}>melhorias de usabilidade</span> e {' '}
              <span style={{ color: '#8381D9' }}>ajustes de performance</span>
              .
              Melhoramos alguns detalhes que já existiam e adicionamos {' '}
              <span style={{ color: '#8381D9' }}>novas funcionalidades</span>
              .
              A nova experiência da interface está totalmente completa para todos os usuários, tanto no desktop quanto no mobile.
            </Text>
          </Section>

          <Section style={{ ...featureSection, paddingTop: 6 }}>
            <Heading as="h2" style={h2}>2. Novas Funcionalidades</Heading>
            <Text style={text}>
              Agora a plataforma é dividida basicamente em duas grandes páginas: a página de início e a página de explorar.
              <br />

              <Text style={text}>
                <span style={{ color: '#8381D9', fontWeight: '700' }}>2.1. Página de Início:</span>
                <br />
                <Text style={{ ...text, marginTop: 0 }}>
                  Página onde você pode navegar pela nossa{' '}
                  <span style={{ color: '#8381D9' }}>vitrine de quizzes</span>
                  . Nessa página, os quizzes estão divididos em categorias e você pode escolher um quiz para jogar.
                  Além disso, há a seção de quizzes recentes, onde você pode ver os quizzes que foram adicionados recentemente na plataforma.
                  Existe também a seção
                  "<span style={{ color: '#EB5D5F' }}>🤩 Em alta na plataforma</span>"
                  , que tem os quizzes mais jogados do momento.
                </Text>
                <Text style={{ ...text, marginTop: 0 }}>
                  No início da página há também algumas opções de acesso rápido, como
                  "<span style={{ color: '#8381D9' }}>Quiz Personalizado</span>",{' '}
                  "<span style={{ color: '#71717A' }}>Classificação</span>",{' '}
                  "<span style={{ color: '#71717A' }}>Instruções</span>",{' '}e{' '}
                  "<span style={{ color: '#EAB308' }}>Seja Premium</span>",{' '}
                </Text>
              </Text>

              <Text style={{ ...text, marginTop: 0 }}>
                <span style={{ color: '#8381D9', fontWeight: '700' }}>2.2. Página de Explorar:</span>
                <br />
                <Text style={{ ...text, marginTop: 0 }}>
                  Página onde você pode navegar pelos nossos quizzes de forma mais ampla.
                  Nessa página você pode filtrar os quizzes por categoria, além de poder ordenar os resultados.
                  Assim como na página de Início, aqui você também pode escolher um quiz para jogar.
                </Text>
              </Text>

              <Text style={{ ...text, marginTop: 0 }}>
                <span style={{ color: '#8381D9', fontWeight: '700' }}>2.3. Campo de Busca:</span>
                <br />
                <Text style={{ ...text, marginTop: 0 }}>
                  Repensamos o header da plataforma e adicionamos um campo de busca para que você possa pesquisar por quizzes específicos por meio de palavras-chave,
                  ou por categorias de quizzes.
                </Text>
              </Text>

              <Text style={{ ...text, marginTop: 0 }}>
                <span style={{ color: '#8381D9', fontWeight: '700' }}>2.4. Página de Detalhes do Quiz:</span>
                <br />
                <Text style={{ ...text, marginTop: 0 }}>
                  Nessa página, você tem acesso ao quiz escolhido, podendo ver informações do livro sobre o qual é o quiz, como título do livro,
                  nome do autor, categoria(s) e um breve resumo do livro.
                  Logo abaixo dessas informações há um botão para começar o quiz.
                  <br />
                  Há também um botão de ações sobre o quiz escolhido, como a funcionalidade de compartilhar um quiz com um amigo, por exemplo.
                  <br />
                  Além disso, nessa página você também pode ver um seção com quizzes relacionados ao quiz escolhido.
                </Text>
              </Text>
            </Text>
          </Section>

          <Section style={{ ...featureSection, paddingTop: 6 }}>
            <Heading as="h2" style={h2}>3. Sistema de Medalhas</Heading>
            <Text style={text}>
              Atualizamos a imagem de todas as medalhas para imagens mais condizentes com o tema da plataforma.
            </Text>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href="https://www.sutra.app.br">
              Explorar as Novidades
            </Button>
          </Section>

          <Text style={text}>
            Estamos ansiosos para que você experimente todas essas novidades. Sua jornada literária no Book Quiz ficou ainda mais emocionante! 🤩
          </Text>
          <Text style={text}>
            Agradecemos por fazer parte da nossa plataforma e por sua paciência durante o período de atualizações.
          </Text>
          <Text style={text}>
            Boa leitura, bons quizzes e muita diversão! 😍
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default Email;

const main = {
  backgroundColor: '#f4f4f4',
  fontFamily: 'Roboto, Helvetica, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '30px 20px',
  backgroundColor: '#ffffff',
  maxWidth: '600px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const logo = {
  margin: '0 auto',
};

const heading = {
  color: '#474a50',
  fontSize: '20px',
  lineHeight: 0,
  margin: '0 auto',
  marginBottom: '30px',
  marginTop: '40px',
  width: 'fit-content',
};

const text = {
  color: '#666666',
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '10px',
};

const featureSection = {
  padding: '16px 0',
};

const h2 = {
  color: '#8381D9',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: '20px',
  marginBottom: '40px',
};

const button = {
  backgroundColor: '#8381D9',
  color: '#ffffff',
  fontSize: '18px',
  textDecoration: 'none',
  borderRadius: '4px',
  padding: '12px 24px',
};
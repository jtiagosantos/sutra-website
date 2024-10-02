import {
  Body,
  Button,
  Container,
  Font,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailProps {
  userName: string;
  quizLink: string;
}

export const Email = ({
  userName = 'John Doe',
  quizLink = 'https://exemplo.com/quiz',
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
      <Preview>É hora de testar seu conhecimento! 🧠📚</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={greetings}>Olá {userName} :)</Heading>
          <Text style={text}>
            Que tal reservar um momento hoje para testar seu conhecimento sobre seus livros favoritos e se divertir? 🤩
          </Text>
          <Text style={text}>
            Lembre-se de acessar a Book Quiz e fazer seu quiz diário. Cada resposta certa te aproxima ainda mais do topo
            do ranking dos leitores mais afiados! 🚀
          </Text>
          <Text style={{ ...text, marginTop: 30 }}>
            Acesse agora e veja como você se sai hoje!
          </Text>
          <Section style={buttonContainer}>
            <Button
              style={button}
              href={quizLink}
            >
              Jogar Quiz
            </Button>
          </Section>
          <Text style={text}>
            Boa sorte e divirta-se,<br />
            Equipe Book Quiz
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
  paddingTop: '30px',
  paddingBottom: '30px',
};

const container = {
  margin: '0 auto',
  padding: '30px 20px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  maxWidth: '600px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const greetings = {
  color: '#474a50',
  fontSize: '18px',
  marginBottom: '30px',
  lineHeight: 0
};

const text = {
  color: '#666666',
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '10px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginBottom: '30px',
};

const button = {
  backgroundColor: '#50b2c0',
  color: '#ffffff',
  fontSize: '18px',
  textDecoration: 'none',
  borderRadius: '4px',
  padding: '12px 24px',
};
import {
  Body,
  Button,
  Container,
  Font,
  Heading,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailProps {
  userName: string;
  medalName: string;
  medalDescription: string;
  medalImageUrl: string;
  earnedDate: string;
  baseUrl: string;
}

export const Email = ({
  userName = 'John Doe',
  medalName = 'Leitor Iniciante',
  medalDescription = 'Você alcançou o nível 1 e ganhou a medalha Leitor Iniciante',
  medalImageUrl = 'https://bookquiz.s3.amazonaws.com/assets/medals/medal-level-1.png',
  earnedDate = '16/10/2024',
  baseUrl = 'https://bookquiz.com.br/medalhas',
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
          <Heading style={heading}>Parabéns, {userName}!</Heading>
          <Text style={text}>Você acaba de ganhar uma nova medalha na plataforma Sutra 🎉</Text>

          <Section style={medalSection}>
            <Img
              src={medalImageUrl}
              width="120"
              height="120"
              alt={medalName}
              style={medalImage}
            />
            <Heading style={h2}>{medalName}</Heading>
            <Text style={textDescription}>{medalDescription}</Text>
            <Text style={textEarnedDate}>Conquistada em: {earnedDate}</Text>
          </Section>

          <Text style={text}>
            Continue lendo e participando dos quizzes para ganhar mais medalhas! 🏅🤩
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={baseUrl}>
              Ver Minhas Medalhas
            </Button>
          </Section>
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

const heading = {
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

const h2 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: '700',
  lineHeight: '28px',
  margin: '0 0 10px',
};

const medalSection = {
  background: '#d8f3f77f',
  borderRadius: '8px',
  padding: '20px',
  margin: '0 0 20px',
  marginTop: '20px',
  textAlign: 'center' as const,
};

const medalImage = {
  margin: '0 auto 16px',
  borderRadius: 8
};

const textDescription = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0 0 10px',
};

const textEarnedDate = {
  color: '#888',
  fontSize: '12px',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: '20px',
};

const button = {
  backgroundColor: '#50b2c0',
  color: '#ffffff',
  fontSize: '18px',
  textDecoration: 'none',
  borderRadius: '4px',
  padding: '12px 24px',
};

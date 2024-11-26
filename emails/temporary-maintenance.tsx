import {
  Body,
  Container,
  Font,
  Heading,
  Html,
  Img,
  Tailwind,
  Text,
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
            src="https://bookquiz.s3.us-east-1.amazonaws.com/old/thumbnail.png"
            width="130"
            alt="BookQuiz"
            style={logo}
          />
          <Heading style={heading}>Manutenção Temporária</Heading>
          <Text style={{ ...text, marginTop: 50 }}>
            Olá, {userName} :)
          </Text>
          <Text style={text}>
            Gostaríamos de informar que nossa plataforma ficará temporariamente indisponível para manutenção e atualizações ⚙️.
            Estamos trabalhando duro para trazer grandes novidades e melhorias para sua experiência no BookQuiz 🤩.
          </Text>
          <Text style={text}>
            Agradecemos sua compreensão e paciência durante este período. Fique ligado, pois em breve voltaremos com muitas surpresas! 🥳
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
  marginTop: '20px',
  width: 'fit-content',
};

const text = {
  color: '#666666',
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '10px',
};

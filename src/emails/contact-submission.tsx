import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";

interface ContactSubmissionEmailProps {
  name: string;
}

export const ContactSubmissionEmail = ({
  name,
}: ContactSubmissionEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>We received your message</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank you for contacting us, {name}!</Heading>
          <Text style={text}>
            We have received your message and will get back to you as soon as
            possible.
          </Text>
          <Text style={text}>
            Best regards,
            <br />
            The AstraQ Cyber Defence Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  paddingBottom: "24px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
};

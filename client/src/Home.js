import { Container, Paper, Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 5, textAlign: "center", bgcolor: "#f5f5f5" }}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome Home
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This is your home page.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;

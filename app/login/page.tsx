'use client'

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { auth } from '@/firebase/clientApp';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Container size={420} my={40}>
      <Title ta="center">
        Hallo GOLBer
      </Title>
    
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@golb.dev" onChange={(e) => setEmail(e.target.value)} required />
        <PasswordInput label="Password" placeholder="Your password" onChange={(e) => setPassword(e.target.value)} required mt="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button onClick={handleLogin} fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
    );
  }
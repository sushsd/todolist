'use client';

import {
    Text,
    Center,
    Flex,
    TextInput,
    PasswordInput,
    Button,
    Space,
    Title,
    Card,
    Anchor,
} from '@mantine/core';
import { useState } from 'react';

const FooterText = (
isLogin: boolean,
setIsLogin: (isLogin: boolean) => void
) => {
    if (isLogin) {
        return (
            <Text ta="center" size="sm">
                Don't have an account?{' '}
                <Anchor c="blue" inherit onClick={() => {setIsLogin(false)}}>
                    Sign up
                </Anchor>
            </Text>
        );
    } else {
        return (
            <Text ta="center" size="sm">
                Already have an account?{' '}
                <Anchor c="blue" inherit onClick={() => {setIsLogin(true)}}>
                    Login
                </Anchor>
            </Text>
        );
    }
}

async function onRegister() {
    const response = await fetch('api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: 'John Doe',
            password: '123456',
        }),
});

async function onLogin() {
    const response = await fetch('api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: 'John Doe',
            password: '123456',
        }),
});

export default function HomePage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Flex direction="column" align="center" justify="center" h="100vh">
            <Center h={100}>
                <Card shadow="xl" p="xl" radius="lg">
                    <Flex justify="center" direction="column" gap="md">
                        <Title
                            order={1}
                            fw={700}
                            style={{
                                background: 'linear-gradient(0.4turn, #53a8b6, #5585b5)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Welcome to Bachh-Do
                        </Title>
                        <TextInput label="Email Adress" placeholder="Email Adress" />
                        <PasswordInput label="Password" placeholder="Password" />
                        <Space h="sm" />
                        <Button variant="light" color="blue" fullWidth>
                            {' '}
                            {isLogin ? "Login" : "Register"}
                            {' '}
                        </Button>
                        <FooterText isLogin={isLogin} setIsLogin={setIsLogin} />
                    </Flex>
                </Card>
            </Center>
        </Flex>
    );
}

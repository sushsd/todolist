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
import { useRouter } from "next/navigation";
import { setUserName } from '../components/src/Globals'

const FooterText = (
    {
        isLogin,
        setIsLogin
    }:
        {
            isLogin: boolean,
            setIsLogin: (isLogin: boolean) => void
        }) => {
    if (isLogin) {
        return (
            <Text ta="center" size="sm">
                Don't have an account?{' '}
                <Anchor c="blue" inherit onClick={() => { setIsLogin(false) }}>
                    Sign up
                </Anchor>
            </Text>
        );
    } else {
        return (
            <Text ta="center" size="sm">
                Already have an account?{' '}
                <Anchor c="blue" inherit onClick={() => { setIsLogin(true) }}>
                    Login
                </Anchor>
            </Text>
        );
    }
}


export default function HomePage() {
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    async function onRegister(name: string, password: string) {
        const response = await fetch('api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                password: password,
            }),
        });
        const data = await response.json();
        if (data.message === 'success') {
            setUserName(name);
            router.push('/overview');
        }
    }

    async function onLogin(name: string, password: string) {
        const response = await fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                password: password,
            }),
        });
        const data = await response.json();
        if (data.message === 'success') {
            setUserName(name);
            router.push('/overview');
        }
    }

    async function onButtonClick() {
        if (isLogin) {
            onLogin(name, password);
        } else {
            onRegister(name, password);
        }
    }

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
                        <TextInput label="Name" placeholder="Name" onChange={(event) => { setName(event.target.value) }} />
                        <PasswordInput label="Password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} />
                        <Space h="sm" />
                        <Button variant="light" color="blue" fullWidth onClick={() => { onButtonClick() }}>
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

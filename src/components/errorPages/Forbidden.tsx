"use client"

import { Button, Container, Group, Stack, Text, Title } from "@mantine/core"
import { IconShieldOff } from "@tabler/icons-react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export const ForbiddenPage = () => {
    const router = useRouter()
    return (
        <Container size='md' py={80} style={{ textAlign: "center" }}>
            <Stack align='center' gap='lg'>
                <IconShieldOff size={64} strokeWidth={1.5} color='red' />

                <Title order={1} size='2.5rem' fw={700}>
                    Forbidden
                </Title>

                <Text c='dimmed' size='md'>
                    You do not have permission to access this page.
                </Text>

                <Group mt='md'>
                    <Button
                        size='md'
                        onClick={async () => {
                            await signOut({ callbackUrl: "/auth/login" })
                        }}
                    >
                        Sign Out
                    </Button>
                    <Button
                        variant='filled'
                        size='md'
                        onClick={() => router.push("/")}
                    >
                        Back to Home
                    </Button>
                </Group>
            </Stack>
        </Container>
    )
}

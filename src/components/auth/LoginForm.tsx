"use client"

import {
    Anchor,
    Button,
    Checkbox,
    LoadingOverlay,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from "@mantine/core"
import classes from "@/lib/css_modules/Login.module.css"
import { useRouter } from "next/navigation"
import { useForm } from "@mantine/form"
import { getSession, signIn } from "next-auth/react"
import { notifications } from "@mantine/notifications"
import { useDisclosure } from "@mantine/hooks"
import { AppError, BadRequestError } from "@/lib/errors"

export function LoginForm() {
    const router = useRouter()
    const [visible, { open, close }] = useDisclosure(false)

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value)
                    ? null
                    : "Please enter a valid email address",
            password: (value) =>
                value.length >= 6
                    ? null
                    : "Password must be at least 6 characters long",
        },
    })

    const handleSubmit = async (values: typeof form.values) => {
        // Show loading state
        open()
        try {
            // Attempt to sign in the user
            const result = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            })

            close()

            if (result?.ok) {
                const session = await getSession()
                if (!session) {
                    throw new BadRequestError("Session not found after login")
                }
                // optionally do something with session.user or just redirect
                router.push("/")
            } else {
                notifications.show({
                    title: "Login Failed",
                    message: "Invalid email or password",
                    color: "red",
                })
            }
        } catch (error) {
            close()
            notifications.show({
                title: "Login Failed",
                message:
                    error instanceof AppError
                        ? error.message
                        : "Unexpected error occurred. Please try again later.",
                color: "red",
            })
        }
    }

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form}>
                <LoadingOverlay
                    visible={visible}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                />
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Title order={2} className={classes.title}>
                        Welcome back to Ping Panda!
                    </Title>

                    <TextInput
                        label='Email address'
                        placeholder='hello@gmail.com'
                        size='md'
                        radius='md'
                        {...form.getInputProps("email")}
                    />
                    <PasswordInput
                        label='Password'
                        placeholder='Your password'
                        mt='md'
                        size='md'
                        radius='md'
                        {...form.getInputProps("password")}
                    />
                    <Checkbox label='Keep me logged in' mt='xl' size='md' />
                    <Button
                        type='submit'
                        fullWidth
                        mt='xl'
                        size='md'
                        radius='md'
                    >
                        Login
                    </Button>

                    <Text ta='center' mt='md'>
                        Don&apos;t have an account?{" "}
                        <Anchor
                            href='#'
                            fw={500}
                            onClick={(event) => event.preventDefault()}
                        >
                            Register
                        </Anchor>
                    </Text>
                </form>
            </Paper>
        </div>
    )
}

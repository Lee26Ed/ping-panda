"use client"

import {
    Box,
    Burger,
    Button,
    Divider,
    Drawer,
    Group,
    ScrollArea,
    Text,
    Title,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import classes from "@/lib/css_modules/NavBar.module.css"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import {
    IconHome,
    IconInfoCircle,
    IconLogin2,
    IconLogout,
    IconMail,
    IconUserPlus,
} from "@tabler/icons-react"

export function NavBar() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false)
    const { data: session, status } = useSession()

    if (status === "loading") {
        return (
            <Box pb={80}>
                <header className={classes.header}>
                    <Group justify='space-between' h='100%'>
                        <Link href='/'>
                            <Image
                                src='/ping_panda.png'
                                alt='logo'
                                width={40}
                                height={40}
                            />
                        </Link>
                    </Group>
                </header>
            </Box>
        )
    }

    return (
        <Box
            style={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
            }}
        >
            <header className={classes.header}>
                <Group justify='space-between' h='100%'>
                    <Link href='/' style={{ textDecoration: "none" }}>
                        <Group align='center'>
                            <Image
                                src='/ping_panda.png'
                                alt='logo'
                                width={40}
                                height={40}
                            />
                            <Text className={classes.logoText}>Ping Panda</Text>
                        </Group>
                    </Link>

                    <Group
                        h='100%'
                        gap={0}
                        visibleFrom='sm'
                        className={classes.centerLinks}
                    >
                        <Link href='/' className={classes.link}>
                            Home
                        </Link>

                        <Link href='#' className={classes.link}>
                            About Us
                        </Link>
                        <Link href='#' className={classes.link}>
                            Contact Us
                        </Link>
                    </Group>

                    <Group visibleFrom='sm'>
                        {session?.user ? (
                            <>
                                <Button onClick={() => signOut()}>
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href='/auth/login'>
                                    <Button variant='default'>Login</Button>
                                </Link>
                                <Link href='/auth/register/user'>
                                    <Button>Sign Up</Button>
                                </Link>
                            </>
                        )}
                    </Group>

                    <Burger
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        hiddenFrom='sm'
                    />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size='100%'
                padding='md'
                title={
                    <>
                        <Group>
                            <Image
                                src='/ping_panda.png'
                                alt='logo'
                                width={25}
                                height={25}
                            />
                            <Title order={6}> Ping Panda </Title>
                        </Group>
                    </>
                }
                hiddenFrom='sm'
                zIndex={1000000}
            >
                <ScrollArea h='calc(100vh - 80px)' mx='-md'>
                    <Box
                        px='md'
                        pb='xl'
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                    >
                        {/* Navigation Links */}
                        <Box>
                            <Divider mb={"sm"} />
                            <DrawerItem
                                href='/'
                                icon={<IconHome size={16} />}
                                label='Home'
                            />
                            <DrawerItem
                                href='/about'
                                icon={<IconInfoCircle size={16} />}
                                label='About Us'
                            />
                            <DrawerItem
                                href='/contact'
                                icon={<IconMail size={16} />}
                                label='Contact Us'
                            />
                            {session?.user ? (
                                <>
                                    <DrawerItem
                                        onClick={() => signOut()}
                                        icon={<IconLogout size={16} />}
                                        label='Logout'
                                    />
                                </>
                            ) : (
                                <>
                                    <DrawerItem
                                        href='/auth/login'
                                        icon={<IconLogin2 size={16} />}
                                        label='Login'
                                    />
                                    <DrawerItem
                                        href='/auth/register/user'
                                        icon={<IconUserPlus size={16} />}
                                        label='Sign Up'
                                    />
                                </>
                            )}
                        </Box>
                    </Box>
                </ScrollArea>
            </Drawer>
        </Box>
    )
}

type DrawerItemProps = {
    label: string
    icon: React.ReactNode
    href?: string // optional
    onClick?: () => void // optional
}

export function DrawerItem({ label, icon, href, onClick }: DrawerItemProps) {
    const Inner = (
        <Button
            fullWidth
            variant='subtle'
            color='dark'
            leftSection={icon}
            justify='start'
            onClick={onClick} // will be ignored if undefined
        >
            {label}
        </Button>
    )

    // When href is provided, wrap with Next.js <Link>
    return href ? (
        <Link href={href} style={{ textDecoration: "none" }}>
            {Inner}
        </Link>
    ) : (
        Inner
    )
}

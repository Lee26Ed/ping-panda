import { Button, Container, Group, Text, Title } from "@mantine/core"
import classes from "@/lib/css_modules/NotFound.module.css"
import Link from "next/link"
import { Illustration } from "./Illustration"

export const NothingFoundBackground = async () => {
    return (
        <Container className={classes.root}>
            <div className={classes.inner}>
                <Illustration className={classes.image} />
                <div className={classes.content}>
                    <Title className={classes.title}>Nothing to see here</Title>
                    <Text
                        c='dimmed'
                        size='lg'
                        ta='center'
                        className={classes.description}
                    >
                        The page you are trying to open does not exist. You may
                        have mistyped the address, or the page has been moved to
                        another URL. If you think this is an error contact
                        support.
                    </Text>
                    <Group justify='center'>
                        <Link href='/'>
                            <Button size='md'>Take me back home</Button>
                        </Link>
                    </Group>
                </div>
            </div>
        </Container>
    )
}

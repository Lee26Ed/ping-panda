import "@mantine/core/styles.layer.css"
import {
    ColorSchemeScript,
    MantineProvider,
    mantineHtmlProps,
    createTheme,
} from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import type { Metadata } from "next"
import { navy, green } from "@/lib/theme"
import { montserrat, poppins, raleway, lato } from "@/lib/theme"
import SessionProviderWrapper from "@/components/auth/SessionProviderWrapper"

export const metadata: Metadata = {
    title: "Ping Panda",
    description: "A simple app to demonstrate authentication with Next.js",
}
const theme = createTheme({
    primaryColor: "green", // specify which of the defined colors to use as primary
    colors: {
        // list custom available colors here that can be used in the app
        navy,
        green,
    },
    fontFamily: "raleway, font-lato, sans-serif",
    headings: {
        fontFamily: "montserrat, poppins, sans-serif",
    },
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en' {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body
                className={`${montserrat.variable} ${poppins.variable} ${raleway.variable} ${lato.variable}`}
            >
                <SessionProviderWrapper>
                    <MantineProvider theme={theme}>
                        <Notifications />
                        {children}
                    </MantineProvider>
                </SessionProviderWrapper>
            </body>
        </html>
    )
}

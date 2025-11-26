import { MantineColorsTuple } from "@mantine/core"
import { Montserrat, Poppins, Raleway, Lato } from "next/font/google"

export const navy: MantineColorsTuple = [
    "#ebf7ff",
    "#d6ebfa",
    "#a7d6f6",
    "#77c0f4",
    "#54adf2",
    "#42a2f2",
    "#389cf3",
    "#2d88d9",
    "#2179c2",
    "#013659",
]

export const green: MantineColorsTuple = [
    "#f1fbeb",
    "#e3f4db",
    "#c6e7b5",
    "#a6da8c",
    "#8ccf69",
    "#7bc853",
    "#72c547",
    "#60ad38",
    "#51962e",
    "#448523",
]

export const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
})
export const raleway = Raleway({
    variable: "--font-raleway",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    display: "swap",
    style: "normal",
})

export const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    display: "swap",
})
export const lato = Lato({
    variable: "--font-lato",
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"],
    display: "swap",
})

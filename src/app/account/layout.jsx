import { Montserrat } from "next/font/google"
import "./../globals.scss"

import { Providers } from "@/Components/Providers"
const MontserratFont = Montserrat({ subsets: ["latin"] })
import Header from "@/Sections/Header"
import MobileBar from "@/Components/MobileBar"

export const metadata = {
  title: "GYMYX",
  description: "GYMYX",
  manifest: '/manifest.json'
}

async function getData() {
  const res = await fetch("https://gymyx.cro.codes/api/pages/account", {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function AccountLayout({ children }) {
  const { data } = await getData()
  const headerData = data.modules.find(
    (item) => item.section.alias === "account_header"
  )

  return (
    <html lang="en">
      <body className={MontserratFont.className}>
        <Providers>
          <Header isLanding={false} data={headerData} />
          <MobileBar />
          <main className="main account">{children}</main>
        </Providers>
      </body>
    </html>
  )
}

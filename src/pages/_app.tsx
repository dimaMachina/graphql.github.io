import type { AppProps } from "next/app"
import { Roboto_Flex, Roboto_Mono } from "next/font/google"
import { useRouter } from "next/router"
import { useEffect } from "react"
import "@/globals.css"
import "@/codemirror.less"
import "@/index.less"

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
})

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
function handleRouteChange(url: string) {
  ;(window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  })
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${robotoFlex.style.fontFamily};
        }

        .roboto-mono {
          font-family: ${robotoMono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}

import type { AppProps } from 'next/app'
import '../styles/edit.scss'

//入口文件
function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp

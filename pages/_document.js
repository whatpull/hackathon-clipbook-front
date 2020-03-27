import Document, { Html, Head, Main, NextScript } from 'next/document'

// [커스텀] 도큐먼트
class ClipBookDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main/>
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default ClipBookDocument;
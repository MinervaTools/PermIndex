import React from "react";
import { Helmet } from "react-helmet";

const Seo = ({ title, description, image, imageAlt, seoTitle }) => {
    let descr = description ?? "A Minecraft Permission Index. By MinervaTools";
    let title2 = title ?? "PermIndex";
    let img = image; // TODO: Add fallback
    let imalt = imageAlt; // TODO: Add fallback
    let seoTitle2 = seoTitle ?? title2;

    return (
        <Helmet
            title={title2}
            defaultTitle={"PermIndex"}
            titleTemplate={"%s | PermIndex"}
            htmlAttributes={{ lang: "en" }}
        >
            <meta name="robots" content="index, follow" />
            <meta name="description" content={descr} />
            <meta property="og:title" content={seoTitle2} />
            <meta property="og:description" content={descr} />
            {img && <meta property="og:image" content={img} />}
            <meta property="og:site_name" content={"PermIndex"} />
            <meta property="og:type" content="website" />

            <meta property="twitter:card" content="summary" />
            {/*<meta property="twitter:site" content="@AddMeLater" />*/}
            <meta property="twitter:title" content={seoTitle2} />
            <meta property="twitter:description" content={descr} />
            {img && <meta property="twitter:image" content={img} />}
            {imalt && <meta property="twitter:alt" content={imalt} />}

            <script
                async
                defer
                data-domain="permindex.minervatools.net"
                src="https://analytics.kevink.dev/js/plausible.js"
            ></script>
        </Helmet>
    );
};

export default Seo;

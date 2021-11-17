import { Link } from "gatsby";
import React from "react";

import "../index.scss";
import * as styles from "./default.module.scss";

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <div className={styles.navigation}>
                <nav>
                    <Link to={"/"} className={styles.logo}>
                        <span className={styles.name}>PermIndex</span>
                        <span className={styles.subtitle}>by MinervaTools</span>
                    </Link>
                </nav>
            </div>
            <main>{children}</main>
            <footer>
                All data licensed under{" "}
                <Link href="https://github.com/MinervaTools/PermIndex/blob/main/LICENSE.md">
                    BSD-3-Clause
                </Link>{" "}
                |{" "}
                <Link href="https://github.com/MinervaTools/PermIndex">
                    Source-Code
                </Link>{" "}
                |{" "}
                <Link href="https://minervatools.net/legal/imprint">
                    Imprint &amp; Contact
                </Link>
            </footer>
        </div>
    );
};

export default Layout;

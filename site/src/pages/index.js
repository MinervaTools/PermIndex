import { graphql, Link } from "gatsby";
import * as React from "react";
import Seo from "../components/Seo";
import Layout from "../layouts/default";

import * as styles from "./index.module.scss";

const IndexPage = ({ data }) => {
    const [search, setSearch] = React.useState("");

    return (
        <Layout>
            <Seo title={"Explore"} seoTitle={"Explore PermIndex"} />
            {/*<div className={styles.searchBox}>
                <input value={search} onChange={(ev) => setSearch(ev.currentTarget.value)} placeholder="Search..." />
                <button>Search</button>
            </div>*/}

            {search.trim().length > 0 && (
                <>
                    <h2>Search for "{search.trim()}"</h2>

                    <div className={styles.cardList}></div>
                </>
            )}

            {search.trim().length === 0 && (
                <>
                    <h2>Permission Sets</h2>

                    <div className={styles.cardList}>
                        {data.allPermIndexSet.nodes.map((set) => {
                            return (
                                <Link
                                    className={styles.card}
                                    to={"/" + set.parent.name + "/" + set.oid}
                                >
                                    <span>{set.description}</span>
                                    <span className={styles.name}>
                                        {set.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </>
            )}
        </Layout>
    );
};

export const query = graphql`
    {
        allPermIndexSet {
            nodes {
                oid
                parent {
                    ... on PermIndexNamespace {
                        name
                    }
                }
                name
                description
            }
        }
    }
`;

export default IndexPage;

import { graphql, Link } from "gatsby";
import * as React from "react";
import Seo from "../components/Seo";
import Layout from "../layouts/default";

import * as styles from "./index.module.scss";

const NamespacePage = ({ data }) => {
    return (
        <Layout>
            <Seo
                title={`Explore Namespace "${data.permIndexNamespace.name}"`}
            />
            <h2>
                Permission Sets in Namespace "{data.permIndexNamespace.name}"
            </h2>

            <div className={styles.cardList}>
                {data.permIndexNamespace.childrenPermIndexSet.map((set) => {
                    return (
                        <Link
                            className={styles.card}
                            to={
                                "/" +
                                data.permIndexNamespace.name +
                                "/" +
                                set.oid
                            }
                        >
                            <span>{set.description}</span>
                            <span className={styles.name}>{set.name}</span>
                        </Link>
                    );
                })}
            </div>
        </Layout>
    );
};

export const query = graphql`
    query ($id: String) {
        permIndexNamespace(id: { eq: $id }) {
            name
            childrenPermIndexSet {
                oid
                name
                description
            }
        }
    }
`;

export default NamespacePage;

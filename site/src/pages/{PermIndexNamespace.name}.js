import { graphql } from "gatsby";
import * as React from "react";

// markup
const NamespacePage = ({ data }) => {
    return <pre>{JSON.stringify(data, null, 4)}</pre>;
};

export const query = graphql`
    query ($id: String) {
        permIndexNamespace(id: { eq: $id }) {
            name
            childrenPermIndexSet {
                name
            }
        }
    }
`;

export default NamespacePage;

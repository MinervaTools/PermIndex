import { graphql } from "gatsby";
import * as React from "react";
import slugify from "@sindresorhus/slugify";

// markup
const SetPage = ({ data }) => {
    return <pre>{JSON.stringify(data, null, 4)}</pre>;
};

export const query = graphql`
    query ($id: String) {
        permIndexSet(id: { eq: $id }) {
            childrenPermIndexPermission {
                name
            }
            name
            documentation
            description
        }
    }
`;

export default SetPage;

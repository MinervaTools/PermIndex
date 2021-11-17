import { graphql } from "gatsby";
import * as React from "react";

// markup
const PermissionPage = ({ data }) => {
    return <pre>{JSON.stringify(data, null, 4)}</pre>;
};

export const query = graphql`
    query ($id: String) {
        permIndexPermission(id: { eq: $id }) {
            name
            affectedCommands {
                command
            }
            default
            description
            namespace
        }
    }
`;

export default PermissionPage;

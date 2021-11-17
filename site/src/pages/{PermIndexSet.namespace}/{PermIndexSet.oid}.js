import { graphql, Link } from "gatsby";
import * as React from "react";
import slugify from "@sindresorhus/slugify";
import Layout from "../../layouts/default";

import * as styles from "./SetPage.module.scss";
import Seo from "../../components/Seo";

// markup
const SetPage = ({ data, location }) => {
    const docsUrl = new URL(data.permIndexSet.documentation);

    return (
        <Layout>
            <Seo
                title={`Explore Set "${data.permIndexSet.name}"`}
                description={data.permIndexSet.description}
            />
            <h2>Permissions in the Set "{data.permIndexSet.name}"</h2>
            <p>{data.permIndexSet.description}</p>

            <p>
                Additional documentation available at{" "}
                <Link
                    href={data.permIndexSet.documentation}
                    target="_blank"
                    rel="noreferrer"
                >
                    {docsUrl.host}
                </Link>
            </p>

            <div className={styles.permissionTable}>
                <table>
                    <thead>
                        <tr>
                            <th>Permission</th>
                            <th>Description</th>
                            <th>Default</th>
                            <th>Example Command</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.permIndexSet.childrenPermIndexPermission.map(
                            (permission) => {
                                return (
                                    <tr
                                        id={slugify(permission.name)}
                                        onDoubleClick={(ev) => {
                                            ev.preventDefault();
                                            window.location.hash = slugify(
                                                permission.name
                                            );
                                        }}
                                    >
                                        <td>{permission.name}</td>
                                        <td>{permission.description}</td>
                                        <td>{permission.default}</td>
                                        <td>
                                            {permission.affectedCommands
                                                ?.length > 0
                                                ? "/" +
                                                  permission.affectedCommands[0]
                                                      .command
                                                : ""}
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query ($id: String) {
        permIndexSet(id: { eq: $id }) {
            childrenPermIndexPermission {
                name
                description
                default
                affectedCommands {
                    command
                }
            }
            name
            documentation
            description
        }
    }
`;

export default SetPage;

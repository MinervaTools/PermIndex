const fs = require("fs");
const path = require("path");

const basePath = path.join(__dirname, "..");
const dataPath = path.join(basePath, "data");

exports.sourceNodes = ({
    actions,
    createNodeId,
    createContentDigest,
    reporter,
}) => {
    const { createNode } = actions;

    let namespaces = fs.readdirSync(dataPath);

    namespaces = namespaces.filter((namespace) => {
        return fs.statSync(path.join(dataPath, namespace)).isDirectory();
    });

    let permissions = {};
    let sets = {};

    const scanFolder = (folder, namespace) => {
        const files = fs.readdirSync(folder);

        files.forEach((file) => {
            const fPath = path.join(folder, file);

            if (file === "sets.json") {
                sets[namespace] = JSON.parse(fs.readFileSync(fPath));

                return;
            }

            const stat = fs.statSync(fPath);

            if (stat.isDirectory()) {
                scanFolder(fPath, namespace);
                return;
            }

            if (!file.endsWith(".json")) {
                return;
            }

            permissions[namespace] = permissions[namespace].concat(
                JSON.parse(fs.readFileSync(fPath))
            );
        });
    };

    namespaces.forEach((namespace) => {
        reporter.info(`Now loading ${namespace}.`);

        permissions[namespace] = [];

        scanFolder(path.join(dataPath, namespace), namespace);
    });

    reporter.info(`Data loaded.`);

    let setIds = {};
    let permissionIds = {};
    let namespaceIds = {};
    let setMembers = {};

    reporter.info(`Generating IDs...`);

    namespaces.forEach((namespace) => {
        namespaceIds[namespace] = createNodeId(
            `permindex-namespace-${namespace}`
        );

        setIds[namespace] = {};
        permissionIds[namespace] = {};
        setMembers[namespace] = {};

        let allIds = [];

        sets[namespace].forEach((set) => {
            setIds[namespace][set.id] = createNodeId(
                `permindex-set-${namespace}-${set.id}`
            );
            setMembers[namespace][set.id] = [];
            allIds.push(setIds[namespace][set.id]);
        });

        permissions[namespace].forEach((permission) => {
            permissionIds[namespace][permission.name] = createNodeId(
                `permindex-set-${namespace}-${permission.name}`
            );
            setMembers[namespace][permission.set].push(
                permissionIds[namespace][permission.name]
            );
            allIds.push(permissionIds[namespace][permission.name]);
        });

        (() => {
            const data = {
                name: namespace,
            };

            const nodeMeta = {
                id: namespaceIds[namespace],
                parent: null,
                children: allIds,
                internal: {
                    type: `PermIndexNamespace`,
                    contentDigest: createContentDigest(data),
                },
            };

            const node = Object.assign({}, data, nodeMeta);
            createNode(node);
        })();

        sets[namespace].forEach((set) => {
            const data = {
                namespace,
                oid: set.id,
                ...set,
            };

            const nodeMeta = {
                id: setIds[namespace][set.id],
                parent: namespaceIds[namespace],
                children: setMembers[namespace][set.id],
                internal: {
                    type: `PermIndexSet`,
                    contentDigest: createContentDigest(data),
                },
            };

            const node = Object.assign({}, data, nodeMeta);
            createNode(node);
        });

        permissions[namespace].forEach((permission) => {
            const data = {
                namespace,
                ...permission,
            };

            const nodeMeta = {
                id: permissionIds[namespace][permission.name],
                parent: setIds[namespace][permission.set],
                children: [],
                internal: {
                    type: `PermIndexPermission`,
                    contentDigest: createContentDigest(data),
                },
            };

            const node = Object.assign({}, data, nodeMeta);
            createNode(node);
        });
    });

    /*const myData = {
      key: 123,
      foo: `The foo field of my node`,
      bar: `Baz`
    }
  
    const nodeContent = JSON.stringify(myData)
  
    const nodeMeta = {
      id: createNodeId(`my-data-${myData.key}`),
      parent: null,
      children: [],
      internal: {
        type: `MyNodeType`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(myData)
      }
    }
  
    const node = Object.assign({}, myData, nodeMeta)
    createNode(node)*/
};

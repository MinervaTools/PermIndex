# 🔍 PermIndex

> Your Minecraft-permission-index.

## What and why is PermIndex?

PermIndex is a machine-readable index of Minecraft permissions and descriptions for them.
This is for use in permission plugins and interfaces to display human-readable descriptions
to users when managing permission-settings.

You can explore PermIndex on our website at <https://permindex.minervatools.net>!

## Can I contribute to PermIndex?

Sure, we'd love that! If you found some mistake or want to add your plugins permissions
feel free to fork PermIndex, make your changes, and create a pull request.

Check out [`CONTRIBUTING.md`](./CONTRIBUTING.md) for more information.

## Can I use PermIndex in my plugin/website/...?

PermIndex is licensed under the "BSD 3-Clause License", which allows free use of the data
for both personal and commercial projects.
PermIndex is however distributed with no liability or warranty.

For more information check out [choosealicense.com](https://choosealicense.com/licenses/bsd-3-clause/).

## How can I access the data?

You can either clone the repo and build a custom data set from the source data, or you can
try our GraphQL API at [https://permindex.minervatools.net/api/graphql](https://permindex.minervatools.net/api/graphql/___graphql).

If you use our API in a **really** big application, please consider sponsoring so we pay Cloudflare for the traffic. :p

(For reference, we pay 0.50$ per million requests)

## Structure

### `data`

The `data`-folder contains all of the actual data, seperated for different
servers and namespaces in the format `/data/[namespace]/[base]/[base].json`.

`[namespace]` can currently only be `spigot` for Spigot-compatible servers such as
Spigot, PaperMC, CraftBukkit etc. In the future a `bungeecord`-category is planned.

`[base]` is always the first part of the permission
(e.g. for `bukkit.command.restart` the base would be `bukkit`).

All of the JSON-files in the data directory must conform to the schema
defined in [`meta/data.schema.json`](./meta/data.schema.json).

Template for an permission entry for copy-pasting:

```json
{
    "name": "example.permission",
    "description": "Grants permission to examples",
    "default": "op",
    "affectedCommands": [
        {
            "command": "example"
        }
    ]
}
```

A permission may also have a `match`-field containg regex for which
permissions should match this one. This can be used for dynamically
generated permissions.

The `affectedCommands`-command-object may also contain a `comment`
field describing how the permission affects the command. For example
the comment could be `"Allows teleporting other players"`.

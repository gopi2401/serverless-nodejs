import Table from "cli-table";

export function help() {
    const table = new Table({
        head: ["Command", "Description"],
        style: {
            head: new Array(3).fill("cyan"),
        },
        colWidths: [20, 50],
    });

    table.push(
        ["--help | help", "Show this help message"],
        ["create", "Initialize a new project"],
        ["build", "Build the project"],
        ["deploy", "Deploy the project to production"],
        ["test", "Run tests for the project"]
    );

    console.log(table.toString());
}
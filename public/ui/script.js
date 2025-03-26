document.getElementById('fetchSchema').addEventListener('click', function() {
    document.getElementById('schemaContainer').innerText = "Processing....";
    fetch('/fetchSchema', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log("response : ", response);
        return response.json();
     })
    .then(data => {
        console.log(data);
        document.getElementById('schemaContainer').innerHTML = 
        `${formatSchemaText(data.response)}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('analyseSchema').addEventListener('click', function() {
    const prompt = "";//document.getElementById('promptInput').value;
    document.getElementById('responseContainer').innerText = "Processing....";
    fetch('/suggestedSchema', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: prompt })
    })
    .then(response => {
        console.log("response : ", response);
        return response.json();
     })
    .then(data => {
        console.log(data);
        document.getElementById('responseContainer').innerHTML = 
        `${formatText(data.response)}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function formatText(responseText) {
    return responseText
        .replace(/\n\n/g, '</p><p>')  // Convert double newlines to paragraphs
        .replace(/\n/g, '<br>');       // Convert single newline to <br>
}

function formatSchemaText(responseText) {
    // Split text into lines
    let lines = responseText.split("\n");

    // Extract table name (first line should contain "Table: tableName")
    let tableName = lines[0].replace("Table: ", "").trim();

    // Extract and parse columns JSON
    let columnsJson = responseText.match(/Columns: (\[.*\])/);
    let columns = columnsJson ? JSON.parse(columnsJson[1]) : [];

    // Generate table HTML
    let tableHtml = `
        <h3>Table: ${tableName}</h3>
        <table border="1" cellspacing="0" cellpadding="5">
            <thead>
                <tr>
                    <th>CID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Not Null</th>
                    <th>Default Value</th>
                    <th>Primary Key</th>
                </tr>
            </thead>
            <tbody>
                ${columns.map(col => `
                <tr>
                    <td>${col.cid}</td>
                    <td>${col.name}</td>
                    <td>${col.type}</td>
                    <td>${col.notnull ? "Yes" : "No"}</td>
                    <td>${col.dflt_value !== null ? col.dflt_value : "NULL"}</td>
                    <td>${col.pk ? "Yes" : "No"}</td>
                </tr>
                `).join("")}
            </tbody>
        </table>
    `;

    return tableHtml;
}

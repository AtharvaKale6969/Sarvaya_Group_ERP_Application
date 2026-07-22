const fs = require('fs');
const path = require('path');

const dir = 'D:\\ERP_Application_Sarvaya\\src\\pages\\HRAdmin';
const files = ['Departments.tsx', 'Designations.tsx', 'ManageBranch.tsx', 'PayrollGroup.tsx'];

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the flex column body with block body
    content = content.replace(
        /<div style=\{\{\s*padding:\s*'1.5rem',\s*overflowY:\s*'auto',\s*flex:\s*1,\s*minHeight:\s*0,\s*display:\s*'flex',\s*flexDirection:\s*'column',\s*gap:\s*'1rem'\s*\}\}>/g,
        '<div style={{ padding: \'1.5rem\', overflowY: \'auto\', flex: 1 }}>'
    );
    
    // Also without minHeight: 0
    content = content.replace(
        /<div style=\{\{\s*padding:\s*'1.5rem',\s*overflowY:\s*'auto',\s*flex:\s*1,\s*display:\s*'flex',\s*flexDirection:\s*'column',\s*gap:\s*'1rem'\s*\}\}>/g,
        '<div style={{ padding: \'1.5rem\', overflowY: \'auto\', flex: 1 }}>'
    );

    // And add marginBottom to the Active count div
    content = content.replace(
        /<div style=\{\{\s*padding:\s*'1.5rem',\s*overflowY:\s*'auto',\s*flex:\s*1\s*\}\}>\s*<div\s*>/g,
        '<div style={{ padding: \'1.5rem\', overflowY: \'auto\', flex: 1 }}>\n              <div style={{ marginBottom: \'1rem\' }}>'
    );

    // ManageBranch "Modify Branch" drawer
    content = content.replace(
        /<div style=\{\{\s*padding:\s*'1.5rem',\s*flex:\s*1,\s*overflowY:\s*'auto',\s*overflowX:\s*'hidden',\s*display:\s*'flex',\s*flexDirection:\s*'column',\s*gap:\s*'1.25rem'\s*\}\}>/g,
        '<div style={{ padding: \'1.5rem\', flex: 1, overflowY: \'auto\', overflowX: \'hidden\' }}>\n              <style>{`\n                .drawer-body-fix > div, .drawer-body-fix > h3 { margin-bottom: 1.25rem; }\n              `}</style>\n              <div className="drawer-body-fix">'
    );

    // Add closing div for ManageBranch
    content = content.replace(
        /<\/div>\n\s*\{\/\*\s*Drawer Footer\s*\*\/\}/g,
        '  </div>\n            </div>\n\n            {/* Drawer Footer */}'
    );

    fs.writeFileSync(filePath, content);
    console.log('Fixed', file);
});

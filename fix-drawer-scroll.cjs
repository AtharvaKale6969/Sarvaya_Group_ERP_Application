const fs = require('fs');
const path = require('path');

const dir = 'D:\\ERP_Application_Sarvaya\\src\\pages\\HRAdmin';
const files = ['Departments.tsx', 'Designations.tsx', 'ManageBranch.tsx', 'PayrollGroup.tsx'];

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Add maxHeight: '100%' to Drawer Panels
    content = content.replace(
        /height:\s*'100%',?\s*(\n\s*boxShadow:)/g,
        "height: '100%', maxHeight: '100%',$1"
    );

    // Some Drawer panels might have different formats
    content = content.replace(
        /backgroundColor:\s*'white',\s*height:\s*'100%',?\s*display:\s*'flex',/g,
        "backgroundColor: 'white', height: '100%', maxHeight: '100%', display: 'flex',"
    );

    fs.writeFileSync(filePath, content);
    console.log('Fixed', file);
});

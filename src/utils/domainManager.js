import fs from 'fs';
import path from 'path';

// Specify the full file path
const nginxConfigPath = path.resolve('/etc/nginx/nginx.conf');

// Content to append (new server block)
const newContent = `
server {
    listen 80;
    server_name new-domain1.com;

    location / {
        proxy_pass http://backend;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
`;

try {
    // Check if the Nginx config file exists
    const stats = fs.statSync(nginxConfigPath);
    console.log('File exists:', stats.isFile());  // Debugging: Check if file exists

    if (stats.isFile()) {
        // Append the new server block content to the Nginx config file
        fs.appendFileSync(nginxConfigPath, newContent, 'utf-8');
        console.log('Server block added successfully!');

        // Add a small delay before reading the file (if needed)
        setTimeout(() => {
            const content = fs.readFileSync(nginxConfigPath, 'utf-8');
            console.log('File content after appending:\n', content);
        }, 1000);  // Wait for 1 second before reading the file
    } else {
        console.log('The specified path is not a valid file.');
    }
} catch (error) {
    console.error('Error:', error.message);
    console.error('Full Error:', error);  // Log the full error object to get more insights
}

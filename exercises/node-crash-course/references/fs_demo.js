const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'test'), {}, err=> {
    if (err) throw err;
    console.log('Folder created')
});
// NOTE: fs.mkdirSync is blocking so it waits for the folder creation

// Create and write to file
fs.writeFile(path.join(__dirname, '/test', 'hello.txt'), 'Hello World!', err => {
   if (err) throw err;
   console.log('File written.');

    // Append to file (using async function so calling this inside the callback function)
    fs.appendFile(path.join(__dirname, '/test', 'hello.txt'), ' -- answer', err => {
       if (err) throw err;
       console.log('File appended.');

        // Read file (again the async thing..)
        fs.readFile(path.join(__dirname, 'test', 'hello.txt'), "utf8", (err, data)=> {
            if (err) throw err;
            console.log(data);

            // Rename file (again the async thing..)
            fs.rename(path.join(__dirname, 'test', 'hello.txt'), path.join(__dirname, 'test', 'new-name.txt'), err=> {
                if (err) throw err;
                console.log('File name changed.');
            });
        });
    });
});
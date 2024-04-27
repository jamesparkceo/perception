// Handles actions triggered by specific tags
const executeAction = (actionCode, ws) => {
    switch (actionCode) {
        case 20:
            const commitMessage = 'Automated commit from chat';
            require('child_process').exec(`git commit -am "${commitMessage}"`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
            });
            break;
        default:
            console.log('No action defined for this code');
    }
};

module.exports = { executeAction };

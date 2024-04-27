// Handles actions triggered by specific tags
const { exec } = require('child_process');
const { manageGPT4Session, spinUpGPT3_5Instance } = require('./voice');

const stageChanges = async (taskDetails) => {
    const response = await spinUpGPT3_5Instance(taskDetails);
    return response;
};

const commitChanges = async (commitMessage) => {
    try {
        const sessionId = await manageGPT4Session();
        exec(`git add . && git commit -m "${commitMessage}" --author="GPT-4 <gpt4@example.com>"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    } catch (error) {
        console.error('Error committing changes:', error);
    }
};

const executeAction = (actionCode, ws, message) => {
    switch (actionCode) {
        case 10: // Stage changes by GPT-3.5
            const taskDetails = message.split(':')[1];
            stageChanges(taskDetails).then(response => {
                ws.send(`Changes staged: ${response}`);
            }).catch(err => {
                console.error('Error staging changes:', err);
                ws.send('Error staging changes.');
            });
            break;
        case 20: // Commit changes by GPT-4
            const commitMessage = message.split(':')[1];
            commitChanges(commitMessage).then(() => {
                ws.send('Changes committed successfully.');
            }).catch(err => {
                console.error('Error committing changes:', err);
                ws.send('Error committing changes.');
            });
            break;
        default:
            console.log('No action defined for this code');
    }
};


module.exports = { executeAction };

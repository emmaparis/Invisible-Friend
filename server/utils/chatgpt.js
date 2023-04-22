function generatePrompt(input, friendType, temperament, language, age) {
    if (friendType === "Friend") {
    return `
    Prompt: ${input}

    Model prompt: Respond to me like you are a ${temperament} ${friendType} that is ${age} years old and speaks ${language}
    `;
    } else {
    return `
    Prompt: ${input}

    Model prompt: Respond to me like you are a ${temperament} ${friendType} that speaks ${language}
    `;
    }
}

module.exports = {generatePrompt};

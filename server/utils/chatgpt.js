function generatePrompt(input, friendType, temperament, age, language) {
    return `
    Prompt: ${input}

    Model prompt: Respond to me like you are a ${temperament} ${friendType} that is ${age} years old and speaks ${language}
    `;
}

module.exports = {generatePrompt};

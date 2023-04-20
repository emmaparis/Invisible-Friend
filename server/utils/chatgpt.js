function generatePrompt(input, friendType, temperament, age, language) {
    return `
    ${input}

    Respond to me like you are:
  
    A ${temperament} ${friendType} that is ${age} years old from ${language}
    `;
  }

module.exports = {generatePrompt};

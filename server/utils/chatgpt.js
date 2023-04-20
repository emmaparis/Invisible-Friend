function generatePrompt(prompt, friendType, temperament, age, language) {
    return `
    ${prompt}

    Respond to me like you are:
  
    A ${temperament} ${friendType} that is ${age} years old from ${language}
    `;
  }

module.exports = {generatePrompt};

// friendType: ${friendType}
// Temperament: ${temperament}
// Age: ${age}
// Language: ${language}


export const apiCall = async (endpoint, data = {}) => {
  try {
    const response = await fetch(`https://builder.empromptu.ai${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer b4180b77229c9c379b8e198ab5ff4a37',
        'X-Generated-App-ID': '79bfc72e-90c7-4097-9d0b-dbefe1997145',
        'X-Usage-Key': 'e67b912b699055762b672916cd2e88ec'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API call error:', error)
    throw error
  }
}

export const setupAIPrompt = async (promptName, inputVariables, promptText) => {
  return await apiCall('/api_tools/setup_ai_prompt', {
    prompt_name: promptName,
    input_variables: inputVariables,
    prompt_text: promptText
  })
}

export const applyPromptToData = async (promptName, inputData, returnType = 'pretty_text') => {
  return await apiCall('/api_tools/apply_prompt_to_data', {
    prompt_name: promptName,
    input_data: { ...inputData, return_type: returnType }
  })
}

export const createAgent = async (instructions, agentName) => {
  return await apiCall('/api_tools/create-agent', {
    instructions,
    agent_name: agentName
  })
}

export const chatWithAgent = async (agentId, message) => {
  return await apiCall('/api_tools/chat', {
    agent_id: agentId,
    message
  })
}

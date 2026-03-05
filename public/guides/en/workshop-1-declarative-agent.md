# Workshop 1 — Declarative Agent

## Objective
Create your first declarative AI agent for Contoso using **Microsoft Copilot Agent Builder** in Microsoft 365. By the end of this workshop, your team will have a functional agent capable of answering Contoso customer questions.

---

## Step 1: Access Copilot Agent Builder

1. Open your browser and go to [https://m365.cloud.microsoft/chat](https://m365.cloud.microsoft/chat)
2. Sign in with your Microsoft 365 credentials
3. Click the **"Agents"** icon in the left sidebar
4. Click **"+ New Agent"** to get started

![Click Agents in the sidebar then New Agent](/guides/screenshots/workshop-1/step1-agents-menu.svg)

> **Tip**: Make sure to use the account provided by the facilitator, not your personal account.

---

## Step 2: Configure Basic Information

1. **Agent Name**: Give your agent a creative name (e.g., "Contoso Support Pro")
2. **Description**: Briefly describe the agent's role
   - Example: *"Customer support agent for Contoso Corporation. Answers questions about products, return policies, and orders."*
3. **Icon**: Choose an icon or upload a logo

![Configure your agent name, description and icon](/guides/screenshots/workshop-1/step2-configure-agent.svg)

---

## Step 3: Write System Instructions

This is the most important part! System instructions define how your agent behaves.

1. In the **"Instructions"** section, write your system instructions
2. Use the following template as a starting point:

```
You are a customer support agent for Contoso Corporation.

## Role
- You assist customers with questions about products, orders, and policies.
- You are professional, friendly, and concise.

## Rules
- Always respond in 3 sentences maximum for simple questions.
- If you don't know the answer, be honest about it.
- Never fabricate information about pricing or availability.

## Tone
- Professional but approachable
- Use polite and formal language
```

![Write your system instructions in the Instructions section](/guides/screenshots/workshop-1/step3-instructions.svg)

3. Click **"Save"**

---

## Step 4: Test Your Agent

1. Use the **test panel** on the right side of the screen
2. Ask test questions:
   - "What is Contoso's return policy?"
   - "How can I track my order?"
   - "What are your most popular products?"
3. Observe the responses and adjust instructions as needed

![Use the test panel to chat with your agent](/guides/screenshots/workshop-1/step4-test-panel.svg)

---

## Step 5: Iterate and Improve

1. **Adjust the tone**: If the agent is too formal or too casual, modify the instructions
2. **Add examples**: Include example Q&A pairs in your instructions
3. **Test the limits**: Ask off-topic questions to verify the agent handles them gracefully

---

## Success Criteria

| Criteria | Description |
|----------|-------------|
| Agent created | The agent is created and accessible in Copilot |
| Clear instructions | System instructions are structured and complete |
| Coherent responses | The agent correctly answers basic Contoso questions |
| Boundary handling | The agent handles off-topic questions appropriately |

---

## Flags

- **Green**: You've completed all steps and the agent responds correctly
- **Orange**: You need help with a specific step
- **Red**: You're blocked and need the facilitator

---

## Time allocated: 45 minutes

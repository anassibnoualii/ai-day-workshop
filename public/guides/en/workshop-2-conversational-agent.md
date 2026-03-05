# Workshop 2 — Conversational Agent

## Objective
Transform your declarative agent into an **intelligent conversational agent** by adding knowledge sources in **Microsoft Copilot Studio**. Your agent will be able to answer questions based on real Contoso documents.

---

## Step 1: Open Copilot Studio

1. Go to [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com)
2. Sign in with your Microsoft 365 credentials
3. Find the agent created in Workshop 1 in the **"Agents"** list
4. Click on it to open it in Copilot Studio

![Open your agent in Copilot Studio and navigate to Knowledge](/guides/screenshots/workshop-2/step1-copilot-studio.svg)

> **Important**: Copilot Studio offers more control than Agent Builder. This is where you'll add knowledge sources.

---

## Step 2: Add a SharePoint Source

1. In the side menu, click **"Knowledge"**
2. Click **"+ Add knowledge"**
3. Select **"SharePoint"** as the source type
4. Enter the Contoso SharePoint site URL provided by the facilitator
5. Select the document folder or library
6. Click **"Add"** and wait for indexing

> **Tip**: Indexing may take 1-2 minutes. Use this time to prepare the next source.

---

## Step 3: Add a Policy Document

1. Go back to **"Knowledge"** > **"+ Add"**
2. Select **"Files"** as the type
3. Upload the **"Contoso Return Policy.pdf"** document provided
4. Wait for the status to change to **"Ready"**

---

## Step 4: Add an External Web Source

1. In **"Knowledge"** > **"+ Add"**
2. Select **"Website"** as the type
3. Enter the Contoso products page URL:
   - URL provided by the facilitator
4. Set the crawl depth to **1 page**
5. Click **"Add"**

![All 3 knowledge sources connected with Ready status](/guides/screenshots/workshop-2/step2-add-knowledge.svg)

---

## Step 5: Configure Grounding Behavior

1. Go back to the agent's **"Instructions"**
2. Add grounding instructions:

```
## Knowledge Sources
- Use ONLY information from connected sources to answer questions.
- If the information is not in the sources, say: "I couldn't find that information in our documents. Would you like me to redirect you to an advisor?"
- Always cite the source of information when possible.
```

![Add grounding instructions to control how the agent uses sources](/guides/screenshots/workshop-2/step3-grounding.svg)

3. Save the changes

---

## Step 6: Test with Sources

1. Open the **test panel**
2. Ask questions that require the sources:
   - "What is the return policy for electronics?" (PDF document)
   - "What products are on sale?" (website)
   - "Where are Contoso's offices?" (SharePoint)
3. Verify the agent cites its sources
4. Test with an out-of-scope question to verify grounding

---

## Step 7: Improve Response Quality

1. **Check for hallucinations**: Is the agent making up information?
2. **Verify citations**: Does the agent correctly reference its sources?
3. **Adjust instructions**: Strengthen grounding rules if needed
4. **Team testing**: Each member asks a different question

---

## Success Criteria

| Criteria | Description |
|----------|-------------|
| 3 sources connected | SharePoint + Document + Website, all "Ready" status |
| Grounding works | Agent answers only from connected sources |
| Citations | Agent cites the source of its information |
| No hallucination | Agent does not fabricate information |

---

## Flags

- **Green**: 3 sources connected and grounding is functional
- **Orange**: Sources connected but grounding issues
- **Red**: Unable to connect sources

---

## Time allocated: 45 minutes

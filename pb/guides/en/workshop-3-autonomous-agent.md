# Workshop 3 — Autonomous Agent

## Objective
Evolve your conversational agent into an **autonomous agent** capable of executing actions automatically using **Flows and Triggers** in Copilot Studio. Your agent will be able to handle customer requests end-to-end without human intervention.

---

## Step 1: Understand Actions in Copilot Studio

1. Open your agent in **Copilot Studio**
2. In the side menu, click **"Actions"**
3. Explore the available action types:
   - **Power Automate Flows**: Complex automations
   - **Connectors**: Integrations with external services
   - **HTTP Actions**: Custom API calls

![The Actions panel in Copilot Studio showing available action types](/guides/screenshots/workshop-3/step1-actions.svg)

> **Key concept**: An autonomous agent doesn't just respond — it ACTS. It can send emails, create tickets, update databases.

---

## Step 2: Create a Power Automate Flow

1. Click **"+ Add an action"**
2. Select **"Create a Power Automate flow"**
3. A new Power Automate tab opens
4. Configure the following flow:

### Flow: Return Request Processing

**Trigger**: Run a flow from Copilot

**Input parameters**:
- `customerName` (text) — Customer name
- `orderNumber` (text) — Order number
- `reason` (text) — Return reason

**Flow actions**:
1. **Create SharePoint item**: Record the request in a SharePoint list
   - List: "Return Requests"
   - Columns: Customer Name, Order Number, Reason, Date, Status
2. **Send an email** (Office 365 Outlook):
   - To: Customer email (or test email)
   - Subject: "Confirmation of your return request #[orderNumber]"
   - Body: Confirmation email with details

**Output parameters**:
- `confirmationId` (text) — Generated confirmation ID

![Power Automate flow: trigger from Copilot, SharePoint, email, return value](/guides/screenshots/workshop-3/step2-power-automate.svg)

5. **Test the flow** independently before connecting it
6. **Save** the flow

---

## Step 3: Connect the Flow to the Agent

1. Return to **Copilot Studio**
2. In **"Actions"**, your new flow should appear
3. If not, click **"Refresh"**
4. Configure the parameter mapping:
   - The flow receives parameters from the conversation context
5. Test the action via the test panel

---

## Step 4: Create an Orchestration Topic

1. Go to **"Topics"** > **"+ New topic"**
2. Name it: "Return Process"
3. Add **trigger phrases**:
   - "I want to return a product"
   - "How do I make a return?"
   - "Cancel my order"
   - "Refund request"
4. Configure the dialog:

```
Bot: "I can help you with your return. What is your order number?"
[User input -> variable orderNumber]

Bot: "Thank you. What is the reason for this return?"
[User input -> variable reason]

Bot: "Let me process your request..."
[Call Power Automate flow with variables]

Bot: "Your return request has been recorded. Confirmation number: {confirmationId}. You'll receive a confirmation email shortly."
```

![Topic configuration: trigger phrases, question nodes, action call, response](/guides/screenshots/workshop-3/step3-topic.svg)

5. **Save** and **publish** the topic

---

## Step 5: Add an Automatic Trigger (Optional)

1. Explore **Triggers** in Copilot Studio
2. Configure a trigger to automatically detect when a customer mentions a return
3. The trigger should redirect to the "Return Process" topic

---

## Step 6: End-to-end Testing

1. Open the **test panel**
2. Simulate a complete conversation:
   - Request a product return
   - Provide an order number
   - Give a reason
   - Verify the flow executes
3. **Check SharePoint** that the item was created
4. **Check your email** that the confirmation was sent
5. Test with different scenarios:
   - Customer who changes their mind
   - Invalid order number
   - Off-topic questions during the process

---

## Step 7: Optimize the Autonomous Agent

1. **Error handling**: What happens if the flow fails?
2. **Fallback messages**: Add messages for error cases
3. **Confirmation**: Ask for confirmation before executing the action
4. **Logging**: Add logs in the flow for debugging

---

## Success Criteria

| Criteria | Description |
|----------|-------------|
| Flow functional | Power Automate flow executes without errors |
| Agent-flow connection | Agent calls the flow correctly |
| SharePoint updated | Item is created in the SharePoint list |
| Email sent | Confirmation email is received |
| Smooth conversation | Dialog is natural and guides the user |
| Zero intervention | Complete process works without human help |

---

## Flags

- **Green**: Complete flow functional, email sent, SharePoint updated
- **Orange**: Flow created but connection or execution issues
- **Red**: Unable to create the flow or connect it

---

## Time allocated: 75 minutes

# 📄 Product Requirements Document
## AI Agent Day — Interactive Event Platform
### 🚀 Build & Scale an AI Agent

> **Version:** 3.0
> **Date:** March 2026
> **Owner:** Alithya
> **Status:** Complete — Ready for Development

---

## 1. Executive Summary

**AI Agent Day** is a full-day (6-hour) immersive, gamified workshop event designed to take teams from zero to a fully autonomous AI agent using **Microsoft Copilot Studio** and **Microsoft 365 Copilot Chat**. Participants build a real **Contoso Customer Support Agent** — progressing from a simple declarative agent in the morning, to a knowledge-grounded conversational agent at midday, to a fully autonomous agent with flows and triggers in the afternoon.

This PRD defines the **web-based event companion platform** that acts as the live hub for the day: agenda tracker, gamified scoreboard, digital challenge card system, real-time timer, SharePoint document hub, and Microsoft Forms feedback — all accessible as a **Microsoft Teams Tab**.

---

## 2. Problem Statement

Running a structured, gamified, multi-team workshop without a dedicated platform creates friction:

- Teams can't follow **what step they're on** or **how much time is left**
- No **live scoreboard** — scores tracked manually on a whiteboard
- **Challenge cards** distributed on paper — hard to reveal, control, and track
- Workshop resources (labs, slides, templates) scattered across emails and chats
- No central **feedback collection** at the end of the day
- Facilitators lose coaching time managing logistics

---

## 3. Goals & Success Metrics

| Goal | Success Metric |
|---|---|
| Teams follow the day in real time | 100% of participants see active workshop + timer without login |
| Admin drives the agenda live | Workshop activation + timer start in < 30 seconds |
| Scoreboard is exciting | Updates visible to all in < 2 seconds after admin input |
| Challenge cards are digital | Admin reveals card per team — team sees it instantly on `/live` |
| Resources are centralized | All lab guides and docs accessible in one click via SharePoint |
| Feedback collected | > 70% form completion via Microsoft Forms |

---

## 4. Brand & Design Direction

### 4.1 Alithya Color Palette

| Role | Color Name | Hex | Usage |
|---|---|---|---|
| Primary Dark | Prussian Blue | `#002957` | Nav, headers, hero backgrounds, footer |
| Primary Accent | Sushi Green | `#9DC241` | Timer, CTAs, scores, active states, badges |
| Background | White | `#FFFFFF` | Page backgrounds |
| Surface | Light Gray | `#F4F6F9` | Cards, section backgrounds |
| Text | Dark Slate | `#1A2B3C` | Body copy |
| Muted Text | Slate Gray | `#6B7A8D` | Labels, metadata |
| Red Card | Crimson | `#D7263D` | Red challenge card (+5 pts) |
| Orange Card | Amber | `#F4A300` | Orange challenge card (+3 pts) |
| Green Card | Sushi Green | `#9DC241` | Green challenge card (+1 pt) |
| Special Card | Deep Purple | `#6A0DAD` | Joker / special cards |

### 4.2 Typography
- **Headlines:** Inter Bold 700 or Segoe UI Bold
- **Body:** Inter Regular 400, 1.6 line-height
- **Timer:** JetBrains Mono — large, monospace, maximum drama
- **Labels:** All-caps, tracked, `#9DC241`

### 4.3 Design Principles
- **Simple but wow** — minimal chrome, high visual impact
- Timer is always the hero — large, breathing, green countdown
- Scoreboard always visible — sticky, never hidden behind a scroll
- Challenge cards use color-coded drama
- Subtle micro-animations: floating `+5` on score gain, card pop-in on reveal
- Fully responsive — optimized for Teams Tab 1280×720 viewport

---

## 5. User Roles

### 5.1 Admin — Facilitator
- Password-protected `/admin` route
- Single admin user, manages up to **4 independent sessions**
- Activates workshops, starts/pauses/resets timer per session
- Manages live scoreboard: add/remove teams, add points with quick-add buttons
- Reveals challenge cards digitally per team
- Manages SharePoint doc links per workshop and globally
- Configures Microsoft Forms feedback URL

### 5.2 Participant — Open Access
- No login required — browser or **Microsoft Teams Tab**
- Sees: active workshop, live timer, full scoreboard, their team's challenge card
- Selects team name from dropdown to personalize challenge card view
- Accesses workshop lab guides and global resources via SharePoint links
- Accesses feedback form via CTA banner

---

## 6. Site Architecture

```
/ ─────────── Home (Event Landing Page) [FR/EN]
              ├── Hero: Event title, date, tagline
              ├── About the Day (Contoso scenario intro)
              ├── Programme de la journée (visual timeline)
              ├── What you'll build (5 deliverables)
              ├── Gamification rules
              └── CTA → /live

/live ─────── Live Day View (Participant Page) [FR/EN]
              ├── Language Toggle + Team Selector
              ├── Active Workshop Hero Card + Live Timer
              ├── Full Day Progress Timeline
              ├── Live Scoreboard (all teams ranked)
              ├── My Challenge Card (team-specific, revealed by admin)
              ├── SharePoint Workshop Lab Guides
              └── Microsoft Forms Feedback Banner

/admin ─────── Admin Dashboard (Password Protected)
              ├── Session Tabs (1–4)
              ├── Workshop Activation + Timer Controls
              ├── Scoreboard Manager
              ├── Challenge Card Distributor
              ├── SharePoint Link Manager
              └── Microsoft Forms URL Config

/rules ─────── Rules & Cards Reference [FR/EN]
              ├── Day Rules + Flag System
              ├── Scoring System
              └── All 15 Challenge Cards (full reference)

/feedback ─── Redirect → Microsoft Forms public URL
```

---

## 7. Full Day Programme

| Time | Block | Duration | Type |
|---|---|---|---|
| 09:30 – 10:00 | Icebreaker & Introduction | 30 min | Plenary |
| 10:00 – 10:15 | Setup & Team Formation | 15 min | Teams |
| 10:15 – 11:00 | Atelier 1 — Build a Declarative Agent | 45 min | Workshop |
| 11:00 – 11:15 | Pause ☕ | 15 min | Break |
| 11:15 – 12:00 | Atelier 2 — Conversational Agent + Knowledge | 45 min | Workshop |
| 12:00 – 13:00 | Discours / Keynote | 60 min | Plenary |
| 13:00 – 14:00 | Déjeuner 🍽️ | 60 min | Break |
| 14:00 – 15:15 | Atelier 3 — Autonomous Agent with Flows | 75 min | Workshop |
| 15:15 – 15:45 | Awards & Feedback 🏆 | 30 min | Closing |

**Pedagogical Arc:**
- Morning → Conversation and structure: Agent Builder → Copilot Studio
- Afternoon → Autonomy and business impact: Tools → Flows → Triggers

---

## 8. Workshop Content — Full Specification with Meaningful Dummy Content

> All workshops use a consistent **Contoso Corporation** scenario — a fictional company used across official Microsoft Copilot Studio labs. Teams build the **Contoso Customer Support Agent** progressively across the three workshops.

---

### 8.0 — Icebreaker & Introduction

**Time:** 09:30 – 10:00 | **Duration:** 30 min | **Type:** Plenary

#### Purpose
Create energy, align expectations, form teams, introduce the Contoso scenario.

#### Scenario Introduction (displayed in app)

```
🏢 Votre mission du jour : Contoso Corporation

Contoso est une entreprise internationale qui vend des équipements
technologiques. Leur service client est débordé : 500 tickets par
jour, des temps d'attente de 48h, et des agents humains qui
répondent aux mêmes questions encore et encore.

Votre équipe est mandatée pour construire l'agent IA qui va
transformer le service client de Contoso — de la réponse
conversationnelle basique jusqu'à l'automatisation autonome.

À la fin de la journée, votre agent devra :
• Répondre aux questions fréquentes sur les produits et commandes
• Trouver les informations dans les documents internes Contoso
• Traiter les demandes d'annulation de commande automatiquement
• S'activer de façon autonome sur des événements déclencheurs
```

#### Activities
- Présentation du programme et des règles
- Formation des équipes (4–5 personnes)
- Chaque équipe choisit un nom + slogan inspiré de l'IA (+2 pts créativité)
- Désignation d'un porte-parole pour les démos

#### Platform Content
- Timer: 30:00
- Status: `PLÉNIÈRE`
- SharePoint Doc: `Slides d'introduction — Programme de la journée`
- Challenge Card: None yet

---

### 8.1 — Atelier 1: Build a Declarative Agent in Copilot Chat

**Time:** 10:15 – 11:00 | **Duration:** 45 min
**Tool:** Microsoft 365 Copilot Chat — Agent Builder
**Difficulty:** ⭐ Beginner

#### Learning Objectives
- Understand the difference between Copilot Chat and a purpose-built agent
- Create a declarative agent using Agent Builder (no code required)
- Configure agent identity: name, instructions, personality, scope
- Add an initial knowledge source
- Run first smoke test in the test pane

#### The Business Problem
```
Problème Contoso :
Les clients posent toujours les mêmes questions :
"Où est ma commande ?", "Comment retourner un produit ?",
"Quelle est la politique de garantie ?"

Les agents humains passent 70% de leur temps sur ces FAQs.
Votre mission : créer un premier agent qui gère ces questions.
```

#### Step-by-Step Lab Instructions

**Étape 1 — Accéder à Agent Builder**
```
1. Ouvrez Microsoft 365 Copilot Chat
   URL : https://m365.cloud.microsoft/chat

2. Cliquez sur l'icône ✦ (Copilot) en haut à droite

3. Dans le panneau latéral, cliquez sur "Créer un agent"
   → Agent Builder s'ouvre dans un nouvel onglet

4. Vérifiez que vous êtes dans l'onglet "Configurer"
```

**Étape 2 — Configurer l'identité de l'agent**
```
Remplissez les champs suivants :

Nom :          Contoso Customer Support Assistant
Description :  Agent de support client pour Contoso Corporation.
               Répond aux questions sur les commandes, produits,
               retours et garanties.

Instructions : You are a customer service assistant for Contoso
               Corporation, helping customers with common questions
               about their orders, products, returns, and warranties.
               Be friendly, professional, and concise.
               Always greet the user before answering.
               If you don't know the answer, say:
               "I'll connect you with a human agent."
               Never discuss competitor products like Fabrikam.

Ton :          Professionnel mais chaleureux
```

**Étape 3 — Ajouter une source de connaissance**
```
Dans la section "Knowledge" :

1. Cliquez sur "Add knowledge"
2. Sélectionnez "SharePoint"
3. Collez l'URL SharePoint Contoso fournie par le facilitateur :
   https://contoso.sharepoint.com/sites/CustomerSupport
4. Donnez un nom : "Base de connaissance Support Contoso"
5. Cliquez sur "Add to agent"
6. Attendez que le statut passe à "Ready" ✅
```

**Étape 4 — Premier test dans le Test Pane**
```
Ouvrez le panneau "Tester votre agent" et essayez ces prompts :

Test 1 : "Bonjour, où est ma commande #CT-2891 ?"
         → L'agent doit saluer + tenter de répondre

Test 2 : "Quelle est votre politique de retour ?"
         → L'agent doit chercher dans SharePoint

Test 3 : "Qui a gagné la Coupe du monde 2026 ?"
         → L'agent doit refuser poliment (hors périmètre)

Test 4 : "Comparez Contoso avec Fabrikam"
         → L'agent doit refuser (instruction explicite)
```

**Étape 5 — Évaluation rapide (10 min)**
```
Démo 2 minutes par équipe :
• Montrez votre agent et son nom
• Démontrez 1 test réussi et 1 refus hors-périmètre
• Levez le drapeau VERT quand vous êtes prêts ✅

Points attribués par le facilitateur selon la qualité de la démo.
```

#### Expected Output
Un agent nommé, avec instructions claires, connecté à SharePoint, capable de répondre et de refuser correctement.

#### Key Concepts Illustrated
- **Declarative Agent** = agent qui étend Copilot sans moteur custom
- **Instructions** = le "prompt système" de votre agent
- **Knowledge Source** = données qui ancrent les réponses
- **Scope guardrails** = empêcher l'agent de dériver

#### Screenshot Placeholders (UI references from Copilot Studio)

```
[SCREENSHOT 1] Agent Builder — Onglet Configurer
  Montre : Champs Nom, Description, Instructions remplis pour Contoso

[SCREENSHOT 2] Section Knowledge — URL SharePoint ajoutée
  Montre : Statut "Ready" ✅ visible sur la source

[SCREENSHOT 3] Test Pane — Réponse à "Quelle est votre politique de retour ?"
  Montre : Réponse générée depuis la source SharePoint

[SCREENSHOT 4] Test Pane — Refus de "Comparez avec Fabrikam"
  Montre : Message de redirection poli
```

#### SharePoint Lab Doc
`Guide Atelier 1 — Build a Declarative Agent (Contoso Customer Support)`

#### Challenge Card at 10:45
Carte surprise distribuée à 10h45 — chaque équipe reçoit sa carte via la plateforme.

---

### 8.2 — Atelier 2: Conversational Agent + Knowledge Sources

**Time:** 11:15 – 12:00 | **Duration:** 45 min
**Tool:** Microsoft Copilot Studio
**Difficulty:** ⭐⭐ Intermediate

#### Learning Objectives
- Navigate Copilot Studio: Topics, Knowledge, Tools, Analytics
- Import and configure a pre-built agent solution
- Enhance the agent with richer system instructions
- Add multiple knowledge sources (SharePoint + web URL + uploaded document)
- Create a custom Topic for a specific FAQ
- Test the agent against edge cases and out-of-scope questions

#### The Business Problem
```
Nouveau défi Contoso :
L'agent de base répond trop génériquement.
Les clients veulent des réponses précises tirées des vrais
documents Contoso : la politique de remboursement, le guide
des produits, et les contacts du service technique.

Votre mission : connecter votre agent aux vraies sources de
connaissance et l'entraîner à répondre avec structure.
```

#### Step-by-Step Lab Instructions

**Étape 1 — Ouvrir Copilot Studio et importer la solution**
```
1. Accédez à : https://copilotstudio.microsoft.com
2. Connectez-vous avec votre compte de lab
3. Dans le menu gauche → Agents
4. Sélectionnez l'agent : "Contoso Customer Support Assistant"
   (importé depuis la solution fournie par le facilitateur)

5. Explorez les onglets de l'Overview :
   • Overview  → Description + état de configuration
   • Knowledge → Sources de connaissance
   • Topics    → Topics système + topics personnalisés
   • Tools     → Actions / Outils
   • Analytics → Métriques de conversation
```

**Étape 2 — Améliorer les instructions système**
```
Dans l'onglet Overview → champ "Instructions" :

Remplacez le texte existant par ces instructions avancées :

"You are a professional customer service assistant for Contoso
 Corporation. Your role is to help customers with:
 - Order status and tracking
 - Product information and specifications
 - Returns, refunds, and warranty claims
 - Technical support for Contoso devices

 Response rules:
 1. Always greet the user by name if available
 2. Structure responses with: Summary → Details → Next Steps
 3. If information comes from a document, cite the source
 4. For order issues: ask for the order number (#CT-XXXX format)
 5. Never discuss competitors (Fabrikam, Northwind, etc.)
 6. If unable to help: 'I'll escalate this to our team at
    support@contoso.com'

 Tone: Professional, empathetic, solution-oriented."
```

**Étape 3 — Ajouter 3 sources de connaissance**
```
Onglet Knowledge → "Add knowledge"

Source 1 — Document SharePoint :
  Type :    SharePoint
  URL :     https://contoso.sharepoint.com/sites/CustomerSupport
  Nom :     "Contoso Customer Support Portal"
  Desc :    "Internal knowledge base for customer support including
             FAQs, product guides, and return policies."

Source 2 — Document uploadé :
  Type :    File Upload
  Fichier : Expenses_Policy_Contoso.docx (fourni par facilitateur)
  Nom :     "Contoso Refund & Return Policy"
  Desc :    "Official policy document for refunds, returns, and
             warranty claims. Use this for all refund questions."

Source 3 — Page web externe :
  Type :    Public website
  URL :     https://learn.microsoft.com/en-us/microsoft-copilot-studio
  Nom :     "Copilot Studio Documentation"
  Desc :    "Reference documentation for Copilot Studio features."

→ Vérifiez que les 3 sources affichent le statut "Ready" ✅
```

**Étape 4 — Créer un Topic personnalisé**
```
Onglet Topics → "+ New topic" → "Create with Copilot"

Entrez cette description :
"When the user asks who to contact about a refund or return,
 tell them to email refunds@contoso.com and allow 3-5 business
 days for a response. Ask if they need help with anything else."

Vérifiez que le topic généré contient :
• Phrases de déclenchement (trigger phrases)
• Un nœud Message avec l'adresse email
• Un nœud Question "Puis-je vous aider avec autre chose ?"

Nommez ce topic : "Refund Contact Information"
Sauvegardez avec le bouton Save (en haut à droite)
```

**Étape 5 — Test complet**
```
Ouvrez le Test Pane et testez ces scénarios :

Test 1 (Topic personnalisé) :
  "Who should I contact about my refund?"
  → Doit déclencher le topic "Refund Contact Information"
  → Doit afficher refunds@contoso.com

Test 2 (Source de connaissance) :
  "What is Contoso's return policy for electronics?"
  → Doit chercher dans le document de politique
  → Doit répondre avec structure (summary + details)

Test 3 (Robustesse hors contexte) :
  "What is the meaning of life?"
  → Doit refuser et rediriger vers le domaine Contoso

Test 4 (Mini Challenge — question du facilitateur) :
  Le facilitateur pose une question surprise tirée du document
  → L'agent doit trouver la réponse dans la bonne source
```

#### Expected Output
Un agent dans Copilot Studio avec 3 sources de connaissance actives, un topic personnalisé fonctionnel, et des instructions système structurées. L'agent répond avec structure (Summary → Details → Next Steps).

#### Key Concepts Illustrated

| Concept | Description |
|---|---|
| **Topics** | Blocs de conversation définis manuellement — déclenchés par des phrases |
| **Knowledge Sources** | Données externes (SharePoint, fichiers, web) pour ancrer les réponses |
| **Generative Answers** | Le topic "Conversation Boosting" utilise les knowledge sources si aucun topic ne correspond |
| **System Instructions** | Le "prompt système" global — définit le comportement de l'agent |
| **Test Pane** | Outil de test intégré dans Copilot Studio |

#### Screenshot Placeholders

```
[SCREENSHOT 5] Copilot Studio — Page Overview de Contoso Customer Support Assistant
  Montre : Onglets Topics / Knowledge / Tools, section Instructions remplie

[SCREENSHOT 6] Onglet Knowledge — 3 sources en statut "Ready"
  Montre : SharePoint + fichier uploadé + URL web avec leurs descriptions

[SCREENSHOT 7] Topic "Refund Contact Information" dans le canvas d'authoring
  Montre : Trigger phrases + nœud Message + nœud Question enchaînés

[SCREENSHOT 8] Test Pane — Réponse structurée (Summary + Details + Next Steps)
  Montre : Réponse à "What is the return policy?" avec citation de source

[SCREENSHOT 9] Test Pane — Refus de question hors-contexte
  Montre : "What is the meaning of life?" → redirection polie
```

#### SharePoint Lab Doc
`Guide Atelier 2 — Conversational Agent + Knowledge Sources`

#### Mini Challenge
Le facilitateur pose une question tirée du document Contoso Refund Policy. L'agent doit trouver la réponse exacte avec citation de source.

---

### 8.3 — Atelier 3: Make Your Agent Autonomous

**Time:** 14:00 – 15:15 | **Duration:** 75 min
**Tool:** Microsoft Copilot Studio — Tools, Agent Flows, Triggers
**Difficulty:** ⭐⭐⭐ Advanced

#### Learning Objectives
- Understand the 4 types of tools in Copilot Studio: Prompts, Flows, Connectors, Custom APIs
- Build a **Custom Prompt Tool** for structured output
- Create an **Agent Flow** to automate an order cancellation
- Configure a **trigger** for autonomous activation
- Test a complete end-to-end autonomous scenario
- Prepare and deliver the 2-minute pitch

#### The Business Problem
```
Défi final Contoso :
L'agent conversationnel est bon — mais il nécessite encore
un humain pour déclencher les actions.

Exemple du problème :
• Un client demande d'annuler sa commande
• Aujourd'hui : l'agent répond, mais un humain doit aller dans
  le système pour faire l'annulation manuellement
• Résultat : délai de 24-48h, frustration client

Votre mission : rendre l'agent autonome.
Il doit traiter la demande d'annulation de bout en bout —
sans intervention humaine — et notifier le client par email.
```

#### Step-by-Step Lab Instructions

**Étape 1 — Créer un Custom Prompt Tool**
```
Dans Copilot Studio → Onglet "Tools" → "+ New tool" → "Prompt"

Nom :    "Format Order Cancellation Response"
Desc :   "Generates a structured, empathetic cancellation
          confirmation message for the customer."

Prompt :
"You are a customer service writer for Contoso Corporation.
 Generate a professional, empathetic order cancellation
 confirmation with the following structure:
 1. Acknowledge the cancellation request
 2. Confirm the order number: {{OrderNumber}}
 3. State the refund timeline (3-5 business days)
 4. Offer an alternative product or apology
 5. Sign off as 'Contoso Customer Support Team'

 Customer name: {{CustomerName}}
 Order number: {{OrderNumber}}
 Product cancelled: {{ProductName}}"

Inputs :
  • CustomerName  (text)
  • OrderNumber   (text)
  • ProductName   (text)

→ Testez le prompt avec :
  CustomerName = "Marie Dupont"
  OrderNumber = "CT-2891"
  ProductName = "Contoso Surface Adapter Pro"

→ Vérifiez que la sortie est structurée et professionnelle
→ Sauvegardez le tool
```

**Étape 2 — Créer l'Agent Flow d'annulation**
```
Onglet "Tools" → "+ New tool" → "Agent flow"

Utilisez Copilot pour générer le flow avec ce prompt :
"When a customer requests an order cancellation,
 get the order details from the Contoso Orders SharePoint list,
 update the order status to 'Cancelled',
 and send a confirmation email to the customer."

Le flow généré devra contenir ces étapes :

[Trigger] ─→ Inputs :
              • OrderNumber (text)
              • CustomerEmail (text)
              • CustomerName (text)

[Action 1] Get item ─→
  SharePoint Site : contoso.sharepoint.com/sites/Orders
  List Name :       Contoso Orders
  ID :              {OrderNumber} (dynamic content)

[Condition] ─→ Si Order Status = "Active"
  [Branche TRUE]
    [Action 2] Update item ─→
      Status : "Cancelled"
      CancelledDate : {utcNow()}

    [Action 3] Send an email (Outlook) ─→
      To :      {CustomerEmail}
      Subject : "Confirmation d'annulation — Commande {OrderNumber}"
      Body :    [Appel au Custom Prompt Tool]

  [Branche FALSE]
    [Action] Respond ─→
      "This order cannot be cancelled — it has already shipped."

→ Sauvegardez et publiez le flow
→ Vérifiez que le flow apparaît dans la liste des Tools
```

**Étape 3 — Connecter le Flow à un Topic**
```
Onglet "Topics" → "+ New topic" → "Create with Copilot"

Description :
"When a customer asks to cancel an order, ask them for their
 order number and email address, then run the cancellation flow
 and confirm the result to the customer."

Vérifiez que le topic généré contient :
• Trigger phrases : "cancel order", "annuler ma commande", etc.
• Nœud Question : "Quel est votre numéro de commande ?"
• Nœud Question : "Quelle est votre adresse email ?"
• Nœud "Call a tool" → Sélectionnez votre Agent Flow
• Nœud Message : Confirmation de l'annulation

Nommez : "Order Cancellation Flow"
Sauvegardez.
```

**Étape 4 — Configurer un Trigger Autonome**
```
Dans Copilot Studio → Onglet "Triggers" (ou Settings → Autonomous)

Créez un trigger :

Nom :        "Auto-Escalate Unresolved Tickets"
Type :       Time-based trigger
Description: "Automatically checks for open support tickets
              older than 24 hours and sends a summary email
              to the support manager."

Conditions :
  Si ticket_age > 24h
  ET ticket_status = "Open"
  ALORS → Envoyer email à support-manager@contoso.com

→ Configurez la fréquence : toutes les 4 heures
→ Activez le trigger
→ Cliquez sur "Test trigger" pour valider
```

**Étape 5 — Test du Scénario Complet**
```
Dans le Test Pane, simulez ce scénario complet :

"Bonjour, je voudrais annuler ma commande s'il vous plaît."

L'agent doit :
1. ✅ Déclencher le topic "Order Cancellation Flow"
2. ✅ Demander le numéro de commande → répondez CT-2891
3. ✅ Demander l'email → répondez test@contoso.com
4. ✅ Exécuter le flow (vérifiez dans SharePoint que le statut change)
5. ✅ Afficher le message de confirmation généré par le Prompt Tool
6. ✅ L'email de confirmation est envoyé (vérifiez Outlook)

Temps total de traitement de bout en bout : < 10 secondes
vs. 24-48h manuellement → Business Impact démontré ✅
```

**Étape 6 — Préparer le Pitch (15 min)**
```
Structure de votre pitch de 2 minutes :

1. Problème (20 sec)
   "Contoso avait X tickets/jour et des délais de 48h..."

2. Solution — votre agent (40 sec)
   Démonstration live du scénario d'annulation de commande

3. Résultat business (20 sec)
   "De 48h à 10 secondes. 0 intervention humaine.
   Potentiel : X% de réduction des coûts de support."

4. Prochaines étapes (20 sec)
   "En phase 2, nous connecterions l'agent à SAP/Salesforce
   et ajouterions la gestion des escalades."

→ Levez le drapeau VERT quand votre pitch est prêt ✅
```

#### Expected Output — 5 Livrables Complets

| Livrable | Description | Vérifié par |
|---|---|---|
| 🤖 Agent conversationnel | Contoso Customer Support Assistant dans Copilot Studio | Démo live |
| 📚 3 sources de connaissance | SharePoint + fichier + web, statut Ready | Screenshot |
| 🔧 Custom Prompt Tool | Format Order Cancellation Response fonctionnel | Test output |
| ⚙️ Agent Flow d'annulation | Flow SharePoint → Email complet et publié | Test end-to-end |
| 🎤 Pitch structuré | 2 minutes, problème → solution → impact business | Présentation |

#### Key Concepts Illustrated

| Concept | Description |
|---|---|
| **Custom Prompt Tool** | Template de prompt avec variables — génère des sorties structurées |
| **Agent Flow** | Flow de Power Automate intégré dans Copilot Studio — déclenché par l'agent |
| **Condition Logic** | Branchement dans le flow selon l'état de la commande |
| **Dynamic Content** | Variables du trigger réutilisées dans les actions du flow |
| **Autonomous Trigger** | Activation de l'agent sans intervention utilisateur |
| **End-to-End Test** | Test du scénario complet dans le Test Pane |

#### Screenshot Placeholders

```
[SCREENSHOT 10] Copilot Studio — Onglet Tools
  Montre : Custom Prompt Tool "Format Order Cancellation Response" + entrées/sortie

[SCREENSHOT 11] Agent Flow dans le designer
  Montre : Trigger → Get Item (SharePoint) → Condition → Update Item → Send Email

[SCREENSHOT 12] Topic "Order Cancellation Flow" dans l'authoring canvas
  Montre : Question nodes → Call a Tool node → Message node enchaînés

[SCREENSHOT 13] Test Pane — Scénario d'annulation complet
  Montre : Conversation complète de la demande à la confirmation

[SCREENSHOT 14] SharePoint List — Contoso Orders
  Montre : Statut de la commande CT-2891 passé de "Active" à "Cancelled"

[SCREENSHOT 15] Email de confirmation reçu dans Outlook
  Montre : Email structuré généré par le Prompt Tool avec tous les détails
```

#### SharePoint Lab Docs
- `Guide Atelier 3 — Autonomous Agent with Flows`
- `Template — Agent Flow Order Cancellation (solution complète)`
- `Contoso Orders SharePoint List — setup instructions`

---

### 8.4 — Closing: Awards & Feedback

**Time:** 15:15 – 15:45 | **Duration:** 30 min | **Type:** Plenary

#### Format
- Chaque équipe présente son agent Contoso en 2 minutes (scénario live)
- Vote public sur le meilleur agent (via Microsoft Forms intégré)
- Annonce des 4 catégories de prix par le facilitateur
- Feedback collectif : Ce qui a marché / À améliorer / Application réelle

#### Award Categories
- 🥇 **Best Autonomous Agent** — Flow le plus complet et fonctionnel
- 🏢 **Best Business Impact** — Meilleur calcul de ROI / impact démontré
- 💡 **Best Innovation** — Cas d'usage le plus créatif ou inattendu
- 🤝 **Best Team Collaboration** — Meilleure dynamique d'équipe

#### Feedback Discussion Questions
1. Qu'est-ce qui vous a le plus surpris sur Copilot Studio ?
2. Quel atelier a été le plus difficile et pourquoi ?
3. Dans votre contexte métier réel, quel agent construiriez-vous en premier ?
4. Quels sont vos prochains pas concrets ?

---

## 9. Gamification System — Full Specification

### 9.1 Default Teams (Pre-loaded Dummy Content)

| Team | Emoji | Slogan | Starting Demo Score |
|---|---|---|---|
| Les Cyborgs | 🤖 | "Humain + IA = Invincible" | 14 |
| Agent Force | 🦾 | "On automatise tout, maintenant" | 11 |
| Neural Squad | 🧠 | "On pense, donc on orchestre" | 9 |
| Byte Busters | 💥 | "Debug first, ship second" | 7 |
| Prompt Rangers | 🎯 | "Le bon prompt au bon moment" | 5 |

### 9.2 Scoring Rules

| Action | Points |
|---|---|
| Nom d'équipe + slogan créatif | +2 |
| Carte Verte complétée | +1 |
| Carte Orange complétée | +3 |
| Carte Rouge complétée | +5 |
| Joker — voler une autre équipe | +2 (cible perd 2) |
| Speed Run complété | +2 |
| Pitch Card réussie | +3 |
| Meilleure démo de l'éval rapide | +3 (attribution facilitateur) |

### 9.3 Scoreboard UI Behaviour
- Always visible on `/live` — sticky, never scrolled away
- Ranked top-to-bottom, medals for top 3 (🥇🥈🥉)
- On point gain: row flashes green, floating `+5` animation rises and fades
- On point removal (Joker): row flashes red, `-2` animation
- Equal scores: same rank displayed

### 9.4 All 15 Challenge Cards — Full Specification

#### 🔴 Red Cards — +5 points (Difficile)

**Carte 1 — Agent Multilingue**
```
Mission :
Votre agent Contoso doit répondre automatiquement dans la langue
de la question : français si la question est en français,
anglais si elle est en anglais.

Comment faire :
Dans les Instructions système, ajoutez :
"Always respond in the same language as the user's question.
 If the user writes in French, respond in French.
 If in English, respond in English."

Validation :
Test 1 : "What is your return policy?" → réponse en anglais ✅
Test 2 : "Quelle est votre politique de retour ?" → réponse en français ✅

Objectif pédagogique : Prompt engineering contextuel
```

**Carte 2 — Réponse Structurée**
```
Mission :
Chaque réponse de votre agent doit suivre cette structure :
📌 Résumé (1 phrase)
📋 Étapes ou détails (liste)
✅ Recommandation ou prochaine étape

Comment faire :
Ajoutez dans les Instructions système :
"Structure ALL responses with exactly 3 sections:
 1. Summary: One sentence answer
 2. Details: Bullet points with specifics
 3. Next Step: One clear recommended action for the user"

Validation :
Posez une question sur les retours Contoso
→ La réponse doit afficher les 3 sections clairement

Objectif pédagogique : Contrôle du format de sortie
```

**Carte 3 — Gestion d'Erreur**
```
Mission :
Votre agent doit détecter et gérer élégamment les questions
totalement hors de son périmètre.

Questions test imposées :
• "Quel est le sens de la vie ?"
• "Donne-moi une recette de gâteau au chocolat"
• "Qui est le président des États-Unis ?"

Comportement attendu :
L'agent doit :
1. Reconnaître que la question est hors périmètre
2. NE PAS répondre sur le sujet
3. Rediriger vers son domaine Contoso avec politesse
4. Proposer une aide alternative

Comment faire :
Ajoutez dans les Instructions :
"If a question is not related to Contoso products, orders,
 or customer service, respond: 'That's outside my area of
 expertise. I'm specialized in Contoso customer support.
 Can I help you with an order or product question?'"

Objectif pédagogique : Guardrails et périmètre de l'agent
```

**Carte 4 — Agent Expert Métier**
```
Mission :
Transformez l'agent en expert technique Contoso. Il doit :
• Avoir un rôle métier précis et défini
• Adopter un ton expert mais accessible
• Justifier ses réponses avec des faits/sources
• Proposer des escalades appropriées

Nouvelles instructions à écrire :
"You are Contoso's Senior Technical Support Specialist with
 10 years of experience. You have deep knowledge of all Contoso
 products and their technical specifications.

 When answering:
 - Use technical terminology but explain it clearly
 - Always cite which document or policy you're referencing
 - For hardware issues: ask for the model number and OS version
 - For billing issues: ask for order number and account email
 - For complex issues: offer to schedule a call with level-2 support"

Validation :
Demo : L'agent répond à une question technique avec expertise,
cite une source, et propose une escalade si nécessaire.

Objectif pédagogique : Persona engineering et expertise contextuelle
```

---

#### 🟠 Orange Cards — +3 points (Intermédiaire)

**Carte 5 — Source de Connaissance**
```
Mission :
Ajoutez une nouvelle source de connaissance à votre agent.

Options :
A) Uploadez le fichier fourni par le facilitateur :
   "Contoso_Product_Catalog_2026.pdf"

B) Ajoutez une URL publique Microsoft :
   https://support.microsoft.com/en-us/surface

C) Ajoutez un second SharePoint :
   https://contoso.sharepoint.com/sites/ProductDocs

Test de validation :
Posez une question dont la réponse ne vient QUE de cette
nouvelle source. Montrez que l'agent cite la nouvelle source.

Objectif pédagogique : Gestion multi-sources et RAG
```

**Carte 6 — Question Piège Interéquipes**
```
Mission :
Une équipe adverse pose une question complexe et piégeuse
à votre agent. Vous ne connaissez pas la question à l'avance.

Règle :
L'équipe qui pose la question choisit n'importe quel sujet
DANS le périmètre Contoso (commandes, produits, retours).
La question doit comporter au moins 2 conditions ou sous-questions.

Exemple de question piège :
"Si j'ai commandé 3 produits Contoso en même temps, que 2
 sont arrivés endommagés et que l'un a plus de 90 jours,
 quelle est ma meilleure option et quel est le délai ?"

Critère de succès :
L'agent répond correctement à TOUTES les sous-questions.

Objectif pédagogique : Robustesse et gestion des cas complexes
```

**Carte 7 — Prompt Amélioré**
```
Mission :
Réécrivez les instructions système pour réduire les
hallucinations et améliorer la précision des réponses.

Technique à appliquer : "Grounding instructions"

Nouvelles instructions à tester :
"CRITICAL RULES — Always follow these:
 1. ONLY use information from the connected knowledge sources
 2. NEVER invent product names, prices, or policy details
 3. If unsure, say: 'I want to make sure I give you accurate
    information. Let me verify: [what you found in sources]'
 4. NEVER say 'According to my training data'
 5. ALWAYS say 'According to [source name]' when citing facts"

Validation :
Posez une question sur un produit fictif : "Contoso UltraMax Pro X9"
→ L'agent doit admettre ne pas trouver l'info (pas inventer)
→ Comparez avec le comportement AVANT vos nouvelles instructions

Objectif pédagogique : Réduction des hallucinations, RAG grounding
```

**Carte 8 — Agent Pédagogique**
```
Mission :
Votre agent doit expliquer Copilot Studio à un débutant complet.

Ajoutez ce topic dans votre agent :

Trigger phrases :
• "Qu'est-ce que Copilot Studio ?"
• "Expliquez-moi comment vous fonctionnez"
• "Comment êtes-vous construit ?"

Réponse attendue :
L'agent doit expliquer en 4 étapes simples, avec analogies,
sans jargon technique — comme si l'utilisateur avait 0 expérience.

Structure :
1. "Je suis construit avec Microsoft Copilot Studio, qui est..."
2. "Pour répondre à vos questions, j'utilise [analogie simple]..."
3. "Je suis connecté à [sources] qui contiennent..."
4. "Si je ne sais pas, je [comportement]..."

Objectif pédagogique : Authoring de topics, ton pédagogique
```

---

#### 🟢 Green Cards — +1 point (Rapide)

**Carte 9 — Personnalité de l'Agent**
```
Mission (5 min) :
Donnez à votre agent Contoso une vraie personnalité.

Ajoutez dans les Instructions :

Nom de la personnalité : "Alex"
Ton : Professionnel et chaleureux, légèrement enthousiaste
Signature : Terminez chaque réponse avec "— Alex, Équipe Support Contoso"
Easter egg : Si on demande "Qui es-tu ?", l'agent répond avec
             une courte bio : "Je suis Alex, votre assistant support
             Contoso. Je travaille 24h/24 et je ne prends jamais
             de vacances ! 😄"

Validation : Démo de la signature + réponse à "Qui es-tu ?"
```

**Carte 10 — Question Inattendue du Facilitateur**
```
Mission :
Le facilitateur pose une question tirée aléatoirement d'un
des documents connectés à votre agent.

Vous ne connaissez pas la question à l'avance.
L'agent doit y répondre correctement en utilisant ses sources.

Critère de succès :
Réponse correcte + citation de la source utilisée.

Conseil : Vérifiez que vos 3 sources sont en statut "Ready" ✅
```

**Carte 11 — Réponse Courte**
```
Mission (3 min) :
Ajoutez une contrainte dans les Instructions :

"For any question that can be answered in under 30 words,
 give a SHORT answer (maximum 3 sentences).
 Only expand if the user asks for more details."

Validation :
Testez avec "What is the return window for Contoso products?"
→ La réponse doit être ≤ 3 phrases
→ Puis testez "Tell me more" → L'agent doit développer
```

**Carte 12 — Exemple Concret Obligatoire**
```
Mission (3 min) :
Ajoutez dans les Instructions :

"ALWAYS include a concrete, real-world example in your response.
 Format: 'For example: [specific scenario with Contoso product]'
 Make the example relevant to the user's specific situation."

Validation :
Testez avec "How does the warranty work?"
→ La réponse doit inclure un exemple concret
  ex: "For example: if your Contoso Surface Adapter Pro stops
       working after 8 months, it's covered under our 1-year
       warranty..."
```

---

#### 🎯 Special Cards

**Joker**
```
Choix A : Volez 2 points à l'équipe de votre choix
          Le facilitateur applique -2 à cette équipe
          Vous gagnez +2

Choix B : Obtenez 1 indice du facilitateur
          Le facilitateur vous aide sur n'importe quelle
          étape de l'atelier en cours (30 sec max)

Usage : 1 fois par équipe, par journée
```

**Speed Run ⚡**
```
Mission : 5 minutes chrono pour améliorer votre agent.

Le facilitateur démarre le timer à 5:00.
Votre équipe améliore n'importe quel aspect de l'agent.

Exemples d'améliorations rapides :
• Ajouter 3 nouvelles trigger phrases à un topic existant
• Améliorer la description d'une knowledge source
• Corriger une réponse trop longue
• Ajouter un message de bienvenue personnalisé

Critère : L'amélioration doit être visible et testable.
Points : +2 si complété dans les 5 minutes
```

**Pitch 🎤**
```
Mission : Présentez votre agent Contoso en exactement 60 secondes.

Structure imposée :
0-15 sec → Le problème de Contoso (1 stat ou fait clé)
15-40 sec → Démo live de votre agent (1 scénario)
40-60 sec → L'impact business (1 chiffre ou résultat)

Règles :
• Le chrono commence dès votre première phrase
• Dépassez 60 secondes → 0 point
• Restez en dessous de 45 secondes → 0 point (trop court)
• Entre 45-60 secondes → +3 points

Le facilitateur est chronomètre.
```

---

## 10. Platform Page Requirements

### 10.1 Home Page (`/`)

**Purpose:** Welcome participants, set context, explain the day.

**Language:** FR default / EN toggle

#### Sections with Full Dummy Content

**Hero Section**
```
Title    : 🚀 Build & Scale an AI Agent
Subtitle : Une journée pour construire, tester et déployer
           l'agent IA de Contoso Corporation avec Microsoft
           Copilot Studio et Copilot Agent Builder.
Date     : [Date de l'événement] · Alithya Montréal
CTA      : Suivre la journée en direct →  (/live)
Design   : Full-width #002957, animated grid, green accent line
```

**About the Day**
```
FR:
Bienvenue dans l'Agent in a Day d'Alithya — une expérience
immersive et gamifiée inspirée du workshop officiel Microsoft.
En équipe, vous construirez un vrai agent de support client
pour Contoso Corporation, de la conversation de base jusqu'à
l'automatisation autonome complète.

EN:
Welcome to Alithya's Agent in a Day — an immersive, gamified
experience inspired by the official Microsoft workshop. As a
team, you'll build a real customer support agent for Contoso
Corporation, from basic conversation to full autonomous automation.
```

**5 Livrables (What You'll Build)**
```
01  🤖  Agent Conversationnel Contoso
    Agent de support client créé dans Copilot Agent Builder
    et configuré dans Copilot Studio.

02  📚  3 Sources de Connaissance Connectées
    SharePoint interne Contoso + document de politique
    + page web externe — toutes en statut Ready.

03  🔧  Custom Prompt Tool
    Template de prompt structuré pour générer les
    confirmations d'annulation de commande Contoso.

04  ⚙️  Agent Flow Autonome
    Flow complet : demande client → SharePoint → email
    de confirmation automatique. 0 intervention humaine.

05  🎤  Pitch Structuré 2 Minutes
    Présentation : problème Contoso → solution agent → ROI.
```

**Programme Timeline**

```
09:30  Icebreaker & Intro ──────────── 30 min  [navy]
10:15  Atelier 1: Build ────────────── 45 min  [green]
       Copilot Chat — Agent Builder
11:00  Pause ☕ ──────────────────────  15 min  [gray]
11:15  Atelier 2: Conversational ────── 45 min  [green]
       Copilot Studio — Knowledge
12:00  Keynote ─────────────────────── 60 min  [navy]
13:00  Déjeuner ────────────────────── 60 min  [gray]
14:00  Atelier 3: Autonomous ──────── 75 min  [green]
       Copilot Studio — Flows & Triggers
15:15  Awards & Feedback ────────────  30 min  [gold]
```

**Gamification Quick Reference**
```
Drapeaux :
🟢 Vert   = Étape validée
🟠 Orange = Besoin d'aide
🔴 Rouge  = Bloqués — facilitateur

Cartes :  🔴 +5 pts  |  🟠 +3 pts  |  🟢 +1 pt

Awards : Best Autonomous Agent · Best Business Impact
         Best Innovation · Best Team Collaboration
```

---

### 10.2 Admin Dashboard (`/admin`)

See Section 5.1 for full feature spec.

**Pre-loaded Demo Config (for dry-run):**
- Session 1: "Salle Principale — Journée complète"
- Workshops: Icebreaker (30m) + Atelier 1 (45m) + Pause (15m) + Atelier 2 (45m) + Keynote (60m) + Déjeuner (60m) + Atelier 3 (75m) + Awards (30m)
- Active Workshop: Atelier 2 — Conversational Agent
- Timer: 32:14 remaining

---

### 10.3 Live Day View (`/live`)

**Pre-loaded Demo State:**
```
Active Workshop: Atelier 2 — Conversational Agent + Knowledge
Timer: 32:14 ⏱ (counting down)
Active Team (demo): Les Cyborgs 🤖
Active Challenge Card: Carte 5 — Source de Connaissance (🟠 +3 pts)
  "Ajoutez une source de connaissance (document, page web
   ou fichier interne). Test: posez une question issue du document."
```

**Scoreboard Demo State:**
```
🥇  Les Cyborgs      🤖  14 pts
🥈  Agent Force      🦾  11 pts
🥉  Neural Squad     🧠   9 pts
    Byte Busters     💥   7 pts
    Prompt Rangers   🎯   5 pts
```

**Global Resources (demo):**
```
📊  Slides de la journée      → SharePoint (contoso/slides)
📋  Guide Copilot Studio      → SharePoint (contoso/guides)
🔗  Lab GitHub Repository     → github.com/alithya/agentday
📄  Contoso Refund Policy.docx → SharePoint (contoso/policy)
📄  Contoso Product Catalog   → SharePoint (contoso/catalog)
```

---

### 10.4 Rules & Cards Reference (`/rules`)

All 15 challenge cards displayed in full (as specified in Section 9.4), plus:
- Flag system explanation
- Scoring table
- Award categories
- Day rules

---

### 10.5 Feedback (`/feedback`)

Redirects to Microsoft Forms. Recommended questions in Section 8.5.

---

## 11. Technical Requirements

### 11.1 Tech Stack

> **Constraint:** Max 60 simultaneous users on a single event day → lightweight DB, no managed cloud DB needed.

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | React + Vite | Component reuse, bilingual UI, animations |
| Styling | Tailwind CSS | Rapid, consistent, responsive |
| i18n | i18next + react-i18next | FR default / EN toggle |
| **Database** | **PocketBase** (SQLite) | Single binary, built-in REST API + admin UI, zero config, free, ideal for ≤ 60 users |
| **Sync Strategy** | **Client polling every 3s** | Simple HTTP GET every 3 seconds — imperceptible for users, zero WebSocket complexity |
| Hosting (Frontend) | Azure Static Web Apps (free) | Microsoft ecosystem, GitHub CI/CD |
| Hosting (PocketBase) | Azure Container Apps (free tier) | Runs as one Docker container, ~$0/month for this usage level |
| Teams Tab | manifest.json | Pinned tab in event Teams channel |
| Auth (Admin) | PocketBase built-in admin auth | Simple email/password, no extra code needed |
| Feedback | Microsoft Forms (external URL) | Native M365 |
| Documents | SharePoint (linked URLs) | All docs in M365 tenant |

#### Why PocketBase — Not Firebase, Not Supabase

PocketBase is a single Go binary with SQLite underneath. For a 6-hour event with 60 participants polling every 3 seconds:

- **Load estimate:** 60 users × 1 request/3s = 20 requests/second max — SQLite handles this easily
- **Zero infrastructure:** one container, no DB servers, no connection pools, no billing surprises
- **Built-in admin UI** at `/admin` — inspect data live, no extra tooling needed
- **REST API out of the box** — frontend polls `/api/collections/state/records` every 3s
- **Persistent across the day** — SQLite file survives container restarts
- **Teardown is instant** — stop the container after the event, done

#### Polling Architecture (no WebSocket needed)

```
Admin Action (e.g. activate workshop)
  → POST /api/collections/state/records  (PocketBase REST)
  → SQLite updated immediately

Participant Browser (every 3 seconds)
  → GET /api/collections/state/records
  → Compare response with local state
  → If changed → update UI (timer, scoreboard, challenge card)
  → If unchanged → no re-render (React diffing handles this)

Timer logic:
  → Admin sets timer_started_at (Unix timestamp) + duration_seconds
  → Participant calculates remaining = duration - (now - timer_started_at)
  → Timer runs client-side — polling only syncs start/pause/reset events
  → This means timer stays accurate even between polls
```

### 11.2 PocketBase Data Schema

**Collection: `event_state`** (single record, updated by admin)

```json
{
  "id": "state001",
  "session_name": "Salle Principale — Journée complète",
  "active_workshop_id": "atelier2",
  "timer_duration_seconds": 2700,
  "timer_started_at": 1711900000,
  "timer_running": true,
  "timer_paused_remaining": null
}
```

**Collection: `workshops`** (one record per workshop block)

```json
[
  { "id": "icebreaker", "title_fr": "Icebreaker & Intro",          "title_en": "Icebreaker & Intro",           "status": "done",    "duration": 1800, "doc_url": "", "order": 1 },
  { "id": "atelier1",   "title_fr": "Atelier 1 — Declarative Agent","title_en": "Workshop 1 — Declarative Agent","status": "done",    "duration": 2700, "doc_url": "https://contoso.sharepoint.com/...", "order": 2 },
  { "id": "pause1",     "title_fr": "Pause ☕",                     "title_en": "Break ☕",                      "status": "done",    "duration": 900,  "doc_url": "", "order": 3 },
  { "id": "atelier2",   "title_fr": "Atelier 2 — Conversational",  "title_en": "Workshop 2 — Conversational",  "status": "active",  "duration": 2700, "doc_url": "https://contoso.sharepoint.com/...", "order": 4 },
  { "id": "keynote",    "title_fr": "Keynote",                      "title_en": "Keynote",                      "status": "pending", "duration": 3600, "doc_url": "", "order": 5 },
  { "id": "dejeuner",   "title_fr": "Déjeuner",                     "title_en": "Lunch",                        "status": "pending", "duration": 3600, "doc_url": "", "order": 6 },
  { "id": "atelier3",   "title_fr": "Atelier 3 — Autonomous",      "title_en": "Workshop 3 — Autonomous",      "status": "pending", "duration": 4500, "doc_url": "https://contoso.sharepoint.com/...", "order": 7 },
  { "id": "awards",     "title_fr": "Awards & Feedback",            "title_en": "Awards & Feedback",            "status": "pending", "duration": 1800, "doc_url": "", "order": 8 }
]
```

**Collection: `teams`** (one record per team)

```json
[
  { "id": "team1", "name": "Les Cyborgs",    "emoji": "🤖", "slogan": "Humain + IA = Invincible",         "score": 14 },
  { "id": "team2", "name": "Agent Force",    "emoji": "🦾", "slogan": "On automatise tout, maintenant",   "score": 11 },
  { "id": "team3", "name": "Neural Squad",   "emoji": "🧠", "slogan": "On pense, donc on orchestre",      "score": 9  },
  { "id": "team4", "name": "Byte Busters",   "emoji": "💥", "slogan": "Debug first, ship second",         "score": 7  },
  { "id": "team5", "name": "Prompt Rangers", "emoji": "🎯", "slogan": "Le bon prompt au bon moment",      "score": 5  }
]
```

**Collection: `challenge_cards`** (one active record per team, replaced on new reveal)

```json
[
  {
    "id": "cc_team1",
    "team_id": "team1",
    "card_id": "carte5",
    "color": "orange",
    "points": 3,
    "title_fr": "Source de Connaissance",
    "title_en": "Knowledge Source",
    "mission_fr": "Ajoutez une source de connaissance (document, page web ou fichier interne). Test: posez une question issue du document.",
    "mission_en": "Add a knowledge source (document, webpage, or internal file). Test: ask a question from the document.",
    "status": "active",
    "revealed_at": "2026-03-15T10:47:00Z"
  }
]
```

**Collection: `config`** (single record for global settings)

```json
{
  "id": "cfg001",
  "feedback_url": "https://forms.office.com/...",
  "global_docs": [
    { "label": "Slides de la journée",    "url": "https://contoso.sharepoint.com/..." },
    { "label": "Guide Copilot Studio",    "url": "https://contoso.sharepoint.com/..." },
    { "label": "Lab GitHub Repository",   "url": "https://github.com/alithya/agentday" },
    { "label": "Contoso Refund Policy",   "url": "https://contoso.sharepoint.com/..." },
    { "label": "Contoso Product Catalog", "url": "https://contoso.sharepoint.com/..." }
  ]
}
```

### 11.3 i18n Translation Structure

```json
{
  "fr": {
    "nav":       { "home": "Accueil", "live": "Suivre la journée", "rules": "Règles & Cartes" },
    "hero":      { "title": "Build & Scale an AI Agent", "cta": "Suivre la journée en direct →" },
    "workshop":  { "active": "EN COURS", "done": "TERMINÉ", "upcoming": "À VENIR", "break": "PAUSE" },
    "timer":     { "remaining": "restantes", "start": "Démarrer", "pause": "Pause", "reset": "Réinitialiser" },
    "score":     { "scoreboard": "Classement", "points": "pts", "yourTeam": "Votre équipe" },
    "card":      { "none": "Aucune carte active — en attente du facilitateur", "new": "Nouvelle carte !" },
    "feedback":  { "cta": "Donnez-nous votre avis →", "open": "Ouvrir le formulaire" }
  }
}
```

### 11.4 Teams Tab Manifest

```json
{
  "manifestVersion": "1.17",
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": { "short": "AI Agent Day", "full": "Alithya — Build & Scale an AI Agent" },
  "staticTabs": [
    { "entityId": "home",     "name": "Programme",          "contentUrl": "https://agentday.alithya.com/" },
    { "entityId": "live",     "name": "🟢 Suivre la journée","contentUrl": "https://agentday.alithya.com/live" },
    { "entityId": "rules",    "name": "Règles & Cartes",     "contentUrl": "https://agentday.alithya.com/rules" }
  ],
  "validDomains": ["agentday.alithya.com"]
}
```

---

## 12. Out of Scope (V1)

- User authentication for participants
- In-app chat or messaging
- Video streaming
- Per-user completion tracking
- More than 4 concurrent sessions
- Native mobile app
- Automatic scoring (all scoring is admin-controlled)

---

## 13. Timeline & Phases

| Phase | Deliverable | Target |
|---|---|---|
| **Phase 0** | PRD v3.0 finalized ✅ | Done |
| **Phase 1** | Home + Rules pages (static, bilingual, full dummy content) | Week 1 |
| **Phase 2** | Live page layout + Admin page UI | Week 2 |
| **Phase 3** | PocketBase integration — polling sync for timer, scoreboard + cards | Week 3 |
| **Phase 4** | Admin controls fully wired | Week 3–4 |
| **Phase 5** | Teams Tab manifest + Azure Static Web Apps deploy | Week 4 |
| **Phase 6** | QA, bilingual review, content review, dry run | Week 5 |
| **🚀 Launch** | AI Agent Day | TBD |

---

## 14. Resolved Decisions

| Decision | Answer |
|---|---|
| Document hosting | SharePoint — admin pastes URLs |
| Bilingual | FR default + EN |
| Real-time sync | PocketBase + 3s client polling |
| Admin access | 1 user, up to 4 sessions |
| Feedback | Microsoft Forms |
| Deployment | Azure Static Web Apps + Teams Tab |
| Workshop scenario | Contoso Corporation (official Microsoft lab scenario) |
| Custom domain | TBD — confirm `agentday.alithya.com` |

---

## 15. Appendix — Color & Design Reference

```
Primary:
  #002957  Prussian Blue  →  Nav, headers, hero
  #9DC241  Sushi Green    →  Timer, CTAs, scores, active states

Backgrounds:
  #FFFFFF  White          →  Page backgrounds
  #F4F6F9  Light Gray     →  Cards, surfaces

Text:
  #1A2B3C  Dark Slate     →  Body text
  #6B7A8D  Slate Gray     →  Labels, metadata

Challenge Cards:
  #D7263D  Crimson        →  Red card   (+5 pts)
  #F4A300  Amber          →  Orange card (+3 pts)
  #9DC241  Sushi Green    →  Green card  (+1 pt)
  #6A0DAD  Deep Purple    →  Special cards (Joker, Speed Run, Pitch)
```

---

*Document préparé pour Alithya AI Agent Day*
*Basé sur le workshop officiel Microsoft « Agent in a Day »*
*Tous droits réservés © 2026 Alithya — PRD Version 3.0 — Prêt pour développement*

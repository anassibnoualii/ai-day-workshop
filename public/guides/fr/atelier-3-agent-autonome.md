# Atelier 3 — Agent Autonome

## Objectif
Faire evoluer votre agent conversationnel en un **agent autonome** capable d'executer des actions automatiquement grace aux **Flows et Triggers** dans Copilot Studio. Votre agent pourra traiter des demandes clients de bout en bout sans intervention humaine.

---

## Etape 1 : Comprendre les Actions dans Copilot Studio

1. Ouvrez votre agent dans **Copilot Studio**
2. Dans le menu lateral, cliquez sur **"Actions"**
3. Explorez les types d'actions disponibles :
   - **Power Automate Flows** : Automatisations complexes
   - **Connecteurs** : Integrations avec des services externes
   - **Actions HTTP** : Appels API personnalises

![Le panneau Actions dans Copilot Studio avec les types d'actions disponibles](/guides/screenshots/workshop-3/step1-actions.svg)

> **Concept cle** : Un agent autonome ne se contente pas de repondre — il AGIT. Il peut envoyer des emails, creer des tickets, mettre a jour des bases de donnees.

---

## Etape 2 : Creer un Flow Power Automate

1. Cliquez sur **"+ Ajouter une action"**
2. Selectionnez **"Creer un flow Power Automate"**
3. Un nouvel onglet Power Automate s'ouvre
4. Configurez le flow suivant :

### Flow : Traitement de demande de retour

**Declencheur** : Appel depuis Copilot Studio (Run a flow from Copilot)

**Parametres d'entree** :
- `customerName` (texte) — Nom du client
- `orderNumber` (texte) — Numero de commande
- `reason` (texte) — Raison du retour

**Actions du flow** :
1. **Creer un element SharePoint** : Enregistrer la demande dans une liste SharePoint
   - Liste : "Demandes de retour"
   - Colonnes : Nom client, Numero commande, Raison, Date, Statut
2. **Envoyer un email** (Office 365 Outlook) :
   - A : Email du client (ou email de test)
   - Sujet : "Confirmation de votre demande de retour #[orderNumber]"
   - Corps : Email de confirmation avec les details

**Parametres de sortie** :
- `confirmationId` (texte) — ID de confirmation genere

![Flow Power Automate : declencheur Copilot, SharePoint, email, retour de valeur](/guides/screenshots/workshop-3/step2-power-automate.svg)

5. **Testez le flow** independamment avant de le connecter
6. **Sauvegardez** le flow

---

## Etape 3 : Connecter le Flow a l'agent

1. Retournez dans **Copilot Studio**
2. Dans **"Actions"**, votre nouveau flow devrait apparaitre
3. Si ce n'est pas le cas, cliquez sur **"Actualiser"**
4. Configurez le mapping des parametres :
   - Le flow recoit les parametres du contexte de la conversation
5. Testez l'action via le panneau de test

---

## Etape 4 : Creer un Topic d'orchestration

1. Allez dans **"Topics"** > **"+ Nouveau topic"**
2. Nommez-le : "Processus de retour"
3. Ajoutez des **phrases de declenchement** :
   - "Je veux retourner un produit"
   - "Comment faire un retour ?"
   - "Annuler ma commande"
   - "Demande de remboursement"
4. Configurez le dialogue :

```
Bot: "Je peux vous aider avec votre retour. Quel est votre numero de commande ?"
[Saisie utilisateur -> variable orderNumber]

Bot: "Merci. Pour quelle raison souhaitez-vous effectuer ce retour ?"
[Saisie utilisateur -> variable reason]

Bot: "Laissez-moi traiter votre demande..."
[Appeler le flow Power Automate avec les variables]

Bot: "Votre demande de retour a ete enregistree. Numero de confirmation : {confirmationId}. Vous recevrez un email de confirmation sous peu."
```

![Configuration du topic : phrases de declenchement, questions, appel d'action, reponse](/guides/screenshots/workshop-3/step3-topic.svg)

5. **Sauvegardez** et **publiez** le topic

---

## Etape 5 : Ajouter un Trigger automatique (Optionnel)

1. Explorez les **Triggers** dans Copilot Studio
2. Configurez un trigger pour detecter automatiquement quand un client mentionne un retour
3. Le trigger doit rediriger vers le topic "Processus de retour"

---

## Etape 6 : Test end-to-end

1. Ouvrez le panneau de **test**
2. Simulez une conversation complete :
   - Demandez un retour de produit
   - Fournissez un numero de commande
   - Donnez une raison
   - Verifiez que le flow s'execute
3. **Verifiez dans SharePoint** que l'element a ete cree
4. **Verifiez votre email** que la confirmation a ete envoyee
5. Testez avec des scenarios differents :
   - Client qui change d'avis
   - Numero de commande invalide
   - Questions hors-sujet pendant le processus

---

## Etape 7 : Optimiser l'agent autonome

1. **Gestion d'erreurs** : Que se passe-t-il si le flow echoue ?
2. **Messages de fallback** : Ajoutez des messages pour les cas d'erreur
3. **Logging** : Ajoutez des logs dans le flow pour le debugging

---

## Criteres de reussite

| Critere | Description |
|---------|-------------|
| Flow fonctionnel | Le flow Power Automate s'execute sans erreur |
| Connexion agent-flow | L'agent appelle le flow correctement |
| SharePoint updated | L'element est cree dans la liste SharePoint |
| Email envoye | L'email de confirmation est recu |
| Conversation fluide | Le dialogue est naturel et guide l'utilisateur |
| Zero intervention | Le processus complet fonctionne sans aide humaine |

---

## Drapeaux

- **Vert** : Flow complet fonctionnel, email envoye, SharePoint mis a jour
- **Orange** : Flow cree mais problemes de connexion ou d'execution
- **Rouge** : Impossible de creer le flow ou de le connecter

---

## Temps alloue : 75 minutes

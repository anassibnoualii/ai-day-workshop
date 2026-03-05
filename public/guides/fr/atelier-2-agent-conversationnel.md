# Atelier 2 — Agent Conversationnel

## Objectif
Transformer votre agent declaratif en un **agent conversationnel intelligent** en ajoutant des sources de connaissance dans **Microsoft Copilot Studio**. Votre agent pourra repondre a des questions basees sur des documents reels de Contoso.

---

## Etape 1 : Ouvrir Copilot Studio

1. Allez sur [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com)
2. Connectez-vous avec vos identifiants Microsoft 365
3. Retrouvez l'agent cree dans l'Atelier 1 dans la liste **"Agents"**
4. Cliquez dessus pour l'ouvrir dans Copilot Studio

![Ouvrez votre agent dans Copilot Studio et naviguez vers Knowledge](/guides/screenshots/workshop-2/step1-copilot-studio.svg)

> **Important** : Copilot Studio offre plus de controle que Agent Builder. C'est ici que vous ajouterez les sources de connaissance.

---

## Etape 2 : Ajouter une source SharePoint

1. Dans le menu lateral, cliquez sur **"Connaissances"** (Knowledge)
2. Cliquez sur **"+ Ajouter une connaissance"**
3. Selectionnez **"SharePoint"** comme type de source
4. Entrez l'URL du site SharePoint Contoso fourni par le facilitateur
5. Selectionnez le dossier ou la bibliotheque de documents
6. Cliquez sur **"Ajouter"** et attendez l'indexation

> **Astuce** : L'indexation peut prendre 1-2 minutes. Profitez-en pour preparer la prochaine source.

---

## Etape 3 : Ajouter un document de politique

1. Retournez dans **"Connaissances"** > **"+ Ajouter"**
2. Selectionnez **"Fichiers"** comme type
3. Uploadez le document **"Politique de retour Contoso.pdf"** fourni
4. Attendez que le statut passe a **"Ready"** (pret)

---

## Etape 4 : Ajouter une source web externe

1. Dans **"Connaissances"** > **"+ Ajouter"**
2. Selectionnez **"Site web"** comme type
3. Entrez l'URL de la page produits Contoso :
   - URL fournie par le facilitateur
4. Configurez la profondeur de crawl a **1 page**
5. Cliquez sur **"Ajouter"**

![Les 3 sources de connaissance connectees avec le statut Ready](/guides/screenshots/workshop-2/step2-add-knowledge.svg)

---

## Etape 5 : Configurer le comportement Grounding

1. Retournez dans les **"Instructions"** de l'agent
2. Ajoutez des instructions de grounding :

```
## Sources de connaissance
- Utilise UNIQUEMENT les informations des sources connectees pour repondre.
- Si l'information n'est pas dans les sources, dis : "Je n'ai pas trouve cette information dans nos documents. Voulez-vous que je vous redirige vers un conseiller ?"
- Cite toujours la source de l'information quand c'est possible.
```

![Ajoutez les instructions de grounding pour controler l'utilisation des sources](/guides/screenshots/workshop-2/step3-grounding.svg)

3. Sauvegardez les modifications

---

## Etape 6 : Tester avec les sources

1. Ouvrez le panneau de **test**
2. Posez des questions qui necessitent les sources :
   - "Quelle est la politique de retour pour les appareils electroniques ?" (document PDF)
   - "Quels produits sont en promotion ?" (site web)
   - "Ou se trouvent les bureaux de Contoso ?" (SharePoint)
3. Verifiez que l'agent cite ses sources
4. Testez avec une question hors-sources pour verifier le grounding

---

## Etape 7 : Ameliorer la qualite des reponses

1. **Verifiez les hallucinations** : L'agent invente-t-il des informations ?
2. **Verifiez les citations** : L'agent reference-t-il correctement ses sources ?
3. **Ajustez les instructions** : Renforcez les regles de grounding si necessaire
4. **Testez avec l'equipe** : Chaque membre pose une question differente

---

## Criteres de reussite

| Critere | Description |
|---------|-------------|
| 3 sources connectees | SharePoint + Document + Site web, tous en statut "Ready" |
| Grounding fonctionnel | L'agent repond uniquement a partir des sources |
| Citations | L'agent cite la source de ses informations |
| Pas d'hallucination | L'agent ne fabrique pas d'informations |

---

## Drapeaux

- **Vert** : 3 sources connectees et grounding fonctionnel
- **Orange** : Sources connectees mais problemes de grounding
- **Rouge** : Impossible de connecter les sources

---

## Temps alloue : 45 minutes

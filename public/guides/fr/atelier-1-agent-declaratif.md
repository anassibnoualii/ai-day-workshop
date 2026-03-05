# Atelier 1 — Agent Declaratif

## Objectif
Creer votre premier agent IA declaratif pour Contoso en utilisant **Microsoft Copilot Agent Builder** dans Microsoft 365. A la fin de cet atelier, votre equipe aura un agent fonctionnel capable de repondre aux questions des clients Contoso.

---

## Etape 1 : Acceder a Copilot Agent Builder

1. Ouvrez votre navigateur et allez sur [https://m365.cloud.microsoft/chat](https://m365.cloud.microsoft/chat)
2. Connectez-vous avec vos identifiants Microsoft 365
3. Cliquez sur l'icone **"Agents"** dans le panneau lateral gauche
4. Cliquez sur **"+ Nouvel agent"** pour commencer

![Cliquez sur Agents dans la barre laterale puis Nouvel Agent](/guides/screenshots/workshop-1/step1-agents-menu.svg)

> **Astuce** : Assurez-vous d'utiliser le compte fourni par le facilitateur, pas votre compte personnel.

---

## Etape 2 : Configurer les informations de base

1. **Nom de l'agent** : Donnez un nom creatif a votre agent (ex: "Contoso Support Pro")
2. **Description** : Decrivez brievement le role de l'agent
   - Exemple : *"Agent de support client pour Contoso Corporation. Repond aux questions sur les produits, les politiques de retour et les commandes."*
3. **Icone** : Choisissez une icone ou uploadez un logo

![Configurez le nom, la description et l'icone de votre agent](/guides/screenshots/workshop-1/step2-configure-agent.svg)

---

## Etape 3 : Rediger les Instructions Systeme

C'est la partie la plus importante ! Les instructions systeme definissent le comportement de votre agent.

1. Dans la section **"Instructions"**, redigez vos instructions systeme
2. Utilisez le template suivant comme base :

```
Tu es un agent de support client pour Contoso Corporation.

## Role
- Tu assistes les clients avec leurs questions sur les produits, commandes et politiques.
- Tu es professionnel, amical et concis.

## Regles
- Reponds toujours en 3 phrases maximum pour les questions simples.
- Si tu ne connais pas la reponse, dis-le honnetement.
- Ne fabrique jamais d'informations sur les prix ou la disponibilite.

## Ton
- Professionnel mais accessible
- Utilise le vouvoiement
```

![Ecrivez vos instructions systeme dans la section Instructions](/guides/screenshots/workshop-1/step3-instructions.svg)

3. Cliquez sur **"Enregistrer"**

---

## Etape 4 : Tester votre agent

1. Utilisez le panneau de **test** a droite de l'ecran
2. Posez des questions test :
   - "Quelle est la politique de retour de Contoso ?"
   - "Comment suivre ma commande ?"
   - "Quels sont vos produits les plus populaires ?"
3. Observez les reponses et ajustez les instructions si necessaire

![Utilisez le panneau de test pour discuter avec votre agent](/guides/screenshots/workshop-1/step4-test-panel.svg)

---

## Etape 5 : Iterer et ameliorer

1. **Ajustez le ton** : Si l'agent est trop formel ou trop decontracte, modifiez les instructions
2. **Ajoutez des exemples** : Incluez des exemples de questions/reponses dans les instructions
3. **Testez les limites** : Posez des questions hors-sujet pour verifier que l'agent gere bien ces cas

---

## Criteres de reussite

| Critere | Description |
|---------|-------------|
| Agent cree | L'agent est cree et accessible dans Copilot |
| Instructions claires | Les instructions systeme sont structurees et completes |
| Reponses coherentes | L'agent repond correctement aux questions basiques de Contoso |
| Gestion des limites | L'agent gere les questions hors-sujet de facon appropriee |

---

## Drapeaux

- **Vert** : Vous avez complete toutes les etapes et l'agent repond correctement
- **Orange** : Vous avez besoin d'aide sur une etape specifique
- **Rouge** : Vous etes bloques et avez besoin du facilitateur

---

## Temps alloue : 45 minutes

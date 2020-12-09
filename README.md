# Stage et alternance master UBO

**Stage et alternance master UBO** est une application de gestion qui permet à chaque étudiant en master informatique a l'UBO de marquer un suivi de ses recherches de stages en master 1.\

Les enseignants , quant à eux, peuvent consulter les données entrées par un étudiant.

## Installation
Il faut déjà disposé d'une version de Node égal ou supérieure a la `v14.13.0`.\

Dans un premier temps il faut installer la base de données en local dont le script est dans `createSchema.sql`. Puis installé les node_modules du côté client et du côté serveur.
```
npm install
cd client
npm install
```


## Lancement 
Pour lancer l'application, et les deux server en simultané il faut faire la commande :
```
npm start
```

## Utilisations
### Etudiant
Un étudiant peut se créer un compte avec une adresse mail de type Prenom.Nom@etudiant.univ-brest.fr. \
Il pourra ensuite se connecter sur l'application ou il pourra :

- renseigner une candidature;
- renseigner un stage;
- ajouter une entreprise a la base de données;
- modifier ses informations personnel.

*Compte exemple  : 
adresse mail -> mabel.pines@etudiant.univ-brest.fr
mot de passe -> dandiiiiinou666****
### Enseignant 
Un enseignant ne peut pas se créer de compte, ce sera le rôle de l'administrateur. \
Il pourra ensuite se connecter avec son adresse mail professionnelle (Prenom.Nom@univ-brest.fr). De la il pourra :

- ajouter une entreprise a la base de données;
- consulter la liste des entreprise;
- ajouter un étudiant.

*Compte exemple  : 
adresse mail -> Ford.Pines@univ-brest.fr
mot de passe -> billCipher1989*
### Administrateur
Il accède aux mêmes fonctionnalités que les enseignant, mais il peut en plus :

- ajouter un enseignant.

*Compte exemple  : 
adresse mail -> admin
mot de passe -> admin_**

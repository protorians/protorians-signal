# Protorians Signal

Protorians Signal est un gestionnaire d'évènement en Javascript.
Le but premier est d'avoir une liste de fonction typée avec le couple `nom : arguments`, le tout depuis un objet existant.
---

## Signal multiple
C'est un signal qui gère plusieurs types de signaux.
Le but est d'avoir un regroupement de signaux dans le cadre d'une utilisation plus globale.

### Cas d'usage
Il peut être mis en place dans le cadre d'un traitement à plusieurs niveaux.
Imaginons que nous avons une classe qui possède les méthodes suivantes :

```typescript

interface IGenV{
  
}

class Genv implements IGenV{
  
  parse(){
    //...
  } 
  
  commit(){
    //...
  } 
  
  push(){
    //...
  } 
  
}
```

Dans notre exemple, chaque méthode pourra appeler un type de signal.

### Comment ça fonctionne

- Pour commencer, il faudrait créer le typage du signal.

```typescript
type IMySignal = {
  initialize: boolean;
  parse: string[];
  commit: string[];
  push: boolean;
}
```

- Ensuite, construire son signal
```typescript
this.signal = new Signalables<IGenvable, IMySignal>(genvableInstance)
```

- Définir les écouteurs

```typescript
class Genv {

  signal: ISignalable<IGenV, IMySignal>
  files: string[]
  validated: boolean = false

  constructor(instance: IGenvable, files: string[]) {
    this.files = files;
    this.signal = new Signalables<IGenvable, IMySignal>(instance);
  }

  initialize() {
    this.signal.listen('parse', context => console.log(context))
    this.signal.listen('commit', context => console.log(context))
    this.signal.listen('push', context => console.log(context))
  }

  run() {
    this.initialize()
  }

}

```

- Déclencher les écoutes
```typescript

class Genv {
  
  //..

  parse() {
    this.signal.dispatch('parse', this.files)
  }

  commit() {
    this.signal.dispatch('commit', this.files)
  }

  push() {
    this.signal.dispatch('push', this.validated)
  }

  //..
}

```

---
## Signal autonome
C'est une unité de signal singulier qui se gère de manière autonome.
Le but est de gérer un seul type de signal isolé dans le cadre d'une utilisation très précise.

### Cas d'usage
Il peut être mis en place dans le cadre d'un traitement à un seul niveau.
Imaginons que nous avons une fonction faisant un seul traitement, mais qu'on a besoin de déclencher un signal quand le traitement est éffectué :

```typescript

type IGenV = {}
function genv(): IGenV {
}
```

### Comment ça fonctionne

- Pour commencer, il faudrait créer le typage du signal.

```typescript
type IMySignal = boolean
```

- Ensuite, construire son signal
```typescript
const signaler = new Signalables<IGenvable, IMySignal>(genvableInstance)
```

- Definir les écouteurs
```typescript

function genv(): IGenV {
  // ...
    signaler.listen(context => console.log(context))
  // ...
}
```

- Déclencher les écoutes
```typescript
mySignal.dispatch(true)
```

---

# Protorians ;)
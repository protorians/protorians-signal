# Protorians Signal

Protorians Signal is a Javascript event handler.
The primary goal is to have a list of functions typed with the pair `name: arguments`, all from an existing object.
---

## Multiple signal
It is a signal that manages several types of signals.
The goal is to have a grouping of signals within the framework of a more global use.

### Use cases
It can be implemented as part of a multi-level treatment.
Let's imagine that we have a class that has the following methods:

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

In our example, each method can call a type of signal.

### How it works

- To begin, you would need to create the signal typing.

```typescript
type IMySignal = {
   initialize: boolean;
   parse: string[];
   commit: string[];
   push: boolean;
}
```

- Then, build your signal
```typescript
this.signal = new Signalables<IGenvable, IMySignal>(genvableInstance)
```

- Set headphones

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

- Trigger eavesdropping
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
## Autonomous signal
It is a singular signal unit which is managed independently.
The goal is to manage a single type of isolated signal within the framework of very precise use.

### Use cases
It can be implemented as part of a single-level treatment.
Let's imagine that we have a function doing a single processing but need to trigger a signal when the processing is carried out:

```typescript

type IGenV = {}
function genv(): IGenV {
}
```

### How it works

- To begin, you would need to create the signal typing.

```typescript
type IMySignal = boolean
```

- Then, build your signal
```typescript
const signal = new Signalable<IGenvable, IMySignal>(genvableInstance)
```

- Set headphones
```typescript

function genv(): IGenV {
   // ...
     signal.listen(context => console.log(context))
   // ...
}
```

- Trigger eavesdropping
```typescript
mySignal.dispatch(true)
```

---

# Protorians ;)
Purified Protos
===============

The JS library that pulls from [Furtif's POGOProtos](https://github.com/Furtif/POGOProtos) and undo the obfuscation and Furtif's questionable design choices to make the protobuf usable in Javascript.
The aim of this project is to provide a list of stable APIs to use in your JS projects.

Usage:

```js
const protos = await require('purified-protos')();
// or use this if you want to live on the edge and risk Furtif breaking stuff
const protos = await require('purified-protos')('master');

console.log(protos.PokemonDisplayProto.Form.RUNERIGUS_NORMAL);  // prints 2516
```

A list of supported APIs can be found in the [test.js](test/test.js).

## Version code

The version code for this library follows semantic versioning. In particular, `major.minor` will follow the upstream proto version, and `revision` represents internal revision of the proto and is uncorrelated from upstream.

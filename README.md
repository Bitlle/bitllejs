# bitllejs JavaScript Api

version 1.3.4

Frontend package to work on the  [Bitlle Network](https://bitlle.network) backend api.

## New in 1.3.x

- integrated `transaction booster`
- iGasStation.js adapted to a fail-safe transaction sending mechanism.
- in [signer](./lib/signer.js) added the ability to optionally set the `nonce` value and automatic value increased by 1 hour.

## New in 1.2.x

- new BitlleGasStation version
- Added BitlleGasStation smart contract interface.
- Added ethereum transaction sender
- Created config file

## New in 1.0.x

- in nodeHealth module added optional max delay parameter.
- Added new external methods.
- Reorganized internal logic.

## Installation

```bash
npm i bitllejs
```

## License

LGPL-3.0

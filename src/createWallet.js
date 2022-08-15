//Importar as dependencias utilizadas no projeto
const bip39 = require ('bip39');
const bip32 = require ('bip32');
const bitcoin = require ('bitcoinjs-lib');

//Definindo a rede
//Utilizaremos a rede de teste, a TESTNET
//Bitcoin - rede principal - mainnet
//Testenet - rede de testes - testnet
const network = bitcoin.networks.testnet;

//Dirivação de carteira HD - Hierarquica Deterministica
//O 1 é referente a rede de teste - testnet
//O 2 é referente a rede do Bitcoin - mainnet
const path = `m/49'/1'/0'/0`;

//Criando o mnemonica para a seed - Palavras Aleatórias - Senha
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//Criando a raiz da carteira
let root = bip32.fromSeed(seed,network);

//Criando uma conta - Carteira (Par privateKey / PublicKey)
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;

console.log("Cardeira gerada com sucesso!");
console.log("Endereço: ", btcAddress);
console.log("Chave privada: ", node.toWIF());
console.log("Palavras Aleatórias - SEED: ", mnemonic);
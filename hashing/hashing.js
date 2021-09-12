'use strict'

var crypto = require('crypto')

// The Power of a Smile
// by Tupac Shakur
var poem = [
  'The power of a gun can kill',
  'and the power of fire can burn',
  'the power of wind can chill',
  'and the power of a mind can learn',
  'the power of anger can rage',
  'inside until it tears u apart',
  'but the power of a smile',
  'especially yours can heal a frozen heart',
]

var Blockchain = {
  blocks: [],
}

// Genesis block
Blockchain.blocks.push({
  index: 0,
  hash: '000000',
  data: '',
  timestamp: Date.now(),
})

const createBlock = data => {
  const lastBlockIndex = Blockchain.blocks.length - 1
  const lastBlock = Blockchain.blocks[lastBlockIndex]
  const newBlockIndex = Blockchain.blocks.length
  const prevHash = lastBlock.hash
  const timestamp = Date.now()
  const newBlock = {
    index: newBlockIndex,
    prevHash,
    data,
    timestamp,
  }
  return { ...newBlock, hash: blockHash(newBlock) }
}
// TODO: insert each line into blockchain
for (let line of poem) {
  Blockchain.blocks.push(createBlock(line))
}

console.log(Blockchain)

const isPrevHashDifferent = (prevBlock, prevHashInThisBlock) =>
  prevBlock.hash !== prevHashInThisBlock

const isDataEmpty = data => !data

const isPrevHashEmpty = prevHash => !prevHash

const isHashDifferent = block => block.hash !== blockHash(block)

const isGenesisBlockValid = gblock => gblock.hash === '000000'

const verifyBlock = block => {
  if (block.index > 0) {
    const prevBlock = Blockchain.blocks[block.index - 1]
    return isDataEmpty(block.data) ||
      isPrevHashEmpty(block.prevHash) ||
      isPrevHashDifferent(prevBlock, block.prevHash) ||
      isHashDifferent(block)
      ? false
      : true
  } else if (block.index == 0) {
    return isGenesisBlockValid(block)
  }
  return true
}

const verifyChain = Blockchain => {
  for (let block of Blockchain.blocks) {
    const isBlockValid = verifyBlock(block)
    // console.log(isBlockValid)
    if (!isBlockValid) {
      return false
    }
  }

  return true
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`)

// **********************************

function blockHash(bl) {
  return crypto
    .createHash('sha256')
    .update(`${bl.index}${bl.prevHash}${bl.data}${bl.timestamp}`)
    .digest('hex')
}

// console.log(blockHash(Blockchain.blocks[0]))

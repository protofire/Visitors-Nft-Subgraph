import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import { BigInt } from '@graphprotocol/graph-ts'
import { Mint, Burn, Transfer } from '../../../generated/schema'

export namespace transactions {
  export namespace constants {
    export let TRANSACTION_MINT = 'MINT'
    export let TRANSACTION_BURN = 'BURN'
    export let TRANSACTION_TRANSFER = 'TRANSFER'
  }

  export namespace helpers {
    export function getNewTransactionId(from: string, to: string, timestamp: BigInt): string {
      return from + '-' + to + '-' + timestamp.toString()
    }
  }

  export function getNewMint(
    to: string,
    token: string,
    timestamp: BigInt,
    blockId: string,
    numTokenBefore: BigInt,
    numTokensAfter: BigInt,
    numOwnersBefore: BigInt,
    numOwnersAfter: BigInt,
    numTokensBeforeSeller: BigInt = BigInt.fromI32(-1),
    numTokensAfterSeller: BigInt = BigInt.fromI32(-1),
  ): Mint {
    let transaction = new Mint(helpers.getNewTransactionId(ADDRESS_ZERO, to, timestamp))
    transaction.from = ADDRESS_ZERO
    transaction.to = to
    transaction.token = token
    transaction.block = blockId
    transaction.type = constants.TRANSACTION_MINT
    /* 
    transaction.numTokensBefore = numTokenBefore
    transaction.numTokensAfter = numTokensAfter
    transaction.numOwnersBefore = numOwnersBefore
    transaction.numOwnersAfter = numOwnersAfter
    transaction.numTokensBeforeSeller = numTokensBeforeSeller
    transaction.numTokensAfterSeller = numTokensAfterSeller */

    return transaction as Mint
  }

  export function getNewBurn(
    from: string,
    token: string,
    timestamp: BigInt,
    blockId: string,
    numTokenBefore: BigInt,
    numTokensAfter: BigInt,
    numOwnersBefore: BigInt,
    numOwnersAfter: BigInt,
    numTokensBeforeSeller: BigInt = BigInt.fromI32(-1),
    numTokensAfterSeller: BigInt = BigInt.fromI32(-1),
  ): Burn {
    let transaction = new Burn(helpers.getNewTransactionId(from, ADDRESS_ZERO, timestamp))
    transaction.from = from
    transaction.to = ADDRESS_ZERO
    transaction.token = token
    transaction.block = blockId
    transaction.type = constants.TRANSACTION_BURN

    /*  transaction.numTokensBefore = numTokenBefore
    transaction.numTokensAfter = numTokensAfter
    transaction.numOwnersBefore = numOwnersBefore
    transaction.numOwnersAfter = numOwnersAfter
    transaction.numTokensBeforeSeller = numTokensBeforeSeller
    transaction.numTokensAfterSeller = numTokensAfterSeller */

    return transaction as Burn
  }

  export function getNewTransfer(
    from: string,
    to: string,
    token: string,
    timestamp: BigInt,
    blockId: string,
    numTokenBefore: BigInt,
    numTokensAfter: BigInt,
    numOwnersBefore: BigInt,
    numOwnersAfter: BigInt,
    numTokensBeforeSeller: BigInt,
    numTokensAfterSeller: BigInt,
  ): Transfer {
    let transaction = new Transfer(helpers.getNewTransactionId(from, to, timestamp))
    transaction.from = from
    transaction.to = to
    transaction.token = token
    transaction.block = blockId
    transaction.type = constants.TRANSACTION_TRANSFER

    /*     transaction.numTokensBefore = numTokenBefore
    transaction.numTokensAfter = numTokensAfter
    transaction.numOwnersBefore = numOwnersBefore
    transaction.numOwnersAfter = numOwnersAfter

    transaction.numTokensBeforeSeller = numTokensBeforeSeller
    transaction.numTokensAfterSeller = numTokensAfterSeller */

    return transaction as Transfer
  }
}

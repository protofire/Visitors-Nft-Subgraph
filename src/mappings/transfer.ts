import { BigInt, Bytes } from '@graphprotocol/graph-ts'
import { integer } from '@protofire/subgraph-toolkit'
import { accounts, transactions, tokens, visitors, blocks } from '../modules'

export namespace transfer {
  export function handleMint(
    to: Bytes,
    tokenId: BigInt,
    timestamp: BigInt,
    blockId: string,
    visitorInfoId: string,
    baseURI: string,
  ): void {
    let tokenIdStr = tokenId.toString()
    let isNewAccount = false
    if (!accounts.isAccountExist(to)) isNewAccount = true

    let account = accounts.getOrCreateAccount(to)

    let numTokenBefore = account.numTokens

    account.numTokens = account.numTokens.plus(integer.ONE)
    account.save()

    let token = tokens.mintToken(tokenIdStr, to.toHex())

    token.uri = tokens.helpers.getCompleteURI(baseURI, tokenIdStr)
    token.burned = false
    token.tokenID = tokenId
    token.save()

    let visitor = visitors.getOrCreateVisitorsInfo(visitorInfoId)

    // add general info
    visitor.numTokens = visitor.numTokens.plus(integer.ONE)
    visitor.lastMintDate = timestamp

    // if numtokens is 1, then it is a new owner
    if (account.numTokens.equals(integer.ONE)) {
      visitor.numOwners = visitor.numOwners.plus(integer.ONE)
    }
    if (isNewAccount) {
      visitor.numAccounts = visitor.numAccounts.plus(integer.ONE)
    }
    visitor.save()

    let transaction = transactions.getNewMint(account.id, tokenIdStr, timestamp, blockId)
    transaction.save()
  }

  export function handleBurn(
    from: Bytes,
    tokenId: BigInt,
    timestamp: BigInt,
    blockId: string,
    visitorInfoId: string,
  ): void {
    let tokenIdStr = tokenId.toString()

    let account = accounts.getOrCreateAccount(from)
    let numTokenBefore = account.numTokens
    account.numTokens = account.numTokens.minus(integer.ONE)
    account.save()

    let token = tokens.burnToken(tokenIdStr)
    token.burned = true
    token.save()

    let visitor = visitors.getOrCreateVisitorsInfo(visitorInfoId)
    visitor.numTokens = visitor.numTokens.minus(integer.ONE)
    visitor.lastBurned = timestamp

    // if token is 0, one less owner
    if (account.numTokens.equals(integer.ZERO)) {
      visitor.numOwners = visitor.numOwners.minus(integer.ONE)
    }
    visitor.save()

    let transaction = transactions.getNewBurn(account.id, tokenIdStr, timestamp, blockId)
    transaction.save()
  }

  export function handleRegularTransfer(
    from: Bytes,
    to: Bytes,
    tokenId: BigInt,
    timestamp: BigInt,
    blockId: string,
    visitorInfoId: string,
  ): void {
    let tokenIdStr = tokenId.toString()

    let seller = accounts.getOrCreateAccount(from)

    seller.numTokens = seller.numTokens.minus(integer.ONE)
    seller.save()

    let buyer = accounts.getOrCreateAccount(to)

    buyer.numTokens = buyer.numTokens.plus(integer.ONE)
    buyer.save()

    let token = tokens.changeOwner(tokenIdStr, buyer.id)
    token.save()

    let visitor = visitors.getOrCreateVisitorsInfo(visitorInfoId)
    visitor.lastTransferDate = timestamp

    if (seller.numTokens.equals(integer.ZERO)) {
      visitor.numOwners = visitor.numOwners.minus(integer.ONE)
    }
    if (buyer.numTokens.equals(integer.ONE)) {
      visitor.numOwners = visitor.numOwners.plus(integer.ONE)
    }
    visitor.save()

    let transaction = transactions.getNewTransfer(seller.id, buyer.id, tokenIdStr, timestamp, blockId)
    transaction.save()
  }
}

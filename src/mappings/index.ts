import { ADDRESS_ZERO, integer } from '@protofire/subgraph-toolkit'
import { Transfer } from '../../generated/Visitors/Visitors'

import { transfer } from './transfer'

import { visitors, blocks } from '../modules'
import { BigInt } from '@graphprotocol/graph-ts'

let VISITOR_ID = ADDRESS_ZERO

// This is set in the constructor of the contract, can be change but there is no event to detect it.
let BASE_URI = 'https://thevisitorsnft.com/api/visitor/'

export function handleTransfer(event: Transfer): void {
  let from = event.params.from
  let to = event.params.to
  let tokenId = event.params.tokenId
  let blockNumber = event.block.number
  let blockId = blockNumber.toString()
  let timestamp = event.block.timestamp

  visitors.getOrCreateVisitorsInfo(VISITOR_ID)

  let block = blocks.getOrCreateBlock(blockId, timestamp, blockNumber)
  block.save()

  if (from.toHex() == ADDRESS_ZERO) {
    transfer.handleMint(to, tokenId, timestamp, blockId, VISITOR_ID, BASE_URI)
  } else if (to.toHex() == ADDRESS_ZERO) {
    transfer.handleBurn(from, tokenId, timestamp, blockId, VISITOR_ID)
  } else {
    transfer.handleRegularTransfer(from, to, tokenId, timestamp, blockId, VISITOR_ID)
  }
}

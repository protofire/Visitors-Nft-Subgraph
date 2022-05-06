import { Bytes } from '@graphprotocol/graph-ts'
import { integer } from '@protofire/subgraph-toolkit'
import { VisitorsInfo } from '../../../generated/schema'

export namespace visitors {
  export namespace helpers {
    /* export function getOperatorOwnerId(
			ownerId: string,
			operatorId: string
		): string {
			return ownerId.concat("-".concat(operatorId))
		} */
  }

  export function getOrCreateVisitorsInfo(num: String): VisitorsInfo {
    let id = num.toString()

    let visitors = VisitorsInfo.load(id)
    if (visitors == null) {
      visitors = new VisitorsInfo(id)
      visitors.numOwners = integer.ZERO
      visitors.numTokens = integer.ZERO
    }
    return visitors as VisitorsInfo
  }
}
